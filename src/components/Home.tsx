import type { Translations } from '../i18n'
import './Home.css'

interface HomeProps {
  t: Translations
  micAvailable: boolean
  onStartListening: () => void
  onStartSpeaking: () => void
  onSettings: () => void
  onStats: () => void
}

export function Home({ t, micAvailable, onStartListening, onStartSpeaking, onSettings, onStats }: HomeProps) {
  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__title">{t.home.title}</h1>
        <p className="home__subtitle">{t.home.subtitle}</p>
      </div>

      <div className="home__modes">
        <button className="home__mode home__mode--listen" onClick={onStartListening}>
          <span className="home__mode-icon">👀🔊</span>
          <span className="home__mode-text">{t.home.startListening}</span>
        </button>

        {micAvailable && (
          <button className="home__mode home__mode--speak" onClick={onStartSpeaking}>
            <span className="home__mode-icon">🎤</span>
            <span className="home__mode-text">{t.home.startSpeaking}</span>
          </button>
        )}
      </div>

      <div className="home__nav">
        <button className="home__nav-btn" onClick={onSettings}>
          ⚙️ {t.home.settings}
        </button>
        <button className="home__nav-btn" onClick={onStats}>
          📊 {t.home.stats}
        </button>
      </div>
    </div>
  )
}
