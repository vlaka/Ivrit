import { useCallback, useEffect, useRef, useState } from 'react'

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent {
  error: string
}

type RecognitionStatus = 'idle' | 'listening' | 'processing'

const LISTEN_TIMEOUT_MS = 8000
const MAX_RESTARTS = 5
const RESTART_DELAY_MS = 300

const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)

function removeNikud(text: string): string {
  return text.replace(/[\u0591-\u05C7]/g, '')
}

function normalize(text: string): string {
  return removeNikud(text)
    .normalize('NFC')
    .replace(/[^\u05D0-\u05EA]/g, '')
}

function levenshtein(s: string, t: string): number {
  const m = s.length
  const n = t.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[])
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = s[i - 1] === t[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

function wordsMatch(recognized: string, expected: string): boolean {
  const a = normalize(recognized)
  const b = normalize(expected)
  if (a.length === 0 || b.length === 0) return false
  if (a === b) return true

  // Only allow 1 character difference for words 5+ letters
  if (b.length >= 5 && levenshtein(a, b) === 1) return true
  return false
}

type SpeechRecognitionInstance = InstanceType<typeof webkitSpeechRecognition>

export function useSpeechRecognition() {
  const [status, setStatus] = useState<RecognitionStatus>('idle')
  const [available, setAvailable] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [interimText, setInterimText] = useState<string | null>(null)
  const [debugLog, setDebugLog] = useState<string[]>([])
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resolvedRef = useRef(false)
  const restartCountRef = useRef(0)
  const bestInterimRef = useRef<string | null>(null)

  const addDebug = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setDebugLog(prev => [...prev.slice(-19), `${ts} ${msg}`])
  }, [])

  useEffect(() => {
    const hasWebkit = 'webkitSpeechRecognition' in window
    const hasStandard = 'SpeechRecognition' in window
    const hasAPI = hasWebkit || hasStandard
    setAvailable(hasAPI)
    addDebug(`API: webkit=${hasWebkit} standard=${hasStandard} mobile=${isMobile}`)
  }, [addDebug])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const listen = useCallback((expectedWord: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const SpeechRecognitionAPI =
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition ||
        (window as unknown as Record<string, unknown>).SpeechRecognition

      if (!SpeechRecognitionAPI) {
        addDebug('ERR: no API found')
        resolve(false)
        return
      }

      resolvedRef.current = false
      restartCountRef.current = 0
      bestInterimRef.current = null

      setStatus('listening')
      setResult(null)
      setInterimText(null)
      addDebug(`listen start, expected="${expectedWord}" continuous=${!isMobile}`)

      const finishWith = (matched: boolean, transcript: string | null) => {
        if (resolvedRef.current) return
        resolvedRef.current = true
        clearTimer()
        try { recognitionRef.current?.stop() } catch { /* already stopped */ }
        recognitionRef.current = null
        setResult(transcript)
        setInterimText(null)
        setStatus('idle')
        addDebug(`finish: matched=${matched} text="${transcript}"`)
        resolve(matched)
      }

      const finishFromTimeout = () => {
        if (resolvedRef.current) return
        const lastHeard = bestInterimRef.current
        if (lastHeard && wordsMatch(lastHeard, expectedWord)) {
          finishWith(true, normalize(lastHeard))
        } else {
          finishWith(false, lastHeard ? normalize(lastHeard) : null)
        }
      }

      timeoutRef.current = setTimeout(finishFromTimeout, LISTEN_TIMEOUT_MS)

      const createRecognition = () => {
        const recognition = new (SpeechRecognitionAPI as new () => SpeechRecognitionInstance)()
        recognition.lang = 'he-IL'
        recognition.continuous = !isMobile
        recognition.interimResults = true
        recognition.maxAlternatives = 5
        recognitionRef.current = recognition

        recognition.onaudiostart = () => { addDebug('event: audiostart') }
        recognition.onspeechstart = () => { addDebug('event: speechstart') }
        recognition.onspeechend = () => { addDebug('event: speechend') }

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (resolvedRef.current) return

          for (let r = event.resultIndex; r < event.results.length; r++) {
            const res = event.results[r]

            if (res.isFinal) {
              const transcript = res[0].transcript
              addDebug(`result FINAL: "${transcript}" (${res.length} alt)`)
              for (let i = 0; i < res.length; i++) {
                const t = res[i].transcript
                bestInterimRef.current = t
                if (wordsMatch(t, expectedWord)) {
                  finishWith(true, normalize(t))
                  return
                }
              }
              finishWith(false, normalize(res[0].transcript))
              return
            } else {
              const interim = res[0].transcript
              addDebug(`result interim: "${interim}"`)
              bestInterimRef.current = interim
              setInterimText(interim)

              if (wordsMatch(interim, expectedWord)) {
                clearTimer()
                timeoutRef.current = setTimeout(() => {
                  if (!resolvedRef.current) {
                    finishWith(true, normalize(interim))
                  }
                }, 1500)
              }
            }
          }
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          addDebug(`error: ${event.error}`)
          if (resolvedRef.current) return
          if (event.error === 'no-speech' || event.error === 'aborted') {
            return
          }
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            finishWith(false, null)
            setAvailable(false)
            return
          }
          finishWith(false, null)
        }

        recognition.onend = () => {
          addDebug(`event: onend (restart #${restartCountRef.current})`)
          if (resolvedRef.current) return
          restartCountRef.current++
          if (restartCountRef.current < MAX_RESTARTS) {
            setTimeout(() => {
              if (resolvedRef.current) return
              try {
                const next = createRecognition()
                next.start()
                addDebug(`restarted #${restartCountRef.current}`)
              } catch (e) {
                addDebug(`restart failed: ${e}`)
                finishFromTimeout()
              }
            }, RESTART_DELAY_MS)
          } else {
            addDebug('max restarts reached')
            finishFromTimeout()
          }
        }

        return recognition
      }

      try {
        const recognition = createRecognition()
        recognition.start()
        addDebug('recognition.start() called')
      } catch (e) {
        addDebug(`start failed: ${e}`)
        finishWith(false, null)
      }
    })
  }, [clearTimer])

  const stop = useCallback(() => {
    clearTimer()
    resolvedRef.current = true
    try { recognitionRef.current?.stop() } catch { /* ok */ }
    recognitionRef.current = null
    setStatus('idle')
    setInterimText(null)
  }, [clearTimer])

  return { listen, stop, status, available, result, interimText, debugLog }
}

declare global {
  // eslint-disable-next-line no-var
  var webkitSpeechRecognition: new () => {
    lang: string
    continuous: boolean
    interimResults: boolean
    maxAlternatives: number
    onresult: ((event: SpeechRecognitionEvent) => void) | null
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
    onend: (() => void) | null
    onaudiostart: (() => void) | null
    onspeechstart: (() => void) | null
    onspeechend: (() => void) | null
    start(): void
    stop(): void
  }
}
