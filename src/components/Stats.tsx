import { words } from '../data/words'
import { useProgress } from '../hooks/useProgress'
import type { PeriodStats } from '../hooks/useActivityLog'
import type { Translations } from '../i18n'
import './Stats.css'

interface StatsProps {
  t: Translations
  onBack: () => void
  today: PeriodStats
  month: PeriodStats
  year: PeriodStats
}

export function Stats({ t, onBack, today, month, year }: StatsProps) {
  const { progress, isLearned } = useProgress()

  const total = words.length
  const learned = words.filter(w => isLearned(w.id)).length
  const inProg = words.filter(w => {
    const p = progress[w.id]
    return p && (p.correct > 0 || p.incorrect > 0) && !isLearned(w.id)
  }).length
  const notStarted = total - learned - inProg

  const problemWords = words
    .filter(w => {
      const p = progress[w.id]
      return p && p.incorrect > p.correct && p.incorrect >= 2
    })
    .sort((a, b) => {
      const pa = progress[a.id]
      const pb = progress[b.id]
      return (pb?.incorrect || 0) - (pa?.incorrect || 0)
    })
    .slice(0, 10)

  const periods = [
    { label: t.stats.today, data: today },
    { label: t.stats.thisMonth, data: month },
    { label: t.stats.thisYear, data: year },
  ]

  return (
    <div className="stats">
      <div className="stats__header">
        <button className="stats__back" onClick={onBack}>←</button>
        <h2 className="stats__title">{t.stats.title}</h2>
      </div>

      <div className="stats__summary">
        <div className="stats__stat">
          <span className="stats__stat-value">{total}</span>
          <span className="stats__stat-label">{t.stats.totalWords}</span>
        </div>
        <div className="stats__stat stats__stat--learned">
          <span className="stats__stat-value">{learned}</span>
          <span className="stats__stat-label">{t.stats.learned}</span>
        </div>
        <div className="stats__stat stats__stat--progress">
          <span className="stats__stat-value">{inProg}</span>
          <span className="stats__stat-label">{t.stats.inProgress}</span>
        </div>
        <div className="stats__stat">
          <span className="stats__stat-value">{notStarted}</span>
          <span className="stats__stat-label">{t.stats.notStarted}</span>
        </div>
      </div>

      <div className="stats__activity">
        <h3 className="stats__activity-title">{t.stats.activity}</h3>
        <div className="stats__table-wrap">
          <table className="stats__table">
            <thead>
              <tr>
                <th>{t.stats.period}</th>
                <th>{t.stats.listenSessions}</th>
                <th>{t.stats.speakSessions}</th>
                <th>{t.stats.correctAnswers}</th>
                <th>{t.stats.totalAnswers}</th>
              </tr>
            </thead>
            <tbody>
              {periods.map(p => (
                <tr key={p.label}>
                  <td className="stats__table-period">{p.label}</td>
                  <td>{p.data.listenSessions}</td>
                  <td>{p.data.speakSessions}</td>
                  <td className="stats__table-correct">{p.data.correctWords}</td>
                  <td>{p.data.totalWords}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {problemWords.length > 0 && (
        <div className="stats__problems">
          <h3 className="stats__problems-title">{t.stats.problemWords}</h3>
          <div className="stats__problem-list">
            {problemWords.map(w => (
              <div key={w.id} className="stats__problem-word">
                <span className="stats__problem-hebrew">{w.hebrewNikud}</span>
                <span className="stats__problem-trans">{w.transliteration}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
