import { useCallback, useEffect, useRef, useState } from 'react'

type TTSMode = 'native' | 'google' | 'none'

function getHebrewVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  return (
    voices.find(v => v.lang === 'he-IL') ||
    voices.find(v => v.lang.startsWith('he')) ||
    voices.find(v => v.name.toLowerCase().includes('hebrew')) ||
    null
  )
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const [ttsMode, setTtsMode] = useState<TTSMode>('none')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const check = () => {
      if (getHebrewVoice()) {
        setTtsMode('native')
      } else {
        setTtsMode('google')
      }
    }
    check()
    speechSynthesis.addEventListener('voiceschanged', check)
    return () => speechSynthesis.removeEventListener('voiceschanged', check)
  }, [])

  const speakNative = useCallback((text: string, rate: number) => {
    speechSynthesis.cancel()
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'he-IL'
      utterance.rate = rate
      const voice = getHebrewVoice()
      if (voice) utterance.voice = voice
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      speechSynthesis.speak(utterance)
    }, 150)
  }, [])

  const speakGoogle = useCallback((text: string, _rate: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const encoded = encodeURIComponent(text)

    const textLen = text.length
    const isDev = import.meta.env.DEV
    const params = `ie=UTF-8&q=${encoded}&tl=he&total=1&idx=0&textlen=${textLen}&client=tw-ob&prev=input&ttsspeed=1`
    const url = isDev
      ? `/api/tts?${params}`
      : `https://translate.google.com/translate_tts?${params}`

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.blob()
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        const audio = new Audio(blobUrl)
        audioRef.current = audio

        audio.onplay = () => setSpeaking(true)
        audio.onended = () => {
          setSpeaking(false)
          URL.revokeObjectURL(blobUrl)
          audioRef.current = null
        }
        audio.onerror = () => {
          setSpeaking(false)
          URL.revokeObjectURL(blobUrl)
          audioRef.current = null
        }

        return audio.play()
      })
      .catch(err => {
        console.warn('TTS failed:', err)
        setSpeaking(false)
      })
  }, [])

  const speak = useCallback((text: string, rate = 0.8) => {
    if (ttsMode === 'native') {
      speakNative(text, rate)
    } else {
      speakGoogle(text, rate)
    }
  }, [ttsMode, speakNative, speakGoogle])

  const stop = useCallback(() => {
    speechSynthesis.cancel()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setSpeaking(false)
  }, [])

  return { speak, stop, speaking, available: ttsMode !== 'none', voiceInfo: ttsMode }
}
