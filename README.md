<div align="center">
  <img src="src-tauri/icons/app-icon.png" width="112" alt="_davSPACE icon">
</div>

# `_davSPACE`

Analizzatore locale dello spazio su disco per Windows, macOS e Linux.  
Local disk space analyzer for Windows, macOS and Linux.

**v26.10.2 · Local-first · No telemetry**

Interfaccia allineata al design system di `_davMEDIA` e della suite `_davstudios`.

## Italiano

`_davSPACE` analizza una cartella o un disco senza modificare i file e senza inviare dati online.

### v26.10.2

Patch di affidabilità della pipeline multipiattaforma, senza modifiche funzionali al motore di scansione o all'interfaccia.

- Versione sincronizzata a `26.10.2` tra package npm, package-lock, Tauri, Cargo e Cargo.lock.
- Corretto il test di sincronizzazione di `Cargo.lock` affinché gestisca sia terminatori di riga LF sia CRLF nei checkout Windows.
- Aggiunta una regressione automatica specifica per il checkout Windows.
- Rafforzata la normalizzazione Git dei file shell e di `Cargo.lock`.
- Preservati metadata `_davstudios`, identifier `studio.dav.space` e workflow release bilingue.
- Nessuna modifica al motore di scansione o alla logica funzionale dell'app.

### v26.10.1

Release di allineamento al nuovo standard `_davstudios`, senza modifiche funzionali al motore di scansione o all'interfaccia.

- Adottato il versioning `YY.M.REVISIONE`.
- Versione sincronizzata a `26.10.1` tra package npm, package-lock, Tauri, Cargo e Cargo.lock.
- Standardizzati metadata ufficiali, licenza MIT, categoria Productivity e metadata Debian Linux.
- Mantenuto invariato l'identifier storico `studio.dav.space`.
- Workflow GitHub aggiornato per usare la Description bilingue del commit come corpo della Release.
- Rafforzata la build Linux contro repository Microsoft non raggiungibili.
- Nessuna modifica al motore di scansione o alla logica funzionale dell'app.

### v1.0.3

Patch del flusso di release GitHub, senza modifiche funzionali all’app.

- Versione sincronizzata a 1.0.3 tra package npm, Tauri e Cargo.
- Inclusa `.github/workflows/release.yml` nel pacchetto distribuito.
- Workflow di release allineata al modello stabile di `_davRENAME`.
- Il tag pubblicato viene usato direttamente per creare la GitHub Release stabile.
- Nessuna modifica al motore di scansione o all’interfaccia.

### v1.0.2

Patch di release senza modifiche funzionali, preparata per un nuovo ciclo pulito di commit/tag/release.

- Versione sincronizzata a 1.0.2 tra package npm, Tauri e Cargo.
- Aggiornati metadata, test e launcher alla nuova patch.
- Nessuna modifica al motore di scansione o all’interfaccia.

### v1.0.1

Patch di affidabilità per build e CI multipiattaforma.

- Launcher Windows riallineato al flusso verificato della suite.
- Configurazione Vite resa coerente con il contratto Tauri usato nei test.
- Metadata e test di release aggiornati alla versione 1.0.1.

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

La release corrente è `v26.10.2` e adotta il nuovo standard di versioning e packaging `_davstudios`; `v1.0.0` rimane la prima release stabile.

## Installazione delle release GitHub non firmate

Le release di `_davSPACE` sono distribuite direttamente tramite GitHub e, al momento, non utilizzano certificati commerciali di code signing o notarizzazione Apple. Il codice sorgente è disponibile pubblicamente con licenza MIT.

### Windows

Windows SmartScreen può mostrare l'avviso **“Windows ha protetto il PC”** perché l'installer non è firmato con un certificato di publisher attendibile. Se hai scaricato il file dalla repository GitHub ufficiale di `_davstudios`, seleziona **Ulteriori informazioni** e poi **Esegui comunque**.

### macOS

Gatekeeper può impedire la prima apertura perché l'app non è firmata con Developer ID e non è notarizzata da Apple. Dopo aver tentato di aprire l'app, vai in **Impostazioni di Sistema → Privacy e Sicurezza**, individua il messaggio relativo a `_davSPACE` e scegli **Apri comunque**.

### Linux

Per un'AppImage può essere necessario rendere il file eseguibile prima dell'avvio:

```bash
chmod +x _davSPACE*.AppImage
```

Scarica sempre le release dalla repository GitHub ufficiale di `_davstudios`.

## Informazioni pacchetto

- Developer / Publisher: `_davstudios`
- Homepage: https://davstudios.it
- Copyright: © 2026 _davstudios
- Licenza: MIT
- Categoria: Productivity
- Bundle identifier: `studio.dav.space`
- Versione corrente: `26.10.2`

## English

`_davSPACE` analyzes a folder or drive without modifying files or uploading data.

### v26.10.2

Cross-platform release-pipeline reliability patch with no functional changes to the scan engine or interface.

- Version synchronized to `26.10.2` across npm package, package-lock, Tauri, Cargo and Cargo.lock.
- Fixed the `Cargo.lock` synchronization test so it accepts both LF and CRLF line endings on Windows checkouts.
- Added a dedicated automated regression check for Windows-style CRLF checkout behavior.
- Strengthened Git line-ending normalization for shell files and `Cargo.lock`.
- Preserved `_davstudios` metadata, the `studio.dav.space` identifier and the bilingual release workflow.
- No changes to the scan engine or the application's functional logic.

### v26.10.1

Release aligned with the new `_davstudios` standard, with no functional changes to the scan engine or interface.

- Adopted the `YY.M.REVISIONE` versioning scheme.
- Version synchronized to `26.10.1` across npm package, package-lock, Tauri, Cargo and Cargo.lock.
- Standardized official metadata, MIT license, Productivity category and Linux Debian metadata.
- Preserved the historical `studio.dav.space` identifier.
- GitHub workflow updated to use the bilingual commit Description as the Release body.
- Linux build hardened against unreachable Microsoft repositories.
- No changes to the scan engine or the application's functional logic.

### v1.0.3

GitHub release workflow patch with no functional changes to the app.

- Version synchronized to 1.0.3 across npm package, Tauri and Cargo.
- `.github/workflows/release.yml` is now included in the distributed package.
- Release workflow aligned with the stable `_davRENAME` model.
- The pushed tag is used directly to create the stable GitHub Release.
- No changes to the scan engine or user interface.

### v1.0.2

Release-only patch with no functional changes, prepared for a clean new commit/tag/release cycle.

- Version synchronized to 1.0.2 across npm package, Tauri and Cargo.
- Metadata, tests and launcher updated to the new patch version.
- No changes to the scan engine or user interface.

### v1.0.1

Reliability patch for cross-platform build and CI.

- Windows launcher aligned with the suite's verified flow.
- Vite configuration aligned with the Tauri contract used by tests.
- Release metadata and tests updated to version 1.0.1.

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

The current release is `v26.10.2` and adopts the new `_davstudios` versioning and packaging standard; `v1.0.0` remains the first stable release.

## Installing unsigned GitHub releases

`_davSPACE` releases are distributed directly through GitHub and currently do not use a commercial Windows code-signing certificate or Apple Developer ID notarization. The source code is publicly available under the MIT License.

### Windows

Windows SmartScreen may display **“Windows protected your PC”** because the installer is not signed by a trusted publisher certificate. If you downloaded the file from the official `_davstudios` GitHub repository, choose **More info** and then **Run anyway**.

### macOS

Gatekeeper may block the first launch because the app is not signed with Developer ID and notarized by Apple. After attempting to open the app, go to **System Settings → Privacy & Security**, find the `_davSPACE` message and choose **Open Anyway**.

### Linux

An AppImage may need to be marked as executable before launch:

```bash
chmod +x _davSPACE*.AppImage
```

Always download releases from the official `_davstudios` GitHub repository.

## Package information

- Developer / Publisher: `_davstudios`
- Homepage: https://davstudios.it
- Copyright: © 2026 _davstudios
- License: MIT
- Category: Productivity
- Bundle identifier: `studio.dav.space`
- Current version: `26.10.2`

## Support _davstudios

Website: https://www.davstudios.it  
Buy Me A Coffee: https://buymeacoffee.com/davstudios

## License

MIT
