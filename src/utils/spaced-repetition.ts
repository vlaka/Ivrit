import type { Word } from '../data/words'

interface WordProgress {
  correct: number
  incorrect: number
  lastSeen: number
}

export function sortByPriority(
  words: Word[],
  progress: Record<number, WordProgress>,
): Word[] {
  const now = Date.now()

  return [...words].sort((a, b) => {
    const pa = progress[a.id]
    const pb = progress[b.id]

    const scoreA = getScore(pa, now)
    const scoreB = getScore(pb, now)

    return scoreB - scoreA
  })
}

function getScore(p: WordProgress | undefined, now: number): number {
  if (!p) return 100

  const timeSinceLastSeen = now - p.lastSeen
  const hoursSince = timeSinceLastSeen / (1000 * 60 * 60)

  if (p.correct === 0 && p.incorrect === 0) return 100

  if (p.incorrect > p.correct) return 80 + Math.min(hoursSince, 20)

  if (p.correct >= 3 && p.correct > p.incorrect) return Math.min(hoursSince * 2, 40)

  return 50 + Math.min(hoursSince * 3, 30)
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
