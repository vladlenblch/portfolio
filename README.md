actual version: [https://vladlenblch.ru/](https://vladlenblch.ru/)

# Portfolio website

## Установка и запуск локально

```bash
# клонировать репозиторий
git clone https://github.com/vladlenblch/portfolio
cd portfolio

# сборка и запуск
npm install
npm run dev

# приложение откроется по адресу http://localhost:5173
```

## О проекте

В репозитории хранится исходный код веб-сайта. <br>
Актуальная версия: [https://vladlenblch.ru/](https://vladlenblch.ru/) <br>
(Введите `cat` в любом месте веб-сайта ^_^)

## Технологический стек и требования

- `Node.js 20+`
- `npm 10+`
- `React 19`
- `TypeScript 5`
- `Vite 8`

## Структура проекта

- `.github/workflows/deploy-pages.yml` – автодеплой на GitHub Pages
- `src/components/` – компоненты страницы
- `src/data/` – содержание сайта
- `src/App.tsx` – сборка страницы из компонентов
- `src/main.tsx` – точка входа React-приложения
- `src/portfolio.css` – глобальные стили
- `public/` – статические файлы
