# Конспекты.ру

Некоммерческий учебный сайт с лекциями. Чистые HTML/CSS/JS, без сборщиков и зависимостей (React не нужен: интерактив — небольшие vanilla-компоненты).

## Запуск на локалке
Нужны `bash` (Linux/macOS/Git Bash/WSL) и Python 3.
```bash
bash scripts/build.sh                    # собирает dist/
python3 -m http.server 8000 -d dist      # http://localhost:8000/main/
```
После правок повторите обе команды (или только первую и обновите страницу).
> Открывать файлы из `src/` двойным кликом не нужно: пути вида `/style/...` работают только через сервер.

## Деплой
Push в ветку `main` → GitHub Actions (`.github/workflows/deploy.yml`) собирает `dist/` и публикует на GitHub Pages.
Один раз: *Settings → Pages → Source: GitHub Actions*.

Маршруты: `/main`, `/structeres`, `/structeres/lecture1`, `/algorithms`, `/oop`, `/labs`.
Остальное: [STRUCTURE.md](STRUCTURE.md), правила для ИИ — [AI_GUIDE.md](AI_GUIDE.md).
