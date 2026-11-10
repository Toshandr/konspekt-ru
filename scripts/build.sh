#!/usr/bin/env bash
# Собирает статический сайт в dist/ по routes.txt.
# BASE_PATH="/имя-репозитория" — для GitHub Pages проекта; без него — для локального запуска/своего домена.
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="${BASE_PATH:-}"
rm -rf dist && mkdir dist && cp -r style components dist/
while IFS='|' read -r route src course title; do
  [[ -z "$route" || "$route" == \#* ]] && continue
  if [[ "$route" == "/" ]]; then out=dist/index.html
  elif [[ "$route" == *.html ]]; then out="dist$route"
  else out="dist$route/index.html"; fi
  mkdir -p "$(dirname "$out")"
  sed -e "s|{{COURSE}}|$course|g" -e "s|{{TITLE}}|$title|g" "src/$src" > "$out"
done < routes.txt
if [[ -n "$BASE" ]]; then
  find dist -name '*.html' -exec sed -i -E "s#(href|src)=\"/#\1=\"$BASE/#g" {} +
  sed -i "s#base: ''#base: '$BASE'#" dist/components/courses.js
fi
echo "Готово: dist/ (base='${BASE}')"
