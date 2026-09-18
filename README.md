<div align="center">
  <img src="src-tauri/icons/app-icon.png" width="112" alt="_davSPACE icon">
</div>

# `_davSPACE`

Analizzatore locale dello spazio su disco per Windows, macOS e Linux.  
Local disk space analyzer for Windows, macOS and Linux.

**v1.0.0 · Local-first · No telemetry**

Interfaccia allineata al design system di `_davMEDIA` e della suite `_davstudios`.

## Italiano

`_davSPACE` analizza una cartella o un disco senza modificare i file e senza inviare dati online.

### v1.0.0

- Scansione ricorsiva di cartelle e dischi.
- Link simbolici non seguiti.
- Annullamento della scansione con risultati parziali.
- Totale spazio, file, cartelle ed elementi non accessibili.
- Cartelle ordinate per dimensione ricorsiva.
- File ordinati per dimensione con ricerca, categoria e soglia minima.
- Categorie Video, Immagini, Audio, Archivi, Documenti, Codice e Altro.
- Paginazione senza limite artificiale al numero di file scansionati.
- Apertura della posizione di file e cartelle.
- Drag & drop di una cartella o disco.
- Esclusione opzionale di nomi cartella.
- Tema chiaro/scuro e Italiano/English.
- Versione UI letta automaticamente da Tauri.
- Elaborazione interamente locale.

### Avvio su Windows

`RUN-WINDOWS.bat`

Oppure:

```bash
npm install
npm run desktop
```

Questa è la prima release stabile. Il pacchetto è pronto per essere usato come base della release/tag `v1.0.0`.

## English

`_davSPACE` analyzes a folder or drive without modifying files or uploading data.

### v1.0.0

- Recursive folder and drive scanning.
- Symbolic links are not followed.
- Scan cancellation with partial results.
- Total space, files, folders and inaccessible items.
- Folders sorted by recursive size.
- Files sorted by size with search, category and minimum-size filters.
- Video, Images, Audio, Archives, Documents, Code and Other categories.
- Pagination with no artificial limit on scanned file count.
- Reveal files and folders in the system file manager.
- Folder or drive drag and drop.
- Optional folder-name exclusions.
- Light/dark theme and Italiano/English.
- UI version read automatically from Tauri.
- Fully local processing.

### Windows launch

`RUN-WINDOWS.bat`

Or:

```bash
npm install
npm run desktop
```

This is the first stable release. The package is ready to be used as the base for the `v1.0.0` release/tag.

## Support _davstudios

Website: https://www.davstudios.it  
Buy Me A Coffee: https://buymeacoffee.com/davstudios

## License

MIT
