import { getWordsForLevel } from '../data/words'
import { useProgress } from '../hooks/useProgress'
import type { Translations } from '../i18n'
import './LevelSelector.css'

interface LevelSelectorProps {
  t: Translations
  onSelect: (level: number) => void
  onBack: () => void
}

const levelConfig = [
  { level: 1, nikud: true },
  { level: 2, nikud: true },
  { level: 3, nikud: true },
  { level: 4, nikud: false },
  { level: 5, nikud: false },
]

export function LevelSelector({ t, onSelect, onBack }: LevelSelectorProps) {
  const { isLearned } = useProgress()

  return (
    <div className="levels">
      <div className="levels__header">
        <button className="levels__back" onClick={onBack}>←</button>
        <h2 className="levels__title">{t.levels.title}</h2>
      </div>

      <div className="levels__grid">
        {levelConfig.map(({ level, nikud }) => {
          const words = getWordsForLevel(level)
          const learnedCount = words.filter(w => isLearned(w.id)).length
          const progress = words.length > 0 ? (learnedCount / words.length) * 100 : 0

          const descriptions: Record<number, string> = {
            1: t.levels.level1desc,
            2: t.levels.level2desc,
            3: t.levels.level3desc,
            4: t.levels.level4desc,
            5: t.levels.level5desc,
          }

          return (
            <button
              key={level}
              className="levels__card"
              onClick={() => onSelect(level)}
            >
              <div className="levels__card-number">{level}</div>
              <div className="levels__card-info">
                <h3 className="levels__card-title">
                  {t.levels.level} {level}
                </h3>
                <p className="levels__card-desc">{descriptions[level]}</p>
                <span className={`levels__card-badge ${nikud ? 'levels__card-badge--nikud' : 'levels__card-badge--no-nikud'}`}>
                  {nikud ? t.levels.withNikud : t.levels.withoutNikud}
                </span>
                <div className="levels__card-words">{words.length} {t.levels.words}</div>
              </div>
              <div className="levels__card-progress">
                <div className="levels__card-progress-ring">
                  <svg viewBox="0 0 36 36">
                    <path
                      className="levels__ring-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="levels__ring-fill"
                      strokeDasharray={`${progress}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="levels__ring-text">{Math.round(progress)}%</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
