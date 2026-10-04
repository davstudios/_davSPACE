@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
title _davSPACE v26.10.4

echo ========================================
echo   _davSPACE v26.10.4
echo ========================================
echo.

where node >nul 2>nul || (
  echo [ERRORE] Node.js non trovato.
  echo Installa Node.js LTS, poi riapri RUN-WINDOWS.bat.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul || (
  echo [ERRORE] npm non trovato.
  echo Reinstalla Node.js LTS assicurandoti che npm sia incluso.
  echo.
  pause
  exit /b 1
)

where cargo >nul 2>nul || (
  echo [ERRORE] Rust/Cargo non trovato.
  echo Installa Rust con rustup e i Microsoft C++ Build Tools richiesti da Tauri.
  echo Poi chiudi e riapri il terminale o Esplora file prima di riprovare.
  echo.
  pause
  exit /b 1
)

echo [1/2] Verifica dipendenze npm...
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo [ERRORE] Installazione delle dipendenze npm non riuscita.
  echo Controlla il messaggio sopra: la finestra restera aperta.
  echo.
  pause
  exit /b 1
)

echo.
echo [2/2] Avvio _davSPACE...
call npm run desktop
if errorlevel 1 (
  echo.
  echo [ERRORE] _davSPACE non e riuscito ad avviarsi.
  echo Copia il messaggio di errore mostrato sopra e invialo per la diagnosi.
  echo.
  pause
  exit /b 1
)

endlocal

