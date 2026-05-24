# Race Import Samples

This folder is for development and testing samples for EquiTrack race PDF import presets.

Place user-provided race program PDFs under the matching racetrack `programs/` folder.
Place user-provided results PDFs under the matching racetrack `results/` folder.

PDF samples are ignored by git:

- `race-import-samples/**/*.pdf`
- `race-import-samples/**/*.PDF`

Do not commit large or copyrighted PDF samples unless explicit permission has been given.
Use samples only to improve parser presets and tests. Imports must always remain review-before-save in the app.

Current preset folders:

- `napoli/`
- `bologna/`
- `montecatini/`
- `garigliano/`
- `generic/`
