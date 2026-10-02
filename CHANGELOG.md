# Changelog

## 26.10.2

- Sincronizzata la release corrente a `26.10.2` in package npm, package-lock, Tauri, Cargo, Cargo.lock, documentazione e test.
- Corretto il test di sincronizzazione di `Cargo.lock` che su checkout Windows con terminatori CRLF poteva restituire una versione `undefined` e bloccare la pipeline prima della build.
- Aggiunto un test di regressione esplicito per i terminatori CRLF di Windows.
- Rafforzata `.gitattributes` imponendo LF agli script shell e a `src-tauri/Cargo.lock`.
- Preservati integralmente metadata `_davstudios`, identifier storico `studio.dav.space`, workflow bilingue e hardening Linux.
- Nessuna modifica al motore di scansione, all'interfaccia o alla logica funzionale dell'app.

## 26.10.1

- Adottato il nuovo standard di versioning `_davstudios` `YY.M.REVISIONE`.
- Sincronizzata la versione `26.10.1` nei metadata npm, Tauri, Cargo e relativi lockfile.
- Standardizzati publisher, homepage, copyright, licenza MIT, categoria Productivity, descrizioni del pacchetto e metadata Linux.
- Mantenuto invariato l'identifier storico `studio.dav.space`.
- Aggiunte al README le istruzioni per le release non firmate su Windows, macOS e Linux.
- Il workflow GitHub usa ora automaticamente la Description bilingue del commit associato al tag come descrizione della GitHub Release.
- Aggiunta la verifica obbligatoria delle sezioni `🇮🇹` e `🇺🇸` prima della pubblicazione.
- Rafforzato il workflow Linux contro repository Microsoft non raggiungibili.
- Nessuna modifica al motore di scansione, all'interfaccia o alla logica funzionale dell'app.

## 1.0.3

Patch del flusso di release GitHub, senza modifiche funzionali all'app.

- Versione sincronizzata a 1.0.3 tra package npm, Tauri e Cargo.
- Inclusa nel pacchetto la cartella `.github` con la workflow di release stabile.
- Workflow allineata a `_davRENAME`: checkout del tag effettivo e verifica preventiva delle versioni.
- La release usa il tag che ha attivato la workflow e viene pubblicata come stabile (`prerelease: false`).
- Nessuna modifica al motore di scansione, all'interfaccia o all'icona dell'app.

## 1.0.2

Patch di release senza modifiche funzionali.

- Versione sincronizzata a 1.0.2 tra package npm, Tauri e Cargo.
- Aggiornati test, launcher e metadata alla nuova patch.
- Preparato un nuovo ciclo pulito di commit, tag e release GitHub.
- Nessuna modifica al motore di scansione o al comportamento utente dell'app.

## 1.0.1

Patch di affidabilità multipiattaforma.

- Corretto `RUN-WINDOWS.bat` per usare `npm install --no-audit --no-fund`, come richiesto dal contratto di progetto.
- Riallineata la dichiarazione `TAURI_DEV_HOST` in `vite.config.js` al formato verificato dai test CI.
- Aggiornati i test e i metadata di release dalla vecchia preview alla release stabile corrente.
- Versione sincronizzata a 1.0.1 tra package npm, Tauri e Cargo.
- Nessuna modifica al motore di scansione o al comportamento utente dell'app.

## 1.0.0

Prima release stabile di `_davSPACE`.

- Corretta l'icona **Impostazioni** nella sidebar con un ingranaggio SVG simmetrico e correttamente allineato.
- Uniformata la geometria delle icone di navigazione per evitare deformazioni o spostamenti.
- Impostata la nuova icona principale Windows fornita dall'autore come `src-tauri/icons/icon.ico`.
- Versione sincronizzata a 1.0.0 tra package npm, Tauri e Cargo.
- Etichette della UI aggiornate da preview locale a release stabile.
- Conservato il motore di scansione locale e il design system condiviso con `_davMEDIA`.

## 0.1.0

Preview locale ricostruita di `_davSPACE`.

- Design system riallineato a `_davMEDIA` v1.0.1.
- Stessa sidebar, tipografia, colori, pannelli, controlli, tema e motion della suite `_davstudios`.
- Finestra desktop uniformata a 1420×880 con minimo 980×680.
- Scansione ricorsiva reale in Rust.
- Analisi file, cartelle e categorie.
- Annullamento scansione e risultati parziali.
- Filtri, paginazione e apertura posizione.
- Drag & drop di cartelle e dischi.
- Tema system/light/dark e Italiano/English.
- Preview Vite resa sicura anche fuori dall'ambiente Tauri.
