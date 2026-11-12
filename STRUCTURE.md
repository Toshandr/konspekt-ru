# Структура проекта
```
konspekt-ru/
├── .github/workflows/deploy.yml   # сборка Node.js и публикация на GitHub Pages
├── package.json                   # команды npm и требования к Node.js
├── server.js                      # локальный статический сервер Node.js
├── scripts/build.js               # src/ + routes.txt -> dist/ (Node.js)
├── scripts/build.sh               # совместимая обёртка для старых команд
├── routes.txt                     # маршрут | файл в src/ | id курса | заголовок
├── style/assets/
│   ├── main.css                   # база, шапка, мобильное меню, главная
│   ├── lectures.css               # сайдбар, страница курса и адаптивная раскладка
│   ├── text_lectures.css          # типографика текста лекции
│   └── favicon.svg                # иконка сайта
├── components/
│   ├── courses.js                 # ДАННЫЕ: курсы, преподаватели, лекции
│   ├── layout.js                  # шапка, меню, сайдбар, курс, пагинация, копирование
│   └── list-demo.js               # интерактивная схема списка
└── src/
    ├── index.html                 # редирект на /main
    ├── main.html                  # /main
    ├── course.html                # шаблон страницы курса
    ├── stub.html                  # шаблон «страница в разработке»
    └── lectures/                  # исходники лекций
```

## Локальный запуск

- `npm start` — сборка и запуск Node.js-сервера на `http://localhost:3000`.
- `npm run build` — только сборка в `dist/`.
- `npm run serve` — запуск сервера для уже собранной папки `dist/`.

Курсы и лекции по-прежнему описываются в `components/courses.js`; маршруты — в `routes.txt`.
