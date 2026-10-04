#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
command -v node >/dev/null
command -v npm >/dev/null
command -v cargo >/dev/null
if [ ! -d node_modules ]; then npm install --include=dev; fi
npm run desktop


