import { useMemo, useState } from 'react'
import { Card } from './Card'
import { getWordsForLevel, isNikudLevel } from '../data/words'
import { sortByPriority, shuffleArray } from '../utils/spaced-repetition'
import { useSpeech } from '../hooks/useSpeech'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { useProgress } from '../hooks/useProgress'
import type { Translations } from '../i18n'
import './CardDeck.css'

interface CardDeckProps {
  level: number
  mode: 'listen' | 'speak'
  t: Translations
  onBack: () => void
  onLogAnswer: (correct: boolean) => void
}

export function CardDeck({ level, mode, t, onBack, onLogAnswer }: CardDeckProps) {
  const showNikud = isNikudLevel(level)
  const { speak, available: ttsAvailable, voiceInfo } = useSpeech()
  const { listen, status: speechStatus, available: speechAvailable, result: speechResult, interimText } = useSpeechRecognition()
  const { progress, markCorrect, markIncorrect } = useProgress()

  const deck = useMemo(() => {
    const levelWords = getWordsForLevel(level)
    const sorted = sortByPriority(levelWords, progress)
    return shuffleArray(sorted.slice(0, Math.min(sorted.length, 20)))
  // Only recompute on level change, not on every progress update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const handleCorrect = () => {
    markCorrect(deck[currentIndex].id)
    onLogAnswer(true)
    setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }))
    advance()
  }

  const handleIncorrect = () => {
    markIncorrect(deck[currentIndex].id)
    onLogAnswer(false)
    setScore(s => ({ ...s, total: s.total + 1 }))
    advance()
  }

  const advance = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setCompleted(true)
    }
  }

  const restart = () => {
    setCurrentIndex(0)
    setCompleted(false)
    setScore({ correct: 0, total: 0 })
  }

  if (completed) {
    return (
      <div className="deck-done">
        <div className="deck-done__emoji">🎉</div>
        <h2 className="deck-done__title">{t.done.title}</h2>
        <p className="deck-done__subtitle">{t.done.subtitle}</p>
        <p className="deck-done__score">{score.correct} / {score.total}</p>
        <div className="deck-done__actions">
          <button className="deck-done__btn deck-done__btn--restart" onClick={restart}>
            {t.done.restart}
          </button>
          <button className="deck-done__btn deck-done__btn--back" onClick={onBack}>
            {t.done.backToLevels}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="deck">
      <div className="deck__header">
        <button className="deck__back" onClick={onBack}>←</button>
        <div className="deck__progress">
          <div className="deck__progress-bar">
            <div
              className="deck__progress-fill"
              style={{ width: `${((currentIndex) / deck.length) * 100}%` }}
            />
          </div>
          <span className="deck__progress-text">{currentIndex + 1} / {deck.length}</span>
        </div>
      </div>

      {voiceInfo && (
        <div style={{ fontSize: '0.7rem', color: '#aaa', textAlign: 'center' }}>
          TTS: {voiceInfo}
        </div>
      )}

      <Card
        key={deck[currentIndex].id}
        word={deck[currentIndex]}
        showNikud={showNikud}
        mode={mode}
        t={t}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
        onSpeak={speak}
        onListen={listen}
        speechStatus={speechStatus}
        speechAvailable={speechAvailable}
        ttsAvailable={ttsAvailable}
        speechResult={speechResult}
        interimText={interimText}
      />
    </div>
  )
}
