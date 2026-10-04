# BUILD NOTES — _davSPACE v26.10.4

La v26.10.4 applica il final polish definitivo della suite `_davstudios` basato sul motion system del sito v52, mantenendo invariata la logica del motore di scansione. Le transizioni di pagina, il cambio tema, gli hover e i reveal sono stati riallineati alla stessa grammatica visiva del sito.

La versione è sincronizzata tra `package.json`, `package-lock.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml` e la voce `_davSPACE` in `src-tauri/Cargo.lock`. I metadata ufficiali includono publisher `_davstudios`, homepage `https://davstudios.it`, copyright `© 2026 _davstudios`, licenza MIT, categoria Productivity e metadata Debian Linux. L'identifier storico `studio.dav.space` resta invariato.

La versione non viene più mostrata nell'interfaccia ordinaria. Il supporto italiano Buy Me A Coffee usa la dicitura `Offrimi Un Caffè`. Il README è stabile e indipendente dalla singola release.

Su Windows la build Release usa il GUI subsystem, evitando una finestra CMD separata. L'helper Explorer usato per mostrare la posizione di un file o una cartella usa `CREATE_NO_WINDOW`; le build debug mantengono il comportamento utile allo sviluppo.

## Release automatica

`.github/workflows/release.yml` si attiva sui tag `v*`, verifica che tag, package npm, package-lock, Tauri, Cargo e Cargo.lock abbiano la stessa versione, richiede nel commit associato al tag una Description contenente entrambe le sezioni 🇮🇹 e 🇺🇸, esegue i test e pubblica una GitHub Release stabile usando automaticamente quella Description come corpo della release.

- Windows: NSIS
- macOS: Universal DMG
- Linux: AppImage + DEB

Il job Linux disabilita preventivamente eventuali repository Microsoft presenti sul runner Ubuntu che possono risultare non raggiungibili pur non essendo necessari alla build Tauri.
