# EquiTrack Web

EquiTrack Web is a browser-based version of the EquiTrack horse stable management app. It runs as a static website and needs no backend, database server, build step, or framework.

## Web Version

The web app includes:

- Horse management
- Daily task tracking
- Work hour tracking
- Feed inventory for items such as hay, oats, and pellets
- Dashboard summary cards
- Export and import backup tools

Open `index.html` directly or publish the repository with GitHub Pages.

## Desktop Version

EquiTrack also has an installable Electron desktop version for users who prefer a traditional desktop app.

The web app checks GitHub Releases here:

```text
https://api.github.com/repos/vattunicolo/EquiTrack-Web/releases/latest
```

If a release exists and has an uploaded asset, the desktop download button uses:

- `tag_name` for the version label
- `body` for the changelog
- `assets[0].browser_download_url` for the download link

If no release exists yet, the page shows a clean `No desktop release yet` message and keeps working.

## Local Browser Storage

All web app data is stored in `localStorage` in the user's browser under this key:

```text
equitrack-web-data-v1
```

There is no backend and no cloud sync. Data stays on the device and browser where it was entered.

## Backup, Export, And Import

Use `Export backup` to download a JSON backup of all local EquiTrack Web data.

Use `Import backup` to restore a previously exported JSON file. Importing replaces the current browser data with the contents of the backup file.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open the repository settings.
3. Go to `Pages`.
4. Choose `Deploy from a branch`.
5. Select the branch that contains these files, usually `main`.
6. Select the root folder `/`.
7. Save.

GitHub Pages will serve:

- `index.html`
- `style.css`
- `script.js`

No npm install, Vite build, React build, backend, or database setup is required.
