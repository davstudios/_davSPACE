# BUILD NOTES — _davSPACE v26.10.2

La v26.10.2 adotta il nuovo standard di release `_davstudios` e il versioning `YY.M.REVISIONE`, senza modifiche funzionali al motore di scansione o all'interfaccia. La patch corregge inoltre il controllo di `Cargo.lock` sui checkout Windows CRLF, che nella v26.10.1 poteva bloccare `npm test` prima della build.

La versione è sincronizzata tra `package.json`, `package-lock.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml` e la voce `_davSPACE` in `src-tauri/Cargo.lock`. I metadata ufficiali includono publisher `_davstudios`, homepage `https://davstudios.it`, copyright `© 2026 _davstudios`, licenza MIT, categoria Productivity e metadata Debian Linux. L'identifier storico `studio.dav.space` resta invariato.

Windows richiede Node.js, npm, Rust e WebView2. macOS richiede Xcode Command Line Tools. Linux richiede le dipendenze Tauri indicate in `INSTALL-LINUX-DEPS-UBUNTU.sh`.

Il launcher Windows usa `npm install --no-audit --no-fund` quando le dipendenze Tauri non sono presenti. La configurazione Vite mantiene l'isolamento di `src-tauri` e legge `TAURI_DEV_HOST` nel formato previsto dai test multipiattaforma.

## Release automatica

`.github/workflows/release.yml` si attiva sui tag `v*`, verifica che tag, package npm, Tauri e Cargo abbiano la stessa versione, richiede nel commit associato al tag una Description contenente entrambe le sezioni 🇮🇹 e 🇺🇸, esegue i test e pubblica una GitHub Release stabile usando automaticamente quella Description come corpo della release:

- Windows: NSIS
- macOS: Universal DMG
- Linux: AppImage + DEB

Il job Linux disabilita preventivamente eventuali repository Microsoft presenti sul runner Ubuntu che possono risultare non raggiungibili pur non essendo necessari alla build Tauri.

L'icona principale Windows resta `src-tauri/icons/icon.ico`, con il set completo di icone Tauri preservato.
