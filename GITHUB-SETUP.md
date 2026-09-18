# GitHub setup

## Creazione repository con GitHub Desktop

Impostare:

- Name: `_davSPACE`
- Local path: la cartella padre, ad esempio `C:\Users\_davstudios\Documents\GitHub`
- Description: `Cross-platform local disk space analyzer by _davstudios.`
- Initialize this repository with a README: disattivato
- Git ignore: `None`
- License: `None`

README, `.gitignore` e licenza MIT sono già inclusi nel progetto.

Dopo la creazione, copiare il contenuto del progetto direttamente nella cartella repository `_davSPACE`, quindi creare il primo commit e pubblicare il repository su GitHub.

## Preview v0.1.0

Dopo il push del progetto puoi avviare il workflow dalla scheda `Actions`, oppure creare e inviare il tag:

```bash
git tag -a v0.1.0 -m "Preview _davSPACE v0.1.0"
git push origin v0.1.0
```

La pipeline crea le build Windows, macOS e Linux e pubblica una GitHub prerelease.
