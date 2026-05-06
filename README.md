# EquiTrack Web

EquiTrack-Web is the browser-based EquiTrack app for horse stable management. It runs as a static website, works without a backend, and stores data locally in the browser.

## Main Views

- `Home` - product overview for the browser app and a clear `Open My Stable` call to action.
- `My Stable` - dashboard cards, horse records, daily tasks, work hour logs, and Feed Inventory PRO.
- `Calendar` - stable events, race days, training, shoeing, vaccination, vet, feeding, and other event planning.
- `Settings / Backup` - language selector, JSON export/import, import preview, last export timestamp, and local data reset.

## Local Storage

Main app data is stored in browser `localStorage` under:

```text
equitrack-web-data-v1
```

Do not rename this key without a migration, because existing users keep their saved horses, tasks, work logs, feed inventory, and calendar events there.

Language preference is stored separately under:

```text
equitrack-web-language
```

The last backup/export timestamp is stored under:

```text
equitrack-web-last-backup
```

## Feed Inventory PRO

Feed Inventory PRO tracks:

- name
- type/category
- current amount
- unit
- daily usage
- low stock threshold

The app calculates estimated days remaining and status labels: `OK`, `Low soon`, `Critical`, and `Empty`. The dashboard low feed count uses the same status logic.

## Horse Profiles

Horse records support older simple records with only a name, and newer optional profile fields such as owner, breed, birth year/date, gender, color, registration number, feeding notes, care notes, shoeing notes, vaccination notes, deworming notes, vet/contact notes, and general notes.

## Calendar

Calendar events support:

- date and time
- event name and event type
- location
- selected horse or horses
- driver/rider/handler
- notes
- optional race details such as race number, start number, driver, placement, race time/result, prize, and post-race notes

Upcoming events are sorted by date/time, and the Calendar view shows today and next 7 days summary counts.

## Backup PRO

Exported backups include metadata:

- app name
- format version
- created timestamp
- data counts
- full local data payload

Imports validate JSON and show a preview with horse, task, work log, feed item, and calendar event counts before replacing local data. Older backups that contain the raw data object or a `data` wrapper still import safely.

## Languages

The interface supports:

- English
- Suomi
- Italiano

Only interface text is translated. User-created horse names, task notes, feed items, calendar events, and backup data are not translated or modified.

## PWA

The site includes basic Progressive Web App support:

- `manifest.webmanifest`
- `service-worker.js`
- safe service worker registration from `script.js`
- app name `EquiTrack`
- standalone display mode
- dark theme color

Normal browser use continues even if service worker registration is unavailable.

## GitHub Pages And Domain

This repository is intended to be served from GitHub Pages at:

```text
aequitrack.com
```

The root `CNAME` file should contain:

```text
aequitrack.com
```

To deploy:

1. Open the repository settings on GitHub.
2. Go to `Pages`.
3. Choose `Deploy from a branch`.
4. Select `main` and the root folder `/`.
5. Save.

No npm install, React, Vite, backend, database, build step, or external service is required.
