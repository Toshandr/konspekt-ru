# Руководство для ИИ-ассистентов

Сайт статический: HTML + CSS + JS, сборка — `scripts/build.sh` (sed-подстановка по `routes.txt`). Фреймворков нет, `npm` не нужен.

## Правила
- Пути к ресурсам и ссылки в HTML — **абсолютные от корня**: `/style/assets/main.css`, `/main`. Сборка сама добавит префикс для GitHub Pages. В JS ссылки собирать через `u(path)` (см. `layout.js`).
- Шапку, сайдбар, пагинацию и подвал **не писать руками** — их строит `components/layout.js`. На странице нужен только `<body data-course="id" data-sidebar>`, `<div class="wrap layout"><div class="content">…</div></div>` и подключение `courses.js` → (демо) → `layout.js`.
- Данные курсов, преподавателей и лекций — только в `components/courses.js`.
- Недоделанная страница = строка в `routes.txt` с `stub.html` (заголовок подставится из `{{TITLE}}`).
- Тексты лекций: `<article class="lecture">`, один `h1`, разделы — `h2` (попадают в сайдбар), `h3` для подразделов. Блоки: `.lead`, `.note`, `.table-wrap > table`, `<pre><code>`, `.demo`.
- Стили: цвета только через переменные из `main.css` (есть тёмная тема). Без внешних CDN и шрифтов.

## Добавить лекцию
1. Скопировать `src/lectures/STRUCTERES/lecture1.html` в `src/lectures/<КУРС>/lectureN.html`, заменить `<title>`, `data-course`, содержимое.
2. Добавить объект в `lectures` нужного курса в `courses.js` (`ready: true`, когда текст готов).
3. Заменить stub-строку в `routes.txt` на `/<курс>/lectureN|lectures/<КУРС>/lectureN.html|<id>|Заголовок`.

## Добавить курс
Объект в `courses.js` (кнопка в шапке появится сама) + строка `/<id>|course.html|<id>|Название` в `routes.txt`.

## Интерактив
Новый компонент — файл в `components/`, подключать на странице перед `layout.js`. Использовать `data-demo="имя"` по образцу `list-demo.js`.

## Проверка
`bash scripts/build.sh && python3 -m http.server 8000 -d dist`; проверить `/main/`, `/structeres/`, `/structeres/lecture1/`.
