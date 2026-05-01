# EquiTrack Web

EquiTrack-Web is the browser-based version of the EquiTrack horse stable management app. It runs as a static website and needs no backend, database server, build step, or framework.

## Web Version

The web app includes:

- Horse management
- Daily task tracking
- Work hour tracking
- Feed Inventory PRO for items such as hay, oats, and pellets
- Dashboard summary cards
- Export and import backup tools
- Language selector for English, Suomi, and Italiano

## Feed Inventory PRO

Feed Inventory PRO tracks each feed item's name, category, current amount, unit, daily usage, and low stock threshold.

The app automatically calculates:

- Estimated days remaining
- Low stock warnings
- Out of stock status
- Dashboard low feed count

Feed status labels are shown as `OK`, `Low soon`, `Critical`, or `Empty`.

Open `index.html` directly or publish the repository with GitHub Pages.

## Language Selector

EquiTrack-Web includes a simple interface language selector with:

- English
- Suomi
- Italiano

The selected language is stored in `localStorage` separately from the main app data. Only the app interface is translated; horse names, task notes, work logs, feed items, and other user-created data are not translated or changed.

## Desktop Version

EquiTrack also has an installable Electron desktop version for users who prefer a traditional desktop app. The desktop installer is currently distributed from this repository's GitHub Releases.

The web app checks GitHub Releases here:

```text
https://api.github.com/repos/vattunicolo/EquiTrack-Web/releases/latest
```

The desktop download button automatically fetches the latest release and uses the first uploaded release asset:

- `tag_name` for the version label
- `body` for the changelog
- `assets[0].browser_download_url` for the download link

The current installer asset is expected to be named like `EquiTrack.Setup.1.0.0.1.exe`. If no release or no asset exists yet, the page shows `Desktop download is not available yet.` and keeps working.

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
