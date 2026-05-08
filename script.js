const STORAGE_KEY = 'equitrack-web-data-v1';
const LANGUAGE_KEY = 'equitrack-web-language';
const LAST_BACKUP_KEY = 'equitrack-web-last-backup';
const EMERGENCY_BACKUP_KEY = 'equitrack-web-emergency-backup';
const ONBOARDING_KEY = 'equitrack-web-onboarding-complete';
const DEFAULT_LANGUAGE = 'en';
const EVENT_TYPES = ['race', 'training', 'shoeing', 'vaccination', 'vet', 'feeding', 'other'];
const PROTECTED_VIEWS = ['stable', 'calendar', 'settings'];

const SUPABASE_CONFIG = {
  SUPABASE_URL: 'https://fuojlxcexpnszepgjpbv.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_6_byc2-epHvcZw1g5LlFOg_wAGSYMkU'
};

// Never put service_role key in browser code.
// Admin user creation must happen later via a Supabase Edge Function or trusted server.

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
    'home.localTitle': 'Browser-first',
    'home.localHeading': 'Your stable data stays on this device.',
    'home.localText': 'EquiTrack runs directly in the browser and stores horses, tasks, work hours, feed inventory, and events locally.',
    'home.backupReminder': 'Use Settings / Backup to export a JSON backup whenever you want a safe copy.',
    'onboarding.eyebrow': 'First steps',
    'onboarding.title': 'Set up EquiTrack in a few minutes.',
    'onboarding.text': 'Start with the essentials: your horses, feed stock, calendar, and a backup.',
    'onboarding.stepHorse': 'Add your first horse',
    'onboarding.stepFeed': 'Add feed inventory',
    'onboarding.stepEvent': 'Add a calendar event',
    'onboarding.stepBackup': 'Export your first backup',
    'onboarding.start': 'Open My Stable',
    'onboarding.skip': 'Skip for now',
    'onboarding.restartTitle': 'Onboarding',
    'onboarding.restartText': 'Show the first-use setup guide again.',
    'onboarding.restart': 'Restart onboarding',
    'message.onboardingDone': 'Onboarding hidden. You can restart it from Settings / Backup.',
    'message.onboardingRestarted': 'Onboarding restarted.',
    'auth.eyebrow': 'Account access',
    'auth.title': 'Log in to EquiTrack',
    'auth.description': 'Use an existing account created by the EquiTrack admin. Stable data stays in this browser for now.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.emailPlaceholder': 'you@example.com',
    'auth.passwordPlaceholder': 'Password',
    'auth.login': 'Log in',
    'auth.logout': 'Log out',
    'auth.signedOut': 'Signed out',
    'auth.setupNeeded': 'Supabase is not configured yet. Add your Supabase URL and anon key in script.js to enable login.',
    'auth.setupReady': 'Login is ready for existing Supabase users.',
    'auth.noRegistration': 'No public sign-up is available. Accounts are created by the administrator.',
    'message.authProtected': 'Please log in to open this section.',
    'message.authConfigMissing': 'Supabase login is not configured yet.',
    'message.authLoading': 'Checking login session...',
    'message.authLoginSuccess': 'Logged in.',
    'message.authLogoutSuccess': 'Logged out.',
    'message.authLoginFailed': 'Login failed: {error}',
    'stable.eyebrow': 'My Stable',
    'stable.title': 'Your daily stable workspace.',
    'summary.horses': 'Horses',
    'summary.openTasks': 'Open tasks',
    'summary.todayTasks': "Today's tasks",
    'summary.hoursLogged': 'Hours logged',
    'summary.lowFeed': 'Low feed items',
    'summary.upcomingEvents': 'Upcoming events',
    'today.title': 'Today at the stable',
    'today.subtitle': 'Tasks, events, and feed warnings that need attention now.',
    'today.empty': 'Nothing urgent today. Your stable day looks calm.',
    'today.tasksDue': 'Tasks due today',
    'today.eventsToday': 'Calendar events today',
    'today.feedWarnings': 'Feed warnings',
    'quick.addHorse': 'Add horse',
    'quick.addTask': 'Add task',
    'quick.addHours': 'Add work hours',
    'quick.addFeed': 'Add feed item',
    'quick.addEvent': 'Add calendar event',
    'empty.actionHorse': 'Add your first horse',
    'empty.actionTask': 'Add a task',
    'empty.actionHours': 'Add work hours',
    'empty.actionFeed': 'Add feed item',
    'tabs.horses': 'Horses',
    'tabs.tasks': 'Tasks',
    'tabs.hours': 'Work hours',
    'tabs.inventory': 'Feed Inventory',
    'horses.title': 'Horse Profile PRO',
    'horses.subtitle': "Keep each horse's identity, care, feeding, and health notes in one clear profile.",
    'horses.optionalHelp': 'Only the horse name is required. Add the details you need now and fill the rest later.',
    'horses.basicInfo': 'Basic info',
    'horses.care': 'Care',
    'horses.feeding': 'Feeding',
    'horses.health': 'Health',
    'horses.notesGroup': 'Notes',
    'horses.name': 'Horse name',
    'horses.nickname': 'Stable name / nickname',
    'horses.owner': 'Owner',
    'horses.breed': 'Breed',
    'horses.birth': 'Date of birth or birth year',
    'horses.gender': 'Gender',
    'horses.color': 'Color',
    'horses.registration': 'Registration number',
    'horses.feedingNotes': 'Feeding notes',
    'horses.careNotes': 'Care notes',
    'horses.shoeingNotes': 'Shoeing notes',
    'horses.vaccinationNotes': 'Vaccination notes',
    'horses.dewormingNotes': 'Deworming notes',
    'horses.vetNotes': 'Vet / contact notes',
    'horses.generalNotes': 'General notes',
    'horses.feedingPlaceholder': 'Feed plan and supplements',
    'horses.carePlaceholder': 'Daily care, handling, routines',
    'horses.save': 'Save horse record',
    'horses.notesPlaceholder': 'Training, temperament, or other notes',
    'horses.viewDetails': 'View full profile',
    'horses.hideDetails': 'Hide full profile',
    'horses.profileEmpty': 'No extra profile details yet.',
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
    'inventory.title': 'Feed Inventory PRO 2.0',
    'inventory.subtitle': 'Track stock, usage, suppliers, storage, horse consumption, and shopping needs.',
    'inventory.name': 'Feed item name',
    'inventory.category': 'Type / category',
    'inventory.quantity': 'Current amount',
    'inventory.unit': 'Unit',
    'inventory.dailyUsage': 'Daily usage',
    'inventory.minimum': 'Low stock threshold',
    'inventory.advanced': 'Advanced details, optional',
    'inventory.supplier': 'Supplier / shop',
    'inventory.purchaseDate': 'Purchase date',
    'inventory.expiryDate': 'Expiry date',
    'inventory.storageLocation': 'Storage location',
    'inventory.cost': 'Cost / price',
    'inventory.notesPlaceholder': 'Delivery notes, batch, supplier contact',
    'inventory.horseUsage': 'Per-horse consumption, optional',
    'inventory.assignedHorses': 'Assigned horses',
    'inventory.perHorseUsage': 'Daily usage per horse',
    'inventory.save': 'Save inventory item',
    'shopping.title': 'Shopping list',
    'shopping.subtitle': 'Low, critical, and empty feed items appear here automatically.',
    'shopping.empty': 'No feed items need shopping right now.',
    'shopping.added': 'Added to shopping list',
    'shopping.markAdded': 'Mark added',
    'shopping.markNeeded': 'Mark needed',
    'calendar.eyebrow': 'Calendar PRO',
    'calendar.title': 'Plan race days and stable events.',
    'calendar.eventName': 'Event name',
    'calendar.eventPlaceholder': 'Spring race day',
    'calendar.type': 'Event type',
    'calendar.location': 'Location',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Horse(s) running',
    'calendar.handler': 'Driver / rider / handler',
    'calendar.raceOptional': 'Race details, optional',
    'calendar.raceNumber': 'Race number',
    'calendar.startNumber': 'Start number',
    'calendar.driver': 'Driver',
    'calendar.placement': 'Placement',
    'calendar.result': 'Race time / result',
    'calendar.prize': 'Prize',
    'calendar.postRaceNotes': 'Post-race notes',
    'calendar.today': 'Today',
    'calendar.nextSeven': 'Next 7 days',
    'calendar.scheduledHorses': 'Scheduled horses',
    'calendar.plannerTitle': 'Today / This week',
    'calendar.plannerSubtitle': 'Quickly see what is scheduled and which horses are involved.',
    'calendar.plannerEmpty': 'Nothing scheduled for today or the next 7 days.',
    'calendar.todayEvents': 'Events today',
    'calendar.weekEvents': 'Next 7 days',
    'calendar.horsesScheduled': 'Horses scheduled',
    'calendar.filterScope': 'Show',
    'calendar.filterAll': 'All events',
    'calendar.filterUpcoming': 'Upcoming events',
    'calendar.filterPast': 'Past events',
    'calendar.filterType': 'Event type',
    'calendar.filterHorse': 'Horse',
    'calendar.allTypes': 'All event types',
    'calendar.allHorses': 'All horses',
    'calendar.past': 'Past event',
    'calendar.raceDetails': 'Race details',
    'calendar.notesPlaceholder': 'Transport, start time, owner notes',
    'calendar.save': 'Save event',
    'calendar.empty': 'No calendar events yet. Add a race day or stable event above.',
    'calendar.upcoming': 'Upcoming event',
    'calendar.noFilteredEvents': 'No events match these filters.',
    'settings.eyebrow': 'Settings / Backup',
    'settings.title': 'Manage language, backups, and local data.',
    'settings.languageHelp': 'Choose interface language',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Export a dated JSON backup or safely preview and restore one you saved earlier.',
    'settings.backupPreviewTitle': 'Import preview',
    'settings.backupPreviewText': 'When you choose a backup file, EquiTrack shows counts before replacing local data.',
    'settings.resetTitle': 'Reset local data',
    'settings.resetText': 'This removes horses, tasks, work logs, feed inventory, and calendar events from this browser.',
    'settings.resetButton': 'Reset local data',
    'language.label': 'Language',
    'backup.export': 'Download backup',
    'backup.import': 'Restore backup',
    'backup.noPreview': 'No backup selected.',
    'backup.preview': 'Backup preview: {horses} horses, {tasks} tasks, {hours} work logs, {inventory} feed items, {events} calendar events.',
    'backup.confirmImport': 'Import this backup and replace current local data?',
    'backup.lastExport': 'Last export',
    'backup.storageHelp': 'Data is stored locally in this browser. Export backups regularly.',
    'backup.restorePrevious': 'Restore previous data',
    'backup.restoreHelp': 'Available after an import. Restores the local data saved just before the last import.',
    'backup.noEmergency': 'No previous import backup is available yet.',
    'backup.confirmRestore': 'Restore the local data saved before the last import?',
    'backup.errorInvalidJson': 'The selected file is not valid JSON.',
    'backup.errorInvalidShape': 'This does not look like an EquiTrack backup.',
    'pwa.installTitle': 'Install EquiTrack',
    'pwa.installText': 'Use EquiTrack like an app from your phone or computer.',
    'pwa.installIos': 'iPhone / Safari: Share -> Add to Home Screen.',
    'pwa.installAndroid': 'Android / Chrome: menu -> Install app or Add to Home screen.',
    'pwa.installDesktop': 'Desktop Chrome / Edge: use the install icon in the address bar if available.',
    'pwa.offlineText': 'You are offline. EquiTrack still works with saved local data in this browser.',
    'pwa.onlineText': 'Back online.',
    'pwa.updateText': 'A new version is available. Refresh to update.',
    'pwa.refresh': 'Refresh',
    'footer.local': 'Data is stored locally in your browser.',
    'common.date': 'Date',
    'common.time': 'Time',
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
    'feed.supplier': 'Supplier',
    'feed.storage': 'Storage',
    'feed.cost': 'Cost',
    'feed.expiry': 'Expiry',
    'feed.horses': 'Horses',
    'feed.perHorse': 'Per horse',
    'feed.lastUpdated': 'Last updated',
    'feed.history': 'Stock history',
    'feed.notSet': 'Not set',
    'feed.ok': 'OK',
    'feed.low': 'Low soon',
    'feed.critical': 'Critical',
    'feed.empty': 'Empty',
    'eventType.race': 'Race',
    'eventType.training': 'Training',
    'eventType.shoeing': 'Shoeing',
    'eventType.vaccination': 'Vaccination',
    'eventType.vet': 'Vet',
    'eventType.feeding': 'Feeding',
    'eventType.other': 'Other',
    'message.horseSaved': 'Horse saved.',
    'message.taskSaved': 'Task saved.',
    'message.hoursSaved': 'Work hours saved.',
    'message.inventorySaved': 'Feed inventory item saved with days remaining updated.',
    'message.shoppingUpdated': 'Shopping list status updated.',
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
    'message.emergencySaved': 'Previous local data was saved before import.',
    'message.emergencyRestored': 'Previous local data restored.',
    'message.importFailed': 'Import failed: {error}',
    'message.languageChanged': 'Language updated.',
    'message.resetDone': 'Local data reset.',
    'message.resetCancelled': 'Reset cancelled. No data was changed.',
    'confirm.delete': 'Delete {label}? This cannot be undone.',
    'confirm.reset': 'Type DELETE to permanently delete all local EquiTrack data from this browser.',
    'delete.horse': 'this horse record',
    'delete.task': 'this daily task',
    'delete.hours': 'this work log',
    'delete.inventory': 'this feed inventory item',
    'delete.event': 'this calendar event'
  },
  fi: {
    'brand.subtitle': 'Verkkotallin hallinta',
    'nav.home': 'Etusivu',
    'nav.stable': 'Oma talli',
    'nav.calendar': 'Kalenteri',
    'nav.settings': 'Asetukset / Varmuuskopio',
    'nav.menu': 'Valikko',
    'home.eyebrow': 'Tallinhallinta selaimessa',
    'home.title': 'EquiTrack pitää tallin arjen järjestyksessä.',
    'home.pitch': 'Hallitse hevosia, tehtäviä, työtunteja, ruokavarastoa ja kilpailupäiviä yhdessä paikallisessa verkkosovelluksessa.',
    'home.cta': 'Avaa oma talli',
    'home.featureHorsesTitle': 'Hevostiedot',
    'home.featureHorsesText': 'Pidä hevosten muistiinpanot ja hoitotiedot helposti löydettävissä.',
    'home.featureTasksTitle': 'Päivittäinen työ',
    'home.featureTasksText': 'Seuraa tallitöitä, työkirjauksia ja valmistumista.',
    'home.featureFeedTitle': 'Ruokavarasto PRO',
    'home.featureFeedText': 'Arvioi jäljellä olevat päivät ja huomaa vähäinen varasto ajoissa.',
    'home.featureCalendarTitle': 'Kilpailukalenteri',
    'home.featureCalendarText': 'Suunnittele tapahtumapäivät ja näe juoksevat hevoset.',
    'home.socialTitle': 'Yhteydet',
    'home.socialHeading': 'Seuraa EquiTrackia',
    'home.email': 'Sähköposti tai yhteys',
    'home.localTitle': 'Selain ensin',
    'home.localHeading': 'Tallin tiedot pysyvät tällä laitteella.',
    'home.localText': 'EquiTrack toimii suoraan selaimessa ja tallentaa hevoset, tehtävät, työtunnit, ruokavaraston ja tapahtumat paikallisesti.',
    'home.backupReminder': 'Vie JSON-varmuuskopio Asetukset / Varmuuskopio -näkymässä, kun haluat turvallisen kopion.',
    'onboarding.eyebrow': 'Ensiaskeleet',
    'onboarding.title': 'Ota EquiTrack käyttöön muutamassa minuutissa.',
    'onboarding.text': 'Aloita olennaisista: hevoset, ruokavarasto, kalenteri ja varmuuskopio.',
    'onboarding.stepHorse': 'Lisää ensimmäinen hevonen',
    'onboarding.stepFeed': 'Lisää ruokavarasto',
    'onboarding.stepEvent': 'Lisää kalenteritapahtuma',
    'onboarding.stepBackup': 'Vie ensimmäinen varmuuskopio',
    'onboarding.start': 'Avaa oma talli',
    'onboarding.skip': 'Ohita nyt',
    'onboarding.restartTitle': 'Opastus',
    'onboarding.restartText': 'Näytä käyttöönoton opastus uudelleen.',
    'onboarding.restart': 'Aloita opastus uudelleen',
    'message.onboardingDone': 'Opastus piilotettu. Voit aloittaa sen uudelleen Asetukset / Varmuuskopio -näkymässä.',
    'message.onboardingRestarted': 'Opastus aloitettu uudelleen.',
    'auth.eyebrow': 'Tilin käyttö',
    'auth.title': 'Kirjaudu EquiTrackiin',
    'auth.description': 'Käytä olemassa olevaa tiliä, jonka EquiTrack-ylläpitäjä on luonut. Tallin tiedot pysyvät toistaiseksi tässä selaimessa.',
    'auth.email': 'Sähköposti',
    'auth.password': 'Salasana',
    'auth.emailPlaceholder': 'sinä@example.com',
    'auth.passwordPlaceholder': 'Salasana',
    'auth.login': 'Kirjaudu',
    'auth.logout': 'Kirjaudu ulos',
    'auth.signedOut': 'Ei kirjautunut',
    'auth.setupNeeded': 'Supabasea ei ole vielä määritetty. Lisää Supabase URL ja anon key script.js-tiedostoon kirjautumisen käyttöön ottamiseksi.',
    'auth.setupReady': 'Kirjautuminen on valmis olemassa oleville Supabase-käyttäjille.',
    'auth.noRegistration': 'Julkista rekisteröitymistä ei ole. Ylläpitäjä luo käyttäjätilit.',
    'message.authProtected': 'Kirjaudu sisään avataksesi tämän osion.',
    'message.authConfigMissing': 'Supabase-kirjautumista ei ole vielä määritetty.',
    'message.authLoading': 'Tarkistetaan kirjautumisistuntoa...',
    'message.authLoginSuccess': 'Kirjautuminen onnistui.',
    'message.authLogoutSuccess': 'Kirjauduttu ulos.',
    'message.authLoginFailed': 'Kirjautuminen epäonnistui: {error}',
    'stable.eyebrow': 'Oma talli',
    'stable.title': 'Tallin päivittäinen työtila.',
    'summary.horses': 'Hevoset',
    'summary.openTasks': 'Avoimet tehtävät',
    'summary.todayTasks': 'Tämän päivän tehtävät',
    'summary.hoursLogged': 'Kirjatut tunnit',
    'summary.lowFeed': 'Vähissä olevat ruoat',
    'summary.upcomingEvents': 'Tulevat tapahtumat',
    'today.title': 'Tänään tallilla',
    'today.subtitle': 'Tehtävät, tapahtumat ja ruokavaroitukset, jotka vaativat huomiota.',
    'today.empty': 'Ei kiireellistä tänään. Tallipäivä näyttää rauhalliselta.',
    'today.tasksDue': 'Tämän päivän tehtävät',
    'today.eventsToday': 'Tämän päivän tapahtumat',
    'today.feedWarnings': 'Ruokavaroitukset',
    'quick.addHorse': 'Lisää hevonen',
    'quick.addTask': 'Lisää tehtävä',
    'quick.addHours': 'Lisää työtunnit',
    'quick.addFeed': 'Lisää rehu',
    'quick.addEvent': 'Lisää kalenteritapahtuma',
    'empty.actionHorse': 'Lisää ensimmäinen hevonen',
    'empty.actionTask': 'Lisää tehtävä',
    'empty.actionHours': 'Lisää työtunnit',
    'empty.actionFeed': 'Lisää rehu',
    'tabs.horses': 'Hevoset',
    'tabs.tasks': 'Tehtävät',
    'tabs.hours': 'Työtunnit',
    'tabs.inventory': 'Ruokavarasto',
    'horses.title': 'Horse Profile PRO',
    'horses.subtitle': 'Pidä hevosen perustiedot, hoito, ruokinta ja terveysmuistiinpanot yhdessä selkeässä profiilissa.',
    'horses.optionalHelp': 'Vain hevosen nimi on pakollinen. Lisää tarvittavat tiedot nyt ja täydennä loput myöhemmin.',
    'horses.basicInfo': 'Perustiedot',
    'horses.care': 'Hoito',
    'horses.feeding': 'Ruokinta',
    'horses.health': 'Terveys',
    'horses.notesGroup': 'Muistiinpanot',
    'horses.name': 'Hevosen nimi',
    'horses.nickname': 'Tallinimi / lempinimi',
    'horses.owner': 'Omistaja',
    'horses.breed': 'Rotu',
    'horses.birth': 'Syntymäaika tai -vuosi',
    'horses.gender': 'Sukupuoli',
    'horses.color': 'Vari',
    'horses.registration': 'Rekisterinumero',
    'horses.feedingNotes': 'Ruokintamuistiinpanot',
    'horses.careNotes': 'Hoitomuistiinpanot',
    'horses.shoeingNotes': 'Kengitysmuistiinpanot',
    'horses.vaccinationNotes': 'Rokotusmuistiinpanot',
    'horses.dewormingNotes': 'Madotusmuistiinpanot',
    'horses.vetNotes': 'Elainlaakari / yhteystiedot',
    'horses.generalNotes': 'Yleiset muistiinpanot',
    'horses.feedingPlaceholder': 'Ruokintasuunnitelma ja lisaravinteet',
    'horses.carePlaceholder': 'Paivittainen hoito, kasittely ja rutiinit',
    'horses.save': 'Tallenna hevonen',
    'horses.notesPlaceholder': 'Harjoittelu, luonne tai muut muistiinpanot',
    'horses.viewDetails': 'Näytä koko profiili',
    'horses.hideDetails': 'Piilota koko profiili',
    'horses.profileEmpty': 'Lisätietoja ei ole vielä lisätty.',
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
    'inventory.title': 'Ruokavarasto PRO 2.0',
    'inventory.subtitle': 'Seuraa varastoa, käyttöä, toimittajia, sijainteja, hevoskohtaista kulutusta ja ostotarpeita.',
    'inventory.name': 'Ruoan nimi',
    'inventory.category': 'Tyyppi / luokka',
    'inventory.quantity': 'Nykyinen määrä',
    'inventory.unit': 'Yksikkö',
    'inventory.dailyUsage': 'Päivittäinen käyttö',
    'inventory.minimum': 'Vähimmäisraja',
    'inventory.advanced': 'Lisätiedot, valinnainen',
    'inventory.supplier': 'Toimittaja / kauppa',
    'inventory.purchaseDate': 'Ostopäivä',
    'inventory.expiryDate': 'Viimeinen käyttöpäivä',
    'inventory.storageLocation': 'Sailytyspaikka',
    'inventory.cost': 'Hinta',
    'inventory.notesPlaceholder': 'Toimitus, era, toimittajan yhteystiedot',
    'inventory.horseUsage': 'Hevoskohtainen kulutus, valinnainen',
    'inventory.assignedHorses': 'Hevoset',
    'inventory.perHorseUsage': 'Päivittäinen käyttö per hevonen',
    'inventory.save': 'Tallenna varastotuote',
    'shopping.title': 'Ostoslista',
    'shopping.subtitle': 'Vähissä, kriittiset ja tyhjät ruokatuotteet näkyvät tässä automaattisesti.',
    'shopping.empty': 'Mitään ruokaa ei tarvitse ostaa juuri nyt.',
    'shopping.added': 'Lisätty ostoslistalle',
    'shopping.markAdded': 'Merkitse lisätyksi',
    'shopping.markNeeded': 'Merkitse tarvittavaksi',
    'calendar.eyebrow': 'Calendar PRO',
    'calendar.title': 'Suunnittele kilpailupäivät ja tallitapahtumat.',
    'calendar.eventName': 'Tapahtuman nimi',
    'calendar.eventPlaceholder': 'Kevään kilpailupäivä',
    'calendar.type': 'Tapahtumatyyppi',
    'calendar.location': 'Sijainti',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Juoksevat hevoset',
    'calendar.handler': 'Ohjastaja / ratsastaja / hoitaja',
    'calendar.raceOptional': 'Kilpailutiedot, valinnainen',
    'calendar.raceNumber': 'Lahto numero',
    'calendar.startNumber': 'Lahtorata / numero',
    'calendar.driver': 'Ohjastaja',
    'calendar.placement': 'Sijoitus',
    'calendar.result': 'Aika / tulos',
    'calendar.prize': 'Palkinto',
    'calendar.postRaceNotes': 'Kilpailun jalkeiset muistiinpanot',
    'calendar.today': 'Tänään',
    'calendar.nextSeven': 'Seuraavat 7 päivää',
    'calendar.scheduledHorses': 'Aikataulutetut hevoset',
    'calendar.plannerTitle': 'Tänään / tällä viikolla',
    'calendar.plannerSubtitle': 'Näe nopeasti, mitä on aikataulussa ja mitkä hevoset ovat mukana.',
    'calendar.plannerEmpty': 'Tänään tai seuraavan 7 päivän aikana ei ole tapahtumia.',
    'calendar.todayEvents': 'Tämän päivän tapahtumat',
    'calendar.weekEvents': 'Seuraavat 7 päivää',
    'calendar.horsesScheduled': 'Aikataulutetut hevoset',
    'calendar.filterScope': 'Näytä',
    'calendar.filterAll': 'Kaikki tapahtumat',
    'calendar.filterUpcoming': 'Tulevat tapahtumat',
    'calendar.filterPast': 'Menneet tapahtumat',
    'calendar.filterType': 'Tapahtumatyyppi',
    'calendar.filterHorse': 'Hevonen',
    'calendar.allTypes': 'Kaikki tapahtumatyypit',
    'calendar.allHorses': 'Kaikki hevoset',
    'calendar.past': 'Mennyt tapahtuma',
    'calendar.raceDetails': 'Kilpailutiedot',
    'calendar.notesPlaceholder': 'Kuljetus, lähtöaika, omistajan muistiinpanot',
    'calendar.save': 'Tallenna tapahtuma',
    'calendar.empty': 'Kalenteritapahtumia ei ole vielä. Lisää kilpailupäivä tai tallitapahtuma.',
    'calendar.upcoming': 'Tuleva tapahtuma',
    'calendar.noFilteredEvents': 'Suodattimilla ei löydy tapahtumia.',
    'settings.eyebrow': 'Asetukset / Varmuuskopio',
    'settings.title': 'Hallitse kieltä, varmuuskopioita ja paikallisia tietoja.',
    'settings.languageHelp': 'Valitse käyttöliittymän kieli',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Vie päivätty JSON-varmuuskopio tai esikatsele ja palauta tallennettu tiedosto turvallisesti.',
    'settings.backupPreviewTitle': 'Tuonnin esikatselu',
    'settings.backupPreviewText': 'Kun valitset varmuuskopion, EquiTrack näyttää määrät ennen paikallisten tietojen korvaamista.',
    'settings.resetTitle': 'Nollaa paikalliset tiedot',
    'settings.resetText': 'Tämä poistaa hevoset, tehtävät, työkirjaukset, ruokavaraston ja kalenteritapahtumat tästä selaimesta.',
    'settings.resetButton': 'Nollaa paikalliset tiedot',
    'language.label': 'Kieli',
    'backup.export': 'Lataa varmuuskopio',
    'backup.import': 'Palauta varmuuskopio',
    'backup.noPreview': 'Varmuuskopiota ei ole valittu.',
    'backup.preview': 'Esikatselu: {horses} hevosta, {tasks} tehtävää, {hours} työkirjausta, {inventory} ruokavaraston tuotetta, {events} kalenteritapahtumaa.',
    'backup.confirmImport': 'Tuodaanko tämä varmuuskopio ja korvataanko nykyiset paikalliset tiedot?',
    'backup.lastExport': 'Viimeisin vienti',
    'backup.storageHelp': 'Tiedot tallennetaan paikallisesti tähän selaimeen. Vie varmuuskopioita säännöllisesti.',
    'backup.restorePrevious': 'Palauta aiemmat tiedot',
    'backup.restoreHelp': 'Käytettävissä tuonnin jälkeen. Palauttaa paikalliset tiedot, jotka tallennettiin juuri ennen viimeistä tuontia.',
    'backup.noEmergency': 'Aiemman tuonnin varmuuskopiota ei ole vielä saatavilla.',
    'backup.confirmRestore': 'Palautetaanko ennen viimeistä tuontia tallennetut paikalliset tiedot?',
    'backup.errorInvalidJson': 'Valittu tiedosto ei ole kelvollinen JSON.',
    'backup.errorInvalidShape': 'Tämä ei näytä EquiTrack-varmuuskopiolta.',
    'pwa.installTitle': 'Asenna EquiTrack',
    'pwa.installText': 'Käytä EquiTrackia sovelluksena puhelimessa tai tietokoneella.',
    'pwa.installIos': 'iPhone / Safari: Jaa -> Lisää Koti-valikkoon.',
    'pwa.installAndroid': 'Android / Chrome: valikko -> Asenna sovellus tai Lisää aloitusnäyttöön.',
    'pwa.installDesktop': 'Desktop Chrome / Edge: käytä osoiterivin asennuskuvaketta, jos se näkyy.',
    'pwa.offlineText': 'Olet offline-tilassa. EquiTrack toimii edelleen tähän selaimeen tallennetuilla paikallisilla tiedoilla.',
    'pwa.onlineText': 'Yhteys palautui.',
    'pwa.updateText': 'Uusi versio on saatavilla. Päivitä lataamalla sivu uudelleen.',
    'pwa.refresh': 'Päivitä',
    'footer.local': 'Tiedot tallennetaan paikallisesti selaimeesi.',
    'common.date': 'Päivä',
    'common.time': 'Aika',
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
    'empty.inventory': 'Ruokavarastoa ei ole vielä. Lisää heinää, kauraa, pellettejä tai muita tarvikkeita.',
    'feed.description': '{category} ruokavarastossa',
    'feed.current': 'Määrä',
    'feed.dailyUsage': 'Päivittäinen käyttö',
    'feed.daysLeft': 'Päiviä jäljellä',
    'feed.lowThreshold': 'Vähimmäisraja',
    'feed.supplier': 'Toimittaja',
    'feed.storage': 'Säilytys',
    'feed.cost': 'Hinta',
    'feed.expiry': 'Viimeinen käyttöpäivä',
    'feed.horses': 'Hevoset',
    'feed.perHorse': 'Per hevonen',
    'feed.lastUpdated': 'Päivitetty',
    'feed.history': 'Varastohistoria',
    'feed.notSet': 'Ei asetettu',
    'feed.ok': 'OK',
    'feed.low': 'Vähissä pian',
    'feed.critical': 'Kriittinen',
    'feed.empty': 'Tyhjä',
    'eventType.race': 'Kilpailu',
    'eventType.training': 'Harjoitus',
    'eventType.shoeing': 'Kengitys',
    'eventType.vaccination': 'Rokotus',
    'eventType.vet': 'Eläinlääkäri',
    'eventType.feeding': 'Ruokinta',
    'eventType.other': 'Muu',
    'message.horseSaved': 'Hevonen tallennettu.',
    'message.taskSaved': 'Tehtävä tallennettu.',
    'message.hoursSaved': 'Työtunnit tallennettu.',
    'message.inventorySaved': 'Ruokavaraston tuote tallennettu ja päivät päivitetty.',
    'message.shoppingUpdated': 'Ostoslistan tila päivitetty.',
    'message.eventSaved': 'Kalenteritapahtuma tallennettu.',
    'message.deleteCancelled': 'Poisto peruttu. Tietoja ei muutettu.',
    'message.horseDeleted': 'Hevonen poistettu.',
    'message.taskDeleted': 'Tehtävä poistettu.',
    'message.hoursDeleted': 'Työkirjaus poistettu.',
    'message.inventoryDeleted': 'Ruokavaraston tuote poistettu.',
    'message.eventDeleted': 'Kalenteritapahtuma poistettu.',
    'message.taskDone': 'Tehtävä merkitty valmiiksi.',
    'message.taskReopened': 'Tehtävä avattu uudelleen.',
    'message.backupExported': 'Varmuuskopio viety, {count} tallennettua tietuetta.',
    'message.backupImported': 'Varmuuskopio palautettu, {count} tallennettua tietuetta.',
    'message.emergencySaved': 'Aiemmat paikalliset tiedot tallennettiin ennen tuontia.',
    'message.emergencyRestored': 'Aiemmat paikalliset tiedot palautettu.',
    'message.importFailed': 'Tuonti epäonnistui: {error}',
    'message.languageChanged': 'Kieli päivitetty.',
    'message.resetDone': 'Paikalliset tiedot nollattu.',
    'message.resetCancelled': 'Nollaus peruttu. Tietoja ei muutettu.',
    'confirm.delete': 'Poistetaanko {label}? Tätä ei voi perua.',
    'confirm.reset': 'Kirjoita DELETE poistaaksesi kaikki tämän selaimen EquiTrack-tiedot pysyvästi.',
    'delete.horse': 'tämä hevonen',
    'delete.task': 'tämä tehtävä',
    'delete.hours': 'tämä työkirjaus',
    'delete.inventory': 'tämä ruokavaraston tuote',
    'delete.event': 'tämä kalenteritapahtuma'
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
    'home.pitch': 'Gestisci cavalli, attività, ore di lavoro, scorte di mangime e giornate di gara in un’app web locale.',
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
    'home.localTitle': 'Prima il browser',
    'home.localHeading': 'I dati della scuderia restano su questo dispositivo.',
    'home.localText': 'EquiTrack funziona direttamente nel browser e salva localmente cavalli, attività, ore, mangimi ed eventi.',
    'home.backupReminder': 'Usa Impostazioni / backup per esportare un backup JSON quando vuoi una copia sicura.',
    'onboarding.eyebrow': 'Primi passi',
    'onboarding.title': 'Configura EquiTrack in pochi minuti.',
    'onboarding.text': 'Inizia dalle basi: cavalli, scorte mangimi, calendario e backup.',
    'onboarding.stepHorse': 'Aggiungi il primo cavallo',
    'onboarding.stepFeed': 'Aggiungi inventario mangimi',
    'onboarding.stepEvent': 'Aggiungi un evento calendario',
    'onboarding.stepBackup': 'Esporta il primo backup',
    'onboarding.start': 'Apri La mia scuderia',
    'onboarding.skip': 'Salta per ora',
    'onboarding.restartTitle': 'Onboarding',
    'onboarding.restartText': 'Mostra di nuovo la guida iniziale.',
    'onboarding.restart': 'Riavvia onboarding',
    'message.onboardingDone': 'Onboarding nascosto. Puoi riavviarlo da Impostazioni / backup.',
    'message.onboardingRestarted': 'Onboarding riavviato.',
    'auth.eyebrow': 'Accesso account',
    'auth.title': 'Accedi a EquiTrack',
    'auth.description': "Usa un account esistente creato dall'amministratore EquiTrack. Per ora i dati della scuderia restano in questo browser.",
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.emailPlaceholder': 'tu@example.com',
    'auth.passwordPlaceholder': 'Password',
    'auth.login': 'Accedi',
    'auth.logout': 'Esci',
    'auth.signedOut': 'Non connesso',
    'auth.setupNeeded': "Supabase non è ancora configurato. Aggiungi l'URL Supabase e la anon key in script.js per abilitare l'accesso.",
    'auth.setupReady': 'Accesso pronto per gli utenti Supabase esistenti.',
    'auth.noRegistration': "La registrazione pubblica non è disponibile. Gli account sono creati dall'amministratore.",
    'message.authProtected': 'Accedi per aprire questa sezione.',
    'message.authConfigMissing': "L'accesso Supabase non è ancora configurato.",
    'message.authLoading': 'Controllo della sessione in corso...',
    'message.authLoginSuccess': 'Accesso effettuato.',
    'message.authLogoutSuccess': 'Uscita effettuata.',
    'message.authLoginFailed': 'Accesso non riuscito: {error}',
    'stable.eyebrow': 'La mia scuderia',
    'stable.title': 'Il tuo spazio di lavoro quotidiano.',
    'summary.horses': 'Cavalli',
    'summary.openTasks': 'Attività aperte',
    'summary.todayTasks': 'Attività di oggi',
    'summary.hoursLogged': 'Ore registrate',
    'summary.lowFeed': 'Mangimi bassi',
    'summary.upcomingEvents': 'Eventi in arrivo',
    'today.title': 'Oggi in scuderia',
    'today.subtitle': 'Attività, eventi e avvisi mangime da controllare ora.',
    'today.empty': 'Niente di urgente oggi. La giornata in scuderia sembra tranquilla.',
    'today.tasksDue': 'Attività di oggi',
    'today.eventsToday': 'Eventi di oggi',
    'today.feedWarnings': 'Avvisi mangime',
    'quick.addHorse': 'Aggiungi cavallo',
    'quick.addTask': 'Aggiungi attività',
    'quick.addHours': 'Aggiungi ore lavoro',
    'quick.addFeed': 'Aggiungi mangime',
    'quick.addEvent': 'Aggiungi evento calendario',
    'empty.actionHorse': 'Aggiungi il primo cavallo',
    'empty.actionTask': 'Aggiungi attività',
    'empty.actionHours': 'Aggiungi ore lavoro',
    'empty.actionFeed': 'Aggiungi mangime',
    'tabs.horses': 'Cavalli',
    'tabs.tasks': 'Attività',
    'tabs.hours': 'Ore di lavoro',
    'tabs.inventory': 'Scorte di mangime',
    'horses.title': 'Horse Profile PRO',
    'horses.subtitle': "Tieni identità, cura, alimentazione e salute di ogni cavallo in un profilo chiaro.",
    'horses.optionalHelp': 'Solo il nome del cavallo è obbligatorio. Aggiungi ora i dettagli utili e completa il resto più tardi.',
    'horses.basicInfo': 'Informazioni base',
    'horses.care': 'Cura',
    'horses.feeding': 'Alimentazione',
    'horses.health': 'Salute',
    'horses.notesGroup': 'Note',
    'horses.name': 'Nome cavallo',
    'horses.nickname': 'Nome in scuderia / soprannome',
    'horses.owner': 'Proprietario',
    'horses.breed': 'Razza',
    'horses.birth': 'Anno o data di nascita',
    'horses.gender': 'Sesso',
    'horses.color': 'Colore',
    'horses.registration': 'Numero registrazione',
    'horses.feedingNotes': 'Note alimentazione',
    'horses.careNotes': 'Note cura',
    'horses.shoeingNotes': 'Note ferratura',
    'horses.vaccinationNotes': 'Note vaccinazioni',
    'horses.dewormingNotes': 'Note vermifugo',
    'horses.vetNotes': 'Note veterinario / contatti',
    'horses.generalNotes': 'Note generali',
    'horses.feedingPlaceholder': 'Piano alimentare e integratori',
    'horses.carePlaceholder': 'Cura quotidiana, gestione e routine',
    'horses.save': 'Salva cavallo',
    'horses.notesPlaceholder': 'Allenamento, carattere o altre note',
    'horses.viewDetails': 'Vedi profilo completo',
    'horses.hideDetails': 'Nascondi profilo completo',
    'horses.profileEmpty': 'Nessun dettaglio extra ancora aggiunto.',
    'tasks.title': 'Attività giornaliere',
    'tasks.subtitle': 'Pianifica e completa i lavori quotidiani della scuderia.',
    'tasks.task': 'Attività',
    'tasks.placeholder': 'Giro mangime mattutino',
    'tasks.assignedHorse': 'Cavallo assegnato',
    'tasks.notesPlaceholder': 'Dettagli, operatore, posizione',
    'tasks.save': 'Salva attività',
    'hours.title': 'Tracciamento ore lavoro',
    'hours.subtitle': 'Registra turni e note per ogni lavoro in scuderia.',
    'hours.worker': 'Operatore',
    'hours.hours': 'Ore',
    'hours.notesPlaceholder': 'Turno mattina, box puliti, alimentazione completata',
    'hours.save': 'Salva ore',
    'inventory.title': 'Scorte di mangime PRO 2.0',
    'inventory.subtitle': 'Monitora scorte, uso, fornitori, deposito, consumo per cavallo e acquisti.',
    'inventory.name': 'Nome mangime',
    'inventory.category': 'Tipo / categoria',
    'inventory.quantity': 'Quantita attuale',
    'inventory.unit': 'Unita',
    'inventory.dailyUsage': 'Uso giornaliero',
    'inventory.minimum': 'Soglia scorta bassa',
    'inventory.advanced': 'Dettagli avanzati, opzionali',
    'inventory.supplier': 'Fornitore / negozio',
    'inventory.purchaseDate': 'Data acquisto',
    'inventory.expiryDate': 'Data scadenza',
    'inventory.storageLocation': 'Posizione deposito',
    'inventory.cost': 'Costo / prezzo',
    'inventory.notesPlaceholder': 'Consegna, lotto, contatto fornitore',
    'inventory.horseUsage': 'Consumo per cavallo, opzionale',
    'inventory.assignedHorses': 'Cavalli assegnati',
    'inventory.perHorseUsage': 'Uso giornaliero per cavallo',
    'inventory.save': 'Salva inventario',
    'shopping.title': 'Lista acquisti',
    'shopping.subtitle': 'Mangimi bassi, critici e vuoti appaiono qui automaticamente.',
    'shopping.empty': 'Nessun mangime da acquistare ora.',
    'shopping.added': 'Aggiunto alla lista acquisti',
    'shopping.markAdded': 'Segna aggiunto',
    'shopping.markNeeded': 'Segna necessario',
    'calendar.eyebrow': 'Calendar PRO',
    'calendar.title': 'Pianifica giornate di gara ed eventi.',
    'calendar.eventName': 'Nome evento',
    'calendar.eventPlaceholder': 'Giornata gare primavera',
    'calendar.type': 'Tipo evento',
    'calendar.location': 'Luogo',
    'calendar.locationPlaceholder': 'Helsinki',
    'calendar.horsesRunning': 'Cavalli in gara',
    'calendar.handler': 'Driver / cavaliere / handler',
    'calendar.raceOptional': 'Dettagli gara, opzionali',
    'calendar.raceNumber': 'Numero gara',
    'calendar.startNumber': 'Numero partenza',
    'calendar.driver': 'Driver',
    'calendar.placement': 'Piazzamento',
    'calendar.result': 'Tempo / risultato',
    'calendar.prize': 'Premio',
    'calendar.postRaceNotes': 'Note dopo gara',
    'calendar.today': 'Oggi',
    'calendar.nextSeven': 'Prossimi 7 giorni',
    'calendar.scheduledHorses': 'Cavalli programmati',
    'calendar.plannerTitle': 'Oggi / questa settimana',
    'calendar.plannerSubtitle': 'Vedi rapidamente cosa e programmato e quali cavalli sono coinvolti.',
    'calendar.plannerEmpty': 'Niente in programma per oggi o per i prossimi 7 giorni.',
    'calendar.todayEvents': 'Eventi di oggi',
    'calendar.weekEvents': 'Prossimi 7 giorni',
    'calendar.horsesScheduled': 'Cavalli programmati',
    'calendar.filterScope': 'Mostra',
    'calendar.filterAll': 'Tutti gli eventi',
    'calendar.filterUpcoming': 'Eventi futuri',
    'calendar.filterPast': 'Eventi passati',
    'calendar.filterType': 'Tipo evento',
    'calendar.filterHorse': 'Cavallo',
    'calendar.allTypes': 'Tutti i tipi',
    'calendar.allHorses': 'Tutti i cavalli',
    'calendar.past': 'Evento passato',
    'calendar.raceDetails': 'Dettagli gara',
    'calendar.notesPlaceholder': 'Trasporto, orario, note proprietario',
    'calendar.save': 'Salva evento',
    'calendar.empty': 'Nessun evento in calendario. Aggiungi una gara o un evento.',
    'calendar.upcoming': 'Evento in arrivo',
    'calendar.noFilteredEvents': 'Nessun evento corrisponde ai filtri.',
    'settings.eyebrow': 'Impostazioni / backup',
    'settings.title': 'Gestisci lingua, backup e dati locali.',
    'settings.languageHelp': 'Scegli lingua interfaccia',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Esporta un backup JSON datato oppure visualizza e ripristina in modo sicuro un file salvato.',
    'settings.backupPreviewTitle': 'Anteprima importazione',
    'settings.backupPreviewText': 'Quando scegli un backup, EquiTrack mostra i conteggi prima di sostituire i dati locali.',
    'settings.resetTitle': 'Reimposta dati locali',
    'settings.resetText': 'Rimuove cavalli, attività, registri ore, scorte di mangime ed eventi da questo browser.',
    'settings.resetButton': 'Reimposta dati locali',
    'language.label': 'Lingua',
    'backup.export': 'Scarica backup',
    'backup.import': 'Ripristina backup',
    'backup.noPreview': 'Nessun backup selezionato.',
    'backup.preview': 'Anteprima: {horses} cavalli, {tasks} attività, {hours} registri ore, {inventory} scorte di mangime, {events} eventi calendario.',
    'backup.confirmImport': 'Importare questo backup e sostituire i dati locali attuali?',
    'backup.lastExport': 'Ultima esportazione',
    'backup.storageHelp': 'I dati sono salvati localmente in questo browser. Esporta backup regolarmente.',
    'backup.restorePrevious': 'Ripristina dati precedenti',
    'backup.restoreHelp': "Disponibile dopo un'importazione. Ripristina i dati locali salvati appena prima dell'ultima importazione.",
    'backup.noEmergency': 'Nessun backup precedente di importazione disponibile.',
    'backup.confirmRestore': "Ripristinare i dati locali salvati prima dell'ultima importazione?",
    'backup.errorInvalidJson': 'Il file selezionato non è un JSON valido.',
    'backup.errorInvalidShape': 'Questo non sembra un backup EquiTrack.',
    'pwa.installTitle': 'Installa EquiTrack',
    'pwa.installText': 'Usa EquiTrack come app dal telefono o dal computer.',
    'pwa.installIos': 'iPhone / Safari: Condividi -> Aggiungi alla schermata Home.',
    'pwa.installAndroid': 'Android / Chrome: menu -> Installa app o Aggiungi alla schermata Home.',
    'pwa.installDesktop': "Desktop Chrome / Edge: usa l'icona di installazione nella barra indirizzi se disponibile.",
    'pwa.offlineText': 'Sei offline. EquiTrack funziona ancora con i dati locali salvati in questo browser.',
    'pwa.onlineText': 'Di nuovo online.',
    'pwa.updateText': 'È disponibile una nuova versione. Aggiorna per installarla.',
    'pwa.refresh': 'Aggiorna',
    'footer.local': 'I dati sono salvati localmente nel browser.',
    'common.date': 'Data',
    'common.time': 'Ora',
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
    'empty.tasks': 'Nessuna attività salvata. Aggiungi alimentazione, pulizia, allenamento o cura.',
    'empty.hours': 'Nessuna ora registrata. Aggiungi un turno qui sopra.',
    'empty.inventory': 'Nessun mangime salvato. Aggiungi fieno, avena, pellet, integratori o altre scorte.',
    'feed.description': 'Scorte di mangime: {category}',
    'feed.current': 'Attuale',
    'feed.dailyUsage': 'Uso giornaliero',
    'feed.daysLeft': 'Giorni rimasti',
    'feed.lowThreshold': 'Soglia bassa',
    'feed.supplier': 'Fornitore',
    'feed.storage': 'Deposito',
    'feed.cost': 'Costo',
    'feed.expiry': 'Scadenza',
    'feed.horses': 'Cavalli',
    'feed.perHorse': 'Per cavallo',
    'feed.lastUpdated': 'Ultimo aggiornamento',
    'feed.history': 'Storico scorte',
    'feed.notSet': 'Non impostato',
    'feed.ok': 'OK',
    'feed.low': 'In esaurimento',
    'feed.critical': 'Critico',
    'feed.empty': 'Vuoto',
    'eventType.race': 'Gara',
    'eventType.training': 'Allenamento',
    'eventType.shoeing': 'Ferratura',
    'eventType.vaccination': 'Vaccinazione',
    'eventType.vet': 'Veterinario',
    'eventType.feeding': 'Alimentazione',
    'eventType.other': 'Altro',
    'message.horseSaved': 'Cavallo salvato.',
    'message.taskSaved': 'Attività salvata.',
    'message.hoursSaved': 'Ore di lavoro salvate.',
    'message.inventorySaved': 'Voce inventario salvata con giorni rimanenti aggiornati.',
    'message.shoppingUpdated': 'Stato lista acquisti aggiornato.',
    'message.eventSaved': 'Evento calendario salvato.',
    'message.deleteCancelled': 'Eliminazione annullata. Nessun dato modificato.',
    'message.horseDeleted': 'Cavallo eliminato.',
    'message.taskDeleted': 'Attività eliminata.',
    'message.hoursDeleted': 'Registro ore eliminato.',
    'message.inventoryDeleted': 'Voce inventario mangimi eliminata.',
    'message.eventDeleted': 'Evento calendario eliminato.',
    'message.taskDone': 'Attività segnata come completata.',
    'message.taskReopened': 'Attività riaperta.',
    'message.backupExported': 'Backup esportato con {count} record salvati.',
    'message.backupImported': 'Backup ripristinato con {count} record salvati.',
    'message.emergencySaved': "I dati locali precedenti sono stati salvati prima dell'importazione.",
    'message.emergencyRestored': 'Dati locali precedenti ripristinati.',
    'message.importFailed': 'Importazione non riuscita: {error}',
    'message.languageChanged': 'Lingua aggiornata.',
    'message.resetDone': 'Dati locali reimpostati.',
    'message.resetCancelled': 'Reimpostazione annullata. Nessun dato modificato.',
    'confirm.delete': 'Eliminare {label}? Questa azione non può essere annullata.',
    'confirm.reset': 'Scrivi DELETE per eliminare definitivamente tutti i dati locali di EquiTrack da questo browser.',
    'delete.horse': 'questo cavallo',
    'delete.task': 'questa attività',
    'delete.hours': 'questo registro ore',
    'delete.inventory': 'questa voce inventario mangimi',
    'delete.event': 'questo evento calendario'
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
let calendarFilters = { scope: 'all', type: 'all', horse: 'all' };
let pendingServiceWorker = null;
let supabaseClient = null;
let authUser = null;

const els = {
  horseCount: document.querySelector('#horseCount'),
  openTaskCount: document.querySelector('#openTaskCount'),
  todayTaskCount: document.querySelector('#todayTaskCount'),
  hoursTotal: document.querySelector('#hoursTotal'),
  lowFeedCount: document.querySelector('#lowFeedCount'),
  upcomingEventCount: document.querySelector('#upcomingEventCount'),
  appMessage: document.querySelector('#appMessage'),
  todayList: document.querySelector('#todayList'),
  horsesList: document.querySelector('#horsesList'),
  tasksList: document.querySelector('#tasksList'),
  hoursList: document.querySelector('#hoursList'),
  inventoryList: document.querySelector('#inventoryList'),
  shoppingList: document.querySelector('#shoppingList'),
  eventsList: document.querySelector('#eventsList'),
  eventsTodayCount: document.querySelector('#eventsTodayCount'),
  eventsWeekCount: document.querySelector('#eventsWeekCount'),
  scheduledHorseCount: document.querySelector('#scheduledHorseCount'),
  calendarPlannerList: document.querySelector('#calendarPlannerList'),
  calendarScopeFilter: document.querySelector('#calendarScopeFilter'),
  calendarTypeFilter: document.querySelector('#calendarTypeFilter'),
  calendarHorseFilter: document.querySelector('#calendarHorseFilter'),
  horseForm: document.querySelector('#horseForm'),
  taskForm: document.querySelector('#taskForm'),
  hoursForm: document.querySelector('#hoursForm'),
  inventoryForm: document.querySelector('#inventoryForm'),
  eventForm: document.querySelector('#eventForm'),
  onboardingPanel: document.querySelector('#onboardingPanel'),
  skipOnboardingButton: document.querySelector('#skipOnboardingButton'),
  restartOnboardingButton: document.querySelector('#restartOnboardingButton'),
  exportButton: document.querySelector('#exportButton'),
  importInput: document.querySelector('#importInput'),
  importPreview: document.querySelector('#importPreview'),
  lastBackupAt: document.querySelector('#lastBackupAt'),
  restoreEmergencyButton: document.querySelector('#restoreEmergencyButton'),
  offlineStatus: document.querySelector('#offlineStatus'),
  updateNotice: document.querySelector('#updateNotice'),
  refreshAppButton: document.querySelector('#refreshAppButton'),
  resetDataButton: document.querySelector('#resetDataButton'),
  languageSelect: document.querySelector('#languageSelect'),
  loginForm: document.querySelector('#loginForm'),
  loginButton: document.querySelector('#loginButton'),
  logoutButton: document.querySelector('#logoutButton'),
  loginNavButton: document.querySelector('#loginNavButton'),
  authUserEmail: document.querySelector('#authUserEmail'),
  authSetupNotice: document.querySelector('#authSetupNotice')
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
  const quantity = toSafeNumber(item.quantity ?? item.currentAmount ?? item.amount);
  const history = Array.isArray(item.history) ? item.history : [];
  return {
    id: item.id || createId(),
    name: item.name || 'Unnamed feed',
    category: item.category || item.type || 'General',
    quantity,
    unit: item.unit || 'units',
    dailyUsage: toSafeNumber(item.dailyUsage ?? item.daily_use),
    minimum: toSafeNumber(item.minimum ?? item.threshold),
    supplier: item.supplier || item.shop || '',
    purchaseDate: item.purchaseDate || '',
    expiryDate: item.expiryDate || '',
    storageLocation: item.storageLocation || item.location || '',
    cost: item.cost || item.price || '',
    notes: item.notes || '',
    horseIds: Array.isArray(item.horseIds) ? item.horseIds : [],
    perHorseUsage: toSafeNumber(item.perHorseUsage),
    shoppingListed: Boolean(item.shoppingListed),
    lastUpdated: item.lastUpdated || item.updatedAt || '',
    history
  };
}

function normalizeHorse(item) {
  return {
    id: item.id || createId(),
    name: item.name || 'Unnamed horse',
    nickname: item.nickname || item.stableName || '',
    owner: item.owner || '',
    breed: item.breed || '',
    birth: item.birth || item.birthDate || item.birthYear || item.age || '',
    gender: item.gender || '',
    color: item.color || '',
    registration: item.registration || item.registrationNumber || '',
    feedingNotes: item.feedingNotes || '',
    careNotes: item.careNotes || '',
    shoeingNotes: item.shoeingNotes || '',
    vaccinationNotes: item.vaccinationNotes || '',
    dewormingNotes: item.dewormingNotes || '',
    vetNotes: item.vetNotes || '',
    notes: item.notes || item.generalNotes || ''
  };
}

function normalizeCalendarEvent(item) {
  const type = String(item.type || item.eventType || 'other').toLowerCase();
  return {
    id: item.id || createId(),
    date: item.date || today(),
    time: item.time || '',
    name: item.name || item.title || '',
    type: EVENT_TYPES.includes(type) ? type : 'other',
    location: item.location || '',
    horseIds: Array.isArray(item.horseIds) ? item.horseIds : (item.horseId ? [item.horseId] : []),
    handler: item.handler || item.driverRiderHandler || '',
    raceNumber: item.raceNumber || '',
    startNumber: item.startNumber || '',
    driver: item.driver || '',
    placement: item.placement || '',
    result: item.result || item.raceTimeResult || '',
    prize: item.prize || '',
    postRaceNotes: item.postRaceNotes || '',
    notes: item.notes || ''
  };
}

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return JSON.parse(JSON.stringify(defaultData));
    const parsed = JSON.parse(stored);
    return {
      horses: Array.isArray(parsed.horses) ? parsed.horses.map(normalizeHorse) : [],
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

function getCounts(data = state) {
  return {
    horses: data.horses?.length || 0,
    tasks: data.tasks?.length || 0,
    hours: data.hours?.length || 0,
    inventory: data.inventory?.length || 0,
    events: data.calendarEvents?.length || 0
  };
}

function getTotalCount(data = state) {
  const counts = getCounts(data);
  return counts.horses + counts.tasks + counts.hours + counts.inventory + counts.events;
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

function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_CONFIG.SUPABASE_URL &&
    SUPABASE_CONFIG.SUPABASE_ANON_KEY &&
    SUPABASE_CONFIG.SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
    SUPABASE_CONFIG.SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
  );
}

function isProtectedView(viewName) {
  return PROTECTED_VIEWS.includes(viewName);
}

function updateAuthUi() {
  const configured = isSupabaseConfigured();
  const loginReady = configured && Boolean(supabaseClient);
  if (els.authUserEmail) {
    els.authUserEmail.textContent = authUser?.email || t('auth.signedOut');
    els.authUserEmail.title = authUser?.email || '';
  }
  if (els.loginNavButton) els.loginNavButton.hidden = Boolean(authUser);
  if (els.logoutButton) els.logoutButton.hidden = !authUser;
  if (els.loginButton) els.loginButton.disabled = !loginReady;
  if (els.authSetupNotice) {
    els.authSetupNotice.textContent = configured ? (loginReady ? t('auth.setupReady') : t('message.authLoading')) : t('auth.setupNeeded');
    els.authSetupNotice.classList.toggle('ready', loginReady);
  }
}

function loadSupabaseScript() {
  if (window.supabase?.createClient) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-supabase-js]');
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', () => reject(new Error('Could not load Supabase client.')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    script.dataset.supabaseJs = 'true';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load Supabase client.'));
    document.head.appendChild(script);
  });
}

async function setupAuth() {
  updateAuthUi();
  if (!isSupabaseConfigured()) {
    return;
  }
  showMessage(t('message.authLoading'));
  try {
    await loadSupabaseScript();
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.SUPABASE_URL, SUPABASE_CONFIG.SUPABASE_ANON_KEY);
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    authUser = data.session?.user || null;
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      authUser = session?.user || null;
      updateAuthUi();
      if (!authUser && isProtectedView(activeView)) showView('login');
    });
  } catch (error) {
    showMessage(t('message.authLoginFailed', { error: error.message }));
  } finally {
    updateAuthUi();
  }
}

function showView(viewName) {
  if (isProtectedView(viewName) && !authUser) {
    activeView = 'login';
    document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
    document.querySelector('#loginView').classList.add('active');
    document.querySelectorAll('[data-view-link]').forEach((button) => {
      button.classList.toggle('active', button.dataset.viewLink === 'login');
    });
    showMessage(isSupabaseConfigured() ? t('message.authProtected') : t('message.authConfigMissing'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
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

function showOnboarding() {
  if (!els.onboardingPanel) return;
  els.onboardingPanel.hidden = false;
}

function hideOnboarding(showFeedback = true) {
  if (!els.onboardingPanel) return;
  els.onboardingPanel.hidden = true;
  localStorage.setItem(ONBOARDING_KEY, 'true');
  if (showFeedback) showMessage(t('message.onboardingDone'));
}

function restartOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
  showOnboarding();
  showView('home');
  showMessage(t('message.onboardingRestarted'));
  els.onboardingPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupOnboarding() {
  if (!els.onboardingPanel) return;
  if (localStorage.getItem(ONBOARDING_KEY) !== 'true') showOnboarding();

  document.querySelectorAll('[data-onboarding-go]').forEach((button) => {
    button.addEventListener('click', () => {
      hideOnboarding(false);
      showView(button.dataset.onboardingGo);
      if (button.dataset.onboardingTab) activateTab(button.dataset.onboardingTab);
    });
  });

  els.skipOnboardingButton?.addEventListener('click', () => hideOnboarding(true));
  els.restartOnboardingButton?.addEventListener('click', restartOnboarding);
}

function renderHorseOptions() {
  if (!EVENT_TYPES.includes(calendarFilters.type)) calendarFilters.type = 'all';
  if (!['all', 'upcoming', 'past'].includes(calendarFilters.scope)) calendarFilters.scope = 'all';
  if (calendarFilters.horse !== 'all' && !state.horses.some((horse) => horse.id === calendarFilters.horse)) {
    calendarFilters.horse = 'all';
  }

  const singleOptions = [`<option value="">${t('tasks.noHorseAssigned')}</option>`]
    .concat(state.horses.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`));
  els.taskForm.elements.horseId.innerHTML = singleOptions.join('');

  els.eventForm.elements.horseIds.innerHTML = state.horses
    .map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`)
    .join('');
  if (els.inventoryForm.elements.horseIds) {
    els.inventoryForm.elements.horseIds.innerHTML = state.horses
      .map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`)
      .join('');
  }

  const typeOptions = EVENT_TYPES
    .map((type) => `<option value="${type}">${t(`eventType.${type}`)}</option>`)
    .join('');
  els.eventForm.elements.type.innerHTML = typeOptions;
  if (els.calendarTypeFilter) {
    els.calendarTypeFilter.innerHTML = `<option value="all">${t('calendar.allTypes')}</option>${typeOptions}`;
    els.calendarTypeFilter.value = calendarFilters.type;
  }
  if (els.calendarHorseFilter) {
    els.calendarHorseFilter.innerHTML = `<option value="all">${t('calendar.allHorses')}</option>${state.horses
      .map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`)
      .join('')}`;
    els.calendarHorseFilter.value = calendarFilters.horse;
  }
  if (els.calendarScopeFilter) els.calendarScopeFilter.value = calendarFilters.scope;
}

function render() {
  renderSummary();
  renderHorseOptions();
  renderToday();
  renderHorses();
  renderTasks();
  renderHours();
  renderInventory();
  renderShoppingList();
  renderEvents();
  renderCalendarPlanner();
  renderBackupStatus();
}

function renderSummary() {
  const todayValue = today();
  els.horseCount.textContent = state.horses.length;
  els.openTaskCount.textContent = state.tasks.filter((task) => !task.done).length;
  els.todayTaskCount.textContent = state.tasks.filter((task) => task.date === todayValue && !task.done).length;
  els.hoursTotal.textContent = state.hours.reduce((total, entry) => total + Number(entry.hours || 0), 0).toFixed(1);
  els.lowFeedCount.textContent = state.inventory.filter((item) => {
    const status = getFeedStatus(item).key;
    return status === 'low' || status === 'critical' || status === 'empty';
  }).length;
  els.upcomingEventCount.textContent = state.calendarEvents.filter((event) => event.date >= todayValue).length;
  if (els.eventsTodayCount && els.eventsWeekCount) {
    const now = new Date(`${todayValue}T00:00:00`);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    els.eventsTodayCount.textContent = state.calendarEvents.filter((event) => event.date === todayValue).length;
    els.eventsWeekCount.textContent = state.calendarEvents.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return eventDate >= now && eventDate <= weekEnd;
    }).length;
    if (els.scheduledHorseCount) {
      const scheduledHorseIds = new Set(
        state.calendarEvents
          .filter((event) => {
            const eventDate = new Date(`${event.date}T00:00:00`);
            return eventDate >= now && eventDate <= weekEnd;
          })
          .flatMap((event) => normalizeCalendarEvent(event).horseIds)
      );
      els.scheduledHorseCount.textContent = scheduledHorseIds.size;
    }
  }
}

function renderToday() {
  const todayValue = today();
  const tasksToday = state.tasks.filter((task) => task.date === todayValue && !task.done);
  const eventsToday = state.calendarEvents.filter((event) => event.date === todayValue);
  const feedWarnings = state.inventory
    .map(normalizeFeedItem)
    .filter((item) => ['low', 'critical', 'empty'].includes(getFeedStatus(item).key));

  if (!tasksToday.length && !eventsToday.length && !feedWarnings.length) {
    els.todayList.innerHTML = `<p class="empty-state today-empty">${t('today.empty')}</p>`;
    return;
  }

  const sections = [];
  if (tasksToday.length) {
    sections.push(`
      <article class="today-card">
        <h4>${t('today.tasksDue')}</h4>
        ${tasksToday.map((task) => `<p>${escapeHtml(task.title)}</p>`).join('')}
      </article>
    `);
  }
  if (eventsToday.length) {
    sections.push(`
      <article class="today-card">
        <h4>${t('today.eventsToday')}</h4>
        ${eventsToday.map((event) => `<p>${escapeHtml(event.time ? `${event.time} - ${event.name}` : event.name)}</p>`).join('')}
      </article>
    `);
  }
  if (feedWarnings.length) {
    sections.push(`
      <article class="today-card">
        <h4>${t('today.feedWarnings')}</h4>
        ${feedWarnings.map((item) => {
          const status = getFeedStatus(item);
          return `<p><span class="pill ${status.className}">${t(`feed.${status.key}`)}</span> ${escapeHtml(item.name)}</p>`;
        }).join('')}
      </article>
    `);
  }
  els.todayList.innerHTML = sections.join('');
}

function renderHorses() {
  if (state.horses.length === 0) {
    els.horsesList.innerHTML = renderActionEmpty('empty.horses', 'empty.actionHorse', 'horse');
    return;
  }
  els.horsesList.innerHTML = state.horses.map((rawHorse) => {
    const horse = normalizeHorse(rawHorse);
    const headline = [horse.breed, horse.gender, horse.color].filter(Boolean).join(' · ');
    const importantMeta = [
      horse.owner && `${t('horses.owner')}: ${horse.owner}`,
      horse.birth && `${t('horses.birth')}: ${horse.birth}`,
      horse.registration && `${t('horses.registration')}: ${horse.registration}`
    ].filter(Boolean);
    return `
      <article class="item-card horse-card horse-profile-card">
        <div class="horse-profile-main">
          <div class="horse-profile-head">
            <div>
              <h4>${escapeHtml(horse.name)}${horse.nickname ? ` <span class="subtle-name">(${escapeHtml(horse.nickname)})</span>` : ''}</h4>
              <p>${escapeHtml(headline || t('horses.profileEmpty'))}</p>
            </div>
          </div>
          <div class="item-meta">
            ${importantMeta.length
              ? importantMeta.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('')
              : `<span class="pill">${t('horses.profileEmpty')}</span>`}
          </div>
          <details class="horse-details">
            <summary>${t('horses.viewDetails')}</summary>
            <div class="horse-detail-grid">
              ${renderHorseDetailGroup('horses.basicInfo', [
                ['horses.owner', horse.owner],
                ['horses.breed', horse.breed],
                ['horses.birth', horse.birth],
                ['horses.gender', horse.gender],
                ['horses.color', horse.color],
                ['horses.registration', horse.registration]
              ])}
              ${renderHorseDetailGroup('horses.care', [
                ['horses.careNotes', horse.careNotes],
                ['horses.shoeingNotes', horse.shoeingNotes]
              ])}
              ${renderHorseDetailGroup('horses.feeding', [
                ['horses.feedingNotes', horse.feedingNotes]
              ])}
              ${renderHorseDetailGroup('horses.health', [
                ['horses.vaccinationNotes', horse.vaccinationNotes],
                ['horses.dewormingNotes', horse.dewormingNotes],
                ['horses.vetNotes', horse.vetNotes]
              ])}
              ${renderHorseDetailGroup('horses.notesGroup', [
                ['horses.generalNotes', horse.notes]
              ])}
            </div>
          </details>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-horse" data-id="${horse.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-horse" data-id="${horse.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderHorseDetailGroup(titleKey, rows) {
  const content = rows.map(([labelKey, value]) => `
    <p><strong>${t(labelKey)}</strong><span>${escapeHtml(value || t('common.notSet'))}</span></p>
  `).join('');
  return `
    <section class="horse-detail-group">
      <h5>${t(titleKey)}</h5>
      ${content}
    </section>
  `;
}

function renderTasks() {
  if (state.tasks.length === 0) {
    els.tasksList.innerHTML = renderActionEmpty('empty.tasks', 'empty.actionTask', 'task');
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
    els.hoursList.innerHTML = renderActionEmpty('empty.hours', 'empty.actionHours', 'hours');
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
    els.inventoryList.innerHTML = renderActionEmpty('empty.inventory', 'empty.actionFeed', 'feed');
    return;
  }
  els.inventoryList.innerHTML = state.inventory.map((item) => {
    const normalized = normalizeFeedItem(item);
    const status = getFeedStatus(normalized);
    const daysRemaining = getDaysRemaining(normalized);
    const horseNames = normalized.horseIds
      .map((id) => state.horses.find((horse) => horse.id === id)?.name)
      .filter(Boolean);
    const advancedDetails = [
      normalized.supplier && `${t('feed.supplier')}: ${normalized.supplier}`,
      normalized.storageLocation && `${t('feed.storage')}: ${normalized.storageLocation}`,
      normalized.cost && `${t('feed.cost')}: ${normalized.cost}`,
      normalized.expiryDate && `${t('feed.expiry')}: ${normalized.expiryDate}`,
      normalized.lastUpdated && `${t('feed.lastUpdated')}: ${normalized.lastUpdated}`
    ].filter(Boolean);
    return `
      <article class="item-card feed-card">
        <div class="feed-main">
          <div>
            <h4>${escapeHtml(normalized.name)}</h4>
            <p>${escapeHtml(normalized.notes || t('feed.description', { category: normalized.category }))}</p>
          </div>
          <span class="pill ${status.className}">${t(`feed.${status.key}`)}</span>
        </div>
        <div class="feed-stats">
          <div><span class="meta-label">${t('feed.current')}</span><strong>${formatNumber(normalized.quantity)} ${escapeHtml(normalized.unit)}</strong></div>
          <div><span class="meta-label">${t('feed.dailyUsage')}</span><strong>${formatNumber(getEffectiveDailyUsage(normalized))} ${escapeHtml(normalized.unit)}</strong></div>
          <div><span class="meta-label">${t('feed.daysLeft')}</span><strong>${daysRemaining}</strong></div>
          <div><span class="meta-label">${t('feed.lowThreshold')}</span><strong>${formatNumber(normalized.minimum)} ${escapeHtml(normalized.unit)}</strong></div>
        </div>
        <div class="item-meta feed-extra">
          ${horseNames.length ? `<span class="pill">${t('feed.horses')}: ${escapeHtml(horseNames.join(', '))}</span>` : ''}
          ${normalized.perHorseUsage ? `<span class="pill">${t('feed.perHorse')}: ${formatNumber(normalized.perHorseUsage)} ${escapeHtml(normalized.unit)}</span>` : ''}
          ${advancedDetails.map((detail) => `<span class="pill">${escapeHtml(detail)}</span>`).join('')}
          ${normalized.shoppingListed ? `<span class="pill warn">${t('shopping.added')}</span>` : ''}
        </div>
        ${normalized.history.length ? `<div class="detail-box"><strong>${t('feed.history')}</strong><p>${escapeHtml(normalized.history.slice(-3).map((entry) => `${entry.date}: ${formatNumber(entry.quantity)} ${normalized.unit}`).join(' | '))}</p></div>` : ''}
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-inventory" data-id="${normalized.id}">${t('common.edit')}</button>
          <button class="button ghost" type="button" data-action="toggle-shopping" data-id="${normalized.id}">${normalized.shoppingListed ? t('shopping.markNeeded') : t('shopping.markAdded')}</button>
          <button class="button ghost danger" type="button" data-action="delete-inventory" data-id="${normalized.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderShoppingList() {
  if (!els.shoppingList) return;
  const shoppingItems = state.inventory
    .map(normalizeFeedItem)
    .filter((item) => ['low', 'critical', 'empty'].includes(getFeedStatus(item).key));

  if (!shoppingItems.length) {
    els.shoppingList.innerHTML = `<p class="empty-state">${t('shopping.empty')}</p>`;
    return;
  }

  els.shoppingList.innerHTML = shoppingItems.map((item) => {
    const status = getFeedStatus(item);
    return `
      <article class="shopping-item">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <p>${formatNumber(item.quantity)} ${escapeHtml(item.unit)} - ${t('feed.daysLeft')}: ${getDaysRemaining(item)}</p>
        </div>
        <span class="pill ${status.className}">${t(`feed.${status.key}`)}</span>
        ${item.shoppingListed ? `<span class="pill warn">${t('shopping.added')}</span>` : ''}
        <button class="button ghost" type="button" data-action="toggle-shopping" data-id="${item.id}">${item.shoppingListed ? t('shopping.markNeeded') : t('shopping.markAdded')}</button>
      </article>
    `;
  }).join('');
}

function renderActionEmpty(messageKey, actionKey, action) {
  return `
    <div class="empty-state action-empty">
      <p>${t(messageKey)}</p>
      <button class="button secondary" type="button" data-quick-action="${action}">${t(actionKey)}</button>
    </div>
  `;
}

function renderEvents() {
  if (state.calendarEvents.length === 0) {
    els.eventsList.innerHTML = `<p class="empty-state">${t('calendar.empty')}</p>`;
    return;
  }
  const todayValue = today();
  const sortedEvents = getFilteredCalendarEvents()
    .sort((a, b) => `${a.date}T${a.time || '00:00'}`.localeCompare(`${b.date}T${b.time || '00:00'}`));
  if (sortedEvents.length === 0) {
    els.eventsList.innerHTML = `<p class="empty-state">${t('calendar.noFilteredEvents')}</p>`;
    return;
  }
  els.eventsList.innerHTML = sortedEvents.map((rawEvent) => {
    const event = normalizeCalendarEvent(rawEvent);
    const isPast = event.date < todayValue;
    const horses = event.horseIds
      .map((id) => state.horses.find((horse) => horse.id === id)?.name)
      .filter(Boolean);
    const raceDetails = [
      event.raceNumber && `${t('calendar.raceNumber')}: ${event.raceNumber}`,
      event.startNumber && `${t('calendar.startNumber')}: ${event.startNumber}`,
      event.driver && `${t('calendar.driver')}: ${event.driver}`,
      event.placement && `${t('calendar.placement')}: ${event.placement}`,
      event.result && `${t('calendar.result')}: ${event.result}`,
      event.prize && `${t('calendar.prize')}: ${event.prize}`
    ].filter(Boolean);
    return `
      <article class="item-card calendar-card ${isPast ? 'past-event' : ''}">
        <div>
          <h4>${escapeHtml(event.name)}</h4>
          <p>${escapeHtml(event.notes || t('common.noNotes'))}</p>
          <div class="item-meta">
            <span class="pill">${escapeHtml(event.date)}</span>
            <span class="pill">${escapeHtml(event.time || t('common.notSet'))}</span>
            <span class="pill ${isPast ? '' : 'good'}">${isPast ? t('calendar.past') : t('calendar.upcoming')}</span>
            <span class="pill event-type-pill">${t(`eventType.${event.type}`)}</span>
            <span class="pill">${escapeHtml(event.location || t('common.notSet'))}</span>
            <span class="pill">${horses.length ? escapeHtml(horses.join(', ')) : t('tasks.noHorse')}</span>
            ${event.handler ? `<span class="pill">${t('calendar.handler')}: ${escapeHtml(event.handler)}</span>` : ''}
          </div>
          ${event.type === 'race' && (raceDetails.length || event.postRaceNotes) ? `
            <div class="detail-box">
              <strong>${t('calendar.raceDetails')}</strong>
              ${raceDetails.length ? `<p>${escapeHtml(raceDetails.join(' | '))}</p>` : ''}
              ${event.postRaceNotes ? `<p>${escapeHtml(event.postRaceNotes)}</p>` : ''}
            </div>
          ` : ''}
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-event" data-id="${event.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-event" data-id="${event.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function getFilteredCalendarEvents() {
  const todayValue = today();
  return state.calendarEvents
    .map(normalizeCalendarEvent)
    .filter((event) => {
      const matchesScope =
        calendarFilters.scope === 'all' ||
        (calendarFilters.scope === 'upcoming' && event.date >= todayValue) ||
        (calendarFilters.scope === 'past' && event.date < todayValue);
      const matchesType = calendarFilters.type === 'all' || event.type === calendarFilters.type;
      const matchesHorse = calendarFilters.horse === 'all' || event.horseIds.includes(calendarFilters.horse);
      return matchesScope && matchesType && matchesHorse;
    });
}

function renderCalendarPlanner() {
  if (!els.calendarPlannerList) return;
  const todayValue = today();
  const now = new Date(`${todayValue}T00:00:00`);
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const eventsToday = state.calendarEvents.map(normalizeCalendarEvent).filter((event) => event.date === todayValue);
  const weekEvents = state.calendarEvents.map(normalizeCalendarEvent).filter((event) => {
    const eventDate = new Date(`${event.date}T00:00:00`);
    return eventDate >= now && eventDate <= weekEnd;
  });
  const horseNames = [...new Set(weekEvents
    .flatMap((event) => event.horseIds)
    .map((id) => state.horses.find((horse) => horse.id === id)?.name)
    .filter(Boolean))];

  if (!eventsToday.length && !weekEvents.length && !horseNames.length) {
    els.calendarPlannerList.innerHTML = `<p class="empty-state today-empty">${t('calendar.plannerEmpty')}</p>`;
    return;
  }

  els.calendarPlannerList.innerHTML = `
    <article class="today-card">
      <h4>${t('calendar.todayEvents')}</h4>
      ${eventsToday.length ? eventsToday.map((event) => `<p>${escapeHtml(formatEventLine(event))}</p>`).join('') : `<p>${t('calendar.plannerEmpty')}</p>`}
    </article>
    <article class="today-card">
      <h4>${t('calendar.weekEvents')}</h4>
      ${weekEvents.length ? weekEvents.map((event) => `<p>${escapeHtml(formatEventLine(event))}</p>`).join('') : `<p>${t('calendar.plannerEmpty')}</p>`}
    </article>
    <article class="today-card">
      <h4>${t('calendar.horsesScheduled')}</h4>
      <p>${horseNames.length ? escapeHtml(horseNames.join(', ')) : t('tasks.noHorse')}</p>
    </article>
  `;
}

function formatEventLine(event) {
  return `${event.date}${event.time ? ` ${event.time}` : ''} - ${event.name} (${t(`eventType.${event.type}`)})`;
}

function getDaysRemaining(item) {
  if (Number(item.quantity) <= 0) return '0';
  const dailyUsage = getEffectiveDailyUsage(item);
  if (dailyUsage <= 0) return t('feed.notSet');
  return Math.floor(Number(item.quantity) / dailyUsage).toString();
}

function getEffectiveDailyUsage(item) {
  const normalized = normalizeFeedItem(item);
  if (Number(normalized.dailyUsage) > 0) return Number(normalized.dailyUsage);
  if (Number(normalized.perHorseUsage) > 0 && normalized.horseIds.length) {
    return Number(normalized.perHorseUsage) * normalized.horseIds.length;
  }
  return 0;
}

function getFeedStatus(item) {
  const normalized = normalizeFeedItem(item);
  const quantity = Number(normalized.quantity);
  const minimum = Number(normalized.minimum);
  const dailyUsage = getEffectiveDailyUsage(normalized);
  const days = dailyUsage > 0 ? quantity / dailyUsage : Infinity;
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
    nickname: form.elements.nickname.value.trim(),
    owner: form.elements.owner.value.trim(),
    breed: form.elements.breed.value.trim(),
    birth: form.elements.birth.value.trim(),
    gender: form.elements.gender.value.trim(),
    color: form.elements.color.value.trim(),
    registration: form.elements.registration.value.trim(),
    feedingNotes: form.elements.feedingNotes.value.trim(),
    careNotes: form.elements.careNotes.value.trim(),
    shoeingNotes: form.elements.shoeingNotes.value.trim(),
    vaccinationNotes: form.elements.vaccinationNotes.value.trim(),
    dewormingNotes: form.elements.dewormingNotes.value.trim(),
    vetNotes: form.elements.vetNotes.value.trim(),
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
  const existing = state.inventory.find((entry) => entry.id === form.elements.id.value);
  const existingNormalized = existing ? normalizeFeedItem(existing) : null;
  const quantity = Number(form.elements.quantity.value);
  const todayValue = today();
  const history = existingNormalized?.history ? [...existingNormalized.history] : [];
  if (!existingNormalized || Number(existingNormalized.quantity) !== quantity) {
    history.push({ date: todayValue, quantity });
  }
  upsert('inventory', {
    id: form.elements.id.value,
    name: form.elements.name.value.trim(),
    category: form.elements.category.value.trim(),
    quantity,
    unit: form.elements.unit.value.trim(),
    dailyUsage: Number(form.elements.dailyUsage.value),
    minimum: Number(form.elements.minimum.value),
    supplier: form.elements.supplier.value.trim(),
    purchaseDate: form.elements.purchaseDate.value,
    expiryDate: form.elements.expiryDate.value,
    storageLocation: form.elements.storageLocation.value.trim(),
    cost: form.elements.cost.value,
    notes: form.elements.notes.value.trim(),
    horseIds: getSelectedOptions(form.elements.horseIds),
    perHorseUsage: Number(form.elements.perHorseUsage.value || 0),
    shoppingListed: existingNormalized?.shoppingListed || false,
    lastUpdated: todayValue,
    history
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
    time: form.elements.time.value,
    name: form.elements.name.value.trim(),
    type: form.elements.type.value,
    location: form.elements.location.value.trim(),
    horseIds: getSelectedOptions(form.elements.horseIds),
    handler: form.elements.handler.value.trim(),
    raceNumber: form.elements.raceNumber.value.trim(),
    startNumber: form.elements.startNumber.value.trim(),
    driver: form.elements.driver.value.trim(),
    placement: form.elements.placement.value.trim(),
    result: form.elements.result.value.trim(),
    prize: form.elements.prize.value.trim(),
    postRaceNotes: form.elements.postRaceNotes.value.trim(),
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
  if (action === 'toggle-shopping') toggleShoppingStatus(id);
  if (action === 'edit-event') fillEventForm(id);
  if (action === 'delete-event') deleteItem('calendarEvents', id, t('delete.event'), t('message.eventDeleted'));
}

function handleCalendarFilterChange() {
  calendarFilters = {
    scope: els.calendarScopeFilter?.value || 'all',
    type: els.calendarTypeFilter?.value || 'all',
    horse: els.calendarHorseFilter?.value || 'all'
  };
  renderEvents();
}

function toggleShoppingStatus(id) {
  state.inventory = state.inventory.map((item) => {
    if (item.id !== id) return item;
    const normalized = normalizeFeedItem(item);
    return { ...normalized, shoppingListed: !normalized.shoppingListed };
  });
  saveData();
  render();
  showMessage(t('message.shoppingUpdated'));
}

function handleQuickAction(event) {
  const button = event.target.closest('[data-quick-action]');
  if (!button) return;
  const action = button.dataset.quickAction;
  const actionMap = {
    horse: { view: 'stable', tab: 'horses', form: els.horseForm },
    task: { view: 'stable', tab: 'tasks', form: els.taskForm },
    hours: { view: 'stable', tab: 'hours', form: els.hoursForm },
    feed: { view: 'stable', tab: 'inventory', form: els.inventoryForm },
    event: { view: 'calendar', form: els.eventForm }
  };
  const target = actionMap[action];
  if (!target) return;
  showView(target.view);
  if (target.tab) activateTab(target.tab);
  target.form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillHorseForm(id) {
  const found = state.horses.find((item) => item.id === id);
  if (!found) return;
  const horse = normalizeHorse(found);
  els.horseForm.elements.id.value = horse.id;
  els.horseForm.elements.name.value = horse.name;
  els.horseForm.elements.nickname.value = horse.nickname;
  els.horseForm.elements.owner.value = horse.owner;
  els.horseForm.elements.breed.value = horse.breed;
  els.horseForm.elements.birth.value = horse.birth;
  els.horseForm.elements.gender.value = horse.gender;
  els.horseForm.elements.color.value = horse.color;
  els.horseForm.elements.registration.value = horse.registration;
  els.horseForm.elements.feedingNotes.value = horse.feedingNotes;
  els.horseForm.elements.careNotes.value = horse.careNotes;
  els.horseForm.elements.shoeingNotes.value = horse.shoeingNotes;
  els.horseForm.elements.vaccinationNotes.value = horse.vaccinationNotes;
  els.horseForm.elements.dewormingNotes.value = horse.dewormingNotes;
  els.horseForm.elements.vetNotes.value = horse.vetNotes;
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
  const found = state.inventory.find((entry) => entry.id === id);
  if (!found) return;
  const item = normalizeFeedItem(found);
  els.inventoryForm.elements.id.value = item.id;
  els.inventoryForm.elements.name.value = item.name;
  els.inventoryForm.elements.category.value = item.category;
  els.inventoryForm.elements.quantity.value = item.quantity;
  els.inventoryForm.elements.unit.value = item.unit;
  els.inventoryForm.elements.dailyUsage.value = item.dailyUsage;
  els.inventoryForm.elements.minimum.value = item.minimum;
  els.inventoryForm.elements.supplier.value = item.supplier;
  els.inventoryForm.elements.purchaseDate.value = item.purchaseDate;
  els.inventoryForm.elements.expiryDate.value = item.expiryDate;
  els.inventoryForm.elements.storageLocation.value = item.storageLocation;
  els.inventoryForm.elements.cost.value = item.cost;
  els.inventoryForm.elements.notes.value = item.notes;
  els.inventoryForm.elements.perHorseUsage.value = item.perHorseUsage || '';
  setSelectedOptions(els.inventoryForm.elements.horseIds, item.horseIds);
  els.inventoryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillEventForm(id) {
  const found = state.calendarEvents.find((entry) => entry.id === id);
  if (!found) return;
  const item = normalizeCalendarEvent(found);
  els.eventForm.elements.id.value = item.id;
  els.eventForm.elements.date.value = item.date;
  els.eventForm.elements.time.value = item.time;
  els.eventForm.elements.name.value = item.name;
  els.eventForm.elements.type.value = item.type;
  els.eventForm.elements.location.value = item.location;
  els.eventForm.elements.handler.value = item.handler;
  els.eventForm.elements.raceNumber.value = item.raceNumber;
  els.eventForm.elements.startNumber.value = item.startNumber;
  els.eventForm.elements.driver.value = item.driver;
  els.eventForm.elements.placement.value = item.placement;
  els.eventForm.elements.result.value = item.result;
  els.eventForm.elements.prize.value = item.prize;
  els.eventForm.elements.postRaceNotes.value = item.postRaceNotes;
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

function normalizeImportedData(imported) {
  if (!imported || typeof imported !== 'object') throw new Error(t('backup.errorInvalidShape'));
  const data = imported.data && typeof imported.data === 'object' ? imported.data : imported;
  const hasExpectedArrays = ['horses', 'tasks', 'hours', 'inventory'].some((key) => Array.isArray(data[key]));
  if (!hasExpectedArrays) throw new Error(t('backup.errorInvalidShape'));
  return {
    horses: Array.isArray(data.horses) ? data.horses.map(normalizeHorse) : [],
    tasks: Array.isArray(data.tasks) ? data.tasks : [],
    hours: Array.isArray(data.hours) ? data.hours : [],
    inventory: Array.isArray(data.inventory) ? data.inventory.map(normalizeFeedItem) : [],
    calendarEvents: Array.isArray(data.calendarEvents) ? data.calendarEvents.map(normalizeCalendarEvent) : []
  };
}

function renderBackupStatus() {
  if (!els.lastBackupAt) return;
  els.lastBackupAt.textContent = localStorage.getItem(LAST_BACKUP_KEY) || '-';
  if (els.restoreEmergencyButton) {
    els.restoreEmergencyButton.disabled = !localStorage.getItem(EMERGENCY_BACKUP_KEY);
  }
  if (els.importPreview && !els.importPreview.textContent.trim()) {
    els.importPreview.textContent = t('backup.noPreview');
  }
}

function formatBackupStamp(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

function createBackupPayload(createdAt = new Date().toISOString(), data = state) {
  const normalizedData = normalizeImportedData(data);
  return {
    appName: 'EquiTrack',
    backupFormatVersion: 3,
    createdAt,
    exportedFrom: 'EquiTrack-Web',
    counts: getCounts(normalizedData),
    data: normalizedData
  };
}

function exportBackup() {
  const now = new Date();
  const createdAt = now.toISOString();
  const backup = createBackupPayload(createdAt);
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `equitrack-backup-${formatBackupStamp(now)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  localStorage.setItem(LAST_BACKUP_KEY, createdAt);
  renderBackupStatus();
  showMessage(t('message.backupExported', { count: getTotalCount() }));
}

async function importBackup(file) {
  if (!file) return;
  try {
    let parsed;
    try {
      parsed = JSON.parse(await file.text());
    } catch {
      throw new Error(t('backup.errorInvalidJson'));
    }
    const nextState = normalizeImportedData(parsed);
    const counts = getCounts(nextState);
    els.importPreview.textContent = t('backup.preview', counts);
    if (!window.confirm(t('backup.confirmImport'))) return;
    localStorage.setItem(EMERGENCY_BACKUP_KEY, JSON.stringify(createBackupPayload(new Date().toISOString(), state)));
    state = nextState;
    saveData();
    render();
    showMessage(`${t('message.emergencySaved')} ${t('message.backupImported', { count: getTotalCount() })}`);
  } catch (error) {
    showMessage(t('message.importFailed', { error: error.message }));
  } finally {
    els.importInput.value = '';
  }
}

function restoreEmergencyBackup() {
  const stored = localStorage.getItem(EMERGENCY_BACKUP_KEY);
  if (!stored) {
    showMessage(t('backup.noEmergency'));
    return;
  }
  if (!window.confirm(t('backup.confirmRestore'))) return;
  try {
    const parsed = JSON.parse(stored);
    state = normalizeImportedData(parsed);
    saveData();
    render();
    showMessage(t('message.emergencyRestored'));
  } catch (error) {
    showMessage(t('message.importFailed', { error: error.message }));
  }
}

function resetLocalData() {
  const answer = window.prompt(t('confirm.reset'));
  if (answer !== 'DELETE') {
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
    button.addEventListener('click', () => activateTab(button.dataset.tab));
  });
}

function activateTab(tabName) {
  const button = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
  const panel = document.querySelector(`#${tabName}Panel`);
  if (!button || !panel) return;
  document.querySelectorAll('.tab-button').forEach((tab) => tab.classList.remove('active'));
  document.querySelectorAll('.module-panel').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  panel.classList.add('active');
}

function handleLanguageChange(event) {
  currentLanguage = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyTranslations();
  render();
  updateOfflineStatus(false);
  updateAuthUi();
  showMessage(t('message.languageChanged'));
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  if (!isSupabaseConfigured() || !supabaseClient) {
    showMessage(t('message.authConfigMissing'));
    updateAuthUi();
    return;
  }
  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  els.loginButton.disabled = true;
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    authUser = data.user || null;
    form.reset();
    updateAuthUi();
    showMessage(t('message.authLoginSuccess'));
    showView('stable');
  } catch (error) {
    showMessage(t('message.authLoginFailed', { error: error.message }));
  } finally {
    updateAuthUi();
  }
}

async function handleLogout() {
  if (!supabaseClient) {
    authUser = null;
    updateAuthUi();
    showView('home');
    showMessage(t('message.authLogoutSuccess'));
    return;
  }
  try {
    await supabaseClient.auth.signOut();
  } finally {
    authUser = null;
    updateAuthUi();
    showView('home');
    showMessage(t('message.authLogoutSuccess'));
  }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        pendingServiceWorker = registration.waiting;
        showUpdateNotice();
      }
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            pendingServiceWorker = worker;
            showUpdateNotice();
          }
        });
      });
    }).catch(() => {
      // PWA support is optional; normal browser use should continue quietly.
    });
  });
}

function showUpdateNotice() {
  if (!els.updateNotice) return;
  els.updateNotice.hidden = false;
}

function updateOfflineStatus(showFeedback = true) {
  if (!els.offlineStatus) return;
  const offline = !navigator.onLine;
  els.offlineStatus.hidden = !offline;
  if (showFeedback) showMessage(offline ? t('pwa.offlineText') : t('pwa.onlineText'));
}

function refreshForUpdate() {
  if (!pendingServiceWorker) {
    window.location.reload();
    return;
  }
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  pendingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
}

document.querySelectorAll('.item-list').forEach((list) => list.addEventListener('click', handleListClick));
document.querySelector('#stableView').addEventListener('click', handleQuickAction);
els.horseForm.addEventListener('submit', handleHorseSubmit);
els.taskForm.addEventListener('submit', handleTaskSubmit);
els.hoursForm.addEventListener('submit', handleHoursSubmit);
els.inventoryForm.addEventListener('submit', handleInventorySubmit);
els.eventForm.addEventListener('submit', handleEventSubmit);
els.exportButton.addEventListener('click', exportBackup);
els.importInput.addEventListener('change', (event) => importBackup(event.target.files[0]));
els.restoreEmergencyButton?.addEventListener('click', restoreEmergencyBackup);
els.refreshAppButton?.addEventListener('click', refreshForUpdate);
els.resetDataButton.addEventListener('click', resetLocalData);
els.languageSelect.addEventListener('change', handleLanguageChange);
els.loginForm?.addEventListener('submit', handleLoginSubmit);
els.logoutButton?.addEventListener('click', handleLogout);
els.calendarScopeFilter?.addEventListener('change', handleCalendarFilterChange);
els.calendarTypeFilter?.addEventListener('change', handleCalendarFilterChange);
els.calendarHorseFilter?.addEventListener('change', handleCalendarFilterChange);
els.taskForm.elements.date.value = today();
els.hoursForm.elements.date.value = today();
els.eventForm.elements.date.value = today();

applyTranslations();
setupViewNav();
setupOnboarding();
setupTabs();
render();
setupAuth();
updateOfflineStatus(false);
window.addEventListener('online', () => updateOfflineStatus(true));
window.addEventListener('offline', () => updateOfflineStatus(true));
registerServiceWorker();
