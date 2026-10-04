<div align="center">
  <img src="src-tauri/icons/app-icon.png" width="112" alt="_davSPACE icon">

# _davSPACE

**Analizza lo spazio occupato su dischi e cartelle interamente in locale.**  
**Analyze disk and folder usage entirely locally.**

Windows · macOS · Linux · Local-first · Open source

[![Italiano](https://img.shields.io/badge/Italiano-006EDB?style=for-the-badge)](#-italiano)
[![English](https://img.shields.io/badge/English-141416?style=for-the-badge)](#-english)
</div>

---

# 🇮🇹 Italiano

_davSPACE è un'app desktop multipiattaforma di **_davstudios** per capire rapidamente quali file e cartelle occupano più spazio. La scansione legge il file system localmente, non carica dati online e non elimina o sposta automaticamente alcun elemento.

<p>
  <a href="https://www.davstudios.it"><img src=".github/assets/website-it.svg" height="46" alt="Visita il sito"></a>
  <a href="https://buymeacoffee.com/davstudios"><img src=".github/assets/buy-coffee-it.svg" height="46" alt="Offrimi Un Caffè"></a>
</p>

## Funzioni principali

- scansione ricorsiva di cartelle e radici di disco;
- link simbolici ignorati per evitare percorsi ciclici o inattesi;
- annullamento della scansione con disponibilità dei risultati parziali;
- totale di spazio analizzato, file, cartelle ed elementi non accessibili;
- cartelle ordinate per dimensione ricorsiva;
- file ordinati per dimensione;
- ricerca per nome, percorso, estensione e categoria;
- soglia minima configurabile per la dimensione dei file;
- categorie Video, Immagini, Audio, Archivi, Documenti, Codice e Altro;
- paginazione senza limite artificiale al numero di elementi scansionati;
- apertura della posizione di file e cartelle nel file manager di sistema;
- drag & drop di cartelle o dischi;
- esclusione opzionale di nomi cartella;
- interfaccia italiana e inglese;
- tema Sistema, Chiaro e Scuro;
- motion system coerente con il sito `_davstudios`.

## Sicurezza della scansione

_davSPACE è progettato come analizzatore **sola lettura**: il motore di scansione non elimina, rinomina, copia o sposta file. I link simbolici non vengono seguiti e gli errori di accesso vengono conteggiati senza interrompere l'intera scansione.

Il pulsante per aprire la posizione delega esclusivamente al file manager del sistema operativo: Explorer su Windows, Finder su macOS e `xdg-open` su Linux.

## Privacy e local-first

- nessun account;
- nessun upload dei file;
- nessuna telemetria integrata;
- analisi eseguita localmente;
- preferenze salvate localmente sul dispositivo.

## Piattaforme

| Sistema | Architettura | Pacchetto |
| --- | --- | --- |
| Windows 10/11 | x64 | NSIS `.exe` |
| macOS | Intel + Apple Silicon | Universal `.dmg` |
| Linux | x64 | `.AppImage` / `.deb` |

Le release vengono compilate tramite GitHub Actions sui rispettivi sistemi operativi.

## Installazione di release non firmate

Le build pubbliche non utilizzano attualmente un certificato commerciale Windows né Apple Developer ID/notarizzazione. Scarica sempre gli artefatti dalla repository GitHub ufficiale di `_davstudios`.

### Windows

SmartScreen può mostrare **Windows ha protetto il PC**. Se il file proviene dalla repository ufficiale, scegli **Ulteriori informazioni → Esegui comunque**. La build Release usa il Windows GUI subsystem e non apre una finestra CMD separata. Anche l'helper usato per mostrare file e cartelle in Explorer viene avviato senza console visibili.

### macOS

Se Gatekeeper blocca la prima apertura, prova ad aprire l'app e poi vai in **Impostazioni di Sistema → Privacy e Sicurezza → Apri comunque**.

### Linux

Per un'AppImage può essere necessario renderla eseguibile:

```bash
chmod +x _davSPACE*.AppImage
```

## Sviluppo

Requisiti: Node.js, Rust e prerequisiti Tauri del sistema operativo.

```bash
npm install
npm run desktop
```

Test:

```bash
npm test
```

Build locale:

```bash
npm run bundle
```

Gli artefatti vengono generati in `src-tauri/target/release/bundle/`.

## Stack e identità

- Tauri 2;
- Rust;
- JavaScript + Vite;
- WalkDir per la scansione ricorsiva;
- Plus Jakarta Sans;
- motion system coerente con il sito `_davstudios`;
- bundle identifier stabile: `studio.dav.space`;
- licenza MIT.

La versione dell'app è gestita nei manifest tecnici e nelle GitHub Release; non viene mostrata nell'interfaccia ordinaria per mantenere la UI pulita e impedire stringhe di versione duplicate.

## Licenza

Distribuito con licenza **MIT**. Consulta [`LICENSE`](LICENSE).

---

# 🇺🇸 English

_davSPACE is a cross-platform desktop app by **_davstudios** for quickly understanding which files and folders use the most disk space. Scanning reads the file system locally, uploads no data and never deletes or moves items automatically.

<p>
  <a href="https://www.davstudios.it/en"><img src=".github/assets/website-en.svg" height="46" alt="Visit website"></a>
  <a href="https://buymeacoffee.com/davstudios"><img src=".github/assets/buy-coffee-en.svg" height="46" alt="Buy Me A Coffee"></a>
</p>

## Main features

- recursive scanning of folders and drive roots;
- symbolic links ignored to avoid cyclic or unexpected paths;
- cancellable scanning with partial results retained;
- analyzed-space, file, folder and inaccessible-item totals;
- folders sorted by recursive size;
- files sorted by size;
- search by name, path, extension and category;
- configurable minimum file-size threshold;
- Video, Images, Audio, Archives, Documents, Code and Other categories;
- pagination without an artificial limit on scanned items;
- reveal files and folders in the operating system's file manager;
- folder or drive drag and drop;
- optional folder-name exclusions;
- Italian and English interface;
- System, Light and Dark themes;
- motion system aligned with the `_davstudios` website.

## Scan safety

_davSPACE is designed as a **read-only** analyzer: the scanning engine does not delete, rename, copy or move files. Symbolic links are not followed and access errors are counted without aborting the entire scan.

The reveal action only delegates to the operating system's file manager: Explorer on Windows, Finder on macOS and `xdg-open` on Linux.

## Privacy and local-first

- no account;
- no file uploads;
- no built-in telemetry;
- analysis runs locally;
- preferences are stored locally on the device.

## Platforms

| System | Architecture | Package |
| --- | --- | --- |
| Windows 10/11 | x64 | NSIS `.exe` |
| macOS | Intel + Apple Silicon | Universal `.dmg` |
| Linux | x64 | `.AppImage` / `.deb` |

Releases are compiled through GitHub Actions on the corresponding operating systems.

## Installing unsigned releases

Public builds currently do not use a commercial Windows signing certificate or Apple Developer ID/notarization. Always download artifacts from the official `_davstudios` GitHub repository.

### Windows

SmartScreen may display **Windows protected your PC**. If the file comes from the official repository, choose **More info → Run anyway**. Release builds use the Windows GUI subsystem and do not open a separate CMD window. The helper used to reveal files and folders in Explorer also runs without a visible console.

### macOS

If Gatekeeper blocks the first launch, attempt to open the app and then go to **System Settings → Privacy & Security → Open Anyway**.

### Linux

An AppImage may need to be marked executable:

```bash
chmod +x _davSPACE*.AppImage
```

## Development

Requirements: Node.js, Rust and the operating system's Tauri prerequisites.

```bash
npm install
npm run desktop
```

Tests:

```bash
npm test
```

Local build:

```bash
npm run bundle
```

Artifacts are generated under `src-tauri/target/release/bundle/`.

## Stack and identity

- Tauri 2;
- Rust;
- JavaScript + Vite;
- WalkDir for recursive scanning;
- Plus Jakarta Sans;
- motion system aligned with the `_davstudios` website;
- stable bundle identifier: `studio.dav.space`;
- MIT license.

The app version is managed through technical manifests and GitHub Releases; it is not displayed in the ordinary interface, keeping the UI clean and preventing duplicated version strings.

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE).
