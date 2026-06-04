import { useCallback, useRef, useState } from 'react'
import { words } from '../data/words'

const BASE = import.meta.env.BASE_URL

const wordToId: Record<string, number> = {}
for (const w of words) {
  wordToId[w.hebrew] = w.id
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speakFile = useCallback((wordId: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(`${BASE}audio/${wordId}.mp3`)
    audioRef.current = audio

    audio.onplay = () => setSpeaking(true)
    audio.onended = () => {
      setSpeaking(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      setSpeaking(false)
      audioRef.current = null
    }

    audio.play().catch(() => setSpeaking(false))
  }, [])

  const speak = useCallback((text: string, _rate = 0.8) => {
    const id = wordToId[text]
    if (id) {
      speakFile(id)
    }
  }, [speakFile])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setSpeaking(false)
  }, [])

  return { speak, stop, speaking, available: true, voiceInfo: 'file' as const }
}
