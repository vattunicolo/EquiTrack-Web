const STORAGE_KEY = 'equitrack-web-data-v1';
const LANGUAGE_KEY = 'equitrack-web-language';
const LAST_BACKUP_KEY = 'equitrack-web-last-backup';
const EMERGENCY_BACKUP_KEY = 'equitrack-web-emergency-backup';
const ONBOARDING_KEY = 'equitrack-web-onboarding-complete';
const LAST_CLOUD_UPLOAD_KEY = 'equitrack-web-last-cloud-upload';
const DEFAULT_LANGUAGE = 'en';
const EVENT_TYPES = ['race', 'training', 'shoeing', 'vaccination', 'vet', 'feeding', 'other'];
const PROTECTED_VIEWS = ['stable', 'calendar', 'settings'];

const SUPABASE_CONFIG = {
  SUPABASE_URL: 'https://fuojlxcexpnszepgipbv.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_6_byc2-epHvcZw1g5LlFOg_wAGSYMkU'
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
    'auth.setupNeeded': 'Supabase is not configured yet. Add your Supabase URL and publishable key in script.js to enable login.',
    'auth.setupReady': 'Login is ready for existing Supabase users.',
    'auth.networkError': 'Supabase could not be reached. Check the project URL, publishable key, allowed site URL, and network connection.',
    'auth.invalidCredentials': 'Invalid email or password.',
    'auth.noRegistration': 'No public sign-up is available. Accounts are created by the administrator.',
    'cloud.notConnected': 'Not connected',
    'cloud.loadingStable': 'Loading stable...',
    'cloud.connectedAs': 'Connected as {email}',
    'cloud.activeStable': 'Active stable: {name}',
    'cloud.noStable': 'No stable has been assigned to this account yet.',
    'cloud.permissionBlocked': 'Stable access is blocked by database permissions.',
    'cloud.loadError': 'Error loading stable.',
    'cloud.syncLocal': 'Cloud sync is not enabled yet. Local data still stays in this browser.',
    'cloud.prepTitle': 'Cloud sync preparation',
    'cloud.prepText': 'Your data is still stored locally in this browser. Cloud sync will be enabled in a later step.',
    'cloud.email': 'Logged-in email',
    'cloud.stable': 'Active stable',
    'cloud.status': 'Cloud status',
    'migration.title': 'Move local data to cloud',
    'migration.text': 'Review the local browser data that will be copied to the active cloud stable after confirmation.',
    'migration.targetStable': 'Upload target stable',
    'migration.warningLocal': 'This will copy your current local browser data to the cloud.',
    'migration.warningConfirm': 'Your local data will stay in this browser.',
    'migration.warningOverwrite': 'This does not enable automatic sync yet.',
    'migration.warningCloudRows': 'Rows from earlier manual uploads may be updated, but cloud rows are not deleted.',
    'migration.disabledButton': 'Preview only - upload not enabled yet',
    'migration.noStable': 'Assign a stable before cloud migration.',
    'migration.lastUpload': 'Last cloud upload',
    'migration.confirmLabel': 'Type CLOUD to enable manual upload',
    'migration.uploadButton': 'Upload local data to cloud',
    'migration.uploadNotReady': 'Manual upload is disabled until you are logged in, have an active stable, and type CLOUD.',
    'migration.uploadReady': 'Ready to copy local data to the active cloud stable.',
    'migration.uploading': 'Uploading local data to cloud...',
    'migration.confirmUpload': 'Upload current local browser data to the active cloud stable? Local data will stay in this browser.',
    'migration.schemaNeeded': 'Cloud upload needs the local_id database migration. Run supabase/migrations/add_local_ids.sql in Supabase, then try again.',
    'migration.uploadSuccess': 'Cloud upload complete: {horses} horses, {tasks} tasks, {hours} work logs, {inventory} feed items, {events} calendar events.',
    'migration.uploadFailed': 'Cloud upload failed: {error}',
    'cloudRead.title': 'Cloud read preview',
    'cloudRead.text': 'Check cloud counts for the active stable without changing local data.',
    'cloudRead.targetStable': 'Read target stable',
    'cloudRead.compareHelp': 'Each row shows local count / cloud count.',
    'cloudRead.warningReadOnly': 'This preview is read-only.',
    'cloudRead.warningLocalActive': 'Your app is still using local browser data.',
    'cloudRead.warningNoSync': 'Cloud sync is not enabled yet.',
    'cloudRead.warningNoLocalChange': 'No local data will be changed.',
    'cloudRead.button': 'Check cloud data',
    'cloudRead.notReady': 'Log in and assign an active stable before reading cloud data.',
    'cloudRead.ready': 'Ready to check cloud data.',
    'cloudRead.loading': 'Checking cloud data...',
    'cloudRead.success': 'Cloud counts loaded.',
    'cloudRead.noStable': 'Assign a stable before reading cloud data.',
    'cloudRead.permissionBlocked': 'Cloud data access is blocked by database permissions.',
    'cloudRead.failed': 'Cloud read failed: {error}',
    'cloudMode.title': 'Cloud mode preview',
    'cloudMode.text': 'Preview cloud data in the app without replacing local browser data.',
    'cloudMode.currentMode': 'Current mode',
    'cloudMode.targetStable': 'Preview stable',
    'cloudMode.localStatus': 'Local data mode',
    'cloudMode.previewStatus': 'Cloud preview mode, read-only',
    'cloudMode.warningLocalDefault': 'Local data is still the default.',
    'cloudMode.warningViewCloud': 'Cloud mode preview lets you view cloud data in the app.',
    'cloudMode.warningLocalSafe': 'This does not delete local data.',
    'cloudMode.warningNoSync': 'This does not enable automatic sync yet.',
    'cloudMode.warningReadOnly': 'Cloud preview is read-only.',
    'cloudMode.previewButton': 'Preview cloud data',
    'cloudMode.localButton': 'Return to local data',
    'cloudMode.notReady': 'Log in and assign an active stable before previewing cloud data.',
    'cloudMode.ready': 'Ready to load a read-only cloud snapshot.',
    'cloudMode.loading': 'Loading cloud preview...',
    'cloudMode.enabled': 'Cloud preview loaded. Editing is read-only.',
    'cloudMode.returnedLocal': 'Returned to local data mode.',
    'cloudMode.failed': 'Cloud preview failed: {error}',
    'cloudMode.readOnlyMessage': 'Cloud preview is read-only. Return to local data to make changes.',
    'horseCloud.title': 'Cloud write mode - Horses',
    'horseCloud.text': 'Experimental phase: only horse profiles are saved to the cloud.',
    'horseCloud.currentMode': 'Horse data mode',
    'horseCloud.targetStable': 'Horse cloud stable',
    'horseCloud.localMode': 'Local',
    'horseCloud.cloudMode': 'Cloud writes enabled',
    'horseCloud.warningExperimental': 'This is an experimental phase.',
    'horseCloud.warningHorsesOnly': 'Only horse profiles will be saved to the cloud.',
    'horseCloud.warningOthersLocal': 'Tasks, work hours, feed inventory, and calendar still stay local for now.',
    'horseCloud.warningLocalSafe': 'Local horse data will not be deleted.',
    'horseCloud.warningReturn': 'You can return horse writes to local mode.',
    'horseCloud.confirmLabel': 'Type HORSES CLOUD to enable cloud horse writes',
    'horseCloud.enableButton': 'Enable cloud horse writes',
    'horseCloud.localButton': 'Return horse writes to local mode',
    'horseCloud.notReady': 'Horse cloud writes are disabled until you are logged in, have an active stable, and type HORSES CLOUD.',
    'horseCloud.ready': 'Ready to enable cloud writes for horses only.',
    'horseCloud.loading': 'Loading cloud horses...',
    'horseCloud.enabled': 'Cloud horse writes enabled. Other areas remain local.',
    'horseCloud.returnedLocal': 'Horse writes returned to local mode.',
    'horseCloud.saveFailed': 'Cloud horse save failed: {error}',
    'horseCloud.deleteFailed': 'Cloud horse delete failed: {error}',
    'horseCloud.loadFailed': 'Cloud horse mode failed: {error}',
    'horseCloud.permissionBlocked': 'Cloud horse writes are blocked by database permissions.',
    'horseCloud.saved': 'Horse saved to cloud.',
    'horseCloud.deleted': 'Horse deleted from cloud.',
    'taskCloud.title': 'Cloud write mode - Tasks',
    'taskCloud.text': 'Experimental phase: only task data is saved to the cloud.',
    'taskCloud.currentMode': 'Task data mode',
    'taskCloud.targetStable': 'Task cloud stable',
    'taskCloud.localMode': 'Local',
    'taskCloud.cloudMode': 'Cloud writes enabled',
    'taskCloud.warningExperimental': 'This is an experimental phase.',
    'taskCloud.warningTasksOnly': 'Only task data will be saved to the cloud.',
    'taskCloud.warningOthersLocal': 'Work hours, feed inventory, and calendar still stay local for now.',
    'taskCloud.warningLocalSafe': 'Local task data will not be deleted.',
    'taskCloud.warningReturn': 'You can return task writes to local mode.',
    'taskCloud.confirmLabel': 'Type TASKS CLOUD to enable cloud task writes',
    'taskCloud.enableButton': 'Enable cloud task writes',
    'taskCloud.localButton': 'Return task writes to local mode',
    'taskCloud.notReady': 'Task cloud writes are disabled until you are logged in, have an active stable, and type TASKS CLOUD.',
    'taskCloud.ready': 'Ready to enable cloud writes for tasks only.',
    'taskCloud.loading': 'Loading cloud tasks...',
    'taskCloud.enabled': 'Cloud task writes enabled. Work hours, feed inventory, and calendar remain local.',
    'taskCloud.returnedLocal': 'Task writes returned to local mode.',
    'taskCloud.saveFailed': 'Cloud task save failed: {error}',
    'taskCloud.deleteFailed': 'Cloud task delete failed: {error}',
    'taskCloud.loadFailed': 'Cloud task mode failed: {error}',
    'taskCloud.permissionBlocked': 'Cloud task writes are blocked by database permissions.',
    'taskCloud.saved': 'Task saved to cloud.',
    'taskCloud.deleted': 'Task deleted from cloud.',
    'taskCloud.toggled': 'Task status saved to cloud.',
    'workCloud.title': 'Cloud write mode - Work logs',
    'workCloud.text': 'Experimental phase: only work hour and work log data is saved to the cloud.',
    'workCloud.currentMode': 'Work log data mode',
    'workCloud.targetStable': 'Work log cloud stable',
    'workCloud.localMode': 'Local',
    'workCloud.cloudMode': 'Cloud writes enabled',
    'workCloud.warningExperimental': 'This is an experimental phase.',
    'workCloud.warningWorkOnly': 'Only work hour and work log data will be saved to the cloud.',
    'workCloud.warningOthersLocal': 'Feed inventory and calendar still stay local for now.',
    'workCloud.warningLocalSafe': 'Local work log data will not be deleted.',
    'workCloud.warningReturn': 'You can return work logs to local mode.',
    'workCloud.confirmLabel': 'Type WORK CLOUD to enable cloud work log writes',
    'workCloud.enableButton': 'Enable cloud work log writes',
    'workCloud.localButton': 'Return work logs to local mode',
    'workCloud.notReady': 'Work log cloud writes are disabled until you are logged in, have an active stable, and type WORK CLOUD.',
    'workCloud.ready': 'Ready to enable cloud writes for work logs only.',
    'workCloud.loading': 'Loading cloud work logs...',
    'workCloud.enabled': 'Cloud work log writes enabled. Feed inventory and calendar remain local.',
    'workCloud.returnedLocal': 'Work log writes returned to local mode.',
    'workCloud.saveFailed': 'Cloud work log save failed: {error}',
    'workCloud.deleteFailed': 'Cloud work log delete failed: {error}',
    'workCloud.loadFailed': 'Cloud work log mode failed: {error}',
    'workCloud.permissionBlocked': 'Cloud work log writes are blocked by database permissions.',
    'workCloud.saved': 'Work log saved to cloud.',
    'workCloud.deleted': 'Work log deleted from cloud.',
    'cloudCleanup.title': 'Cloud cleanup',
    'cloudCleanup.text': 'Delete cloud rows for the active stable when cloud preview counts are duplicated or wrong.',
    'cloudCleanup.targetStable': 'Cleanup target stable',
    'cloudCleanup.warningDeletesCloud': 'This can delete cloud rows for the active stable.',
    'cloudCleanup.warningLocalSafe': 'Local browser data will not be deleted.',
    'cloudCleanup.warningUseCase': 'Use this only if cloud preview counts are duplicated or wrong.',
    'cloudCleanup.warningReupload': 'After cleanup, run manual upload again to copy local data back to cloud.',
    'cloudCleanup.confirmLabel': 'Type RESET CLOUD to enable cleanup',
    'cloudCleanup.button': 'Delete cloud data for this stable',
    'cloudCleanup.notReady': 'Cleanup is disabled until you are logged in, have an active stable, and type RESET CLOUD.',
    'cloudCleanup.ready': 'Ready to delete cloud data for the active stable.',
    'cloudCleanup.deleting': 'Deleting cloud data for the active stable...',
    'cloudCleanup.confirmDelete': 'Delete cloud data for the active stable? Local browser data will not be deleted.',
    'cloudCleanup.success': 'Cloud cleanup complete: {events} calendar events, {inventory} feed items, {hours} work logs, {tasks} tasks, {horses} horses deleted.',
    'cloudCleanup.failed': 'Cloud cleanup failed: {error}',
    'cloudCleanup.permissionBlocked': 'Cloud cleanup is blocked by database permissions.',
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
    'auth.setupNeeded': 'Supabasea ei ole vielä määritetty. Lisää Supabase URL ja publishable key script.js-tiedostoon kirjautumisen käyttöön ottamiseksi.',
    'auth.setupReady': 'Kirjautuminen on valmis olemassa oleville Supabase-käyttäjille.',
    'auth.networkError': 'Supabaseen ei saada yhteyttä. Tarkista projektin URL, publishable key, sallittu sivuston URL ja verkkoyhteys.',
    'auth.invalidCredentials': 'Virheellinen sähköposti tai salasana.',
    'auth.noRegistration': 'Julkista rekisteröitymistä ei ole. Ylläpitäjä luo käyttäjätilit.',
    'cloud.notConnected': 'Ei yhdistetty',
    'cloud.loadingStable': 'Ladataan tallia...',
    'cloud.connectedAs': 'Yhdistetty käyttäjänä {email}',
    'cloud.activeStable': 'Aktiivinen talli: {name}',
    'cloud.noStable': 'Tälle tilille ei ole vielä määritetty tallia.',
    'cloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät tallin avaamisen.',
    'cloud.loadError': 'Tallin lataaminen epäonnistui.',
    'cloud.syncLocal': 'Pilvisynkronointi ei ole vielä käytössä. Paikalliset tiedot pysyvät tässä selaimessa.',
    'cloud.prepTitle': 'Pilvisynkronoinnin valmistelu',
    'cloud.prepText': 'Tietosi tallennetaan edelleen paikallisesti tähän selaimeen. Pilvisynkronointi otetaan käyttöön myöhemmässä vaiheessa.',
    'cloud.email': 'Kirjautuneen sähköposti',
    'cloud.stable': 'Aktiivinen talli',
    'cloud.status': 'Pilven tila',
    'migration.title': 'Siirrä paikalliset tiedot pilveen',
    'migration.text': 'Tarkista paikalliset selaintiedot, jotka kopioidaan aktiiviseen pilvitalliin vahvistuksen jälkeen.',
    'migration.targetStable': 'Kohdetalli',
    'migration.warningLocal': 'Tämä kopioi nykyiset paikalliset selaintietosi pilveen.',
    'migration.warningConfirm': 'Paikalliset tietosi säilyvät tässä selaimessa.',
    'migration.warningOverwrite': 'Tämä ei ota automaattista synkronointia vielä käyttöön.',
    'migration.warningCloudRows': 'Aiemmin manuaalisesti ladattuja rivejä voidaan päivittää, mutta pilvirivejä ei poisteta.',
    'migration.disabledButton': 'Vain esikatselu - lataus ei ole vielä käytössä',
    'migration.noStable': 'Määritä talli ennen pilvisiirtoa.',
    'migration.lastUpload': 'Viimeisin pilveen lataus',
    'migration.confirmLabel': 'Kirjoita CLOUD ottaaksesi manuaalisen latauksen käyttöön',
    'migration.uploadButton': 'Lataa paikalliset tiedot pilveen',
    'migration.uploadNotReady': 'Manuaalinen lataus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat CLOUD.',
    'migration.uploadReady': 'Valmis kopioimaan paikalliset tiedot aktiiviseen pilvitalliin.',
    'migration.uploading': 'Ladataan paikallisia tietoja pilveen...',
    'migration.confirmUpload': 'Ladataanko tämän selaimen paikalliset tiedot aktiiviseen pilvitalliin? Paikalliset tiedot säilyvät tässä selaimessa.',
    'migration.schemaNeeded': 'Pilveen lataus tarvitsee local_id-tietokantamigraation. Suorita supabase/migrations/add_local_ids.sql Supabasessa ja yritä uudelleen.',
    'migration.uploadSuccess': 'Pilveen lataus valmis: {horses} hevosta, {tasks} tehtävää, {hours} työkirjausta, {inventory} ruokavaraston tuotetta, {events} kalenteritapahtumaa.',
    'migration.uploadFailed': 'Pilveen lataus epäonnistui: {error}',
    'cloudRead.title': 'Pilvitietojen esikatselu',
    'cloudRead.text': 'Tarkista aktiivisen tallin pilvimäärät muuttamatta paikallisia tietoja.',
    'cloudRead.targetStable': 'Luettava talli',
    'cloudRead.compareHelp': 'Jokainen rivi näyttää paikallisen määrän / pilvimäärän.',
    'cloudRead.warningReadOnly': 'Tämä esikatselu on vain lukutilassa.',
    'cloudRead.warningLocalActive': 'Sovellus käyttää edelleen tämän selaimen paikallista dataa.',
    'cloudRead.warningNoSync': 'Pilvisynkronointi ei ole vielä käytössä.',
    'cloudRead.warningNoLocalChange': 'Paikallista dataa ei muuteta.',
    'cloudRead.button': 'Tarkista pilvidata',
    'cloudRead.notReady': 'Kirjaudu sisään ja varmista aktiivinen talli ennen pilvidatan lukemista.',
    'cloudRead.ready': 'Valmis tarkistamaan pilvitiedot.',
    'cloudRead.loading': 'Tarkistetaan pilvitietoja...',
    'cloudRead.success': 'Pilvimäärät ladattu.',
    'cloudRead.noStable': 'Määritä talli ennen pilvitietojen lukemista.',
    'cloudRead.permissionBlocked': 'Tietokannan käyttöoikeudet estävät pilvitietojen lukemisen.',
    'cloudRead.failed': 'Pilvitietojen luku epäonnistui: {error}',
    'cloudMode.title': 'Pilvitilan esikatselu',
    'cloudMode.text': 'Esikatsele pilvidataa sovelluksessa korvaamatta selaimen paikallista dataa.',
    'cloudMode.currentMode': 'Nykyinen tila',
    'cloudMode.targetStable': 'Esikatseltava talli',
    'cloudMode.localStatus': 'Paikallisen datan tila',
    'cloudMode.previewStatus': 'Pilviesikatselutila, vain luku',
    'cloudMode.warningLocalDefault': 'Paikallinen data on edelleen oletus.',
    'cloudMode.warningViewCloud': 'Pilvitilan esikatselu näyttää pilvidatan sovelluksessa.',
    'cloudMode.warningLocalSafe': 'Tämä ei poista paikallista dataa.',
    'cloudMode.warningNoSync': 'Tämä ei ota automaattista synkronointia käyttöön.',
    'cloudMode.warningReadOnly': 'Pilviesikatselu on vain lukutilassa.',
    'cloudMode.previewButton': 'Esikatsele pilvidataa',
    'cloudMode.localButton': 'Palaa paikalliseen dataan',
    'cloudMode.notReady': 'Kirjaudu sisään ja varmista aktiivinen talli ennen pilvidatan esikatselua.',
    'cloudMode.ready': 'Valmis lataamaan pilvidatan vain luku -esikatselun.',
    'cloudMode.loading': 'Ladataan pilviesikatselua...',
    'cloudMode.enabled': 'Pilviesikatselu ladattu. Muokkaus on vain lukutilassa.',
    'cloudMode.returnedLocal': 'Palattu paikallisen datan tilaan.',
    'cloudMode.failed': 'Pilviesikatselu epäonnistui: {error}',
    'cloudMode.readOnlyMessage': 'Pilviesikatselu on vain lukutilassa. Palaa paikalliseen dataan tehdäksesi muutoksia.',
    'horseCloud.title': 'Pilvikirjoitustila - Hevoset',
    'horseCloud.text': 'Kokeellinen vaihe: vain hevosprofiilit tallennetaan pilveen.',
    'horseCloud.currentMode': 'Hevosdatan tila',
    'horseCloud.targetStable': 'Hevosten pilvitalli',
    'horseCloud.localMode': 'Paikallinen',
    'horseCloud.cloudMode': 'Pilvikirjoitus käytössä',
    'horseCloud.warningExperimental': 'Tämä on kokeellinen vaihe.',
    'horseCloud.warningHorsesOnly': 'Vain hevosprofiilit tallennetaan pilveen.',
    'horseCloud.warningOthersLocal': 'Tehtävät, työtunnit, ruokavarasto ja kalenteri pysyvät toistaiseksi paikallisina.',
    'horseCloud.warningLocalSafe': 'Paikallista hevosdataa ei poisteta.',
    'horseCloud.warningReturn': 'Voit palauttaa hevosten tallennuksen paikalliseen tilaan.',
    'horseCloud.confirmLabel': 'Kirjoita HORSES CLOUD ottaaksesi hevosten pilvikirjoituksen käyttöön',
    'horseCloud.enableButton': 'Ota hevosten pilvikirjoitus käyttöön',
    'horseCloud.localButton': 'Palauta hevoset paikalliseen tilaan',
    'horseCloud.notReady': 'Hevosten pilvikirjoitus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat HORSES CLOUD.',
    'horseCloud.ready': 'Valmis ottamaan käyttöön hevosten pilvikirjoituksen.',
    'horseCloud.loading': 'Ladataan pilvihevosia...',
    'horseCloud.enabled': 'Hevosten pilvikirjoitus käytössä. Muut osiot pysyvät paikallisina.',
    'horseCloud.returnedLocal': 'Hevosten tallennus palautettu paikalliseen tilaan.',
    'horseCloud.saveFailed': 'Hevosen pilvitallennus epäonnistui: {error}',
    'horseCloud.deleteFailed': 'Hevosen pilvipoisto epäonnistui: {error}',
    'horseCloud.loadFailed': 'Hevosten pilvitila epäonnistui: {error}',
    'horseCloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät hevosten pilvikirjoituksen.',
    'horseCloud.saved': 'Hevonen tallennettu pilveen.',
    'horseCloud.deleted': 'Hevonen poistettu pilvestä.',
    'taskCloud.title': 'Pilvikirjoitustila - Tehtävät',
    'taskCloud.text': 'Kokeellinen vaihe: vain tehtävädata tallennetaan pilveen.',
    'taskCloud.currentMode': 'Tehtävädatan tila',
    'taskCloud.targetStable': 'Tehtävien pilvitalli',
    'taskCloud.localMode': 'Paikallinen',
    'taskCloud.cloudMode': 'Pilvikirjoitus käytössä',
    'taskCloud.warningExperimental': 'Tämä on kokeellinen vaihe.',
    'taskCloud.warningTasksOnly': 'Vain tehtävädata tallennetaan pilveen.',
    'taskCloud.warningOthersLocal': 'Työtunnit, ruokavarasto ja kalenteri pysyvät toistaiseksi paikallisina.',
    'taskCloud.warningLocalSafe': 'Paikallista tehtävädataa ei poisteta.',
    'taskCloud.warningReturn': 'Voit palauttaa tehtävien tallennuksen paikalliseen tilaan.',
    'taskCloud.confirmLabel': 'Kirjoita TASKS CLOUD ottaaksesi tehtävien pilvikirjoituksen käyttöön',
    'taskCloud.enableButton': 'Ota tehtävien pilvikirjoitus käyttöön',
    'taskCloud.localButton': 'Palauta tehtävät paikalliseen tilaan',
    'taskCloud.notReady': 'Tehtävien pilvikirjoitus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat TASKS CLOUD.',
    'taskCloud.ready': 'Valmis ottamaan käyttöön tehtävien pilvikirjoituksen.',
    'taskCloud.loading': 'Ladataan pilvitehtäviä...',
    'taskCloud.enabled': 'Tehtävien pilvikirjoitus käytössä. Työtunnit, ruokavarasto ja kalenteri pysyvät paikallisina.',
    'taskCloud.returnedLocal': 'Tehtävien tallennus palautettu paikalliseen tilaan.',
    'taskCloud.saveFailed': 'Tehtävän pilvitallennus epäonnistui: {error}',
    'taskCloud.deleteFailed': 'Tehtävän pilvipoisto epäonnistui: {error}',
    'taskCloud.loadFailed': 'Tehtävien pilvitila epäonnistui: {error}',
    'taskCloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät tehtävien pilvikirjoituksen.',
    'taskCloud.saved': 'Tehtävä tallennettu pilveen.',
    'taskCloud.deleted': 'Tehtävä poistettu pilvestä.',
    'taskCloud.toggled': 'Tehtävän tila tallennettu pilveen.',
    'workCloud.title': 'Pilvikirjoitustila - Työkirjaukset',
    'workCloud.text': 'Kokeellinen vaihe: vain työtunnit ja työkirjaukset tallennetaan pilveen.',
    'workCloud.currentMode': 'Työkirjausten tila',
    'workCloud.targetStable': 'Työkirjausten pilvitalli',
    'workCloud.localMode': 'Paikallinen',
    'workCloud.cloudMode': 'Pilvikirjoitus käytössä',
    'workCloud.warningExperimental': 'Tämä on kokeellinen vaihe.',
    'workCloud.warningWorkOnly': 'Vain työtunnit ja työkirjaukset tallennetaan pilveen.',
    'workCloud.warningOthersLocal': 'Ruokavarasto ja kalenteri pysyvät toistaiseksi paikallisina.',
    'workCloud.warningLocalSafe': 'Paikallisia työkirjauksia ei poisteta.',
    'workCloud.warningReturn': 'Voit palauttaa työkirjaukset paikalliseen tilaan.',
    'workCloud.confirmLabel': 'Kirjoita WORK CLOUD ottaaksesi työkirjausten pilvikirjoituksen käyttöön',
    'workCloud.enableButton': 'Ota työkirjausten pilvikirjoitus käyttöön',
    'workCloud.localButton': 'Palauta työkirjaukset paikalliseen tilaan',
    'workCloud.notReady': 'Työkirjausten pilvikirjoitus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat WORK CLOUD.',
    'workCloud.ready': 'Valmis ottamaan käyttöön työkirjausten pilvikirjoituksen.',
    'workCloud.loading': 'Ladataan pilvityökirjauksia...',
    'workCloud.enabled': 'Työkirjausten pilvikirjoitus käytössä. Ruokavarasto ja kalenteri pysyvät paikallisina.',
    'workCloud.returnedLocal': 'Työkirjausten tallennus palautettu paikalliseen tilaan.',
    'workCloud.saveFailed': 'Työkirjauksen pilvitallennus epäonnistui: {error}',
    'workCloud.deleteFailed': 'Työkirjauksen pilvipoisto epäonnistui: {error}',
    'workCloud.loadFailed': 'Työkirjausten pilvitila epäonnistui: {error}',
    'workCloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät työkirjausten pilvikirjoituksen.',
    'workCloud.saved': 'Työkirjaus tallennettu pilveen.',
    'workCloud.deleted': 'Työkirjaus poistettu pilvestä.',
    'cloudCleanup.title': 'Pilvidatan siivous',
    'cloudCleanup.text': 'Poista aktiivisen tallin pilvirivit, jos pilviesikatselun määrät ovat kahdentuneet tai virheelliset.',
    'cloudCleanup.targetStable': 'Siivottava talli',
    'cloudCleanup.warningDeletesCloud': 'Tämä voi poistaa aktiivisen tallin pilvirivejä.',
    'cloudCleanup.warningLocalSafe': 'Tämän selaimen paikallista dataa ei poisteta.',
    'cloudCleanup.warningUseCase': 'Käytä tätä vain, jos pilviesikatselun määrät ovat kahdentuneet tai virheelliset.',
    'cloudCleanup.warningReupload': 'Siivouksen jälkeen voit ladata paikalliset tiedot pilveen uudelleen manuaalisesti.',
    'cloudCleanup.confirmLabel': 'Kirjoita RESET CLOUD ottaaksesi siivouksen käyttöön',
    'cloudCleanup.button': 'Poista tämän tallin pilvidata',
    'cloudCleanup.notReady': 'Siivous on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat RESET CLOUD.',
    'cloudCleanup.ready': 'Valmis poistamaan aktiivisen tallin pilvidata.',
    'cloudCleanup.deleting': 'Poistetaan aktiivisen tallin pilvidataa...',
    'cloudCleanup.confirmDelete': 'Poistetaanko aktiivisen tallin pilvidata? Paikallista selaindataa ei poisteta.',
    'cloudCleanup.success': 'Pilvisiivoaminen valmis: {events} kalenteritapahtumaa, {inventory} ruokavaraston tuotetta, {hours} työkirjausta, {tasks} tehtävää, {horses} hevosta poistettu.',
    'cloudCleanup.failed': 'Pilvisiivoaminen epäonnistui: {error}',
    'cloudCleanup.permissionBlocked': 'Tietokannan käyttöoikeudet estävät pilvidatan siivoamisen.',
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
    'auth.setupNeeded': "Supabase non è ancora configurato. Aggiungi l'URL Supabase e la publishable key in script.js per abilitare l'accesso.",
    'auth.setupReady': 'Accesso pronto per gli utenti Supabase esistenti.',
    'auth.networkError': "Supabase non è raggiungibile. Controlla l'URL del progetto, la publishable key, l'URL del sito consentito e la connessione.",
    'auth.invalidCredentials': 'Email o password non validi.',
    'auth.noRegistration': "La registrazione pubblica non è disponibile. Gli account sono creati dall'amministratore.",
    'cloud.notConnected': 'Non connesso',
    'cloud.loadingStable': 'Caricamento scuderia...',
    'cloud.connectedAs': 'Connesso come {email}',
    'cloud.activeStable': 'Scuderia attiva: {name}',
    'cloud.noStable': 'Nessuna scuderia è stata ancora assegnata a questo account.',
    'cloud.permissionBlocked': 'L’accesso alla scuderia è bloccato dai permessi del database.',
    'cloud.loadError': 'Errore durante il caricamento della scuderia.',
    'cloud.syncLocal': 'La sincronizzazione cloud non è ancora attiva. I dati locali restano in questo browser.',
    'cloud.prepTitle': 'Preparazione sincronizzazione cloud',
    'cloud.prepText': 'I tuoi dati sono ancora salvati localmente in questo browser. La sincronizzazione cloud sarà attivata in un passaggio successivo.',
    'cloud.email': 'Email connessa',
    'cloud.stable': 'Scuderia attiva',
    'cloud.status': 'Stato cloud',
    'migration.title': 'Sposta dati locali nel cloud',
    'migration.text': 'Controlla i dati locali del browser che saranno copiati nella scuderia cloud attiva dopo la conferma.',
    'migration.targetStable': 'Scuderia di destinazione',
    'migration.warningLocal': 'Questo copierà nel cloud i dati locali attuali del browser.',
    'migration.warningConfirm': 'I dati locali resteranno in questo browser.',
    'migration.warningOverwrite': 'Questo non abilita ancora la sincronizzazione automatica.',
    'migration.warningCloudRows': 'Le righe caricate manualmente in precedenza possono essere aggiornate, ma nessuna riga cloud viene eliminata.',
    'migration.disabledButton': 'Solo anteprima - caricamento non ancora attivo',
    'migration.noStable': 'Assegna una scuderia prima della migrazione cloud.',
    'migration.lastUpload': 'Ultimo caricamento cloud',
    'migration.confirmLabel': 'Digita CLOUD per abilitare il caricamento manuale',
    'migration.uploadButton': 'Carica dati locali nel cloud',
    'migration.uploadNotReady': "Il caricamento manuale è disabilitato finché non hai effettuato l'accesso, hai una scuderia attiva e digiti CLOUD.",
    'migration.uploadReady': 'Pronto a copiare i dati locali nella scuderia cloud attiva.',
    'migration.uploading': 'Caricamento dati locali nel cloud...',
    'migration.confirmUpload': 'Caricare i dati locali di questo browser nella scuderia cloud attiva? I dati locali resteranno in questo browser.',
    'migration.schemaNeeded': 'Il caricamento cloud richiede la migrazione database local_id. Esegui supabase/migrations/add_local_ids.sql in Supabase, poi riprova.',
    'migration.uploadSuccess': 'Caricamento cloud completato: {horses} cavalli, {tasks} attività, {hours} registri ore, {inventory} scorte di mangime, {events} eventi calendario.',
    'migration.uploadFailed': 'Caricamento cloud non riuscito: {error}',
    'cloudRead.title': 'Anteprima lettura cloud',
    'cloudRead.text': 'Controlla i conteggi cloud della scuderia attiva senza modificare i dati locali.',
    'cloudRead.targetStable': 'Scuderia da leggere',
    'cloudRead.compareHelp': 'Ogni riga mostra conteggio locale / conteggio cloud.',
    'cloudRead.warningReadOnly': 'Questa anteprima è in sola lettura.',
    'cloudRead.warningLocalActive': "L'app usa ancora i dati locali di questo browser.",
    'cloudRead.warningNoSync': 'La sincronizzazione cloud non è ancora attiva.',
    'cloudRead.warningNoLocalChange': 'Nessun dato locale verrà modificato.',
    'cloudRead.button': 'Controlla i dati cloud',
    'cloudRead.notReady': 'Accedi e assegna una scuderia attiva prima di leggere i dati cloud.',
    'cloudRead.ready': 'Pronto a controllare i dati cloud.',
    'cloudRead.loading': 'Controllo dati cloud...',
    'cloudRead.success': 'Conteggi cloud caricati.',
    'cloudRead.noStable': 'Assegna una scuderia prima di leggere i dati cloud.',
    'cloudRead.permissionBlocked': 'L’accesso ai dati cloud è bloccato dai permessi del database.',
    'cloudRead.failed': 'Lettura cloud non riuscita: {error}',
    'cloudMode.title': 'Anteprima modalità cloud',
    'cloudMode.text': "Visualizza i dati cloud nell'app senza sostituire i dati locali del browser.",
    'cloudMode.currentMode': 'Modalità attuale',
    'cloudMode.targetStable': 'Scuderia in anteprima',
    'cloudMode.localStatus': 'Modalità dati locali',
    'cloudMode.previewStatus': 'Modalità anteprima cloud, sola lettura',
    'cloudMode.warningLocalDefault': "I dati locali restano l'impostazione predefinita.",
    'cloudMode.warningViewCloud': "L'anteprima modalità cloud ti permette di vedere i dati cloud nell'app.",
    'cloudMode.warningLocalSafe': 'Questo non elimina i dati locali.',
    'cloudMode.warningNoSync': 'Questo non abilita ancora la sincronizzazione automatica.',
    'cloudMode.warningReadOnly': "L'anteprima cloud è in sola lettura.",
    'cloudMode.previewButton': 'Anteprima dati cloud',
    'cloudMode.localButton': 'Torna ai dati locali',
    'cloudMode.notReady': "Accedi e assegna una scuderia attiva prima di vedere l'anteprima cloud.",
    'cloudMode.ready': "Pronto a caricare un'anteprima cloud in sola lettura.",
    'cloudMode.loading': 'Caricamento anteprima cloud...',
    'cloudMode.enabled': 'Anteprima cloud caricata. Le modifiche sono bloccate.',
    'cloudMode.returnedLocal': 'Ritorno alla modalità dati locali.',
    'cloudMode.failed': 'Anteprima cloud non riuscita: {error}',
    'cloudMode.readOnlyMessage': "L'anteprima cloud è in sola lettura. Torna ai dati locali per apportare modifiche.",
    'horseCloud.title': 'Modalità scrittura cloud - Cavalli',
    'horseCloud.text': 'Fase sperimentale: solo i profili cavallo vengono salvati nel cloud.',
    'horseCloud.currentMode': 'Modalità dati cavalli',
    'horseCloud.targetStable': 'Scuderia cloud cavalli',
    'horseCloud.localMode': 'Locale',
    'horseCloud.cloudMode': 'Scrittura cloud attiva',
    'horseCloud.warningExperimental': 'Questa è una fase sperimentale.',
    'horseCloud.warningHorsesOnly': 'Solo i profili cavallo verranno salvati nel cloud.',
    'horseCloud.warningOthersLocal': 'Attività, ore di lavoro, scorte mangime e calendario restano locali per ora.',
    'horseCloud.warningLocalSafe': 'I dati locali dei cavalli non verranno eliminati.',
    'horseCloud.warningReturn': 'Puoi riportare la scrittura cavalli in modalità locale.',
    'horseCloud.confirmLabel': 'Digita HORSES CLOUD per abilitare la scrittura cloud dei cavalli',
    'horseCloud.enableButton': 'Abilita scrittura cloud cavalli',
    'horseCloud.localButton': 'Riporta cavalli in modalità locale',
    'horseCloud.notReady': 'La scrittura cloud cavalli è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti HORSES CLOUD.',
    'horseCloud.ready': 'Pronto ad abilitare la scrittura cloud solo per i cavalli.',
    'horseCloud.loading': 'Caricamento cavalli cloud...',
    'horseCloud.enabled': 'Scrittura cloud cavalli attiva. Le altre aree restano locali.',
    'horseCloud.returnedLocal': 'Scrittura cavalli tornata in modalità locale.',
    'horseCloud.saveFailed': 'Salvataggio cavallo cloud non riuscito: {error}',
    'horseCloud.deleteFailed': 'Eliminazione cavallo cloud non riuscita: {error}',
    'horseCloud.loadFailed': 'Modalità cavalli cloud non riuscita: {error}',
    'horseCloud.permissionBlocked': 'La scrittura cloud dei cavalli è bloccata dai permessi del database.',
    'horseCloud.saved': 'Cavallo salvato nel cloud.',
    'horseCloud.deleted': 'Cavallo eliminato dal cloud.',
    'taskCloud.title': 'Modalità scrittura cloud - Attività',
    'taskCloud.text': 'Fase sperimentale: solo le attività vengono salvate nel cloud.',
    'taskCloud.currentMode': 'Modalità dati attività',
    'taskCloud.targetStable': 'Scuderia cloud attività',
    'taskCloud.localMode': 'Locale',
    'taskCloud.cloudMode': 'Scrittura cloud attiva',
    'taskCloud.warningExperimental': 'Questa è una fase sperimentale.',
    'taskCloud.warningTasksOnly': 'Solo le attività verranno salvate nel cloud.',
    'taskCloud.warningOthersLocal': 'Ore di lavoro, scorte mangime e calendario restano locali per ora.',
    'taskCloud.warningLocalSafe': 'I dati locali delle attività non verranno eliminati.',
    'taskCloud.warningReturn': 'Puoi riportare la scrittura attività in modalità locale.',
    'taskCloud.confirmLabel': 'Digita TASKS CLOUD per abilitare la scrittura cloud delle attività',
    'taskCloud.enableButton': 'Abilita scrittura cloud attività',
    'taskCloud.localButton': 'Riporta attività in modalità locale',
    'taskCloud.notReady': 'La scrittura cloud attività è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti TASKS CLOUD.',
    'taskCloud.ready': 'Pronto ad abilitare la scrittura cloud solo per le attività.',
    'taskCloud.loading': 'Caricamento attività cloud...',
    'taskCloud.enabled': 'Scrittura cloud attività attiva. Ore di lavoro, scorte mangime e calendario restano locali.',
    'taskCloud.returnedLocal': 'Scrittura attività tornata in modalità locale.',
    'taskCloud.saveFailed': 'Salvataggio attività cloud non riuscito: {error}',
    'taskCloud.deleteFailed': 'Eliminazione attività cloud non riuscita: {error}',
    'taskCloud.loadFailed': 'Modalità attività cloud non riuscita: {error}',
    'taskCloud.permissionBlocked': 'La scrittura cloud delle attività è bloccata dai permessi del database.',
    'taskCloud.saved': 'Attività salvata nel cloud.',
    'taskCloud.deleted': 'Attività eliminata dal cloud.',
    'taskCloud.toggled': 'Stato attività salvato nel cloud.',
    'workCloud.title': 'Modalità scrittura cloud - Ore di lavoro',
    'workCloud.text': 'Fase sperimentale: solo ore di lavoro e registri lavoro vengono salvati nel cloud.',
    'workCloud.currentMode': 'Modalità dati lavoro',
    'workCloud.targetStable': 'Scuderia cloud lavoro',
    'workCloud.localMode': 'Locale',
    'workCloud.cloudMode': 'Scrittura cloud attiva',
    'workCloud.warningExperimental': 'Questa è una fase sperimentale.',
    'workCloud.warningWorkOnly': 'Solo ore di lavoro e registri lavoro verranno salvati nel cloud.',
    'workCloud.warningOthersLocal': 'Scorte mangime e calendario restano locali per ora.',
    'workCloud.warningLocalSafe': 'I dati locali dei registri lavoro non verranno eliminati.',
    'workCloud.warningReturn': 'Puoi riportare i registri lavoro in modalità locale.',
    'workCloud.confirmLabel': 'Digita WORK CLOUD per abilitare la scrittura cloud dei registri lavoro',
    'workCloud.enableButton': 'Abilita scrittura cloud registri lavoro',
    'workCloud.localButton': 'Riporta registri lavoro in modalità locale',
    'workCloud.notReady': 'La scrittura cloud dei registri lavoro è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti WORK CLOUD.',
    'workCloud.ready': 'Pronto ad abilitare la scrittura cloud solo per i registri lavoro.',
    'workCloud.loading': 'Caricamento registri lavoro cloud...',
    'workCloud.enabled': 'Scrittura cloud registri lavoro attiva. Scorte mangime e calendario restano locali.',
    'workCloud.returnedLocal': 'Scrittura registri lavoro tornata in modalità locale.',
    'workCloud.saveFailed': 'Salvataggio registro lavoro cloud non riuscito: {error}',
    'workCloud.deleteFailed': 'Eliminazione registro lavoro cloud non riuscita: {error}',
    'workCloud.loadFailed': 'Modalità registri lavoro cloud non riuscita: {error}',
    'workCloud.permissionBlocked': 'La scrittura cloud dei registri lavoro è bloccata dai permessi del database.',
    'workCloud.saved': 'Registro lavoro salvato nel cloud.',
    'workCloud.deleted': 'Registro lavoro eliminato dal cloud.',
    'cloudCleanup.title': 'Pulizia cloud',
    'cloudCleanup.text': 'Elimina le righe cloud della scuderia attiva quando i conteggi sono duplicati o errati.',
    'cloudCleanup.targetStable': 'Scuderia da pulire',
    'cloudCleanup.warningDeletesCloud': 'Questo può eliminare righe cloud della scuderia attiva.',
    'cloudCleanup.warningLocalSafe': 'I dati locali del browser non verranno eliminati.',
    'cloudCleanup.warningUseCase': 'Usalo solo se i conteggi dell anteprima cloud sono duplicati o errati.',
    'cloudCleanup.warningReupload': 'Dopo la pulizia, esegui di nuovo il caricamento manuale per copiare i dati locali nel cloud.',
    'cloudCleanup.confirmLabel': 'Digita RESET CLOUD per abilitare la pulizia',
    'cloudCleanup.button': 'Elimina i dati cloud di questa scuderia',
    'cloudCleanup.notReady': 'La pulizia è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti RESET CLOUD.',
    'cloudCleanup.ready': 'Pronto a eliminare i dati cloud della scuderia attiva.',
    'cloudCleanup.deleting': 'Eliminazione dati cloud della scuderia attiva...',
    'cloudCleanup.confirmDelete': 'Eliminare i dati cloud della scuderia attiva? I dati locali del browser non verranno eliminati.',
    'cloudCleanup.success': 'Pulizia cloud completata: {events} eventi calendario, {inventory} scorte di mangime, {hours} registri ore, {tasks} attività, {horses} cavalli eliminati.',
    'cloudCleanup.failed': 'Pulizia cloud non riuscita: {error}',
    'cloudCleanup.permissionBlocked': 'La pulizia cloud è bloccata dai permessi del database.',
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
let isCloudUploading = false;
let migrationUploadStatusText = '';
let cloudReadStatusText = '';
let cloudReadCounts = null;
let cloudCleanupStatusText = '';
let isCloudCleaning = false;
let cloudPreviewMode = false;
let cloudModeStatusText = '';
let horseCloudWriteMode = false;
let horseCloudStatusText = '';
let taskCloudWriteMode = false;
let taskCloudStatusText = '';
let workCloudWriteMode = false;
let workCloudStatusText = '';
let cloudState = {
  status: 'notConnected',
  email: '',
  stableId: '',
  stableName: '',
  messageKey: 'cloud.notConnected'
};

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
  authSetupNotice: document.querySelector('#authSetupNotice'),
  headerStableName: document.querySelector('#headerStableName'),
  dataModeStatus: document.querySelector('#dataModeStatus'),
  cloudUserEmail: document.querySelector('#cloudUserEmail'),
  cloudStableName: document.querySelector('#cloudStableName'),
  cloudConnectionStatus: document.querySelector('#cloudConnectionStatus'),
  cloudLocalNotice: document.querySelector('#cloudLocalNotice'),
  migrationStableName: document.querySelector('#migrationStableName'),
  migrationHorseCount: document.querySelector('#migrationHorseCount'),
  migrationTaskCount: document.querySelector('#migrationTaskCount'),
  migrationHoursCount: document.querySelector('#migrationHoursCount'),
  migrationFeedCount: document.querySelector('#migrationFeedCount'),
  migrationEventCount: document.querySelector('#migrationEventCount'),
  migrationLastUpload: document.querySelector('#migrationLastUpload'),
  migrationConfirmInput: document.querySelector('#migrationConfirmInput'),
  migrationUploadButton: document.querySelector('#migrationUploadButton'),
  migrationUploadStatus: document.querySelector('#migrationUploadStatus'),
  cloudReadStableName: document.querySelector('#cloudReadStableName'),
  cloudReadLocalHorses: document.querySelector('#cloudReadLocalHorses'),
  cloudReadCloudHorses: document.querySelector('#cloudReadCloudHorses'),
  cloudReadLocalTasks: document.querySelector('#cloudReadLocalTasks'),
  cloudReadCloudTasks: document.querySelector('#cloudReadCloudTasks'),
  cloudReadLocalHours: document.querySelector('#cloudReadLocalHours'),
  cloudReadCloudHours: document.querySelector('#cloudReadCloudHours'),
  cloudReadLocalFeed: document.querySelector('#cloudReadLocalFeed'),
  cloudReadCloudFeed: document.querySelector('#cloudReadCloudFeed'),
  cloudReadLocalEvents: document.querySelector('#cloudReadLocalEvents'),
  cloudReadCloudEvents: document.querySelector('#cloudReadCloudEvents'),
  cloudReadButton: document.querySelector('#cloudReadButton'),
  cloudReadStatus: document.querySelector('#cloudReadStatus'),
  cloudModeCurrent: document.querySelector('#cloudModeCurrent'),
  cloudModeStableName: document.querySelector('#cloudModeStableName'),
  cloudModePreviewButton: document.querySelector('#cloudModePreviewButton'),
  cloudModeLocalButton: document.querySelector('#cloudModeLocalButton'),
  cloudModeStatus: document.querySelector('#cloudModeStatus'),
  horseCloudCurrent: document.querySelector('#horseCloudCurrent'),
  horseCloudStableName: document.querySelector('#horseCloudStableName'),
  horseCloudConfirmInput: document.querySelector('#horseCloudConfirmInput'),
  horseCloudEnableButton: document.querySelector('#horseCloudEnableButton'),
  horseCloudLocalButton: document.querySelector('#horseCloudLocalButton'),
  horseCloudStatus: document.querySelector('#horseCloudStatus'),
  taskCloudCurrent: document.querySelector('#taskCloudCurrent'),
  taskCloudStableName: document.querySelector('#taskCloudStableName'),
  taskCloudConfirmInput: document.querySelector('#taskCloudConfirmInput'),
  taskCloudEnableButton: document.querySelector('#taskCloudEnableButton'),
  taskCloudLocalButton: document.querySelector('#taskCloudLocalButton'),
  taskCloudStatus: document.querySelector('#taskCloudStatus'),
  workCloudCurrent: document.querySelector('#workCloudCurrent'),
  workCloudStableName: document.querySelector('#workCloudStableName'),
  workCloudConfirmInput: document.querySelector('#workCloudConfirmInput'),
  workCloudEnableButton: document.querySelector('#workCloudEnableButton'),
  workCloudLocalButton: document.querySelector('#workCloudLocalButton'),
  workCloudStatus: document.querySelector('#workCloudStatus'),
  cloudCleanupStableName: document.querySelector('#cloudCleanupStableName'),
  cloudCleanupConfirmInput: document.querySelector('#cloudCleanupConfirmInput'),
  cloudCleanupButton: document.querySelector('#cloudCleanupButton'),
  cloudCleanupStatus: document.querySelector('#cloudCleanupStatus')
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
    cloudId: item.cloudId || item.cloud_id || '',
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

function normalizeTask(item) {
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
    title: item.title || 'Untitled task',
    date: item.date || item.dueDate || '',
    horseId: item.horseId || '',
    notes: item.notes || item.description || '',
    done: Boolean(item.done || item.status === 'done')
  };
}

function normalizeWorkLog(item) {
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
    worker: item.worker || '',
    date: item.date || item.workDate || '',
    horseId: item.horseId || '',
    hours: toSafeNumber(item.hours),
    notes: item.notes || item.description || ''
  };
}

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return JSON.parse(JSON.stringify(defaultData));
    const parsed = JSON.parse(stored);
    return {
      horses: Array.isArray(parsed.horses) ? parsed.horses.map(normalizeHorse) : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks.map(normalizeTask) : [],
      hours: Array.isArray(parsed.hours) ? parsed.hours.map(normalizeWorkLog) : [],
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory.map(normalizeFeedItem) : [],
      calendarEvents: Array.isArray(parsed.calendarEvents) ? parsed.calendarEvents.map(normalizeCalendarEvent) : []
    };
  } catch (_error) {
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function saveData() {
  if (cloudPreviewMode) {
    showMessage(t('cloudMode.readOnlyMessage'));
    return;
  }
  const localData = loadData();
  const nextState = {
    ...state,
    horses: horseCloudWriteMode ? localData.horses : state.horses,
    tasks: taskCloudWriteMode ? localData.tasks : state.tasks,
    hours: workCloudWriteMode ? localData.hours : state.hours
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getCounts(data = state) {
  return {
    horses: Array.isArray(data.horses) ? data.horses.length : 0,
    tasks: Array.isArray(data.tasks) ? data.tasks.length : 0,
    hours: Array.isArray(data.hours) ? data.hours.length : 0,
    inventory: Array.isArray(data.inventory) ? data.inventory.length : 0,
    events: Array.isArray(data.calendarEvents) ? data.calendarEvents.length : 0
  };
}

function getLocalDataCounts() {
  return getCounts(loadData());
}

function isCloudPreviewActive() {
  return cloudPreviewMode;
}

function blockCloudPreviewEdit() {
  if (!isCloudPreviewActive()) return false;
  showMessage(t('cloudMode.readOnlyMessage'));
  return true;
}

function isValidDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function nullableNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
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
    SUPABASE_CONFIG.SUPABASE_PUBLISHABLE_KEY &&
    SUPABASE_CONFIG.SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
    SUPABASE_CONFIG.SUPABASE_PUBLISHABLE_KEY !== 'YOUR_SUPABASE_PUBLISHABLE_KEY'
  );
}

function getAuthDiagnostics() {
  const key = SUPABASE_CONFIG.SUPABASE_PUBLISHABLE_KEY || '';
  return {
    configured: isSupabaseConfigured(),
    clientInitialized: Boolean(supabaseClient),
    supabaseUrl: SUPABASE_CONFIG.SUPABASE_URL,
    publishableKeyPrefix: key ? `${key.slice(0, 14)}...` : '',
    siteOrigin: window.location.origin
  };
}

function logAuthError(context, error) {
  console.error(`[EquiTrack auth] ${context}`, {
    error,
    diagnostics: getAuthDiagnostics()
  });
}

function getAuthErrorMessage(error) {
  const message = String(error?.message || error || '');
  const status = error?.status;
  if (
    message.toLowerCase().includes('failed to fetch') ||
    message.toLowerCase().includes('network') ||
    message.toLowerCase().includes('load supabase') ||
    message.toLowerCase().includes('could not load supabase')
  ) {
    return t('auth.networkError');
  }
  if (status === 400 || status === 401 || message.toLowerCase().includes('invalid login credentials')) {
    return t('auth.invalidCredentials');
  }
  return t('message.authLoginFailed', { error: message || 'Unknown error' });
}

function isPermissionError(error) {
  const message = String(error?.message || error || '').toLowerCase();
  const code = String(error?.code || '');
  return error?.status === 401 || error?.status === 403 || code === '42501' || message.includes('row-level security') || message.includes('permission denied');
}

function withTimeout(promise, milliseconds, label) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(`${label} timed out`)), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
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
  renderCloudStatus();
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderCloudCleanup();
}

function getCurrentUser() {
  return authUser;
}

function getActiveStable() {
  return {
    id: cloudState.stableId || '',
    name: cloudState.stableName || ''
  };
}

function setCloudStatus(nextState = {}) {
  cloudState = {
    ...cloudState,
    ...nextState
  };
  renderCloudStatus();
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderCloudCleanup();
}

function getCloudStatusText() {
  if (cloudState.status === 'connected') return t('cloud.connectedAs', { email: cloudState.email });
  if (cloudState.status === 'noStable') return t('cloud.noStable');
  if (cloudState.status === 'permissionBlocked') return t('cloud.permissionBlocked');
  if (cloudState.status === 'error') return t('cloud.loadError');
  if (cloudState.status === 'loading') return t('cloud.loadingStable');
  return t(cloudState.messageKey || 'cloud.notConnected');
}

function renderCloudStatus() {
  const statusText = getCloudStatusText();
  const stableText = cloudState.stableName || '-';
  const migrationStableText = cloudState.stableName || t('migration.noStable');
  if (els.headerStableName) {
    els.headerStableName.textContent = cloudState.status === 'connected'
      ? t('cloud.activeStable', { name: cloudState.stableName })
      : statusText;
    els.headerStableName.title = els.headerStableName.textContent;
  }
  if (els.cloudUserEmail) els.cloudUserEmail.textContent = cloudState.email || '-';
  if (els.cloudStableName) els.cloudStableName.textContent = stableText;
  if (els.cloudConnectionStatus) els.cloudConnectionStatus.textContent = statusText;
  if (els.cloudLocalNotice) els.cloudLocalNotice.textContent = t('cloud.syncLocal');
  if (els.migrationStableName) els.migrationStableName.textContent = migrationStableText;
}

function renderMigrationPreview() {
  const counts = getLocalDataCounts();
  const activeStable = getActiveStable();
  const uploadGate = getMigrationUploadGate();
  if (els.migrationHorseCount) els.migrationHorseCount.textContent = counts.horses;
  if (els.migrationTaskCount) els.migrationTaskCount.textContent = counts.tasks;
  if (els.migrationHoursCount) els.migrationHoursCount.textContent = counts.hours;
  if (els.migrationFeedCount) els.migrationFeedCount.textContent = counts.inventory;
  if (els.migrationEventCount) els.migrationEventCount.textContent = counts.events;
  if (els.migrationStableName) els.migrationStableName.textContent = activeStable.name || t('migration.noStable');
  if (els.migrationLastUpload) els.migrationLastUpload.textContent = localStorage.getItem(LAST_CLOUD_UPLOAD_KEY) || '-';
  if (els.migrationUploadButton) els.migrationUploadButton.disabled = !uploadGate.canUpload;
  if (els.migrationUploadStatus && !isCloudUploading) {
    els.migrationUploadStatus.textContent = migrationUploadStatusText || (uploadGate.canUpload ? t('migration.uploadReady') : t('migration.uploadNotReady'));
  }
  logMigrationUploadGate(uploadGate);
}

function handleMigrationConfirmationChange() {
  migrationUploadStatusText = '';
  renderMigrationPreview();
}

function getMigrationUploadGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.migrationConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly CLOUD');
  if (isCloudUploading) reasons.push('upload already in progress');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    confirmationReady,
    canUpload: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function logMigrationUploadGate(gate = getMigrationUploadGate()) {
  console.info('[EquiTrack cloud] Manual upload gate', {
    currentUserExists: gate.currentUserExists,
    activeStableId: gate.activeStable.id || '',
    activeStableName: gate.activeStable.name || '',
    confirmationValue: gate.confirmationValue,
    enabled: gate.canUpload,
    reason: gate.reason
  });
}

function renderCloudReadPreview() {
  const localCounts = getLocalDataCounts();
  const activeStable = getActiveStable();
  const canRead = Boolean(getCurrentUser() && activeStable.id);
  if (els.cloudReadStableName) els.cloudReadStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.cloudReadLocalHorses) els.cloudReadLocalHorses.textContent = localCounts.horses;
  if (els.cloudReadLocalTasks) els.cloudReadLocalTasks.textContent = localCounts.tasks;
  if (els.cloudReadLocalHours) els.cloudReadLocalHours.textContent = localCounts.hours;
  if (els.cloudReadLocalFeed) els.cloudReadLocalFeed.textContent = localCounts.inventory;
  if (els.cloudReadLocalEvents) els.cloudReadLocalEvents.textContent = localCounts.events;
  if (els.cloudReadCloudHorses) els.cloudReadCloudHorses.textContent = cloudReadCounts?.horses ?? '-';
  if (els.cloudReadCloudTasks) els.cloudReadCloudTasks.textContent = cloudReadCounts?.tasks ?? '-';
  if (els.cloudReadCloudHours) els.cloudReadCloudHours.textContent = cloudReadCounts?.hours ?? '-';
  if (els.cloudReadCloudFeed) els.cloudReadCloudFeed.textContent = cloudReadCounts?.inventory ?? '-';
  if (els.cloudReadCloudEvents) els.cloudReadCloudEvents.textContent = cloudReadCounts?.events ?? '-';
  if (els.cloudReadButton) els.cloudReadButton.disabled = !canRead;
  if (els.cloudReadStatus) {
    els.cloudReadStatus.textContent = cloudReadStatusText || (canRead ? t('cloudRead.ready') : t('cloudRead.notReady'));
  }
}

async function getCloudTableCount(table, stableId) {
  const { count, error } = await supabaseClient
    .from(table)
    .select('id', { count: 'exact', head: true })
    .eq('stable_id', stableId);
  if (error) throw error;
  return count || 0;
}

async function checkCloudDataPreview() {
  const activeStable = getActiveStable();
  if (!getCurrentUser() || !activeStable.id) {
    cloudReadStatusText = t('cloudRead.noStable');
    renderCloudReadPreview();
    showMessage(cloudReadStatusText);
    return;
  }
  cloudReadStatusText = t('cloudRead.loading');
  renderCloudReadPreview();
  try {
    const stableId = activeStable.id;
    const [horses, tasks, hours, inventory, events] = await Promise.all([
      getCloudTableCount('horses', stableId),
      getCloudTableCount('tasks', stableId),
      getCloudTableCount('work_logs', stableId),
      getCloudTableCount('feed_items', stableId),
      getCloudTableCount('calendar_events', stableId)
    ]);
    cloudReadCounts = { horses, tasks, hours, inventory, events };
    cloudReadStatusText = t('cloudRead.success');
    renderCloudReadPreview();
    showMessage(cloudReadStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Read preview failed', error);
    const errorMessage = isPermissionError(error) ? t('cloudRead.permissionBlocked') : getAuthErrorMessage(error);
    cloudReadStatusText = t('cloudRead.failed', { error: errorMessage });
    renderCloudReadPreview();
    showMessage(cloudReadStatusText);
  }
}

function renderCloudMode() {
  const activeStable = getActiveStable();
  const canPreview = Boolean(getCurrentUser() && activeStable.id && !cloudPreviewMode);
  const writeModes = [];
  if (horseCloudWriteMode) writeModes.push(t('tabs.horses'));
  if (taskCloudWriteMode) writeModes.push(t('tabs.tasks'));
  if (workCloudWriteMode) writeModes.push(t('tabs.hours'));
  const modeText = cloudPreviewMode
    ? t('cloudMode.previewStatus')
    : writeModes.length
      ? `${t('cloudMode.localStatus')} / ${writeModes.join(', ')} ${t('horseCloud.cloudMode')}`
      : t('cloudMode.localStatus');
  if (els.dataModeStatus) {
    els.dataModeStatus.textContent = modeText;
    els.dataModeStatus.classList.toggle('cloud-preview-active', cloudPreviewMode);
  }
  if (els.cloudModeCurrent) els.cloudModeCurrent.textContent = modeText;
  if (els.cloudModeStableName) els.cloudModeStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.cloudModePreviewButton) els.cloudModePreviewButton.disabled = !canPreview;
  if (els.cloudModeLocalButton) els.cloudModeLocalButton.hidden = !cloudPreviewMode;
  if (els.cloudModeStatus) {
    els.cloudModeStatus.textContent = cloudModeStatusText || (canPreview ? t('cloudMode.ready') : t('cloudMode.notReady'));
  }
}

async function fetchCloudRows(table, stableId, orderColumn = 'created_at') {
  const { data, error } = await supabaseClient
    .from(table)
    .select('*')
    .eq('stable_id', stableId)
    .order(orderColumn, { ascending: true });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

function mapCloudHorse(row) {
  const horse = normalizeHorse({
    id: row.local_id || row.id,
    cloudId: row.id,
    name: row.name,
    nickname: row.nickname,
    owner: row.owner,
    breed: row.breed,
    birth: row.date_of_birth,
    gender: row.gender,
    color: row.color,
    registration: row.registration_number,
    feedingNotes: row.feeding_notes,
    careNotes: row.care_notes,
    shoeingNotes: row.shoeing_notes,
    vaccinationNotes: row.vaccination_notes,
    dewormingNotes: row.deworming_notes,
    vetNotes: row.vet_notes,
    notes: row.general_notes
  });
  horse.cloudId = row.id;
  return horse;
}

function mapCloudTask(row, horseIdMap) {
  return {
    id: row.local_id || row.id,
    cloudId: row.id,
    title: row.title || 'Untitled task',
    date: row.due_date || '',
    horseId: horseIdMap.get(row.horse_id) || '',
    notes: row.description || '',
    done: row.status === 'done'
  };
}

function getCloudHorseIdForTask(task) {
  if (!task.horseId) return null;
  const horse = state.horses.find((entry) => entry.id === task.horseId);
  return horse?.cloudId || null;
}

function getCloudHorseIdForWorkLog(entry) {
  if (!entry.horseId) return null;
  const horse = state.horses.find((item) => item.id === entry.horseId);
  return horse?.cloudId || null;
}

function mapCloudWorkLog(row, horseIdMap) {
  return {
    id: row.local_id || row.id,
    cloudId: row.id,
    worker: '',
    date: row.work_date || '',
    horseId: horseIdMap.get(row.horse_id) || '',
    hours: toSafeNumber(row.hours),
    notes: row.description || ''
  };
}

function mapCloudFeedItem(row) {
  return normalizeFeedItem({
    id: row.local_id || row.id,
    name: row.name,
    category: row.category,
    quantity: row.current_amount,
    unit: row.unit,
    dailyUsage: row.daily_usage,
    minimum: row.low_stock_threshold,
    supplier: row.supplier,
    purchaseDate: row.purchase_date,
    expiryDate: row.expiry_date,
    storageLocation: row.storage_location,
    cost: row.cost,
    notes: row.notes
  });
}

function mapCloudCalendarEvent(row, horseIdMap) {
  return normalizeCalendarEvent({
    id: row.local_id || row.id,
    date: row.date,
    time: row.time,
    name: row.name,
    type: row.event_type,
    location: row.location,
    horseIds: Array.isArray(row.horse_ids) ? row.horse_ids.map((id) => horseIdMap.get(id)).filter(Boolean) : [],
    handler: row.handler,
    notes: row.notes,
    raceNumber: row.race_number,
    startNumber: row.start_number,
    driver: row.driver,
    placement: row.placement,
    raceResult: row.race_result,
    prize: row.prize,
    postRaceNotes: row.post_race_notes
  });
}

async function loadCloudSnapshot(stableId) {
  const [horseRows, taskRows, workRows, feedRows, eventRows] = await Promise.all([
    fetchCloudRows('horses', stableId),
    fetchCloudRows('tasks', stableId),
    fetchCloudRows('work_logs', stableId),
    fetchCloudRows('feed_items', stableId),
    fetchCloudRows('calendar_events', stableId, 'date')
  ]);
  const horses = horseRows.map(mapCloudHorse);
  const horseIdMap = new Map(horseRows.map((row, index) => [row.id, horses[index].id]));
  return {
    horses,
    tasks: taskRows.map((row) => mapCloudTask(row, horseIdMap)),
    hours: workRows.map((row) => mapCloudWorkLog(row, horseIdMap)),
    inventory: feedRows.map(mapCloudFeedItem),
    calendarEvents: eventRows.map((row) => mapCloudCalendarEvent(row, horseIdMap))
  };
}

async function enableCloudModePreview() {
  if (horseCloudWriteMode) returnHorseWritesToLocalMode();
  if (taskCloudWriteMode) returnTaskWritesToLocalMode();
  if (workCloudWriteMode) returnWorkWritesToLocalMode();
  const activeStable = getActiveStable();
  if (!getCurrentUser() || !activeStable.id) {
    cloudModeStatusText = t('cloudMode.notReady');
    renderCloudMode();
    showMessage(cloudModeStatusText);
    return;
  }
  cloudModeStatusText = t('cloudMode.loading');
  renderCloudMode();
  try {
    state = await loadCloudSnapshot(activeStable.id);
    cloudPreviewMode = true;
    cloudModeStatusText = t('cloudMode.enabled');
    cloudReadCounts = getCounts(state);
    render();
    showView('stable');
    showMessage(cloudModeStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Cloud mode preview failed', error);
    state = loadData();
    cloudPreviewMode = false;
    const errorMessage = isPermissionError(error) ? t('cloudRead.permissionBlocked') : getAuthErrorMessage(error);
    cloudModeStatusText = t('cloudMode.failed', { error: errorMessage });
    render();
    showMessage(cloudModeStatusText);
  }
}

function returnToLocalDataMode() {
  state = loadData();
  cloudPreviewMode = false;
  cloudModeStatusText = t('cloudMode.returnedLocal');
  render();
  showMessage(cloudModeStatusText);
}

function getHorseCloudGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.horseCloudConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'HORSES CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly HORSES CLOUD');
  if (cloudPreviewMode) reasons.push('cloud preview is read-only');
  if (horseCloudWriteMode) reasons.push('horse cloud writes already enabled');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    canEnable: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderHorseCloudMode() {
  const activeStable = getActiveStable();
  const gate = getHorseCloudGate();
  const modeText = horseCloudWriteMode ? t('horseCloud.cloudMode') : t('horseCloud.localMode');
  if (els.horseCloudCurrent) els.horseCloudCurrent.textContent = modeText;
  if (els.horseCloudStableName) els.horseCloudStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.horseCloudEnableButton) els.horseCloudEnableButton.disabled = !gate.canEnable;
  if (els.horseCloudLocalButton) els.horseCloudLocalButton.hidden = !horseCloudWriteMode;
  if (els.horseCloudStatus) {
    els.horseCloudStatus.textContent = horseCloudStatusText || (gate.canEnable ? t('horseCloud.ready') : t('horseCloud.notReady'));
  }
}

function handleHorseCloudConfirmationChange() {
  horseCloudStatusText = '';
  renderHorseCloudMode();
}

function horseToCloudRow(stableId, rawHorse) {
  const horse = normalizeHorse(rawHorse);
  const localId = horse.id || createId();
  return {
    stable_id: stableId,
    local_id: localId,
    name: horse.name,
    nickname: cleanText(horse.nickname),
    owner: cleanText(horse.owner),
    breed: cleanText(horse.breed),
    date_of_birth: cleanText(horse.birth),
    gender: cleanText(horse.gender),
    color: cleanText(horse.color),
    registration_number: cleanText(horse.registration),
    feeding_notes: cleanText(horse.feedingNotes),
    care_notes: cleanText(horse.careNotes),
    shoeing_notes: cleanText(horse.shoeingNotes),
    vaccination_notes: cleanText(horse.vaccinationNotes),
    deworming_notes: cleanText(horse.dewormingNotes),
    vet_notes: cleanText(horse.vetNotes),
    general_notes: cleanText(horse.notes)
  };
}

async function loadCloudHorses(stableId) {
  const rows = await fetchCloudRows('horses', stableId);
  return rows.map(mapCloudHorse);
}

async function enableHorseCloudWrites() {
  const gate = getHorseCloudGate();
  if (!gate.canEnable) {
    showMessage(t('horseCloud.notReady'));
    renderHorseCloudMode();
    return;
  }
  horseCloudStatusText = t('horseCloud.loading');
  renderHorseCloudMode();
  try {
    const localData = loadData();
    state = {
      ...localData,
      horses: await loadCloudHorses(gate.activeStable.id),
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours
    };
    horseCloudWriteMode = true;
    if (els.horseCloudConfirmInput) els.horseCloudConfirmInput.value = '';
    horseCloudStatusText = t('horseCloud.enabled');
    render();
    showView('stable');
    activateTab('horses');
    showMessage(horseCloudStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Horse cloud mode failed', error);
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getAuthErrorMessage(error);
    horseCloudStatusText = t('horseCloud.loadFailed', { error: errorMessage });
    horseCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours
    };
    render();
    showMessage(horseCloudStatusText);
  }
}

function returnHorseWritesToLocalMode() {
  state = { ...state, horses: loadData().horses };
  horseCloudWriteMode = false;
  horseCloudStatusText = t('horseCloud.returnedLocal');
  render();
  showMessage(horseCloudStatusText);
}

async function saveHorseToCloud(rawHorse) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = horseToCloudRow(activeStable.id, rawHorse);
  const request = rawHorse.cloudId
    ? supabaseClient
      .from('horses')
      .update(row)
      .eq('stable_id', activeStable.id)
      .eq('id', rawHorse.cloudId)
    : supabaseClient
      .from('horses')
      .upsert(row, { onConflict: 'stable_id,local_id' });
  const { data, error } = await request.select('*').single();
  if (error) throw error;
  return mapCloudHorse(data);
}

async function handleCloudHorseSave(rawHorse) {
  try {
    const savedHorse = await saveHorseToCloud(rawHorse);
    const existingIndex = state.horses.findIndex((horse) => horse.id === savedHorse.id);
    if (existingIndex >= 0) state.horses[existingIndex] = savedHorse;
    else state.horses.push(savedHorse);
    render();
    showMessage(t('horseCloud.saved'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Horse save failed', error);
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('horseCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteHorseFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const horse = state.horses.find((entry) => entry.id === id);
  if (!horse) return;
  let query = supabaseClient.from('horses').delete().eq('stable_id', activeStable.id);
  query = horse.cloudId ? query.eq('id', horse.cloudId) : query.eq('local_id', horse.id);
  const { error } = await query.select('id');
  if (error) throw error;
}

async function handleCloudHorseDelete(id) {
  if (!confirmDelete(t('delete.horse'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  try {
    await deleteHorseFromCloud(id);
    state.horses = state.horses.filter((horse) => horse.id !== id);
    render();
    showMessage(t('horseCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Horse delete failed', error);
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('horseCloud.deleteFailed', { error: errorMessage }));
  }
}

function getTaskCloudGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.taskCloudConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'TASKS CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly TASKS CLOUD');
  if (cloudPreviewMode) reasons.push('cloud preview is read-only');
  if (taskCloudWriteMode) reasons.push('task cloud writes already enabled');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    canEnable: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderTaskCloudMode() {
  const activeStable = getActiveStable();
  const gate = getTaskCloudGate();
  const modeText = taskCloudWriteMode ? t('taskCloud.cloudMode') : t('taskCloud.localMode');
  if (els.taskCloudCurrent) els.taskCloudCurrent.textContent = modeText;
  if (els.taskCloudStableName) els.taskCloudStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.taskCloudEnableButton) els.taskCloudEnableButton.disabled = !gate.canEnable;
  if (els.taskCloudLocalButton) els.taskCloudLocalButton.hidden = !taskCloudWriteMode;
  if (els.taskCloudStatus) {
    els.taskCloudStatus.textContent = taskCloudStatusText || (gate.canEnable ? t('taskCloud.ready') : t('taskCloud.notReady'));
  }
}

function handleTaskCloudConfirmationChange() {
  taskCloudStatusText = '';
  renderTaskCloudMode();
}

function taskToCloudRow(stableId, rawTask) {
  const task = normalizeTask(rawTask);
  return {
    stable_id: stableId,
    local_id: task.id || createId(),
    title: cleanText(task.title) || 'Untitled task',
    description: cleanText(task.notes),
    due_date: isValidDate(task.date),
    status: task.done ? 'done' : 'open',
    horse_id: getCloudHorseIdForTask(task)
  };
}

async function loadCloudTasks(stableId) {
  const rows = await fetchCloudRows('tasks', stableId);
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return rows.map((row) => mapCloudTask(row, horseIdMap));
}

async function enableTaskCloudWrites() {
  const gate = getTaskCloudGate();
  if (!gate.canEnable) {
    showMessage(t('taskCloud.notReady'));
    renderTaskCloudMode();
    return;
  }
  taskCloudStatusText = t('taskCloud.loading');
  renderTaskCloudMode();
  try {
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: await loadCloudTasks(gate.activeStable.id),
      hours: workCloudWriteMode ? state.hours : localData.hours
    };
    taskCloudWriteMode = true;
    if (els.taskCloudConfirmInput) els.taskCloudConfirmInput.value = '';
    taskCloudStatusText = t('taskCloud.enabled');
    render();
    showView('stable');
    activateTab('tasks');
    showMessage(taskCloudStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Task cloud mode failed', error);
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getAuthErrorMessage(error);
    taskCloudStatusText = t('taskCloud.loadFailed', { error: errorMessage });
    taskCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      hours: workCloudWriteMode ? state.hours : localData.hours
    };
    render();
    showMessage(taskCloudStatusText);
  }
}

function returnTaskWritesToLocalMode() {
  state = { ...state, tasks: loadData().tasks };
  taskCloudWriteMode = false;
  taskCloudStatusText = t('taskCloud.returnedLocal');
  render();
  showMessage(taskCloudStatusText);
}

async function saveTaskToCloud(rawTask) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = taskToCloudRow(activeStable.id, rawTask);
  const request = rawTask.cloudId
    ? supabaseClient
      .from('tasks')
      .update(row)
      .eq('stable_id', activeStable.id)
      .eq('id', rawTask.cloudId)
    : supabaseClient
      .from('tasks')
      .upsert(row, { onConflict: 'stable_id,local_id' });
  const { data, error } = await request.select('*').single();
  if (error) throw error;
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return mapCloudTask(data, horseIdMap);
}

async function handleCloudTaskSave(rawTask, successMessage = t('taskCloud.saved')) {
  try {
    const savedTask = await saveTaskToCloud(rawTask);
    const existingIndex = state.tasks.findIndex((task) => task.id === savedTask.id);
    if (existingIndex >= 0) state.tasks[existingIndex] = savedTask;
    else state.tasks.push(savedTask);
    render();
    showMessage(successMessage);
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Task save failed', error);
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('taskCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteTaskFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  let query = supabaseClient.from('tasks').delete().eq('stable_id', activeStable.id);
  query = task.cloudId ? query.eq('id', task.cloudId) : query.eq('local_id', task.id);
  const { error } = await query.select('id');
  if (error) throw error;
}

async function handleCloudTaskDelete(id) {
  if (!confirmDelete(t('delete.task'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  try {
    await deleteTaskFromCloud(id);
    state.tasks = state.tasks.filter((task) => task.id !== id);
    render();
    showMessage(t('taskCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Task delete failed', error);
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('taskCloud.deleteFailed', { error: errorMessage }));
  }
}

function getWorkCloudGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.workCloudConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'WORK CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly WORK CLOUD');
  if (cloudPreviewMode) reasons.push('cloud preview is read-only');
  if (workCloudWriteMode) reasons.push('work cloud writes already enabled');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    canEnable: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderWorkCloudMode() {
  const activeStable = getActiveStable();
  const gate = getWorkCloudGate();
  const modeText = workCloudWriteMode ? t('workCloud.cloudMode') : t('workCloud.localMode');
  if (els.workCloudCurrent) els.workCloudCurrent.textContent = modeText;
  if (els.workCloudStableName) els.workCloudStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.workCloudEnableButton) els.workCloudEnableButton.disabled = !gate.canEnable;
  if (els.workCloudLocalButton) els.workCloudLocalButton.hidden = !workCloudWriteMode;
  if (els.workCloudStatus) {
    els.workCloudStatus.textContent = workCloudStatusText || (gate.canEnable ? t('workCloud.ready') : t('workCloud.notReady'));
  }
}

function handleWorkCloudConfirmationChange() {
  workCloudStatusText = '';
  renderWorkCloudMode();
}

function workLogToCloudRow(stableId, rawEntry) {
  const entry = normalizeWorkLog(rawEntry);
  const description = [cleanText(entry.worker), cleanText(entry.notes)].filter(Boolean).join(' - ');
  return {
    stable_id: stableId,
    local_id: entry.id || createId(),
    horse_id: getCloudHorseIdForWorkLog(entry),
    description,
    hours: toSafeNumber(entry.hours),
    work_date: isValidDate(entry.date)
  };
}

async function loadCloudWorkLogs(stableId) {
  const rows = await fetchCloudRows('work_logs', stableId);
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return rows.map((row) => mapCloudWorkLog(row, horseIdMap));
}

async function enableWorkCloudWrites() {
  const gate = getWorkCloudGate();
  if (!gate.canEnable) {
    showMessage(t('workCloud.notReady'));
    renderWorkCloudMode();
    return;
  }
  workCloudStatusText = t('workCloud.loading');
  renderWorkCloudMode();
  try {
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: await loadCloudWorkLogs(gate.activeStable.id)
    };
    workCloudWriteMode = true;
    if (els.workCloudConfirmInput) els.workCloudConfirmInput.value = '';
    workCloudStatusText = t('workCloud.enabled');
    render();
    showView('stable');
    activateTab('hours');
    showMessage(workCloudStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Work log cloud mode failed', error);
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getAuthErrorMessage(error);
    workCloudStatusText = t('workCloud.loadFailed', { error: errorMessage });
    workCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks
    };
    render();
    showMessage(workCloudStatusText);
  }
}

function returnWorkWritesToLocalMode() {
  state = { ...state, hours: loadData().hours };
  workCloudWriteMode = false;
  workCloudStatusText = t('workCloud.returnedLocal');
  render();
  showMessage(workCloudStatusText);
}

async function saveWorkLogToCloud(rawEntry) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = workLogToCloudRow(activeStable.id, rawEntry);
  const request = rawEntry.cloudId
    ? supabaseClient
      .from('work_logs')
      .update(row)
      .eq('stable_id', activeStable.id)
      .eq('id', rawEntry.cloudId)
    : supabaseClient
      .from('work_logs')
      .upsert(row, { onConflict: 'stable_id,local_id' });
  const { data, error } = await request.select('*').single();
  if (error) throw error;
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return mapCloudWorkLog(data, horseIdMap);
}

async function handleCloudWorkLogSave(rawEntry) {
  try {
    const savedEntry = await saveWorkLogToCloud(rawEntry);
    const existingIndex = state.hours.findIndex((entry) => entry.id === savedEntry.id);
    if (existingIndex >= 0) state.hours[existingIndex] = savedEntry;
    else state.hours.push(savedEntry);
    render();
    showMessage(t('workCloud.saved'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Work log save failed', error);
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('workCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteWorkLogFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const entry = state.hours.find((item) => item.id === id);
  if (!entry) return;
  let query = supabaseClient.from('work_logs').delete().eq('stable_id', activeStable.id);
  query = entry.cloudId ? query.eq('id', entry.cloudId) : query.eq('local_id', entry.id);
  const { error } = await query.select('id');
  if (error) throw error;
}

async function handleCloudWorkLogDelete(id) {
  if (!confirmDelete(t('delete.hours'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  try {
    await deleteWorkLogFromCloud(id);
    state.hours = state.hours.filter((entry) => entry.id !== id);
    render();
    showMessage(t('workCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Work log delete failed', error);
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getAuthErrorMessage(error);
    showMessage(t('workCloud.deleteFailed', { error: errorMessage }));
  }
}

function getCloudCleanupGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.cloudCleanupConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'RESET CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly RESET CLOUD');
  if (isCloudCleaning) reasons.push('cleanup already in progress');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    confirmationReady,
    canClean: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderCloudCleanup() {
  const activeStable = getActiveStable();
  const cleanupGate = getCloudCleanupGate();
  if (els.cloudCleanupStableName) els.cloudCleanupStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.cloudCleanupButton) els.cloudCleanupButton.disabled = !cleanupGate.canClean;
  if (els.cloudCleanupStatus && !isCloudCleaning) {
    els.cloudCleanupStatus.textContent = cloudCleanupStatusText || (cleanupGate.canClean ? t('cloudCleanup.ready') : t('cloudCleanup.notReady'));
  }
}

function handleCloudCleanupConfirmationChange() {
  cloudCleanupStatusText = '';
  renderCloudCleanup();
}

async function deleteCloudRowsForStable(table, stableId) {
  const { data, error } = await supabaseClient
    .from(table)
    .delete()
    .eq('stable_id', stableId)
    .select('id');
  if (error) throw error;
  return Array.isArray(data) ? data.length : 0;
}

async function cleanupCloudDataForStable() {
  if (blockCloudPreviewEdit()) return;
  const cleanupGate = getCloudCleanupGate();
  if (!cleanupGate.canClean) {
    showMessage(t('cloudCleanup.notReady'));
    renderCloudCleanup();
    return;
  }
  if (!window.confirm(t('cloudCleanup.confirmDelete'))) return;

  isCloudCleaning = true;
  cloudCleanupStatusText = t('cloudCleanup.deleting');
  if (els.cloudCleanupStatus) els.cloudCleanupStatus.textContent = cloudCleanupStatusText;
  renderCloudCleanup();

  const stableId = cleanupGate.activeStable.id;
  const counts = { events: 0, inventory: 0, hours: 0, tasks: 0, horses: 0 };
  try {
    counts.events = await deleteCloudRowsForStable('calendar_events', stableId);
    counts.inventory = await deleteCloudRowsForStable('feed_items', stableId);
    counts.hours = await deleteCloudRowsForStable('work_logs', stableId);
    counts.tasks = await deleteCloudRowsForStable('tasks', stableId);
    counts.horses = await deleteCloudRowsForStable('horses', stableId);

    if (els.cloudCleanupConfirmInput) els.cloudCleanupConfirmInput.value = '';
    const message = t('cloudCleanup.success', counts);
    cloudCleanupStatusText = message;
    cloudReadCounts = null;
    await checkCloudDataPreview();
    cloudCleanupStatusText = message;
    renderCloudCleanup();
    showMessage(message);
  } catch (error) {
    console.error('[EquiTrack cloud] Cleanup failed', error);
    const errorMessage = isPermissionError(error) ? t('cloudCleanup.permissionBlocked') : getAuthErrorMessage(error);
    const message = t('cloudCleanup.failed', { error: errorMessage });
    cloudCleanupStatusText = message;
    renderCloudCleanup();
    showMessage(message);
  } finally {
    isCloudCleaning = false;
    renderCloudCleanup();
  }
}

function isMissingLocalIdSchemaError(error) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`;
  return error?.code === 'PGRST204' || error?.code === '42P10' || message.toLowerCase().includes('local_id');
}

function buildHorseRows(stableId, sourceData = state) {
  return sourceData.horses.map((rawHorse) => {
    return horseToCloudRow(stableId, rawHorse);
  });
}

function buildTaskRows(stableId, horseIdMap, sourceData = state) {
  return sourceData.tasks.map((rawTask) => {
    const task = normalizeTask(rawTask);
    return {
      stable_id: stableId,
      local_id: task.id || createId(),
      title: cleanText(task.title) || 'Untitled task',
      description: cleanText(task.notes),
      due_date: isValidDate(task.date),
      status: task.done ? 'done' : 'open',
      horse_id: horseIdMap.get(task.horseId) || null
    };
  });
}

function buildWorkLogRows(stableId, horseIdMap, sourceData = state) {
  return sourceData.hours.map((rawEntry) => {
    const entry = normalizeWorkLog(rawEntry);
    const worker = cleanText(entry.worker);
    const notes = cleanText(entry.notes);
    const description = [worker, notes].filter(Boolean).join(' - ');
    return {
      stable_id: stableId,
      local_id: entry.id || createId(),
      horse_id: horseIdMap.get(entry.horseId) || null,
      description,
      hours: toSafeNumber(entry.hours),
      work_date: isValidDate(entry.date || entry.workDate)
    };
  });
}

function buildFeedRows(stableId, sourceData = state) {
  return sourceData.inventory.map((rawItem) => {
    const item = normalizeFeedItem(rawItem);
    return {
      stable_id: stableId,
      local_id: item.id,
      name: item.name,
      category: cleanText(item.category),
      current_amount: toSafeNumber(item.quantity),
      unit: cleanText(item.unit),
      daily_usage: toSafeNumber(item.dailyUsage),
      low_stock_threshold: toSafeNumber(item.minimum),
      supplier: cleanText(item.supplier),
      purchase_date: isValidDate(item.purchaseDate),
      expiry_date: isValidDate(item.expiryDate),
      storage_location: cleanText(item.storageLocation),
      cost: nullableNumber(item.cost),
      notes: cleanText(item.notes)
    };
  });
}

function buildCalendarRows(stableId, horseIdMap, sourceData = state) {
  return sourceData.calendarEvents.map((rawEvent) => {
    const event = normalizeCalendarEvent(rawEvent);
    return {
      stable_id: stableId,
      local_id: event.id,
      date: isValidDate(event.date) || today(),
      time: cleanText(event.time),
      name: cleanText(event.name) || 'Untitled event',
      event_type: event.type,
      location: cleanText(event.location),
      horse_ids: event.horseIds.map((horseId) => horseIdMap.get(horseId)).filter(Boolean),
      handler: cleanText(event.handler),
      notes: cleanText(event.notes),
      race_number: cleanText(event.raceNumber),
      start_number: cleanText(event.startNumber),
      driver: cleanText(event.driver),
      placement: cleanText(event.placement),
      race_result: cleanText(event.raceResult),
      prize: cleanText(event.prize),
      post_race_notes: cleanText(event.postRaceNotes)
    };
  });
}

async function upsertCloudRows(table, rows, selectColumns = 'id, local_id') {
  if (!rows.length) return [];
  const { data, error } = await supabaseClient
    .from(table)
    .upsert(rows, { onConflict: 'stable_id,local_id' })
    .select(selectColumns);
  if (error) throw error;
  return data || [];
}

async function uploadLocalDataToCloud() {
  if (blockCloudPreviewEdit()) return;
  const uploadGate = getMigrationUploadGate();
  logMigrationUploadGate(uploadGate);
  if (!uploadGate.canUpload) {
    showMessage(t('migration.uploadNotReady'));
    renderMigrationPreview();
    return;
  }
  if (!window.confirm(t('migration.confirmUpload'))) return;

  isCloudUploading = true;
  if (els.migrationUploadStatus) els.migrationUploadStatus.textContent = t('migration.uploading');
  renderMigrationPreview();

  const stableId = uploadGate.activeStable.id;
  const counts = { horses: 0, tasks: 0, hours: 0, inventory: 0, events: 0 };
  try {
    const localUploadData = loadData();
    const uploadedHorses = await upsertCloudRows('horses', buildHorseRows(stableId, localUploadData));
    counts.horses = uploadedHorses.length;
    const horseIdMap = new Map(uploadedHorses.map((horse) => [horse.local_id, horse.id]));

    counts.tasks = (await upsertCloudRows('tasks', buildTaskRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    counts.hours = (await upsertCloudRows('work_logs', buildWorkLogRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    counts.inventory = (await upsertCloudRows('feed_items', buildFeedRows(stableId, localUploadData), 'local_id')).length;
    counts.events = (await upsertCloudRows('calendar_events', buildCalendarRows(stableId, horseIdMap, localUploadData), 'local_id')).length;

    const uploadedAt = new Date().toISOString();
    localStorage.setItem(LAST_CLOUD_UPLOAD_KEY, uploadedAt);
    if (els.migrationConfirmInput) els.migrationConfirmInput.value = '';
    const message = t('migration.uploadSuccess', counts);
    migrationUploadStatusText = message;
    if (els.migrationUploadStatus) els.migrationUploadStatus.textContent = message;
    showMessage(message);
  } catch (error) {
    console.error('[EquiTrack cloud] Manual upload failed', error);
    const errorMessage = isMissingLocalIdSchemaError(error) ? t('migration.schemaNeeded') : getAuthErrorMessage(error);
    const message = t('migration.uploadFailed', { error: errorMessage });
    migrationUploadStatusText = message;
    if (els.migrationUploadStatus) els.migrationUploadStatus.textContent = message;
    showMessage(message);
  } finally {
    isCloudUploading = false;
    renderMigrationPreview();
  }
}

async function getUserStable(user = getCurrentUser()) {
  if (!supabaseClient || !user) return null;
  console.info('[EquiTrack cloud] Current auth user id', user.id);
  const { data: memberships, error: membershipError } = await withTimeout(
    supabaseClient
      .from('stable_members')
      .select('stable_id, role')
      .eq('user_id', user.id)
      .limit(1),
    10000,
    'stable_members query'
  );
  console.info('[EquiTrack cloud] stable_members query result', { memberships, membershipError });
  if (membershipError) throw membershipError;
  const membership = Array.isArray(memberships) ? memberships[0] : null;
  if (!membership?.stable_id) return null;
  const { data: stables, error: stableError } = await withTimeout(
    supabaseClient
      .from('stables')
      .select('id, name')
      .eq('id', membership.stable_id)
      .limit(1),
    10000,
    'stables query'
  );
  console.info('[EquiTrack cloud] stables query result', { stables, stableError });
  if (stableError) throw stableError;
  const stable = Array.isArray(stables) ? stables[0] : null;
  if (!stable) return null;
  return {
    stableId: stable.id,
    stableName: stable.name,
    membershipRole: membership.role || 'member'
  };
}

async function refreshCloudConnection() {
  const user = getCurrentUser();
  if (!user) {
    if (cloudPreviewMode) {
      state = loadData();
      cloudPreviewMode = false;
      cloudModeStatusText = '';
    }
    if (horseCloudWriteMode) {
      state = loadData();
      horseCloudWriteMode = false;
      horseCloudStatusText = '';
    }
    if (taskCloudWriteMode) {
      state = loadData();
      taskCloudWriteMode = false;
      taskCloudStatusText = '';
    }
    if (workCloudWriteMode) {
      state = loadData();
      workCloudWriteMode = false;
      workCloudStatusText = '';
    }
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      messageKey: 'cloud.notConnected'
    });
    return cloudState.status;
  }
  setCloudStatus({
    status: 'loading',
    email: user.email || '',
    stableId: '',
    stableName: '',
    messageKey: 'cloud.loadingStable'
  });
  try {
    const stable = await getUserStable(user);
    if (!stable) {
      setCloudStatus({
        status: 'noStable',
        email: user.email || '',
        stableId: '',
        stableName: '',
        messageKey: 'cloud.noStable'
      });
      showMessage(t('cloud.noStable'));
      return cloudState.status;
    }
    setCloudStatus({
      status: 'connected',
      email: user.email || '',
      stableId: stable.stableId,
      stableName: stable.stableName,
      messageKey: 'cloud.connectedAs'
    });
    return cloudState.status;
  } catch (error) {
    logAuthError('Stable lookup failed', error);
    if (isPermissionError(error)) {
      setCloudStatus({
        status: 'permissionBlocked',
        email: user.email || '',
        stableId: '',
        stableName: '',
        messageKey: 'cloud.permissionBlocked'
      });
      showMessage(t('cloud.permissionBlocked'));
      return cloudState.status;
    }
    setCloudStatus({
      status: 'error',
      email: user.email || '',
      stableId: '',
      stableName: '',
      messageKey: 'cloud.loadError'
    });
    showMessage(getAuthErrorMessage(error) || t('cloud.loadError'));
    return cloudState.status;
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
    if (!window.supabase?.createClient) throw new Error('Could not load Supabase client.');
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.SUPABASE_URL, SUPABASE_CONFIG.SUPABASE_PUBLISHABLE_KEY);
    console.info('[EquiTrack auth] Supabase client initialized', getAuthDiagnostics());
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    authUser = data.session?.user || null;
    await refreshCloudConnection();
    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      authUser = session?.user || null;
      updateAuthUi();
      await refreshCloudConnection();
      if (!authUser && isProtectedView(activeView)) showView('login');
    });
  } catch (error) {
    logAuthError('Session initialization failed', error);
    showMessage(getAuthErrorMessage(error));
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
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderCloudCleanup();
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
  const sortedTasks = state.tasks.map(normalizeTask).sort((a, b) => a.date.localeCompare(b.date));
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
  els.hoursList.innerHTML = state.hours.map(normalizeWorkLog).map((entry) => `
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
  if (blockCloudPreviewEdit()) return;
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
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const horse = {
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
  };
  if (horseCloudWriteMode) {
    if (!horse.id) horse.id = createId();
    const existingHorse = state.horses.find((entry) => entry.id === horse.id);
    if (existingHorse?.cloudId) horse.cloudId = existingHorse.cloudId;
    handleCloudHorseSave(horse).then((saved) => {
      if (saved) resetForm(form);
    });
    return;
  }
  upsert('horses', horse);
  resetForm(form);
  showMessage(t('message.horseSaved'));
}

function handleTaskSubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const task = {
    id: form.elements.id.value,
    title: form.elements.title.value.trim(),
    date: form.elements.date.value,
    horseId: form.elements.horseId.value,
    notes: form.elements.notes.value.trim(),
    done: state.tasks.find((task) => task.id === form.elements.id.value)?.done || false
  };
  if (taskCloudWriteMode) {
    if (!task.id) task.id = createId();
    const existingTask = state.tasks.find((entry) => entry.id === task.id);
    if (existingTask?.cloudId) task.cloudId = existingTask.cloudId;
    handleCloudTaskSave(task).then((saved) => {
      if (saved) {
        resetForm(form);
        form.elements.date.value = today();
      }
    });
    return;
  }
  upsert('tasks', task);
  resetForm(form);
  form.elements.date.value = today();
  showMessage(t('message.taskSaved'));
}

function handleHoursSubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const entry = {
    id: form.elements.id.value,
    worker: form.elements.worker.value.trim(),
    date: form.elements.date.value,
    hours: Number(form.elements.hours.value),
    notes: form.elements.notes.value.trim()
  };
  if (workCloudWriteMode) {
    if (!entry.id) entry.id = createId();
    const existingEntry = state.hours.find((item) => item.id === entry.id);
    if (existingEntry?.cloudId) entry.cloudId = existingEntry.cloudId;
    if (existingEntry?.horseId) entry.horseId = existingEntry.horseId;
    handleCloudWorkLogSave(entry).then((saved) => {
      if (saved) {
        resetForm(form);
        form.elements.date.value = today();
      }
    });
    return;
  }
  upsert('hours', entry);
  resetForm(form);
  form.elements.date.value = today();
  showMessage(t('message.hoursSaved'));
}

function handleInventorySubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
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
  if (blockCloudPreviewEdit()) return;
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
  if (isCloudPreviewActive() && /^(edit|delete|toggle)/.test(action)) {
    blockCloudPreviewEdit();
    return;
  }
  if (action === 'edit-horse') fillHorseForm(id);
  if (action === 'delete-horse') {
    if (horseCloudWriteMode) handleCloudHorseDelete(id);
    else deleteItem('horses', id, t('delete.horse'), t('message.horseDeleted'));
  }
  if (action === 'toggle-task') toggleTask(id);
  if (action === 'edit-task') fillTaskForm(id);
  if (action === 'delete-task') {
    if (taskCloudWriteMode) handleCloudTaskDelete(id);
    else deleteItem('tasks', id, t('delete.task'), t('message.taskDeleted'));
  }
  if (action === 'edit-hours') fillHoursForm(id);
  if (action === 'delete-hours') {
    if (workCloudWriteMode) handleCloudWorkLogDelete(id);
    else deleteItem('hours', id, t('delete.hours'), t('message.hoursDeleted'));
  }
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
  if (blockCloudPreviewEdit()) return;
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
  const found = state.hours.find((item) => item.id === id);
  if (!found) return;
  const entry = normalizeWorkLog(found);
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
  if (blockCloudPreviewEdit()) return;
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
  if (blockCloudPreviewEdit()) return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  const nextTask = { ...task, done: !task.done };
  if (taskCloudWriteMode) {
    handleCloudTaskSave(nextTask, t('taskCloud.toggled'));
    return;
  }
  task.done = nextTask.done;
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
    tasks: Array.isArray(data.tasks) ? data.tasks.map(normalizeTask) : [],
    hours: Array.isArray(data.hours) ? data.hours.map(normalizeWorkLog) : [],
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
  if (blockCloudPreviewEdit()) return;
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
  if (blockCloudPreviewEdit()) {
    els.importInput.value = '';
    return;
  }
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
  if (blockCloudPreviewEdit()) return;
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
  if (blockCloudPreviewEdit()) return;
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
    const cloudStatus = await refreshCloudConnection();
    if (cloudStatus === 'connected') showMessage(t('message.authLoginSuccess'));
    showView('stable');
  } catch (error) {
    logAuthError('Login failed', error);
    showMessage(getAuthErrorMessage(error));
  } finally {
    updateAuthUi();
  }
}

async function handleLogout() {
  if (!supabaseClient) {
    authUser = null;
    state = loadData();
    cloudPreviewMode = false;
    cloudModeStatusText = '';
    horseCloudWriteMode = false;
    horseCloudStatusText = '';
    taskCloudWriteMode = false;
    taskCloudStatusText = '';
    workCloudWriteMode = false;
    workCloudStatusText = '';
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      messageKey: 'cloud.notConnected'
    });
    updateAuthUi();
    showView('home');
    showMessage(t('message.authLogoutSuccess'));
    return;
  }
  try {
    await supabaseClient.auth.signOut();
  } finally {
    authUser = null;
    state = loadData();
    cloudPreviewMode = false;
    cloudModeStatusText = '';
    horseCloudWriteMode = false;
    horseCloudStatusText = '';
    taskCloudWriteMode = false;
    taskCloudStatusText = '';
    workCloudWriteMode = false;
    workCloudStatusText = '';
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      messageKey: 'cloud.notConnected'
    });
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
els.migrationConfirmInput?.addEventListener('input', handleMigrationConfirmationChange);
els.migrationUploadButton?.addEventListener('click', uploadLocalDataToCloud);
els.cloudReadButton?.addEventListener('click', checkCloudDataPreview);
els.cloudModePreviewButton?.addEventListener('click', enableCloudModePreview);
els.cloudModeLocalButton?.addEventListener('click', returnToLocalDataMode);
els.horseCloudConfirmInput?.addEventListener('input', handleHorseCloudConfirmationChange);
els.horseCloudEnableButton?.addEventListener('click', enableHorseCloudWrites);
els.horseCloudLocalButton?.addEventListener('click', returnHorseWritesToLocalMode);
els.taskCloudConfirmInput?.addEventListener('input', handleTaskCloudConfirmationChange);
els.taskCloudEnableButton?.addEventListener('click', enableTaskCloudWrites);
els.taskCloudLocalButton?.addEventListener('click', returnTaskWritesToLocalMode);
els.workCloudConfirmInput?.addEventListener('input', handleWorkCloudConfirmationChange);
els.workCloudEnableButton?.addEventListener('click', enableWorkCloudWrites);
els.workCloudLocalButton?.addEventListener('click', returnWorkWritesToLocalMode);
els.cloudCleanupConfirmInput?.addEventListener('input', handleCloudCleanupConfirmationChange);
els.cloudCleanupButton?.addEventListener('click', cleanupCloudDataForStable);
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
