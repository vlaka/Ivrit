import { useState } from 'react'
import type { Word } from '../data/words'
import type { Translations } from '../i18n'
import './Card.css'

interface CardProps {
  word: Word
  showNikud: boolean
  mode: 'listen' | 'speak'
  t: Translations
  onCorrect: () => void
  onIncorrect: () => void
  onSpeak: (text: string) => void
  onListen: (expected: string) => Promise<boolean>
  speechStatus: 'idle' | 'listening' | 'processing'
  speechAvailable: boolean
  ttsAvailable: boolean
  speechResult: string | null
  interimText: string | null
}

export function Card({
  word,
  showNikud,
  mode,
  t,
  onCorrect,
  onIncorrect,
  onSpeak,
  onListen,
  speechStatus,
  speechAvailable,
  ttsAvailable,
  speechResult,
  interimText,
}: CardProps) {
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)

  const displayWord = showNikud ? word.hebrewNikud : word.hebrew

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true)
      if (ttsAvailable) onSpeak(word.hebrew)
    }
  }

  const handleListen = () => {
    if (ttsAvailable) onSpeak(word.hebrew)
  }

  const handleMicClick = async () => {
    if (!speechAvailable || speechStatus !== 'idle') return
    const correct = await onListen(word.hebrew)
    if (correct) {
      setFeedback('correct')
      setTimeout(() => {
        setFeedback(null)
        onCorrect()
      }, 1200)
    } else {
      setFeedback('incorrect')
    }
  }

  const handleKnow = () => {
    setRevealed(false)
    setFeedback(null)
    onCorrect()
  }

  const handleLearning = () => {
    setRevealed(false)
    setFeedback(null)
    onIncorrect()
  }

  const feedbackClass = feedback === 'correct'
    ? 'card--correct'
    : feedback === 'incorrect'
      ? 'card--tryagain'
      : ''

  return (
    <div className={`card ${feedbackClass}`}>
      <div className="card__word-container" onClick={mode === 'listen' ? handleReveal : undefined}>
        <span className="card__word">{displayWord}</span>
        {revealed && mode === 'listen' && (
          <span className="card__transliteration">{word.transliteration}</span>
        )}
      </div>

      {mode === 'listen' && (
        <div className="card__actions">
          {!revealed ? (
            <button className="card__btn card__btn--listen" onClick={handleReveal}>
              🔊 {t.card.listen}
            </button>
          ) : (
            <>
              <button className="card__btn card__btn--listen" onClick={handleListen}>
                🔊
              </button>
              <button className="card__btn card__btn--know" onClick={handleKnow}>
                {t.card.know}
              </button>
              <button className="card__btn card__btn--learning" onClick={handleLearning}>
                {t.card.learning}
              </button>
            </>
          )}
        </div>
      )}

      {mode === 'speak' && (
        <div className="card__actions">
          {feedback === null && (
            <>
              <button
                className={`card__btn card__btn--mic ${speechStatus === 'listening' ? 'card__btn--mic-active' : ''}`}
                onClick={handleMicClick}
                disabled={speechStatus !== 'idle'}
              >
                🎤 {speechStatus === 'listening' ? t.card.listening : t.card.speak}
              </button>
              {speechStatus === 'listening' && interimText && (
                <div className="card__interim">{interimText}</div>
              )}
            </>
          )}

          {feedback === 'correct' && (
            <div className="card__feedback card__feedback--correct">
              ✨ {t.card.correct}
            </div>
          )}

          {feedback === 'incorrect' && (
            <>
              <div className="card__feedback card__feedback--tryagain">
                {t.card.tryMore}
                {speechResult && (
                  <span className="card__heard"> ({speechResult})</span>
                )}
              </div>
              <div className="card__actions-row">
                <button className="card__btn card__btn--listen" onClick={handleListen}>
                  🔊 {t.card.listenCorrect}
                </button>
                <button className="card__btn card__btn--mic" onClick={() => { setFeedback(null); handleMicClick() }}>
                  🎤 {t.card.tryAgain}
                </button>
                <button className="card__btn card__btn--learning" onClick={handleLearning}>
                  {t.card.next}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
