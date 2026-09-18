# Build notes

La v1.0.2 è una patch di release della versione stabile di `_davSPACE`, senza modifiche funzionali.

Windows richiede Node.js, npm, Rust e WebView2. macOS richiede Xcode Command Line Tools. Linux richiede le dipendenze Tauri indicate in `INSTALL-LINUX-DEPS-UBUNTU.sh`.

Il launcher Windows usa `npm install --no-audit --no-fund` quando le dipendenze Tauri non sono presenti. La configurazione Vite mantiene l'isolamento di `src-tauri` e legge `TAURI_DEV_HOST` nel formato previsto dai test multipiattaforma.

L'icona principale Windows resta `src-tauri/icons/icon.ico`, fornita direttamente per la release stabile.
