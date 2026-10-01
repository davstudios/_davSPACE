# Multipiattaforma

`_davSPACE` usa Tauri 2 e un backend Rust condiviso.

- Windows: `RUN-WINDOWS.bat`
- macOS: `./RUN-MACOS.sh`
- Linux: `./RUN-LINUX.sh`

La scansione non segue link simbolici. La funzione Apri posizione usa Explorer su Windows, Finder su macOS e `xdg-open` su Linux.

## Release v26.10.1

La release adotta i metadata ufficiali `_davstudios`, la licenza MIT, la categoria Productivity e il versioning `YY.M.REVISIONE`. Le build GitHub continuano a essere generate su runner nativi per Windows, macOS e Linux. Il workflow Linux disabilita eventuali sorgenti Microsoft non raggiungibili prima di `apt-get update`.

Le release Windows e macOS non sono ancora firmate con certificati trusted; le istruzioni per SmartScreen e Gatekeeper sono incluse nel README.

