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
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resolvedRef = useRef(false)
  const restartCountRef = useRef(0)
  const bestInterimRef = useRef<string | null>(null)

  useEffect(() => {
    const hasAPI = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    setAvailable(hasAPI)
  }, [])

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
        resolve(false)
        return
      }

      resolvedRef.current = false
      restartCountRef.current = 0
      bestInterimRef.current = null

      setStatus('listening')
      setResult(null)
      setInterimText(null)

      const finishWith = (matched: boolean, transcript: string | null) => {
        if (resolvedRef.current) return
        resolvedRef.current = true
        clearTimer()
        try { recognitionRef.current?.stop() } catch { /* already stopped */ }
        recognitionRef.current = null
        setResult(transcript)
        setInterimText(null)
        setStatus('idle')
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

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (resolvedRef.current) return

          for (let r = event.resultIndex; r < event.results.length; r++) {
            const res = event.results[r]

            if (res.isFinal) {
              for (let i = 0; i < res.length; i++) {
                const transcript = res[i].transcript
                bestInterimRef.current = transcript
                if (wordsMatch(transcript, expectedWord)) {
                  finishWith(true, normalize(transcript))
                  return
                }
              }
              finishWith(false, normalize(res[0].transcript))
              return
            } else {
              const interim = res[0].transcript
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
          if (resolvedRef.current) return
          restartCountRef.current++
          if (restartCountRef.current < MAX_RESTARTS) {
            setTimeout(() => {
              if (resolvedRef.current) return
              try {
                const next = createRecognition()
                next.start()
              } catch {
                finishFromTimeout()
              }
            }, RESTART_DELAY_MS)
          } else {
            finishFromTimeout()
          }
        }

        return recognition
      }

      try {
        const recognition = createRecognition()
        recognition.start()
      } catch {
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

  return { listen, stop, status, available, result, interimText }
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
    start(): void
    stop(): void
  }
}
