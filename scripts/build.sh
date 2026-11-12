#!/usr/bin/env bash
# Совместимая обёртка для старых команд. Основная сборка выполняется Node.js.
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.js
