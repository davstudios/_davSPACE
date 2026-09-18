# Multipiattaforma

`_davSPACE` usa Tauri 2 e un backend Rust condiviso.

- Windows: `RUN-WINDOWS.bat`
- macOS: `./RUN-MACOS.sh`
- Linux: `./RUN-LINUX.sh`

La scansione non segue link simbolici. La funzione Apri posizione usa Explorer su Windows, Finder su macOS e `xdg-open` su Linux.
