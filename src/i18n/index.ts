import { ru } from './ru'
import { he } from './he'

export type Lang = 'ru' | 'he'

export interface Translations {
  appTitle: string
  home: { title: string; subtitle: string; startListening: string; startSpeaking: string; selectLevel: string; settings: string; stats: string; quest: string }
  card: { listen: string; know: string; learning: string; next: string; tryAgain: string; listenCorrect: string; speak: string; listening: string; correct: string; tryMore: string; micUnavailable: string }
  levels: { title: string; level: string; words: string; withNikud: string; withoutNikud: string; level1desc: string; level2desc: string; level3desc: string; level4desc: string; level5desc: string }
  settings: { title: string; language: string; speechRate: string; slow: string; normal: string; resetProgress: string; resetConfirm: string; clearCache: string; back: string }
  stats: { title: string; totalWords: string; learned: string; inProgress: string; notStarted: string; problemWords: string; back: string; activity: string; period: string; today: string; thisMonth: string; thisYear: string; listenSessions: string; speakSessions: string; correctAnswers: string; totalAnswers: string; sessions: string }
  quest: { title: string; questName: string; questNamePlaceholder: string; level: string; wordCount: string; mode: string; modeListen: string; modeSpeak: string; start: string; completed: string; score: string; time: string; minutes: string; seconds: string; backHome: string }
  done: { title: string; subtitle: string; restart: string; backToLevels: string }
}

const translations: Record<Lang, Translations> = { ru, he }

export function t(lang: Lang): Translations {
  return translations[lang]
}
