import { useMemo, useState, useRef } from 'react'
import { Card } from './Card'
import { getWordsForLevel, isNikudLevel } from '../data/words'
import { shuffleArray } from '../utils/spaced-repetition'
import { useSpeech } from '../hooks/useSpeech'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { useProgress } from '../hooks/useProgress'
import type { QuestConfig } from './QuestSetup'
import type { Translations } from '../i18n'
import './QuestDeck.css'

interface QuestDeckProps {
  config: QuestConfig
  t: Translations
  debug: boolean
  onBack: () => void
  onLogAnswer: (correct: boolean) => void
}

export function QuestDeck({ config, t, debug, onBack, onLogAnswer }: QuestDeckProps) {
  const showNikud = isNikudLevel(config.level)
  const { speak, available: ttsAvailable, voiceInfo } = useSpeech()
  const { listen, status: speechStatus, available: speechAvailable, result: speechResult, interimText, debugLog } = useSpeechRecognition()
  const { markCorrect, markIncorrect } = useProgress()
  const startTimeRef = useRef(Date.now())

  const deck = useMemo(() => {
    const levelWords = getWordsForLevel(config.level)
    const shuffled = shuffleArray([...levelWords])
    if (config.wordCount <= shuffled.length) {
      return shuffled.slice(0, config.wordCount)
    }
    const result = []
    while (result.length < config.wordCount) {
      result.push(...shuffleArray([...levelWords]))
    }
    return result.slice(0, config.wordCount)
  }, [config.level, config.wordCount])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [elapsedMs, setElapsedMs] = useState(0)

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
      setElapsedMs(Date.now() - startTimeRef.current)
      setCompleted(true)
    }
  }

  if (completed) {
    const totalSec = Math.floor(elapsedMs / 1000)
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    const pct = deck.length > 0 ? Math.round((score.correct / deck.length) * 100) : 0

    return (
      <div className="quest-result">
        <div className="quest-result__stars">
          {pct >= 90 ? '🌟🌟🌟' : pct >= 70 ? '🌟🌟' : pct >= 50 ? '🌟' : '💪'}
        </div>
        <h1 className="quest-result__title">{t.quest.completed}</h1>
        <div className="quest-result__name">{config.name}</div>

        <div className="quest-result__stats">
          <div className="quest-result__stat">
            <span className="quest-result__stat-value">{score.correct} / {deck.length}</span>
            <span className="quest-result__stat-label">{t.quest.score}</span>
          </div>
          <div className="quest-result__stat">
            <span className="quest-result__stat-value">
              {mins > 0 ? `${mins} ${t.quest.minutes} ` : ''}{secs} {t.quest.seconds}
            </span>
            <span className="quest-result__stat-label">{t.quest.time}</span>
          </div>
        </div>

        <div className="quest-result__bar">
          <div className="quest-result__bar-fill" style={{ width: `${pct}%` }} />
          <span className="quest-result__bar-text">{pct}%</span>
        </div>

        <button className="quest-result__btn" onClick={onBack}>
          {t.quest.backHome}
        </button>
      </div>
    )
  }

  return (
    <div className="deck">
      <div className="deck__header">
        <button className="deck__back" onClick={onBack}>←</button>
        <div className="deck__quest-name">{config.name}</div>
        <div className="deck__progress">
          <div className="deck__progress-bar">
            <div
              className="deck__progress-fill"
              style={{ width: `${(currentIndex / deck.length) * 100}%` }}
            />
          </div>
          <span className="deck__progress-text">{currentIndex + 1} / {deck.length}</span>
        </div>
      </div>

      {debug && voiceInfo && (
        <div style={{ fontSize: '0.7rem', color: '#aaa', textAlign: 'center' }}>
          TTS: {voiceInfo}
        </div>
      )}

      {debug && debugLog.length > 0 && (
        <div style={{
          fontSize: '0.65rem',
          fontFamily: 'monospace',
          background: 'rgba(0,0,0,0.85)',
          color: '#0f0',
          padding: '0.5rem',
          borderRadius: '8px',
          maxHeight: '150px',
          overflow: 'auto',
          margin: '0 0 0.5rem 0',
          direction: 'ltr',
          textAlign: 'left',
        }}>
          {debugLog.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}

      <Card
        key={deck[currentIndex].id}
        word={deck[currentIndex]}
        showNikud={showNikud}
        mode={config.mode}
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
