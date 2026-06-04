# Ivrit - קוראים עברית

Приложение с флеш-карточками для изучения чтения слов на иврите. Разработано для детей 2-го класса.

## Возможности

- **Два режима**: «Смотрю и слушаю» (TTS) и «Читаю вслух» (распознавание речи)
- **5 уровней сложности**: 3 с никудом (огласовками), 2 без
- **120 слов** по темам: семья, числа, цвета, животные, еда, школа, тело, одежда, действия
- **Озвучивание** слов через Web Speech API
- **Прогресс** сохраняется в localStorage, сложные слова повторяются чаще
- **Интерфейс** на русском и иврите
- **PWA** — можно установить на Android из Chrome
- **Адаптивный дизайн** — телефон, планшет, телевизор

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:5173/Ivrit/

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Автоматический деплой на GitHub Pages при пуше в `main` через GitHub Actions.

Результат: `https://vlaka.github.io/Ivrit/`

## Требования к TTS

- **Android**: работает из коробки (Google-голоса встроены в Chrome)
- **Windows**: нужно установить Hebrew language pack:
  Settings → Time & Language → Language & Region → Add language → עברית (Hebrew) → включить Text-to-speech

## Технологии

- React 19 + TypeScript
- Vite 8
- vite-plugin-pwa
- Web Speech API (TTS + Speech Recognition)
