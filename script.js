// GitHub Releases endpoint used for the optional Electron desktop download.
const LATEST_RELEASE_URL = 'https://api.github.com/repos/vattunicolo/EquiTrack-Web/releases/latest';

// localStorage key for all browser app data.
const STORAGE_KEY = 'equitrack-web-data-v1';
const LANGUAGE_KEY = 'equitrack-web-language';
const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    'brand.subtitle': 'Web stable manager',
    'language.label': 'Language',
    'nav.dashboard': 'Dashboard',
    'nav.app': 'App',
    'nav.desktop': 'Desktop',
    'hero.eyebrow': 'Local-first browser app',
    'hero.title': 'Manage your stable from any modern browser.',
    'hero.text': 'Track horses, daily work, staff hours, and feed inventory. Everything is stored locally in this browser, with export and import tools for backups.',
    'hero.openApp': 'Open EquiTrack Web',
    'summary.horses': 'Horses',
    'summary.openTasks': 'Open tasks',
    'summary.hoursLogged': 'Hours logged',
    'summary.lowFeed': 'Low feed items',
    'workspace.eyebrow': 'Stable workspace',
    'workspace.title': 'Run EquiTrack directly in the browser.',
    'backup.export': 'Download backup',
    'backup.import': 'Restore backup',
    'tabs.horses': 'Horses',
    'tabs.tasks': 'Tasks',
    'tabs.hours': 'Work hours',
    'tabs.inventory': 'Feed PRO',
    'horses.title': 'Horse management',
    'horses.subtitle': 'Add horses and keep care notes close at hand.',
    'horses.name': 'Horse name',
    'horses.age': 'Age',
    'horses.save': 'Save horse record',
    'horses.notesPlaceholder': 'Feed, training, vet, or shoeing notes',
    'tasks.title': 'Daily tasks',
    'tasks.subtitle': 'Plan and complete stable jobs for each day.',
    'tasks.task': 'Task',
    'tasks.placeholder': 'Morning feed round',
    'tasks.assignedHorse': 'Assigned horse',
    'tasks.notesPlaceholder': 'Details, worker, location',
    'tasks.save': 'Save daily task',
    'hours.title': 'Work hour tracking',
    'hours.subtitle': 'Log staff work and notes for each stable shift.',
    'hours.worker': 'Worker',
    'hours.hours': 'Hours',
    'hours.notesPlaceholder': 'Morning shift, stalls cleaned, feeding done',
    'hours.save': 'Save work log',
    'inventory.title': 'Feed Inventory PRO',
    'inventory.subtitle': 'Track feed categories, daily usage, estimated days remaining, and stock warnings.',
    'inventory.name': 'Feed item name',
    'inventory.category': 'Type / category',
    'inventory.quantity': 'Current amount',
    'inventory.unit': 'Unit',
    'inventory.dailyUsage': 'Daily usage',
    'inventory.minimum': 'Low stock threshold',
    'inventory.save': 'Save inventory item',
    'desktop.eyebrow': 'Desktop version',
    'desktop.title': 'Prefer an installable app?',
    'desktop.text': 'The browser app works without a backend and stores data in this browser. The Electron desktop version is available from GitHub Releases when an installer has been published.',
    'desktop.latest': 'Latest desktop release',
    'desktop.openReleases': 'Open releases',
    'footer.local': 'Data is stored locally in your browser.',
    'common.date': 'Date',
    'common.notes': 'Care notes',
    'common.notesSimple': 'Notes',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.notSet': 'not set',
    'common.noNotes': 'No notes yet.',
    'common.hours': 'hours',
    'tasks.noHorseAssigned': 'No horse assigned',
    'tasks.noHorse': 'No horse',
    'tasks.done': 'Done',
    'tasks.open': 'Open',
    'tasks.reopen': 'Reopen',
    'empty.horses': 'No horses saved yet. Add a horse record above to start building your stable list.',
    'empty.tasks': 'No daily tasks saved yet. Add a feeding, cleaning, training, or care task above.',
    'empty.hours': 'No work hours logged yet. Add a worker shift above to start tracking time.',
    'empty.inventory': 'No feed inventory saved yet. Add hay, oats, pellets, supplements, or other supplies to see days remaining and stock warnings.',
    'feed.description': '{category} feed inventory',
    'feed.current': 'Current',
    'feed.dailyUsage': 'Daily usage',
    'feed.daysLeft': 'Days left',
    'feed.lowThreshold': 'Low threshold',
    'feed.notSet': 'Not set',
    'feed.ok': 'OK',
    'feed.low': 'Low soon',
    'feed.critical': 'Critical',
    'feed.empty': 'Empty',
    'message.horseSaved': 'Horse saved.',
    'message.taskSaved': 'Task saved.',
    'message.hoursSaved': 'Work hours saved.',
    'message.inventorySaved': 'Feed inventory item saved with days remaining updated.',
    'message.deleteCancelled': 'Delete cancelled. No data was changed.',
    'message.horseDeleted': 'Horse record deleted.',
    'message.taskDeleted': 'Daily task deleted.',
    'message.hoursDeleted': 'Work log deleted.',
    'message.inventoryDeleted': 'Feed inventory item deleted.',
    'message.taskDone': 'Task marked as done.',
    'message.taskReopened': 'Task reopened.',
    'message.backupExported': 'Backup exported with {count} saved records.',
    'message.backupImported': 'Backup restored with {count} saved records.',
    'message.importFailed': 'Import failed: {error}',
    'message.languageChanged': 'Language updated.',
    'confirm.delete': 'Delete {label}? This cannot be undone.',
    'delete.horse': 'this horse record',
    'delete.task': 'this daily task',
    'delete.hours': 'this work log',
    'delete.inventory': 'this feed inventory item',
    'release.loadingStatus': 'Loading desktop release information from GitHub.',
    'release.loadingButton': 'Checking desktop release...',
    'release.loadingChangelog': 'Fetching changelog from GitHub Releases.',
    'release.unavailable': 'Desktop download is not available yet.',
    'release.noRelease': 'No release available yet',
    'release.latest': 'Latest release',
    'release.downloadDesktop': 'Download desktop {version}',
    'release.installer': 'Desktop installer: {name}',
    'release.downloadAvailable': 'download available',
    'release.noChangelog': 'No changelog was provided for this release.'
  },
  fi: {
    'brand.subtitle': 'Verkkotallin hallinta',
    'language.label': 'Kieli',
    'nav.dashboard': 'Yhteenveto',
    'nav.app': 'Sovellus',
    'nav.desktop': 'Työpöytä',
    'hero.eyebrow': 'Paikallinen selainversio',
    'hero.title': 'Hallitse tallia modernissa selaimessa.',
    'hero.text': 'Seuraa hevosia, päivittäisiä töitä, työtunteja ja rehuvarastoa. Kaikki tiedot tallentuvat tähän selaimeen, ja varmuuskopiot voi viedä ja tuoda.',
    'hero.openApp': 'Avaa EquiTrack Web',
    'summary.horses': 'Hevoset',
    'summary.openTasks': 'Avoimet tehtävät',
    'summary.hoursLogged': 'Kirjatut tunnit',
    'summary.lowFeed': 'Vähissä olevat rehut',
    'workspace.eyebrow': 'Tallin työtila',
    'workspace.title': 'Käytä EquiTrackia suoraan selaimessa.',
    'backup.export': 'Lataa varmuuskopio',
    'backup.import': 'Palauta varmuuskopio',
    'tabs.horses': 'Hevoset',
    'tabs.tasks': 'Tehtävät',
    'tabs.hours': 'Työtunnit',
    'tabs.inventory': 'Rehu PRO',
    'horses.title': 'Hevosten hallinta',
    'horses.subtitle': 'Lisää hevoset ja pidä hoitomuistiinpanot käden ulottuvilla.',
    'horses.name': 'Hevosen nimi',
    'horses.age': 'Ikä',
    'horses.save': 'Tallenna hevonen',
    'horses.notesPlaceholder': 'Ruokinta, harjoittelu, eläinlääkäri tai kengitys',
    'tasks.title': 'Päivittäiset tehtävät',
    'tasks.subtitle': 'Suunnittele ja kuittaa tallin päivittäiset työt.',
    'tasks.task': 'Tehtävä',
    'tasks.placeholder': 'Aamuruokinta',
    'tasks.assignedHorse': 'Hevonen',
    'tasks.notesPlaceholder': 'Lisätiedot, työntekijä, sijainti',
    'tasks.save': 'Tallenna tehtävä',
    'hours.title': 'Työtuntien seuranta',
    'hours.subtitle': 'Kirjaa tallivuorot ja muistiinpanot.',
    'hours.worker': 'Työntekijä',
    'hours.hours': 'Tunnit',
    'hours.notesPlaceholder': 'Aamuvuoro, karsinat siivottu, ruokinta tehty',
    'hours.save': 'Tallenna työkirjaus',
    'inventory.title': 'Rehuvarasto PRO',
    'inventory.subtitle': 'Seuraa rehuluokkia, päivittäistä käyttöä, arvioituja jäljellä olevia päiviä ja varoituksia.',
    'inventory.name': 'Rehun nimi',
    'inventory.category': 'Tyyppi / luokka',
    'inventory.quantity': 'Nykyinen määrä',
    'inventory.unit': 'Yksikkö',
    'inventory.dailyUsage': 'Päiväkäyttö',
    'inventory.minimum': 'Alaraja',
    'inventory.save': 'Tallenna varastotuote',
    'desktop.eyebrow': 'Työpöytäversio',
    'desktop.title': 'Haluatko asennettavan sovelluksen?',
    'desktop.text': 'Selainversio toimii ilman taustapalvelinta ja tallentaa tiedot tähän selaimeen. Electron-työpöytäversio on saatavilla GitHub Releases -julkaisuista, kun asennusohjelma on julkaistu.',
    'desktop.latest': 'Uusin työpöytäjulkaisu',
    'desktop.openReleases': 'Avaa julkaisut',
    'footer.local': 'Tiedot tallennetaan paikallisesti selaimeesi.',
    'common.date': 'Päivä',
    'common.notes': 'Hoitomuistiinpanot',
    'common.notesSimple': 'Muistiinpanot',
    'common.edit': 'Muokkaa',
    'common.delete': 'Poista',
    'common.notSet': 'ei asetettu',
    'common.noNotes': 'Ei muistiinpanoja.',
    'common.hours': 'tuntia',
    'tasks.noHorseAssigned': 'Ei hevosta',
    'tasks.noHorse': 'Ei hevosta',
    'tasks.done': 'Valmis',
    'tasks.open': 'Avoin',
    'tasks.reopen': 'Avaa uudelleen',
    'empty.horses': 'Hevosia ei ole vielä tallennettu. Lisää ensimmäinen hevonen yllä.',
    'empty.tasks': 'Päivittäisiä tehtäviä ei ole vielä. Lisää ruokinta-, siivous-, harjoitus- tai hoitotehtävä.',
    'empty.hours': 'Työtunteja ei ole vielä kirjattu. Lisää työvuoro yllä.',
    'empty.inventory': 'Rehuvarastoa ei ole vielä. Lisää heinää, kauraa, pellettejä tai muita tarvikkeita.',
    'feed.description': '{category}-rehuvarasto',
    'feed.current': 'Määrä',
    'feed.dailyUsage': 'Päiväkäyttö',
    'feed.daysLeft': 'Päiviä jäljellä',
    'feed.lowThreshold': 'Alaraja',
    'feed.notSet': 'Ei asetettu',
    'feed.ok': 'OK',
    'feed.low': 'Vähissä pian',
    'feed.critical': 'Kriittinen',
    'feed.empty': 'Tyhjä',
    'message.horseSaved': 'Hevonen tallennettu.',
    'message.taskSaved': 'Tehtävä tallennettu.',
    'message.hoursSaved': 'Työtunnit tallennettu.',
    'message.inventorySaved': 'Rehuvaraston tuote tallennettu ja päivät päivitetty.',
    'message.deleteCancelled': 'Poisto peruttu. Tietoja ei muutettu.',
    'message.horseDeleted': 'Hevonen poistettu.',
    'message.taskDeleted': 'Tehtävä poistettu.',
    'message.hoursDeleted': 'Työkirjaus poistettu.',
    'message.inventoryDeleted': 'Rehuvaraston tuote poistettu.',
    'message.taskDone': 'Tehtävä merkitty valmiiksi.',
    'message.taskReopened': 'Tehtävä avattu uudelleen.',
    'message.backupExported': 'Varmuuskopio ladattu, {count} tallennettua tietuetta.',
    'message.backupImported': 'Varmuuskopio palautettu, {count} tallennettua tietuetta.',
    'message.importFailed': 'Tuonti epäonnistui: {error}',
    'message.languageChanged': 'Kieli päivitetty.',
    'confirm.delete': 'Poistetaanko {label}? Tätä ei voi perua.',
    'delete.horse': 'tämä hevonen',
    'delete.task': 'tämä tehtävä',
    'delete.hours': 'tämä työkirjaus',
    'delete.inventory': 'tämä rehuvaraston tuote',
    'release.loadingStatus': 'Ladataan työpöytäjulkaisun tietoja GitHubista.',
    'release.loadingButton': 'Tarkistetaan työpöytäjulkaisua...',
    'release.loadingChangelog': 'Haetaan muutoslokia GitHub Releases -julkaisuista.',
    'release.unavailable': 'Työpöytälataus ei ole vielä saatavilla.',
    'release.noRelease': 'Julkaisua ei ole vielä saatavilla',
    'release.latest': 'Uusin julkaisu',
    'release.downloadDesktop': 'Lataa työpöytäversio {version}',
    'release.installer': 'Työpöytäasennusohjelma: {name}',
    'release.downloadAvailable': 'lataus saatavilla',
    'release.noChangelog': 'Tälle julkaisulle ei ole muutoslokia.'
  },
  it: {
    'brand.subtitle': 'Gestione scuderia web',
    'language.label': 'Lingua',
    'nav.dashboard': 'Dashboard',
    'nav.app': 'App',
    'nav.desktop': 'Desktop',
    'hero.eyebrow': 'App browser locale',
    'hero.title': 'Gestisci la scuderia da qualsiasi browser moderno.',
    'hero.text': 'Tieni traccia di cavalli, lavori giornalieri, ore del personale e inventario mangimi. Tutto viene salvato localmente in questo browser, con strumenti di esportazione e importazione.',
    'hero.openApp': 'Apri EquiTrack Web',
    'summary.horses': 'Cavalli',
    'summary.openTasks': 'Attivita aperte',
    'summary.hoursLogged': 'Ore registrate',
    'summary.lowFeed': 'Mangimi in esaurimento',
    'workspace.eyebrow': 'Area di lavoro',
    'workspace.title': 'Usa EquiTrack direttamente nel browser.',
    'backup.export': 'Scarica backup',
    'backup.import': 'Ripristina backup',
    'tabs.horses': 'Cavalli',
    'tabs.tasks': 'Attivita',
    'tabs.hours': 'Ore lavoro',
    'tabs.inventory': 'Mangimi PRO',
    'horses.title': 'Gestione cavalli',
    'horses.subtitle': 'Aggiungi cavalli e tieni le note di cura sempre a portata di mano.',
    'horses.name': 'Nome cavallo',
    'horses.age': 'Eta',
    'horses.save': 'Salva cavallo',
    'horses.notesPlaceholder': 'Mangime, allenamento, veterinario o ferratura',
    'tasks.title': 'Attivita giornaliere',
    'tasks.subtitle': 'Pianifica e completa i lavori quotidiani della scuderia.',
    'tasks.task': 'Attivita',
    'tasks.placeholder': 'Giro mangime mattutino',
    'tasks.assignedHorse': 'Cavallo assegnato',
    'tasks.notesPlaceholder': 'Dettagli, operatore, posizione',
    'tasks.save': 'Salva attivita',
    'hours.title': 'Tracciamento ore lavoro',
    'hours.subtitle': 'Registra turni e note per ogni lavoro in scuderia.',
    'hours.worker': 'Operatore',
    'hours.hours': 'Ore',
    'hours.notesPlaceholder': 'Turno mattina, box puliti, alimentazione completata',
    'hours.save': 'Salva ore',
    'inventory.title': 'Inventario Mangimi PRO',
    'inventory.subtitle': 'Monitora categorie, uso giornaliero, giorni rimanenti stimati e avvisi di scorta.',
    'inventory.name': 'Nome mangime',
    'inventory.category': 'Tipo / categoria',
    'inventory.quantity': 'Quantita attuale',
    'inventory.unit': 'Unita',
    'inventory.dailyUsage': 'Uso giornaliero',
    'inventory.minimum': 'Soglia scorta bassa',
    'inventory.save': 'Salva inventario',
    'desktop.eyebrow': 'Versione desktop',
    'desktop.title': 'Preferisci un’app installabile?',
    'desktop.text': 'La versione browser funziona senza backend e salva i dati in questo browser. La versione desktop Electron e disponibile da GitHub Releases quando viene pubblicato un installer.',
    'desktop.latest': 'Ultima release desktop',
    'desktop.openReleases': 'Apri release',
    'footer.local': 'I dati sono salvati localmente nel browser.',
    'common.date': 'Data',
    'common.notes': 'Note di cura',
    'common.notesSimple': 'Note',
    'common.edit': 'Modifica',
    'common.delete': 'Elimina',
    'common.notSet': 'non impostata',
    'common.noNotes': 'Nessuna nota.',
    'common.hours': 'ore',
    'tasks.noHorseAssigned': 'Nessun cavallo assegnato',
    'tasks.noHorse': 'Nessun cavallo',
    'tasks.done': 'Completata',
    'tasks.open': 'Aperta',
    'tasks.reopen': 'Riapri',
    'empty.horses': 'Nessun cavallo salvato. Aggiungi il primo cavallo qui sopra.',
    'empty.tasks': 'Nessuna attivita salvata. Aggiungi alimentazione, pulizia, allenamento o cura.',
    'empty.hours': 'Nessuna ora registrata. Aggiungi un turno qui sopra.',
    'empty.inventory': 'Nessun mangime salvato. Aggiungi fieno, avena, pellet, integratori o altre scorte.',
    'feed.description': 'Inventario mangime: {category}',
    'feed.current': 'Attuale',
    'feed.dailyUsage': 'Uso giornaliero',
    'feed.daysLeft': 'Giorni rimasti',
    'feed.lowThreshold': 'Soglia bassa',
    'feed.notSet': 'Non impostato',
    'feed.ok': 'OK',
    'feed.low': 'Basso presto',
    'feed.critical': 'Critico',
    'feed.empty': 'Vuoto',
    'message.horseSaved': 'Cavallo salvato.',
    'message.taskSaved': 'Attivita salvata.',
    'message.hoursSaved': 'Ore di lavoro salvate.',
    'message.inventorySaved': 'Voce inventario salvata con giorni rimanenti aggiornati.',
    'message.deleteCancelled': 'Eliminazione annullata. Nessun dato modificato.',
    'message.horseDeleted': 'Cavallo eliminato.',
    'message.taskDeleted': 'Attivita eliminata.',
    'message.hoursDeleted': 'Registro ore eliminato.',
    'message.inventoryDeleted': 'Voce inventario mangimi eliminata.',
    'message.taskDone': 'Attivita segnata come completata.',
    'message.taskReopened': 'Attivita riaperta.',
    'message.backupExported': 'Backup esportato con {count} record salvati.',
    'message.backupImported': 'Backup ripristinato con {count} record salvati.',
    'message.importFailed': 'Importazione non riuscita: {error}',
    'message.languageChanged': 'Lingua aggiornata.',
    'confirm.delete': 'Eliminare {label}? Questa azione non puo essere annullata.',
    'delete.horse': 'questo cavallo',
    'delete.task': 'questa attivita',
    'delete.hours': 'questo registro ore',
    'delete.inventory': 'questa voce inventario mangimi',
    'release.loadingStatus': 'Caricamento informazioni release desktop da GitHub.',
    'release.loadingButton': 'Controllo release desktop...',
    'release.loadingChangelog': 'Recupero note di rilascio da GitHub Releases.',
    'release.unavailable': 'Il download desktop non e ancora disponibile.',
    'release.noRelease': 'Nessuna release disponibile',
    'release.latest': 'Ultima release',
    'release.downloadDesktop': 'Scarica desktop {version}',
    'release.installer': 'Installer desktop: {name}',
    'release.downloadAvailable': 'download disponibile',
    'release.noChangelog': 'Nessuna nota di rilascio disponibile.'
  }
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
if (!translations[currentLanguage]) currentLanguage = DEFAULT_LANGUAGE;

// Generate local IDs without depending on a server or a secure browser API.
function createId() {
  return `eq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// Initial demo data makes the app useful on first load and shows the data shape.
const defaultData = {
  horses: [
    { id: createId(), name: 'Aurora', age: 7, notes: 'Light feed at night. Training notes reviewed weekly.' },
    { id: createId(), name: 'Vento', age: 5, notes: 'Check water after turnout. Farrier due soon.' }
  ],
  tasks: [
    { id: createId(), title: 'Morning feed round', date: today(), horseId: '', notes: 'Hay, oats, and water check.', done: false },
    { id: createId(), title: 'Clean north aisle', date: today(), horseId: '', notes: 'Refresh bedding and sweep aisle.', done: true }
  ],
  hours: [
    { id: createId(), worker: 'Sara', date: today(), hours: 6.5, notes: 'Morning shift and feed inventory.' }
  ],
  inventory: [
    { id: createId(), name: 'Hay', category: 'Forage', quantity: 42, unit: 'bales', dailyUsage: 3.5, minimum: 12 },
    { id: createId(), name: 'Oats', category: 'Grain', quantity: 180, unit: 'kg', dailyUsage: 12, minimum: 45 },
    { id: createId(), name: 'Pellets', category: 'Concentrate', quantity: 28, unit: 'bags', dailyUsage: 2, minimum: 10 }
  ]
};

let state = loadData();

const els = {
  horseCount: document.querySelector('#horseCount'),
  openTaskCount: document.querySelector('#openTaskCount'),
  hoursTotal: document.querySelector('#hoursTotal'),
  lowFeedCount: document.querySelector('#lowFeedCount'),
  appMessage: document.querySelector('#appMessage'),
  horsesList: document.querySelector('#horsesList'),
  tasksList: document.querySelector('#tasksList'),
  hoursList: document.querySelector('#hoursList'),
  inventoryList: document.querySelector('#inventoryList'),
  horseForm: document.querySelector('#horseForm'),
  taskForm: document.querySelector('#taskForm'),
  hoursForm: document.querySelector('#hoursForm'),
  inventoryForm: document.querySelector('#inventoryForm'),
  exportButton: document.querySelector('#exportButton'),
  importInput: document.querySelector('#importInput'),
  downloadButton: document.querySelector('#desktopDownloadButton'),
  releaseStatus: document.querySelector('#releaseStatus'),
  latestVersion: document.querySelector('#latestVersion'),
  changelog: document.querySelector('#changelog'),
  releasePageLink: document.querySelector('#releasePageLink'),
  languageSelect: document.querySelector('#languageSelect')
};

function t(key, params = {}) {
  const dictionary = translations[currentLanguage] || translations.en;
  let text = dictionary[key] || translations.en[key] || key;
  Object.entries(params).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, value);
  });
  return text;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  els.languageSelect.value = currentLanguage;
}

// Return today's date in the yyyy-mm-dd format expected by date inputs.
function today() {
  return new Date().toISOString().slice(0, 10);
}

// Safely escape user-entered text before rendering it as HTML.
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Read app data from localStorage, falling back to demo data if nothing is stored yet.
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return JSON.parse(JSON.stringify(defaultData));
    const parsed = JSON.parse(stored);
    return {
      horses: Array.isArray(parsed.horses) ? parsed.horses : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      hours: Array.isArray(parsed.hours) ? parsed.hours : [],
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory.map(normalizeFeedItem) : []
    };
  } catch (_error) {
    return JSON.parse(JSON.stringify(defaultData));
  }
}

// Persist the full app state in this browser.
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Show a short status message after save, import, export, and delete actions.
function showMessage(message) {
  els.appMessage.textContent = message;
  window.clearTimeout(showMessage.timer);
  showMessage.timer = window.setTimeout(() => {
    els.appMessage.textContent = '';
  }, 3200);
}

function confirmDelete(label) {
  return window.confirm(t('confirm.delete', { label }));
}

// Build the horse selector used by the task form.
function renderHorseOptions() {
  const options = [`<option value="">${t('tasks.noHorseAssigned')}</option>`]
    .concat(state.horses.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`));
  els.taskForm.elements.horseId.innerHTML = options.join('');
}

// Render all app modules after each data change.
function render() {
  renderSummary();
  renderHorseOptions();
  renderHorses();
  renderTasks();
  renderHours();
  renderInventory();
}

function renderSummary() {
  els.horseCount.textContent = state.horses.length;
  els.openTaskCount.textContent = state.tasks.filter((task) => !task.done).length;
  els.hoursTotal.textContent = state.hours.reduce((total, entry) => total + Number(entry.hours || 0), 0).toFixed(1);
  els.lowFeedCount.textContent = state.inventory.filter((item) => {
    const status = getFeedStatus(item).key;
    return status === 'low' || status === 'critical' || status === 'empty';
  }).length;
}

function renderHorses() {
  if (state.horses.length === 0) {
    els.horsesList.innerHTML = `<p class="empty-state">${t('empty.horses')}</p>`;
    return;
  }

  els.horsesList.innerHTML = state.horses.map((horse) => `
    <article class="item-card">
      <div>
        <h4>${escapeHtml(horse.name)}</h4>
        <p>${escapeHtml(horse.notes || t('common.noNotes'))}</p>
        <div class="item-meta">
          <span class="pill">${t('horses.age')}: ${escapeHtml(horse.age || t('common.notSet'))}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-horse" data-id="${horse.id}">${t('common.edit')}</button>
        <button class="button ghost danger" type="button" data-action="delete-horse" data-id="${horse.id}">${t('common.delete')}</button>
      </div>
    </article>
  `).join('');
}

function renderTasks() {
  if (state.tasks.length === 0) {
    els.tasksList.innerHTML = `<p class="empty-state">${t('empty.tasks')}</p>`;
    return;
  }

  const sortedTasks = [...state.tasks].sort((a, b) => a.date.localeCompare(b.date));
  els.tasksList.innerHTML = sortedTasks.map((task) => {
    const horse = state.horses.find((item) => item.id === task.horseId);
    return `
      <article class="item-card">
        <div>
          <h4>${escapeHtml(task.title)}</h4>
          <p>${escapeHtml(task.notes || t('common.noNotes'))}</p>
          <div class="item-meta">
            <span class="pill">${escapeHtml(task.date)}</span>
            <span class="pill">${horse ? escapeHtml(horse.name) : t('tasks.noHorse')}</span>
            <span class="pill ${task.done ? 'good' : 'warn'}">${task.done ? t('tasks.done') : t('tasks.open')}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="toggle-task" data-id="${task.id}">${task.done ? t('tasks.reopen') : t('tasks.done')}</button>
          <button class="button ghost" type="button" data-action="edit-task" data-id="${task.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-task" data-id="${task.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderHours() {
  if (state.hours.length === 0) {
    els.hoursList.innerHTML = `<p class="empty-state">${t('empty.hours')}</p>`;
    return;
  }

  els.hoursList.innerHTML = state.hours.map((entry) => `
    <article class="item-card">
      <div>
        <h4>${escapeHtml(entry.worker)}</h4>
        <p>${escapeHtml(entry.notes || t('common.noNotes'))}</p>
        <div class="item-meta">
          <span class="pill">${escapeHtml(entry.date)}</span>
          <span class="pill">${Number(entry.hours || 0).toFixed(2)} ${t('common.hours')}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-hours" data-id="${entry.id}">${t('common.edit')}</button>
        <button class="button ghost danger" type="button" data-action="delete-hours" data-id="${entry.id}">${t('common.delete')}</button>
      </div>
    </article>
  `).join('');
}

function renderInventory() {
  if (state.inventory.length === 0) {
    els.inventoryList.innerHTML = `<p class="empty-state">${t('empty.inventory')}</p>`;
    return;
  }

  els.inventoryList.innerHTML = state.inventory.map((item) => {
    const normalized = normalizeFeedItem(item);
    const status = getFeedStatus(normalized);
    const daysRemaining = getDaysRemaining(normalized);
    return `
      <article class="item-card feed-card">
        <div class="feed-main">
          <div>
            <h4>${escapeHtml(normalized.name)}</h4>
            <p>${escapeHtml(t('feed.description', { category: normalized.category }))}</p>
          </div>
          <span class="pill ${status.className}">${t(`feed.${status.key}`)}</span>
        </div>
        <div class="feed-stats">
          <div>
            <span class="meta-label">${t('feed.current')}</span>
            <strong>${formatNumber(normalized.quantity)} ${escapeHtml(normalized.unit)}</strong>
          </div>
          <div>
            <span class="meta-label">${t('feed.dailyUsage')}</span>
            <strong>${formatNumber(normalized.dailyUsage)} ${escapeHtml(normalized.unit)}</strong>
          </div>
          <div>
            <span class="meta-label">${t('feed.daysLeft')}</span>
            <strong>${daysRemaining}</strong>
          </div>
          <div>
            <span class="meta-label">${t('feed.lowThreshold')}</span>
            <strong>${formatNumber(normalized.minimum)} ${escapeHtml(normalized.unit)}</strong>
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-inventory" data-id="${normalized.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-inventory" data-id="${normalized.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function normalizeFeedItem(item) {
  return {
    id: item.id || createId(),
    name: item.name || 'Unnamed feed',
    category: item.category || item.type || 'General',
    quantity: Number(item.quantity ?? item.currentAmount ?? 0),
    unit: item.unit || 'units',
    dailyUsage: Number(item.dailyUsage ?? item.daily_use ?? 0),
    minimum: Number(item.minimum ?? item.threshold ?? 0)
  };
}

function getDaysRemaining(item) {
  if (Number(item.quantity) <= 0) return '0';
  if (Number(item.dailyUsage) <= 0) return t('feed.notSet');
  return Math.floor(Number(item.quantity) / Number(item.dailyUsage)).toString();
}

function getFeedStatus(item) {
  const quantity = Number(item.quantity);
  const minimum = Number(item.minimum);
  const days = Number(item.dailyUsage) > 0 ? quantity / Number(item.dailyUsage) : Infinity;

  if (quantity <= 0) return { key: 'empty', className: 'empty' };
  if (quantity <= minimum || days <= 3) return { key: 'critical', className: 'critical' };
  if (quantity <= minimum * 1.5 || days <= 7) return { key: 'low', className: 'warn' };
  return { key: 'ok', className: 'good' };
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Create or update an item from a form.
function upsert(collection, item) {
  const existingIndex = state[collection].findIndex((entry) => entry.id === item.id);
  if (existingIndex >= 0) {
    state[collection][existingIndex] = item;
  } else {
    state[collection].push({ ...item, id: createId() });
  }
  saveData();
  render();
}

function resetForm(form) {
  form.reset();
  form.elements.id.value = '';
}

function handleHorseSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('horses', {
    id: form.elements.id.value,
    name: form.elements.name.value.trim(),
    age: form.elements.age.value,
    notes: form.elements.notes.value.trim()
  });
  resetForm(form);
  showMessage(t('message.horseSaved'));
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('tasks', {
    id: form.elements.id.value,
    title: form.elements.title.value.trim(),
    date: form.elements.date.value,
    horseId: form.elements.horseId.value,
    notes: form.elements.notes.value.trim(),
    done: state.tasks.find((task) => task.id === form.elements.id.value)?.done || false
  });
  resetForm(form);
  form.elements.date.value = today();
  showMessage(t('message.taskSaved'));
}

function handleHoursSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('hours', {
    id: form.elements.id.value,
    worker: form.elements.worker.value.trim(),
    date: form.elements.date.value,
    hours: Number(form.elements.hours.value),
    notes: form.elements.notes.value.trim()
  });
  resetForm(form);
  form.elements.date.value = today();
  showMessage(t('message.hoursSaved'));
}

function handleInventorySubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('inventory', {
    id: form.elements.id.value,
    name: form.elements.name.value.trim(),
    category: form.elements.category.value.trim(),
    quantity: Number(form.elements.quantity.value),
    unit: form.elements.unit.value.trim(),
    dailyUsage: Number(form.elements.dailyUsage.value),
    minimum: Number(form.elements.minimum.value)
  });
  resetForm(form);
  showMessage(t('message.inventorySaved'));
}

// Delegate edit/delete/toggle actions from all rendered item lists.
function handleListClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'edit-horse') fillHorseForm(id);
  if (action === 'delete-horse') deleteItem('horses', id, t('delete.horse'), t('message.horseDeleted'));
  if (action === 'toggle-task') toggleTask(id);
  if (action === 'edit-task') fillTaskForm(id);
  if (action === 'delete-task') deleteItem('tasks', id, t('delete.task'), t('message.taskDeleted'));
  if (action === 'edit-hours') fillHoursForm(id);
  if (action === 'delete-hours') deleteItem('hours', id, t('delete.hours'), t('message.hoursDeleted'));
  if (action === 'edit-inventory') fillInventoryForm(id);
  if (action === 'delete-inventory') deleteItem('inventory', id, t('delete.inventory'), t('message.inventoryDeleted'));
}

function fillHorseForm(id) {
  const horse = state.horses.find((item) => item.id === id);
  if (!horse) return;
  els.horseForm.elements.id.value = horse.id;
  els.horseForm.elements.name.value = horse.name;
  els.horseForm.elements.age.value = horse.age;
  els.horseForm.elements.notes.value = horse.notes;
  els.horseForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillTaskForm(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  els.taskForm.elements.id.value = task.id;
  els.taskForm.elements.title.value = task.title;
  els.taskForm.elements.date.value = task.date;
  els.taskForm.elements.horseId.value = task.horseId;
  els.taskForm.elements.notes.value = task.notes;
  els.taskForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillHoursForm(id) {
  const entry = state.hours.find((item) => item.id === id);
  if (!entry) return;
  els.hoursForm.elements.id.value = entry.id;
  els.hoursForm.elements.worker.value = entry.worker;
  els.hoursForm.elements.date.value = entry.date;
  els.hoursForm.elements.hours.value = entry.hours;
  els.hoursForm.elements.notes.value = entry.notes;
  els.hoursForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillInventoryForm(id) {
  const item = state.inventory.find((entry) => entry.id === id);
  if (!item) return;
  els.inventoryForm.elements.id.value = item.id;
  els.inventoryForm.elements.name.value = item.name;
  els.inventoryForm.elements.category.value = item.category || item.type || 'General';
  els.inventoryForm.elements.quantity.value = item.quantity;
  els.inventoryForm.elements.unit.value = item.unit;
  els.inventoryForm.elements.dailyUsage.value = item.dailyUsage ?? 0;
  els.inventoryForm.elements.minimum.value = item.minimum;
  els.inventoryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteItem(collection, id, label, message) {
  if (!confirmDelete(label)) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  state[collection] = state[collection].filter((item) => item.id !== id);
  saveData();
  render();
  showMessage(message);
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  saveData();
  render();
  showMessage(task.done ? t('message.taskDone') : t('message.taskReopened'));
}

// Export all local browser data as a JSON backup file.
function exportBackup() {
  const backup = {
    app: 'EquiTrack Web',
    exportedAt: new Date().toISOString(),
    data: state
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `equitrack-backup-${today()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  const itemCount = state.horses.length + state.tasks.length + state.hours.length + state.inventory.length;
  showMessage(t('message.backupExported', { count: itemCount }));
}

// Import a JSON backup and replace the current browser data.
async function importBackup(file) {
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const imported = parsed.data || parsed;
    if (!Array.isArray(imported.horses) || !Array.isArray(imported.tasks) || !Array.isArray(imported.hours) || !Array.isArray(imported.inventory)) {
      throw new Error('Backup file is missing EquiTrack data.');
    }
    state = {
      horses: imported.horses,
      tasks: imported.tasks,
      hours: imported.hours,
      inventory: imported.inventory.map(normalizeFeedItem)
    };
    saveData();
    render();
    const itemCount = state.horses.length + state.tasks.length + state.hours.length + state.inventory.length;
    showMessage(t('message.backupImported', { count: itemCount }));
  } catch (error) {
    showMessage(t('message.importFailed', { error: error.message }));
  } finally {
    els.importInput.value = '';
  }
}

// Switch between app modules without reloading the page.
function setupTabs() {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((tab) => tab.classList.remove('active'));
      document.querySelectorAll('.module-panel').forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      document.querySelector(`#${button.dataset.tab}Panel`).classList.add('active');
    });
  });
}

function handleLanguageChange(event) {
  currentLanguage = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyTranslations();
  render();
  showMessage(t('message.languageChanged'));
  loadLatestRelease();
}

// Escape release notes before inserting them, then make plain URLs clickable.
function formatChangelog(markdownText) {
  const text = markdownText?.trim() || t('release.noChangelog');
  return escapeHtml(text).replace(
    /(https?:\/\/[^\s)]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
  );
}

// Keep the desktop download area useful when no GitHub release or asset exists yet.
function showNoRelease() {
  const message = t('release.unavailable');
  els.downloadButton.textContent = message;
  els.downloadButton.classList.add('disabled');
  els.downloadButton.setAttribute('aria-disabled', 'true');
  els.downloadButton.removeAttribute('href');
  els.releaseStatus.textContent = message;
  els.latestVersion.textContent = t('release.noRelease');
  els.changelog.textContent = message;
}

// Fetch the latest release and point the desktop download button at the first asset.
async function loadLatestRelease() {
  try {
    const response = await fetch(LATEST_RELEASE_URL, {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (response.status === 404) {
      showNoRelease();
      return;
    }

    if (!response.ok) {
      throw new Error(`GitHub returned HTTP ${response.status}`);
    }

    const release = await response.json();
    const version = release.tag_name || t('release.latest');
    const firstAsset = release.assets?.[0];
    const downloadUrl = firstAsset?.browser_download_url;

    els.latestVersion.textContent = version;
    els.changelog.innerHTML = formatChangelog(release.body);
    if (release.html_url) els.releasePageLink.href = release.html_url;

    if (!downloadUrl) {
      showNoRelease();
      els.latestVersion.textContent = version;
      els.changelog.innerHTML = formatChangelog(release.body);
      return;
    }

    els.downloadButton.href = downloadUrl;
    els.downloadButton.textContent = t('release.downloadDesktop', { version });
    els.downloadButton.classList.remove('disabled');
    els.downloadButton.removeAttribute('aria-disabled');
    els.releaseStatus.textContent = t('release.installer', { name: firstAsset.name || t('release.downloadAvailable') });
  } catch (error) {
    showNoRelease();
  }
}

els.horseForm.addEventListener('submit', handleHorseSubmit);
els.taskForm.addEventListener('submit', handleTaskSubmit);
els.hoursForm.addEventListener('submit', handleHoursSubmit);
els.inventoryForm.addEventListener('submit', handleInventorySubmit);
els.horsesList.addEventListener('click', handleListClick);
els.tasksList.addEventListener('click', handleListClick);
els.hoursList.addEventListener('click', handleListClick);
els.inventoryList.addEventListener('click', handleListClick);
els.exportButton.addEventListener('click', exportBackup);
els.importInput.addEventListener('change', (event) => importBackup(event.target.files[0]));
els.languageSelect.addEventListener('change', handleLanguageChange);
els.taskForm.elements.date.value = today();
els.hoursForm.elements.date.value = today();

applyTranslations();
setupTabs();
render();
loadLatestRelease();
