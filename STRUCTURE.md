# Структура проекта
```
konspekt-ru/
├── .github/workflows/deploy.yml   # сборка и публикация на GitHub Pages
├── scripts/build.sh               # src/ + routes.txt -> dist/
├── routes.txt                     # маршрут | файл в src/ | id курса | заголовок
├── style/assets/
│   ├── main.css                   # база, шапка, подвал, главная
│   ├── lectures.css               # сайдбар, страница курса (превью лекций)
│   ├── text_lectures.css          # типографика текста лекции
│   └── favicon.svg                # иконка сайта
├── components/
│   ├── courses.js                 # ДАННЫЕ: курсы, преподаватели, лекции
│   ├── layout.js                  # шапка, сайдбар, страница курса, пагинация, копирование кода
│   └── list-demo.js               # интерактивная схема списка
└── src/
    ├── index.html                 # редирект на /main
    ├── main.html                  # /main
    ├── course.html                # шаблон страницы курса (рендерится из courses.js)
    ├── stub.html                  # шаблон «страница в разработке»
    └── lectures/
        ├── OOP/lecture.html       # /oop/lecture1
        └── STRUCTERES/lecture1.html  # /structeres/lecture1
```
