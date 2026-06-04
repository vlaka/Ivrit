import type { Lang, Translations } from '../i18n'
import { useProgress } from '../hooks/useProgress'
import './Settings.css'

interface SettingsProps {
  t: Translations
  lang: Lang
  speechRate: number
  onChangeLang: (lang: Lang) => void
  onChangeSpeechRate: (rate: number) => void
  onBack: () => void
}

export function Settings({ t, lang, speechRate, onChangeLang, onChangeSpeechRate, onBack }: SettingsProps) {
  const { resetProgress } = useProgress()

  const handleReset = () => {
    if (window.confirm(t.settings.resetConfirm)) {
      resetProgress()
    }
  }

  return (
    <div className="settings">
      <div className="settings__header">
        <button className="settings__back" onClick={onBack}>←</button>
        <h2 className="settings__title">{t.settings.title}</h2>
      </div>

      <div className="settings__section">
        <label className="settings__label">{t.settings.language}</label>
        <div className="settings__toggle">
          <button
            className={`settings__toggle-btn ${lang === 'ru' ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => onChangeLang('ru')}
          >
            Русский
          </button>
          <button
            className={`settings__toggle-btn ${lang === 'he' ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => onChangeLang('he')}
          >
            עברית
          </button>
        </div>
      </div>

      <div className="settings__section">
        <label className="settings__label">{t.settings.speechRate}</label>
        <div className="settings__toggle">
          <button
            className={`settings__toggle-btn ${speechRate === 0.6 ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => onChangeSpeechRate(0.6)}
          >
            {t.settings.slow}
          </button>
          <button
            className={`settings__toggle-btn ${speechRate === 0.85 ? 'settings__toggle-btn--active' : ''}`}
            onClick={() => onChangeSpeechRate(0.85)}
          >
            {t.settings.normal}
          </button>
        </div>
      </div>

      <div className="settings__section">
        <button className="settings__reset" onClick={handleReset}>
          {t.settings.resetProgress}
        </button>
      </div>
    </div>
  )
}
