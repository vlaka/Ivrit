import { useCallback, useState } from 'react'

interface WordProgress {
  correct: number
  incorrect: number
  lastSeen: number
}

type ProgressMap = Record<number, WordProgress>

const STORAGE_KEY = 'ivrit-progress'

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress)

  const markCorrect = useCallback((wordId: number) => {
    setProgress(prev => {
      const entry = prev[wordId] || { correct: 0, incorrect: 0, lastSeen: 0 }
      const next = {
        ...prev,
        [wordId]: {
          correct: entry.correct + 1,
          incorrect: entry.incorrect,
          lastSeen: Date.now(),
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const markIncorrect = useCallback((wordId: number) => {
    setProgress(prev => {
      const entry = prev[wordId] || { correct: 0, incorrect: 0, lastSeen: 0 }
      const next = {
        ...prev,
        [wordId]: {
          correct: entry.correct,
          incorrect: entry.incorrect + 1,
          lastSeen: Date.now(),
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const getWordProgress = useCallback(
    (wordId: number): WordProgress => {
      return progress[wordId] || { correct: 0, incorrect: 0, lastSeen: 0 }
    },
    [progress],
  )

  const isLearned = useCallback(
    (wordId: number): boolean => {
      const p = progress[wordId]
      return p != null && p.correct >= 3 && p.correct > p.incorrect
    },
    [progress],
  )

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

  return { progress, markCorrect, markIncorrect, getWordProgress, isLearned, resetProgress }
}
