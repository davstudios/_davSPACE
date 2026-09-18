# Build notes

La v1.0.3 è una patch di release della versione stabile di `_davSPACE`, senza modifiche funzionali al motore di scansione o all’interfaccia.

La patch riallinea il flusso GitHub Actions allo standard stabile già usato da `_davRENAME`: il pacchetto include ora `.github/workflows/release.yml`, la workflow usa il tag Git effettivamente pubblicato, verifica che `package.json`, `src-tauri/tauri.conf.json` e `src-tauri/Cargo.toml` abbiano la stessa versione del tag, e pubblica una release stabile (`prerelease: false`).

Windows richiede Node.js, npm, Rust e WebView2. macOS richiede Xcode Command Line Tools. Linux richiede le dipendenze Tauri indicate in `INSTALL-LINUX-DEPS-UBUNTU.sh`.

Il launcher Windows usa `npm install --no-audit --no-fund` quando le dipendenze Tauri non sono presenti. La configurazione Vite mantiene l'isolamento di `src-tauri` e legge `TAURI_DEV_HOST` nel formato previsto dai test multipiattaforma.

L'icona principale Windows resta `src-tauri/icons/icon.ico`, fornita direttamente per la release stabile.
