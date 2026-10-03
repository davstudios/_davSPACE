@echo off
setlocal
cd /d "%~dp0"
if not exist "node_modules\@tauri-apps\cli\tauri.js" call npm install --include=dev
if errorlevel 1 exit /b 1
call npm run bundle
pause

