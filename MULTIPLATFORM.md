# Multipiattaforma

`_davSPACE` usa Tauri 2 e un backend Rust condiviso.

- Windows: `RUN-WINDOWS.bat`
- macOS: `./RUN-MACOS.sh`
- Linux: `./RUN-LINUX.sh`

La scansione non segue link simbolici. La funzione Apri posizione usa Explorer su Windows, Finder su macOS e `xdg-open` su Linux.

## Release v26.10.4

La release mantiene metadata ufficiali `_davstudios`, licenza MIT, categoria Productivity, identifier storico `studio.dav.space` e versioning `YY.M.REVISIONE`. Le build GitHub continuano a essere generate su runner nativi per Windows, macOS e Linux.

Il motion system è allineato al sito `_davstudios` v52. Su Windows la build Release usa il GUI subsystem e l'helper Explorer viene avviato con `CREATE_NO_WINDOW`, evitando console aggiuntive. La UI ordinaria non mostra il numero di versione e il README è indipendente dalla release corrente.

Le release Windows e macOS non sono ancora firmate con certificati trusted; le istruzioni per SmartScreen e Gatekeeper sono incluse nel README.
