const LATEST_RELEASE_URL = 'https://api.github.com/repos/vattunicolo/EquiTrack-Web/releases/latest';
const STORAGE_KEY = 'equitrack-web-data-v1';
const LANGUAGE_KEY = 'equitrack-web-language';
const DEFAULT_LANGUAGE = 'en';

function createId() {
  return `eq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

const translations = {
  en: {
    'brand.subtitle': 'Web stable manager',
    'nav.home': 'Home',
    'nav.stable': 'My Stable',
    'nav.calendar': 'Calendar',
    'nav.settings': 'Settings / Backup',
    'nav.menu': 'Menu',
    'home.eyebrow': 'Stable management in your browser',
    'home.title': 'EquiTrack keeps daily stable work organized.',
    'home.pitch': 'Manage horses, tasks, working hours, feed inventory, and race days in one local-first web app.',
    'home.cta': 'Open My Stable',
    'home.featureHorsesTitle': 'Horse records',
    'home.featureHorsesText': 'Keep horse notes and care details easy to find.',
    'home.featureTasksTitle': 'Daily work',
    'home.featureTasksText': 'Track stable jobs, work logs, and completion status.',
    'home.featureFeedTitle': 'Feed Inventory PRO',
    'home.featureFeedText': 'Estimate days remaining and catch low stock early.',
    'home.featureCalendarTitle': 'Race calendar',
    'home.featureCalendarText': 'Plan event days and see which horses are running.',
    'home.socialTitle': 'Connect',
    'home.socialHeading': 'Follow EquiTrack',
    'home.email': 'Email or contact',
    'stable.eyebrow': 'My Stable',
    'stable.title': 'Your daily stable workspace.',
    'summary.horses': 'Horses',
    'summary.openTasks': 'Open tasks',
    'summary.hoursLogged': 'Hours logged',
    'summary.lowFeed': 'Low feed items',
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
    'calendar.eyebrow': 'Calendar',
    'calendar.title': 'Plan race days and stable events.',
    'calendar.eventName': 'Event name',
    'calendar.eventPlaceholder': 'Spring race day',
    'calendar.location': 'Location',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Horse(s) running',
    'calendar.notesPlaceholder': 'Transport, start time, owner notes',
    'calendar.save': 'Save event',
    'calendar.empty': 'No calendar events yet. Add a race day or stable event above.',
    'calendar.upcoming': 'Upcoming event',
    'settings.eyebrow': 'Settings / Backup',
    'settings.title': 'Manage language, backups, and local data.',
    'settings.languageHelp': 'Choose interface language',
    'settings.backupTitle': 'Backup',
    'settings.backupText': 'Export a JSON backup or restore one you saved earlier.',
    'settings.desktopText': 'Desktop downloads use the latest GitHub Release asset.',
    'settings.resetTitle': 'Reset local data',
    'settings.resetText': 'This removes horses, tasks, work logs, feed inventory, and calendar events from this browser.',
    'settings.resetButton': 'Reset local data',
    'language.label': 'Language',
    'backup.export': 'Download backup',
    'backup.import': 'Restore backup',
    'desktop.eyebrow': 'Desktop version',
    'desktop.title': 'Prefer an installable app?',
    'desktop.text': 'The browser app stores data in this browser. The Electron desktop version is available from GitHub Releases.',
    'desktop.latest': 'Latest desktop release',
    'desktop.updateNote': 'Latest desktop update: v1.1.0 is now available from GitHub Releases.',
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
    'message.eventSaved': 'Calendar event saved.',
    'message.deleteCancelled': 'Delete cancelled. No data was changed.',
    'message.horseDeleted': 'Horse record deleted.',
    'message.taskDeleted': 'Daily task deleted.',
    'message.hoursDeleted': 'Work log deleted.',
    'message.inventoryDeleted': 'Feed inventory item deleted.',
    'message.eventDeleted': 'Calendar event deleted.',
    'message.taskDone': 'Task marked as done.',
    'message.taskReopened': 'Task reopened.',
    'message.backupExported': 'Backup exported with {count} saved records.',
    'message.backupImported': 'Backup restored with {count} saved records.',
    'message.importFailed': 'Import failed: {error}',
    'message.languageChanged': 'Language updated.',
    'message.resetDone': 'Local data reset.',
    'message.resetCancelled': 'Reset cancelled. No data was changed.',
    'confirm.delete': 'Delete {label}? This cannot be undone.',
    'confirm.reset': 'Type RESET to permanently delete all local EquiTrack data from this browser.',
    'delete.horse': 'this horse record',
    'delete.task': 'this daily task',
    'delete.hours': 'this work log',
    'delete.inventory': 'this feed inventory item',
    'delete.event': 'this calendar event',
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
    'nav.home': 'Etusivu',
    'nav.stable': 'Oma talli',
    'nav.calendar': 'Kalenteri',
    'nav.settings': 'Asetukset / varmuuskopio',
    'nav.menu': 'Valikko',
    'home.eyebrow': 'Tallinhallinta selaimessa',
    'home.title': 'EquiTrack pitää tallin arjen järjestyksessä.',
    'home.pitch': 'Hallitse hevosia, tehtäviä, työtunteja, rehuvarastoa ja kilpailupäiviä yhdessä paikallisessa verkkosovelluksessa.',
    'home.cta': 'Avaa oma talli',
    'home.featureHorsesTitle': 'Hevostiedot',
    'home.featureHorsesText': 'Pidä hevosten muistiinpanot ja hoitotiedot helposti löydettävissä.',
    'home.featureTasksTitle': 'Päivittäinen työ',
    'home.featureTasksText': 'Seuraa tallitöitä, työkirjauksia ja valmistumista.',
    'home.featureFeedTitle': 'Rehuvarasto PRO',
    'home.featureFeedText': 'Arvioi jäljellä olevat päivät ja huomaa vähäinen varasto ajoissa.',
    'home.featureCalendarTitle': 'Kilpailukalenteri',
    'home.featureCalendarText': 'Suunnittele tapahtumapäivät ja näe juoksevat hevoset.',
    'home.socialTitle': 'Yhteydet',
    'home.socialHeading': 'Seuraa EquiTrackia',
    'home.email': 'Sähköposti tai yhteys',
    'stable.eyebrow': 'Oma talli',
    'stable.title': 'Tallin päivittäinen työtila.',
    'summary.horses': 'Hevoset',
    'summary.openTasks': 'Avoimet tehtävät',
    'summary.hoursLogged': 'Kirjatut tunnit',
    'summary.lowFeed': 'Vähissä olevat rehut',
    'tabs.horses': 'Hevoset',
    'tabs.tasks': 'Tehtävät',
    'tabs.hours': 'Työtunnit',
    'tabs.inventory': 'Rehu PRO',
    'horses.title': 'Hevosten hallinta',
    'horses.subtitle': 'Lisää hevoset ja pidä hoitomuistiinpanot lähellä.',
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
    'inventory.subtitle': 'Seuraa rehuluokkia, päivittäistä käyttöä, jäljellä olevia päiviä ja varoituksia.',
    'inventory.name': 'Rehun nimi',
    'inventory.category': 'Tyyppi / luokka',
    'inventory.quantity': 'Nykyinen määrä',
    'inventory.unit': 'Yksikkö',
    'inventory.dailyUsage': 'Päiväkäyttö',
    'inventory.minimum': 'Alaraja',
    'inventory.save': 'Tallenna varastotuote',
    'calendar.eyebrow': 'Kalenteri',
    'calendar.title': 'Suunnittele kilpailupäivät ja tallitapahtumat.',
    'calendar.eventName': 'Tapahtuman nimi',
    'calendar.eventPlaceholder': 'Kevään kilpailupäivä',
    'calendar.location': 'Sijainti',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Juoksevat hevoset',
    'calendar.notesPlaceholder': 'Kuljetus, lähtöaika, omistajan muistiinpanot',
    'calendar.save': 'Tallenna tapahtuma',
    'calendar.empty': 'Kalenteritapahtumia ei ole vielä. Lisää kilpailupäivä tai tallitapahtuma.',
    'calendar.upcoming': 'Tuleva tapahtuma',
    'settings.eyebrow': 'Asetukset / varmuuskopio',
    'settings.title': 'Hallitse kieltä, varmuuskopioita ja paikallisia tietoja.',
    'settings.languageHelp': 'Valitse käyttöliittymän kieli',
    'settings.backupTitle': 'Varmuuskopio',
    'settings.backupText': 'Vie JSON-varmuuskopio tai palauta aiemmin tallennettu tiedosto.',
    'settings.desktopText': 'Työpöytälataukset käyttävät uusinta GitHub Release -tiedostoa.',
    'settings.resetTitle': 'Nollaa paikalliset tiedot',
    'settings.resetText': 'Tämä poistaa hevoset, tehtävät, työkirjaukset, rehuvaraston ja kalenteritapahtumat tästä selaimesta.',
    'settings.resetButton': 'Nollaa paikalliset tiedot',
    'language.label': 'Kieli',
    'backup.export': 'Lataa varmuuskopio',
    'backup.import': 'Palauta varmuuskopio',
    'desktop.eyebrow': 'Työpöytäversio',
    'desktop.title': 'Haluatko asennettavan sovelluksen?',
    'desktop.text': 'Selainversio tallentaa tiedot tähän selaimeen. Electron-työpöytäversio on saatavilla GitHub Releases -julkaisuista.',
    'desktop.latest': 'Uusin työpöytäjulkaisu',
    'desktop.updateNote': 'Uusin työpöytäpäivitys: v1.1.0 on nyt saatavilla GitHub Releases -julkaisuista.',
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
    'message.eventSaved': 'Kalenteritapahtuma tallennettu.',
    'message.deleteCancelled': 'Poisto peruttu. Tietoja ei muutettu.',
    'message.horseDeleted': 'Hevonen poistettu.',
    'message.taskDeleted': 'Tehtävä poistettu.',
    'message.hoursDeleted': 'Työkirjaus poistettu.',
    'message.inventoryDeleted': 'Rehuvaraston tuote poistettu.',
    'message.eventDeleted': 'Kalenteritapahtuma poistettu.',
    'message.taskDone': 'Tehtävä merkitty valmiiksi.',
    'message.taskReopened': 'Tehtävä avattu uudelleen.',
    'message.backupExported': 'Varmuuskopio ladattu, {count} tallennettua tietuetta.',
    'message.backupImported': 'Varmuuskopio palautettu, {count} tallennettua tietuetta.',
    'message.importFailed': 'Tuonti epäonnistui: {error}',
    'message.languageChanged': 'Kieli päivitetty.',
    'message.resetDone': 'Paikalliset tiedot nollattu.',
    'message.resetCancelled': 'Nollaus peruttu. Tietoja ei muutettu.',
    'confirm.delete': 'Poistetaanko {label}? Tätä ei voi perua.',
    'confirm.reset': 'Kirjoita RESET poistaaksesi kaikki tämän selaimen EquiTrack-tiedot pysyvästi.',
    'delete.horse': 'tämä hevonen',
    'delete.task': 'tämä tehtävä',
    'delete.hours': 'tämä työkirjaus',
    'delete.inventory': 'tämä rehuvaraston tuote',
    'delete.event': 'tämä kalenteritapahtuma',
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
    'nav.home': 'Home',
    'nav.stable': 'La mia scuderia',
    'nav.calendar': 'Calendario',
    'nav.settings': 'Impostazioni / backup',
    'nav.menu': 'Menu',
    'home.eyebrow': 'Gestione scuderia nel browser',
    'home.title': 'EquiTrack organizza il lavoro quotidiano in scuderia.',
    'home.pitch': 'Gestisci cavalli, attivita, ore di lavoro, inventario mangimi e giornate di gara in un’app web locale.',
    'home.cta': 'Apri La mia scuderia',
    'home.featureHorsesTitle': 'Schede cavalli',
    'home.featureHorsesText': 'Tieni note e dettagli di cura facili da trovare.',
    'home.featureTasksTitle': 'Lavoro giornaliero',
    'home.featureTasksText': 'Traccia lavori, registri ore e stato di completamento.',
    'home.featureFeedTitle': 'Inventario Mangimi PRO',
    'home.featureFeedText': 'Stima i giorni rimanenti e rileva presto le scorte basse.',
    'home.featureCalendarTitle': 'Calendario gare',
    'home.featureCalendarText': 'Pianifica eventi e vedi quali cavalli corrono.',
    'home.socialTitle': 'Contatti',
    'home.socialHeading': 'Segui EquiTrack',
    'home.email': 'Email o contatto',
    'stable.eyebrow': 'La mia scuderia',
    'stable.title': 'Il tuo spazio di lavoro quotidiano.',
    'summary.horses': 'Cavalli',
    'summary.openTasks': 'Attivita aperte',
    'summary.hoursLogged': 'Ore registrate',
    'summary.lowFeed': 'Mangimi bassi',
    'tabs.horses': 'Cavalli',
    'tabs.tasks': 'Attivita',
    'tabs.hours': 'Ore lavoro',
    'tabs.inventory': 'Mangimi PRO',
    'horses.title': 'Gestione cavalli',
    'horses.subtitle': 'Aggiungi cavalli e tieni le note di cura a portata di mano.',
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
    'calendar.eyebrow': 'Calendario',
    'calendar.title': 'Pianifica giornate di gara ed eventi.',
    'calendar.eventName': 'Nome evento',
    'calendar.eventPlaceholder': 'Giornata gare primavera',
    'calendar.location': 'Luogo',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Cavalli in gara',
    'calendar.notesPlaceholder': 'Trasporto, orario, note proprietario',
    'calendar.save': 'Salva evento',
    'calendar.empty': 'Nessun evento in calendario. Aggiungi una gara o un evento.',
    'calendar.upcoming': 'Evento in arrivo',
    'settings.eyebrow': 'Impostazioni / backup',
    'settings.title': 'Gestisci lingua, backup e dati locali.',
    'settings.languageHelp': 'Scegli lingua interfaccia',
    'settings.backupTitle': 'Backup',
    'settings.backupText': 'Esporta un backup JSON o ripristina un file salvato.',
    'settings.desktopText': 'I download desktop usano l’ultimo asset GitHub Release.',
    'settings.resetTitle': 'Reimposta dati locali',
    'settings.resetText': 'Rimuove cavalli, attivita, registri ore, inventario mangimi ed eventi da questo browser.',
    'settings.resetButton': 'Reimposta dati locali',
    'language.label': 'Lingua',
    'backup.export': 'Scarica backup',
    'backup.import': 'Ripristina backup',
    'desktop.eyebrow': 'Versione desktop',
    'desktop.title': 'Preferisci un’app installabile?',
    'desktop.text': 'La versione browser salva i dati in questo browser. La versione desktop Electron e disponibile da GitHub Releases.',
    'desktop.latest': 'Ultima release desktop',
    'desktop.updateNote': 'Ultimo aggiornamento desktop: v1.1.0 e ora disponibile da GitHub Releases.',
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
    'message.eventSaved': 'Evento calendario salvato.',
    'message.deleteCancelled': 'Eliminazione annullata. Nessun dato modificato.',
    'message.horseDeleted': 'Cavallo eliminato.',
    'message.taskDeleted': 'Attivita eliminata.',
    'message.hoursDeleted': 'Registro ore eliminato.',
    'message.inventoryDeleted': 'Voce inventario mangimi eliminata.',
    'message.eventDeleted': 'Evento calendario eliminato.',
    'message.taskDone': 'Attivita segnata come completata.',
    'message.taskReopened': 'Attivita riaperta.',
    'message.backupExported': 'Backup esportato con {count} record salvati.',
    'message.backupImported': 'Backup ripristinato con {count} record salvati.',
    'message.importFailed': 'Importazione non riuscita: {error}',
    'message.languageChanged': 'Lingua aggiornata.',
    'message.resetDone': 'Dati locali reimpostati.',
    'message.resetCancelled': 'Reimpostazione annullata. Nessun dato modificato.',
    'confirm.delete': 'Eliminare {label}? Questa azione non puo essere annullata.',
    'confirm.reset': 'Scrivi RESET per eliminare definitivamente tutti i dati locali di EquiTrack da questo browser.',
    'delete.horse': 'questo cavallo',
    'delete.task': 'questa attivita',
    'delete.hours': 'questo registro ore',
    'delete.inventory': 'questa voce inventario mangimi',
    'delete.event': 'questo evento calendario',
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
  ],
  calendarEvents: []
};

let state = loadData();
let activeView = 'home';

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
  eventsList: document.querySelector('#eventsList'),
  horseForm: document.querySelector('#horseForm'),
  taskForm: document.querySelector('#taskForm'),
  hoursForm: document.querySelector('#hoursForm'),
  inventoryForm: document.querySelector('#inventoryForm'),
  eventForm: document.querySelector('#eventForm'),
  exportButton: document.querySelector('#exportButton'),
  importInput: document.querySelector('#importInput'),
  resetDataButton: document.querySelector('#resetDataButton'),
  downloadButton: document.querySelector('#desktopDownloadButton'),
  settingsDownloadButton: document.querySelector('#settingsDesktopDownloadButton'),
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

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function toSafeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeFeedItem(item) {
  return {
    id: item.id || createId(),
    name: item.name || 'Unnamed feed',
    category: item.category || item.type || 'General',
    quantity: toSafeNumber(item.quantity ?? item.currentAmount),
    unit: item.unit || 'units',
    dailyUsage: toSafeNumber(item.dailyUsage ?? item.daily_use),
    minimum: toSafeNumber(item.minimum ?? item.threshold)
  };
}

function normalizeCalendarEvent(item) {
  return {
    id: item.id || createId(),
    date: item.date || today(),
    name: item.name || item.title || '',
    location: item.location || '',
    horseIds: Array.isArray(item.horseIds) ? item.horseIds : [],
    notes: item.notes || ''
  };
}

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return JSON.parse(JSON.stringify(defaultData));
    const parsed = JSON.parse(stored);
    return {
      horses: Array.isArray(parsed.horses) ? parsed.horses : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      hours: Array.isArray(parsed.hours) ? parsed.hours : [],
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory.map(normalizeFeedItem) : [],
      calendarEvents: Array.isArray(parsed.calendarEvents) ? parsed.calendarEvents.map(normalizeCalendarEvent) : []
    };
  } catch (_error) {
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

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

function showView(viewName) {
  activeView = viewName;
  document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
  document.querySelector(`#${viewName}View`).classList.add('active');
  document.querySelectorAll('[data-view-link]').forEach((button) => {
    button.classList.toggle('active', button.dataset.viewLink === viewName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupViewNav() {
  document.querySelectorAll('[data-view-link]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      showView(button.dataset.viewLink);
      button.closest('.mobile-nav')?.removeAttribute('open');
    });
  });
}

function renderHorseOptions() {
  const singleOptions = [`<option value="">${t('tasks.noHorseAssigned')}</option>`]
    .concat(state.horses.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`));
  els.taskForm.elements.horseId.innerHTML = singleOptions.join('');

  els.eventForm.elements.horseIds.innerHTML = state.horses
    .map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`)
    .join('');
}

function render() {
  renderSummary();
  renderHorseOptions();
  renderHorses();
  renderTasks();
  renderHours();
  renderInventory();
  renderEvents();
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
        <div class="item-meta"><span class="pill">${t('horses.age')}: ${escapeHtml(horse.age || t('common.notSet'))}</span></div>
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
          <div><span class="meta-label">${t('feed.current')}</span><strong>${formatNumber(normalized.quantity)} ${escapeHtml(normalized.unit)}</strong></div>
          <div><span class="meta-label">${t('feed.dailyUsage')}</span><strong>${formatNumber(normalized.dailyUsage)} ${escapeHtml(normalized.unit)}</strong></div>
          <div><span class="meta-label">${t('feed.daysLeft')}</span><strong>${daysRemaining}</strong></div>
          <div><span class="meta-label">${t('feed.lowThreshold')}</span><strong>${formatNumber(normalized.minimum)} ${escapeHtml(normalized.unit)}</strong></div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-inventory" data-id="${normalized.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-inventory" data-id="${normalized.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderEvents() {
  if (state.calendarEvents.length === 0) {
    els.eventsList.innerHTML = `<p class="empty-state">${t('calendar.empty')}</p>`;
    return;
  }
  const sortedEvents = [...state.calendarEvents].sort((a, b) => a.date.localeCompare(b.date));
  els.eventsList.innerHTML = sortedEvents.map((event) => {
    const horses = event.horseIds
      .map((id) => state.horses.find((horse) => horse.id === id)?.name)
      .filter(Boolean);
    return `
      <article class="item-card">
        <div>
          <h4>${escapeHtml(event.name)}</h4>
          <p>${escapeHtml(event.notes || t('common.noNotes'))}</p>
          <div class="item-meta">
            <span class="pill">${escapeHtml(event.date)}</span>
            <span class="pill">${escapeHtml(event.location || t('common.notSet'))}</span>
            <span class="pill">${horses.length ? escapeHtml(horses.join(', ')) : t('tasks.noHorse')}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-event" data-id="${event.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-event" data-id="${event.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
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

function upsert(collection, item) {
  const existingIndex = state[collection].findIndex((entry) => entry.id === item.id);
  if (existingIndex >= 0) state[collection][existingIndex] = item;
  else state[collection].push({ ...item, id: createId() });
  saveData();
  render();
}

function resetForm(form) {
  form.reset();
  form.elements.id.value = '';
}

function getSelectedOptions(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
}

function setSelectedOptions(select, values) {
  Array.from(select.options).forEach((option) => {
    option.selected = values.includes(option.value);
  });
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

function handleEventSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('calendarEvents', {
    id: form.elements.id.value,
    date: form.elements.date.value,
    name: form.elements.name.value.trim(),
    location: form.elements.location.value.trim(),
    horseIds: getSelectedOptions(form.elements.horseIds),
    notes: form.elements.notes.value.trim()
  });
  resetForm(form);
  form.elements.date.value = today();
  showMessage(t('message.eventSaved'));
}

function handleListClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
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
  if (action === 'edit-event') fillEventForm(id);
  if (action === 'delete-event') deleteItem('calendarEvents', id, t('delete.event'), t('message.eventDeleted'));
}

function fillHorseForm(id) {
  const horse = state.horses.find((item) => item.id === id);
  if (!horse) return;
  els.horseForm.elements.id.value = horse.id;
  els.horseForm.elements.name.value = horse.name;
  els.horseForm.elements.age.value = horse.age;
  els.horseForm.elements.notes.value = horse.notes;
  showView('stable');
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

function fillEventForm(id) {
  const item = state.calendarEvents.find((entry) => entry.id === id);
  if (!item) return;
  els.eventForm.elements.id.value = item.id;
  els.eventForm.elements.date.value = item.date;
  els.eventForm.elements.name.value = item.name;
  els.eventForm.elements.location.value = item.location;
  els.eventForm.elements.notes.value = item.notes;
  setSelectedOptions(els.eventForm.elements.horseIds, item.horseIds);
  els.eventForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

function exportBackup() {
  const backup = { app: 'EquiTrack Web', exportedAt: new Date().toISOString(), data: state };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `equitrack-backup-${today()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  const itemCount = state.horses.length + state.tasks.length + state.hours.length + state.inventory.length + state.calendarEvents.length;
  showMessage(t('message.backupExported', { count: itemCount }));
}

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
      inventory: imported.inventory.map(normalizeFeedItem),
      calendarEvents: Array.isArray(imported.calendarEvents) ? imported.calendarEvents.map(normalizeCalendarEvent) : []
    };
    saveData();
    render();
    const itemCount = state.horses.length + state.tasks.length + state.hours.length + state.inventory.length + state.calendarEvents.length;
    showMessage(t('message.backupImported', { count: itemCount }));
  } catch (error) {
    showMessage(t('message.importFailed', { error: error.message }));
  } finally {
    els.importInput.value = '';
  }
}

function resetLocalData() {
  const answer = window.prompt(t('confirm.reset'));
  if (answer !== 'RESET') {
    showMessage(t('message.resetCancelled'));
    return;
  }
  state = { horses: [], tasks: [], hours: [], inventory: [], calendarEvents: [] };
  saveData();
  render();
  showMessage(t('message.resetDone'));
}

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

function formatChangelog(markdownText) {
  const text = markdownText?.trim() || t('release.noChangelog');
  return escapeHtml(text).replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
}

function setDownloadButtonUnavailable(button, message) {
  button.textContent = message;
  button.classList.add('disabled');
  button.setAttribute('aria-disabled', 'true');
  button.removeAttribute('href');
}

function showNoRelease() {
  const message = t('release.unavailable');
  setDownloadButtonUnavailable(els.downloadButton, message);
  setDownloadButtonUnavailable(els.settingsDownloadButton, message);
  els.releaseStatus.textContent = message;
  els.latestVersion.textContent = t('release.noRelease');
  els.changelog.textContent = message;
}

async function loadLatestRelease() {
  try {
    const response = await fetch(LATEST_RELEASE_URL, { headers: { Accept: 'application/vnd.github+json' } });
    if (response.status === 404) {
      showNoRelease();
      return;
    }
    if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);

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

    [els.downloadButton, els.settingsDownloadButton].forEach((button) => {
      button.href = downloadUrl;
      button.textContent = t('release.downloadDesktop', { version });
      button.classList.remove('disabled');
      button.removeAttribute('aria-disabled');
    });
    els.releaseStatus.textContent = t('release.installer', { name: firstAsset.name || t('release.downloadAvailable') });
  } catch (_error) {
    showNoRelease();
  }
}

document.querySelectorAll('.item-list').forEach((list) => list.addEventListener('click', handleListClick));
els.horseForm.addEventListener('submit', handleHorseSubmit);
els.taskForm.addEventListener('submit', handleTaskSubmit);
els.hoursForm.addEventListener('submit', handleHoursSubmit);
els.inventoryForm.addEventListener('submit', handleInventorySubmit);
els.eventForm.addEventListener('submit', handleEventSubmit);
els.exportButton.addEventListener('click', exportBackup);
els.importInput.addEventListener('change', (event) => importBackup(event.target.files[0]));
els.resetDataButton.addEventListener('click', resetLocalData);
els.languageSelect.addEventListener('change', handleLanguageChange);
els.taskForm.elements.date.value = today();
els.hoursForm.elements.date.value = today();
els.eventForm.elements.date.value = today();

applyTranslations();
setupViewNav();
setupTabs();
render();
loadLatestRelease();
