import { useState, useEffect } from 'react'
import { Home } from './components/Home'
import { LevelSelector } from './components/LevelSelector'
import { CardDeck } from './components/CardDeck'
import { Settings } from './components/Settings'
import { Stats } from './components/Stats'
import { t as getT } from './i18n'
import type { Lang } from './i18n'
import './App.css'

type Screen = 'home' | 'levels' | 'deck' | 'settings' | 'stats'

const LANG_KEY = 'ivrit-lang'
const RATE_KEY = 'ivrit-rate'

function loadLang(): Lang {
  const saved = localStorage.getItem(LANG_KEY)
  return saved === 'he' || saved === 'ru' ? saved : 'ru'
}

function loadRate(): number {
  const saved = localStorage.getItem(RATE_KEY)
  return saved ? parseFloat(saved) : 0.8
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [lang, setLang] = useState<Lang>(loadLang)
  const [speechRate, setSpeechRate] = useState(loadRate)
  const [mode, setMode] = useState<'listen' | 'speak'>('listen')
  const [level, setLevel] = useState(1)
  const [micAvailable, setMicAvailable] = useState(false)

  const translations = getT(lang)

  useEffect(() => {
    const hasAPI = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    setMicAvailable(hasAPI)
  }, [])

  const changeLang = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem(LANG_KEY, newLang)
  }

  const changeRate = (rate: number) => {
    setSpeechRate(rate)
    localStorage.setItem(RATE_KEY, String(rate))
  }

  const startMode = (m: 'listen' | 'speak') => {
    setMode(m)
    setScreen('levels')
  }

  const selectLevel = (lvl: number) => {
    setLevel(lvl)
    setScreen('deck')
  }

  const dir = lang === 'he' ? 'rtl' : 'ltr'

  return (
    <div className="app" dir={dir} data-lang={lang}>
      {screen === 'home' && (
        <Home
          t={translations}
          micAvailable={micAvailable}
          onStartListening={() => startMode('listen')}
          onStartSpeaking={() => startMode('speak')}
          onSettings={() => setScreen('settings')}
          onStats={() => setScreen('stats')}
        />
      )}

      {screen === 'levels' && (
        <LevelSelector
          t={translations}
          onSelect={selectLevel}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'deck' && (
        <CardDeck
          key={`${level}-${mode}`}
          level={level}
          mode={mode}
          t={translations}
          onBack={() => setScreen('levels')}
        />
      )}

      {screen === 'settings' && (
        <Settings
          t={translations}
          lang={lang}
          speechRate={speechRate}
          onChangeLang={changeLang}
          onChangeSpeechRate={changeRate}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'stats' && (
        <Stats
          t={translations}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}

export default App
