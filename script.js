const STORAGE_KEY = 'equitrack-web-data-v1';
const LANGUAGE_KEY = 'equitrack-web-language';
const LAST_BACKUP_KEY = 'equitrack-web-last-backup';
const EMERGENCY_BACKUP_KEY = 'equitrack-web-emergency-backup';
const ONBOARDING_KEY = 'equitrack-web-onboarding-complete';
const HOME_TIPS_KEY = 'equitrack-web-home-tips-dismissed';
const LAST_CLOUD_UPLOAD_KEY = 'equitrack-web-last-cloud-upload';
const CLOUD_LOCAL_OVERRIDE_KEY = 'equitrack-web-cloud-local-override';
const FALLBACK_WEATHER_LOCATION = {
  city: 'Turku',
  country: 'Finland',
  latitude: 60.4518,
  longitude: 22.2666
};
const DEFAULT_LANGUAGE = 'en';
const EVENT_TYPES = ['race', 'training', 'shoeing', 'vaccination', 'vet', 'feeding', 'other'];
const CARE_TYPES = ['shoeing', 'vaccination', 'deworming', 'vet', 'medication', 'injury', 'dental', 'other'];
const RACE_ENTRY_STATUSES = ['draft', 'ready', 'sent'];
const PDFJS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const PROTECTED_VIEWS = ['stable', 'calendar', 'raceEntries', 'settings'];
const CLOUD_WRITE_TIMEOUT_MS = 15000;
const ADMIN_PERMISSION_FIELDS = [
  'can_view_horses',
  'can_edit_horses',
  'can_view_tasks',
  'can_edit_tasks',
  'can_view_calendar',
  'can_edit_calendar',
  'can_view_feed',
  'can_edit_feed',
  'can_view_work_logs',
  'can_edit_work_logs',
  'can_manage_users'
];

const SUPABASE_CONFIG = {
  SUPABASE_URL: 'https://fuojlxcexpnszepgipbv.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_6_byc2-epHvcZw1g5LlFOg_wAGSYMkU'
};

const SUPPORT_CONFIG = {
  phoneDisplay: '+358 44 970 3191',
  phoneHref: 'tel:+358449703191',
  email: 'nicolo.manzone@aequitrack.com',
  subject: 'EquiTrack support request'
};
const CREATE_USER_FUNCTION_URL = 'https://fuojlxcexpnszepgipbv.functions.supabase.co/create-user';
const CREATE_STABLE_FUNCTION_URL = 'https://fuojlxcexpnszepgipbv.functions.supabase.co/create-stable';

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
    'home.title': 'EquiTrack',
    'home.pitch': 'Manage your stable. Track your horses. Stay in control.',
    'home.description': 'Browser-based horse stable management for horses, tasks, feed, work hours, and calendar planning.',
    'home.cta': 'Open My Stable',
    'home.ctaStable': 'Open My Stable',
    'home.ctaCalendar': 'Open Calendar',
    'home.ctaLogin': 'Log in',
    'home.ctaApp': 'Go to app',
    'home.ctaSettings': 'Open Settings',
    'home.gotIt': 'Got it',
    'home.overviewEyebrow': 'Welcome back',
    'home.overviewTitle': 'Home overview',
    'home.overviewText': 'A quick look at the stable data currently active in EquiTrack.',
    'home.overviewStable': 'Active stable',
    'home.eventsToday': 'Events today',
    'home.nextSevenDays': 'Next 7 days',
    'home.lowFeedItems': 'Low feed items',
    'home.workHoursTotal': 'Work hours total',
    'home.quickLinks': 'Quick links',
    'home.openHorses': 'Open horses',
    'home.openTasks': 'Open tasks',
    'home.openCalendar': 'Open calendar',
    'home.openFeed': 'Open feed inventory',
    'home.openHours': 'Open work hours',
    'home.openSettings': 'Open settings',
    'weather.title': "Today's turnout suggestion",
    'weather.loading': "Checking today's weather...",
    'weather.location': 'Weather location: Turku, Finland',
    'weather.rain': 'Rain today — keep horses inside.',
    'weather.noRain': 'No rain today — horses can go outside.',
    'weather.unavailable': 'Weather unavailable — check conditions manually.',
    'weather.disclaimer': 'Always use your own judgement for horse safety.',
    'weather.locationUsed': 'Weather location: {location}',
    'weather.fallbackLocation': 'Using fallback weather location.',
    'stable.city': 'Stable city',
    'stable.country': 'Stable country',
    'stable.location': 'Stable location',
    'stable.locationNotSet': 'Location not set',
    'stable.saveLocation': 'Save location',
    'stable.locationSaved': 'Location saved',
    'stable.locationPermissionDenied': 'You do not have permission to edit stable location.',
    'stable.locationReady': 'Update the city and country used for stable weather.',
    'stable.locationSaving': 'Saving location...',
    'stable.locationSaveFailed': 'Could not save stable location: {error}',
    'home.badgeBrowser': 'Browser-based',
    'home.badgeCloud': 'Cloud sync',
    'home.badgeMobile': 'Mobile friendly',
    'home.badgeFallback': 'Local fallback',
    'home.badgeLanguages': 'Multilingual',
    'home.accountSignedOut': 'Signed out',
    'home.accountSignedIn': 'Signed in as {email}',
    'home.activeStable': 'Active stable: {name}',
    'home.snapshotEyebrow': 'Daily workspace',
    'home.snapshotTitle': 'Everything the stable needs, ready for the day.',
    'home.snapshotHorses': 'Horse profiles and care notes',
    'home.snapshotTasks': 'Daily tasks and completion tracking',
    'home.snapshotFeed': 'Feed warnings before stock runs out',
    'home.snapshotCalendar': 'Race, training, vet and stable events',
    'home.featureHorsesTitle': 'Horse management',
    'home.featureHorsesText': 'Keep profiles, care notes, ownership details, and health information in one calm view.',
    'home.featureTasksTitle': 'Tasks',
    'home.featureTasksText': 'Plan daily jobs, track open work, and keep stable routines visible.',
    'home.featureHoursTitle': 'Work hours',
    'home.featureHoursText': 'Log stable work with dates, horses, descriptions, and total hours.',
    'home.featureFeedTitle': 'Feed Inventory PRO',
    'home.featureFeedText': 'Track stock, daily usage, shopping needs, and low-feed warnings.',
    'home.featureCalendarTitle': 'Calendar PRO',
    'home.featureCalendarText': 'Plan races, training, shoeing, vet visits, feeding, and stable events.',
    'home.featureBackupTitle': 'Backup & cloud sync',
    'home.featureBackupText': 'Signed-in users save to the cloud while local backup tools stay available.',
    'home.howEyebrow': 'How it works',
    'home.howTitle': 'Start simple, then run the stable from one place.',
    'home.howText': 'EquiTrack keeps the daily workflow clear whether you are at the office, in the barn aisle, or on the road.',
    'home.stepLoginTitle': 'Log in',
    'home.stepLoginText': 'Use the account assigned to your stable.',
    'home.stepStableTitle': 'Choose your stable',
    'home.stepStableText': 'EquiTrack opens the active stable connected to your account.',
    'home.stepManageTitle': 'Manage daily work',
    'home.stepManageText': 'Update horses, tasks, feed, work logs, and events as the day moves.',
    'home.stepSaveTitle': 'Save with fallback',
    'home.stepSaveText': 'Signed-in data saves to the cloud, with local mode and backups still available.',
    'home.dailyEyebrow': 'Built for stable daily use',
    'home.dailyTitle': 'Readable on the phone, useful at the stable.',
    'home.dailyText': 'EquiTrack is designed for the ordinary work that keeps horses cared for and schedules under control.',
    'home.dailyPhone': 'Works on phone and desktop',
    'home.dailyRoutine': 'Keeps daily stable routines easy to scan',
    'home.dailyCalendar': 'Calendar planning for races, training, and vet visits',
    'home.dailyFeed': 'Feed warnings and work tracking for fewer surprises',
    'home.socialTitle': 'Connect',
    'home.socialHeading': 'Follow EquiTrack',
    'home.socialText': 'Social and contact channels can be connected here when they are ready.',
    'home.facebook': 'Facebook',
    'home.instagram': 'Instagram',
    'home.linkedin': 'LinkedIn',
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
    'auth.unauthorized': 'You are not authorized for this action.',
    'auth.emailPlaceholder': 'you@example.com',
    'auth.passwordPlaceholder': 'Password',
    'auth.login': 'Log in',
    'auth.logout': 'Log out',
    'auth.signedOut': 'Signed out',
    'auth.restoring': 'Restoring session...',
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
    'cloud.syncLocal': 'Local browser data remains available as fallback. Export backups regularly.',
    'cloud.prepTitle': 'Cloud storage',
    'cloud.prepText': 'Signed-in users use cloud storage automatically when an active stable is assigned.',
    'cloud.email': 'Logged-in email',
    'cloud.stable': 'Active stable',
    'cloud.status': 'Cloud status',
    'cloudAdvanced.eyebrow': 'Advanced cloud tools',
    'cloudAdvanced.title': 'Migration and troubleshooting',
    'cloudAdvanced.text': 'These tools are for migration, checking cloud counts, and cleanup. Normal signed-in use does not need them.',
    'admin.eyebrow': 'Admin',
    'admin.title': 'Admin User Management',
    'admin.text': 'Create stable users through the secure Supabase Edge Function. No service role key is stored in the browser.',
    'admin.modelSuper': 'Super Admin creates stable owners and manages the full system.',
    'admin.modelOwner': 'Stable Owners manage their own stable and helper permissions.',
    'admin.modelMember': 'Helper Users only access the features they are allowed to use.',
    'admin.edgeFunction': 'User creation will use a secure Supabase Edge Function.',
    'admin.currentAccess': 'Current access',
    'admin.accessSuper': 'Super Admin',
    'admin.accessAdmin': 'App admin',
    'admin.accessOwner': 'Stable owner',
    'admin.accessManager': 'User manager',
    'admin.accessNone': 'Standard user',
    'admin.email': 'Email',
    'admin.password': 'Temporary password',
    'admin.fullName': 'Full name',
    'admin.stableRole': 'Stable role',
    'admin.roleOwner': 'Owner',
    'admin.roleMember': 'Member',
    'admin.roleViewer': 'Viewer',
    'admin.permissions': 'Permissions',
    'admin.canViewHorses': 'View horses',
    'admin.canEditHorses': 'Edit horses',
    'admin.canViewTasks': 'View tasks',
    'admin.canEditTasks': 'Edit tasks',
    'admin.canViewCalendar': 'View calendar',
    'admin.canEditCalendar': 'Edit calendar',
    'admin.canViewFeed': 'View feed inventory',
    'admin.canEditFeed': 'Edit feed inventory',
    'admin.canViewWorkLogs': 'View work logs',
    'admin.canEditWorkLogs': 'Edit work logs',
    'admin.canManageUsers': 'Manage users',
    'admin.createButton': 'Create user',
    'admin.ready': 'Ready to create a user through the secure Edge Function.',
    'admin.notAllowed': 'You do not have permission to manage users.',
    'admin.noStable': 'An active stable is required before creating a stable user.',
    'admin.ownerOnlySuper': 'Only a Super Admin can create stable owners.',
    'admin.creating': 'Creating user...',
    'admin.created': 'Created {email} as {role}.',
    'admin.failed': 'User creation failed: {error}',
    'admin.stableTitle': 'Create new stable',
    'admin.stableText': 'Super Admins can create a stable and optionally create the first owner account through the secure Edge Function.',
    'admin.stableName': 'Stable name',
    'admin.ownerEmail': 'Owner email',
    'admin.ownerFullName': 'Owner full name',
    'admin.ownerPassword': 'Temporary password',
    'admin.createOwnerAccount': 'Create owner account and assign it to this stable',
    'admin.createStableButton': 'Create stable',
    'admin.stableReady': 'Ready to create a stable through the secure Edge Function.',
    'admin.stableOnlyNote': 'Owner email and password are optional when creating a stable only.',
    'admin.stableNotAllowed': 'Only a Super Admin can create stables.',
    'admin.stableCreating': 'Creating stable...',
    'admin.stableCreated': 'Created stable {stable} for {owner}. Current active stable remains unchanged.',
    'admin.stableCreatedNoOwner': 'Created stable {stable}. Current active stable remains unchanged.',
    'admin.stableFailed': 'Stable creation failed: {error}',
    'admin.ownerRequired': 'Owner email and temporary password are required when creating an owner account.',
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
    'migration.schemaNeeded': 'Cloud upload needs the latest database migrations. Run add_local_ids.sql, horse_care_history.sql, race_entry_planner.sql, global_race_programs.sql, horse_racing_profile_fields.sql, central_racing_horses.sql, and racing_horse_performance_history.sql in Supabase, then try again.',
    'migration.uploadSuccess': 'Cloud upload complete: {horses} horses, {tasks} tasks, {hours} work logs, {inventory} feed items, {events} calendar events, {care} care records, {raceOpportunities} race opportunities, {racePlans} race plans.',
    'migration.uploadFailed': 'Cloud upload failed: {error}',
    'saveStatus.idle': 'Saved',
    'saveStatus.saving': 'Saving...',
    'saveStatus.saved': 'Saved',
    'saveStatus.error': 'Save failed - retry',
    'saveStatus.timeout': 'Cloud save timed out. Please try again.',
    'cloudRead.title': 'Cloud read preview',
    'cloudRead.text': 'Check cloud counts for the active stable without changing local data.',
    'cloudRead.targetStable': 'Read target stable',
    'cloudRead.compareHelp': 'Each row shows local count / cloud count.',
    'cloudRead.warningReadOnly': 'This preview is read-only.',
    'cloudRead.warningLocalActive': 'Local browser data remains available for comparison.',
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
    'cloudMode.title': 'Cloud mode',
    'cloudMode.text': 'Signed-in users use cloud storage automatically when an active stable is assigned. Local data stays available as a fallback.',
    'cloudMode.currentMode': 'Current data mode',
    'cloudMode.targetStable': 'Active stable',
    'cloudMode.email': 'Logged-in email',
    'cloudMode.localStatus': 'Local mode active',
    'cloudMode.cloudStatus': 'Cloud mode active',
    'cloudMode.unavailableStatus': 'Cloud unavailable',
    'cloudMode.previewStatus': 'Cloud preview mode, read-only',
    'cloudMode.warningLocalDefault': 'Signed-in users use cloud storage automatically.',
    'cloudMode.warningViewCloud': 'App changes save to the active stable in Supabase when cloud is available.',
    'cloudMode.warningLocalSafe': 'Local browser data is kept as fallback and is not deleted.',
    'cloudMode.warningNoSync': 'Use local mode on this device only if you need a fallback.',
    'cloudMode.warningReadOnly': 'Cloud preview is read-only.',
    'cloudMode.confirmLabel': 'Cloud mode starts automatically after login',
    'cloudMode.enableButton': 'Return to cloud mode',
    'cloudMode.previewButton': 'Enable Cloud mode',
    'cloudMode.localButton': 'Use local mode on this device',
    'cloudMode.useLocalButton': 'Use local mode on this device',
    'cloudMode.returnCloudButton': 'Return to cloud mode',
    'cloudMode.notReady': 'Sign in and make sure an active stable is assigned to use Cloud mode.',
    'cloudMode.ready': 'Cloud will load automatically when your stable is ready.',
    'cloudMode.loading': 'Loading cloud data...',
    'cloudMode.autoLoading': 'Loading cloud data for your stable...',
    'cloudMode.enabled': 'Cloud mode active. App changes save to Supabase.',
    'cloudMode.returnedLocal': 'Local mode active on this device.',
    'cloudMode.localOverride': 'Local mode is active on this device. Local browser data is being used.',
    'cloudMode.returnReady': 'Cloud is available. You can return to cloud mode.',
    'cloudMode.noStable': 'No stable assigned to this account yet.',
    'cloudMode.cloudUnavailable': 'Cloud data could not be loaded. Local mode is active.',
    'cloudMode.failed': 'Cloud data could not be loaded. Local mode is active.',
    'cloudMode.readOnlyMessage': 'Cloud preview is read-only. Return to local data to make changes.',
    'cloudMode.localFallbackMessage': 'Cloud mode is active. Local browser data was kept unchanged.',
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
    'feedCloud.title': 'Cloud write mode - Feed Inventory',
    'feedCloud.text': 'Experimental phase: only feed inventory data is saved to the cloud.',
    'feedCloud.currentMode': 'Feed inventory data mode',
    'feedCloud.targetStable': 'Feed cloud stable',
    'feedCloud.localMode': 'Local',
    'feedCloud.cloudMode': 'Cloud writes enabled',
    'feedCloud.warningExperimental': 'This is an experimental phase.',
    'feedCloud.warningFeedOnly': 'Only feed inventory data will be saved to the cloud.',
    'feedCloud.warningOthersLocal': 'Calendar still stays local for now.',
    'feedCloud.warningLocalSafe': 'Local feed inventory data will not be deleted.',
    'feedCloud.warningReturn': 'You can return feed inventory to local mode.',
    'feedCloud.confirmLabel': 'Type FEED CLOUD to enable cloud feed inventory writes',
    'feedCloud.enableButton': 'Enable cloud feed inventory writes',
    'feedCloud.localButton': 'Return feed inventory to local mode',
    'feedCloud.notReady': 'Feed inventory cloud writes are disabled until you are logged in, have an active stable, and type FEED CLOUD.',
    'feedCloud.ready': 'Ready to enable cloud writes for feed inventory only.',
    'feedCloud.loading': 'Loading cloud feed inventory...',
    'feedCloud.enabled': 'Cloud feed inventory writes enabled. Calendar remains local.',
    'feedCloud.returnedLocal': 'Feed inventory writes returned to local mode.',
    'feedCloud.saveFailed': 'Cloud feed inventory save failed: {error}',
    'feedCloud.deleteFailed': 'Cloud feed inventory delete failed: {error}',
    'feedCloud.loadFailed': 'Cloud feed inventory mode failed: {error}',
    'feedCloud.permissionBlocked': 'Cloud feed inventory writes are blocked by database permissions.',
    'feedCloud.saved': 'Feed item saved to cloud.',
    'feedCloud.deleted': 'Feed item deleted from cloud.',
    'feedCloud.shoppingUpdated': 'Shopping list status saved to cloud.',
    'calendarCloud.title': 'Cloud write mode - Calendar',
    'calendarCloud.text': 'Experimental phase: only calendar event data is saved to the cloud.',
    'calendarCloud.currentMode': 'Calendar data mode',
    'calendarCloud.targetStable': 'Calendar cloud stable',
    'calendarCloud.localMode': 'Local',
    'calendarCloud.cloudMode': 'Cloud writes enabled',
    'calendarCloud.warningExperimental': 'This is an experimental phase.',
    'calendarCloud.warningCalendarOnly': 'Only calendar event data will be saved to the cloud.',
    'calendarCloud.warningSeparateModes': 'Other sections keep their own separate cloud or local modes.',
    'calendarCloud.warningLocalSafe': 'Local calendar data will not be deleted.',
    'calendarCloud.warningReturn': 'You can return calendar to local mode.',
    'calendarCloud.confirmLabel': 'Type CALENDAR CLOUD to enable cloud calendar writes',
    'calendarCloud.enableButton': 'Enable cloud calendar writes',
    'calendarCloud.localButton': 'Return calendar to local mode',
    'calendarCloud.notReady': 'Calendar cloud writes are disabled until you are logged in, have an active stable, and type CALENDAR CLOUD.',
    'calendarCloud.ready': 'Ready to enable cloud writes for calendar only.',
    'calendarCloud.loading': 'Loading cloud calendar events...',
    'calendarCloud.enabled': 'Cloud calendar writes enabled. Other sections keep their own modes.',
    'calendarCloud.returnedLocal': 'Calendar writes returned to local mode.',
    'calendarCloud.saveFailed': 'Cloud calendar save failed: {error}',
    'calendarCloud.deleteFailed': 'Cloud calendar delete failed: {error}',
    'calendarCloud.loadFailed': 'Cloud calendar mode failed: {error}',
    'calendarCloud.permissionBlocked': 'Cloud calendar writes are blocked by database permissions.',
    'calendarCloud.saved': 'Calendar event saved to cloud.',
    'calendarCloud.deleted': 'Calendar event deleted from cloud.',
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
    'cloudCleanup.success': 'Cloud cleanup complete: {events} calendar events, {care} care records, {inventory} feed items, {hours} work logs, {tasks} tasks, {horses} horses deleted.',
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
    'stable.subtitle': 'Manage horses, tasks, work logs, and feed stock from one clear daily dashboard.',
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
    'today.recentWork': 'Work logged today',
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
    'horses.birth': 'Birth date',
    'horses.gender': 'Gender',
    'horses.genderMale': 'Male',
    'horses.genderFemale': 'Female',
    'horses.genderGelding': 'Gelding',
    'horses.genderUnknown': 'Unknown',
    'horses.color': 'Color',
    'horses.registration': 'Registration number',
    'horses.racingProfile': 'Racing profile',
    'horses.countryOfOrigin': 'Country of origin',
    'horses.totalEarnings': 'Total earnings',
    'horses.last5Earnings': 'Earnings in last 5 starts',
    'horses.racingCategory': 'Racing category',
    'horses.trainerName': 'Trainer',
    'horses.ownerName': 'Owner',
    'horses.defaultDriver': 'Default driver',
    'horses.racingNotes': 'Racing notes',
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
    'calendar.subtitle': 'Plan races, training, vet visits, feeding routines, and stable events in one calm calendar.',
    'calendar.addEvent': 'Add event',
    'calendar.monthView': 'Month view',
    'calendar.listView': 'List view',
    'calendar.listSubtitle': 'All matching events remain available for detailed review and editing.',
    'calendar.prevMonth': 'Previous month',
    'calendar.nextMonth': 'Next month',
    'calendar.todayButton': 'Today',
    'calendar.selectedDay': 'Selected day',
    'calendar.noEventsDay': 'No events for this day.',
    'calendar.addForDay': 'Add event for this day',
    'calendar.eventsTodayMetric': 'Events today',
    'calendar.upcomingRaces': 'Upcoming races',
    'calendar.monthMore': '+{count} more',
    'calendar.localMode': 'Local mode',
    'calendar.cloudMode': 'Cloud mode',
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
    'settings.subtitle': 'Keep account, cloud storage, backups, and admin tools organized in one place.',
    'settings.accountEyebrow': 'Account & stable',
    'settings.accountTitle': 'Session and storage status',
    'settings.accountText': 'See who is signed in, which stable is active, and where app changes are being saved.',
    'settings.appEyebrow': 'App settings',
    'settings.appTitle': 'Language and install',
    'settings.appText': 'Choose your interface language and install EquiTrack on a phone or computer.',
    'settings.backupEyebrow': 'Backup & restore',
    'settings.backupSectionTitle': 'Protect your stable data',
    'settings.backupSectionText': 'Export backups regularly and preview imported files before replacing local data.',
    'settings.cloudEyebrow': 'Cloud storage',
    'settings.cloudTitle': 'Automatic cloud mode',
    'settings.cloudText': 'Signed-in users use cloud storage automatically. Local browser data stays available as a fallback.',
    'settings.cloudMigrationSummary': 'Migration and cloud checks',
    'settings.cloudMigrationHelp': 'Use these when moving old browser data or comparing cloud counts.',
    'settings.advancedHelp': 'Advanced cloud cleanup is for troubleshooting duplicated or incorrect cloud counts only.',
    'settings.dangerEyebrow': 'Danger zone',
    'settings.languageHelp': 'Choose interface language',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Export a dated JSON backup or safely preview and restore one you saved earlier.',
    'settings.backupPreviewTitle': 'Import preview',
    'settings.backupPreviewText': 'When you choose a backup file, EquiTrack shows counts before replacing local data.',
    'settings.resetTitle': 'Reset local data',
    'settings.resetText': 'This removes horses, tasks, work logs, feed inventory, and calendar events from this browser.',
    'settings.resetButton': 'Reset local data',
    'privacy.eyebrow': 'Privacy',
    'privacy.title': 'Privacy',
    'privacy.intro': 'A simple overview of where EquiTrack stores data and how accounts are managed.',
    'privacy.accountData': 'EquiTrack stores user account data in Supabase.',
    'privacy.cloudData': 'Stable data is stored in Supabase cloud when you are logged in and Cloud mode is active.',
    'privacy.localData': 'Local browser data may also be stored as fallback or local backup.',
    'privacy.noSale': 'EquiTrack does not sell user data.',
    'privacy.noSignup': 'EquiTrack does not use public sign-up.',
    'privacy.adminUsers': 'Users are created by authorized admins or stable owners.',
    'privacy.backups': 'Export backups regularly if you use local fallback data.',
    'privacy.contact': 'For privacy questions, contact the EquiTrack administrator.',
    'language.label': 'Language',
    'backup.export': 'Download backup',
    'backup.import': 'Restore backup',
    'backup.noPreview': 'No backup selected.',
    'backup.preview': 'Backup preview: {horses} horses, {tasks} tasks, {hours} work logs, {inventory} feed items, {events} calendar events, {care} care records.',
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
    'common.actions': 'Actions',
    'common.notSet': 'not set',
    'common.noNotes': 'No notes yet.',
    'common.yes': 'Yes',
    'common.no': 'No',
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
    'home.title': 'EquiTrack',
    'home.pitch': 'Hallitse tallia. Seuraa hevosia. Pysy ajan tasalla.',
    'home.description': 'Selaimessa toimiva tallinhallinta hevosille, tehtäville, ruokinnalle, työtunneille ja kalenterille.',
    'home.cta': 'Avaa oma talli',
    'home.ctaStable': 'Avaa oma talli',
    'home.ctaCalendar': 'Avaa kalenteri',
    'home.ctaLogin': 'Kirjaudu sisään',
    'home.ctaApp': 'Siirry sovellukseen',
    'home.ctaSettings': 'Avaa asetukset',
    'home.gotIt': 'Ymmärsin',
    'home.overviewEyebrow': 'Tervetuloa takaisin',
    'home.overviewTitle': 'Kotinäkymän yhteenveto',
    'home.overviewText': 'Nopea katsaus EquiTrackissa tällä hetkellä aktiiviseen tallidataan.',
    'home.overviewStable': 'Aktiivinen talli',
    'home.eventsToday': 'Tapahtumat tänään',
    'home.nextSevenDays': 'Seuraavat 7 päivää',
    'home.lowFeedItems': 'Vähissä olevat ruoat',
    'home.workHoursTotal': 'Työtunnit yhteensä',
    'home.quickLinks': 'Pikalinkit',
    'home.openHorses': 'Avaa hevoset',
    'home.openTasks': 'Avaa tehtävät',
    'home.openCalendar': 'Avaa kalenteri',
    'home.openFeed': 'Avaa ruokavarasto',
    'home.openHours': 'Avaa työtunnit',
    'home.openSettings': 'Avaa asetukset',
    'weather.title': 'Tämän päivän tarhaus',
    'weather.loading': 'Tarkistetaan päivän säätä...',
    'weather.location': 'Sijainnin sää: Turku, Suomi',
    'weather.rain': 'Tänään sataa — hevoset sisälle.',
    'weather.noRain': 'Ei sadetta tänään — hevoset ulos.',
    'weather.unavailable': 'Säätietoa ei saatu — tarkista keli itse.',
    'weather.disclaimer': 'Käytä aina omaa harkintaa hevosten turvallisuuden takia.',
    'weather.locationUsed': 'Sijainnin sää: {location}',
    'weather.fallbackLocation': 'Käytetään varasijainnin säätä.',
    'stable.city': 'Tallin kaupunki',
    'stable.country': 'Tallin maa',
    'stable.location': 'Tallin sijainti',
    'stable.locationNotSet': 'Sijaintia ei ole asetettu',
    'stable.saveLocation': 'Tallenna sijainti',
    'stable.locationSaved': 'Sijainti tallennettu',
    'stable.locationPermissionDenied': 'Sinulla ei ole oikeutta muokata tallin sijaintia.',
    'stable.locationReady': 'Päivitä kaupunki ja maa tallin säätä varten.',
    'stable.locationSaving': 'Tallennetaan sijaintia...',
    'stable.locationSaveFailed': 'Tallin sijaintia ei voitu tallentaa: {error}',
    'home.badgeBrowser': 'Selainpohjainen',
    'home.badgeCloud': 'Pilvitallennus',
    'home.badgeMobile': 'Mobiiliystävällinen',
    'home.badgeFallback': 'Paikallinen varatila',
    'home.badgeLanguages': 'Monikielinen',
    'home.accountSignedOut': 'Ei kirjautuneena',
    'home.accountSignedIn': 'Kirjautunut: {email}',
    'home.activeStable': 'Aktiivinen talli: {name}',
    'home.snapshotEyebrow': 'Päivän työtila',
    'home.snapshotTitle': 'Kaikki tallin arkeen valmiina yhdessä näkymässä.',
    'home.snapshotHorses': 'Hevosprofiilit ja hoitomuistiinpanot',
    'home.snapshotTasks': 'Päivän tehtävät ja valmiusseuranta',
    'home.snapshotFeed': 'Ruokavaroitukset ennen varaston loppumista',
    'home.snapshotCalendar': 'Kilpailut, treenit, eläinlääkäri ja tallitapahtumat',
    'home.featureHorsesTitle': 'Hevosten hallinta',
    'home.featureHorsesText': 'Pidä profiilit, hoitotiedot, omistajat ja terveystiedot selkeässä näkymässä.',
    'home.featureTasksTitle': 'Tehtävät',
    'home.featureTasksText': 'Suunnittele päivän työt, seuraa avoimia tehtäviä ja pidä rutiinit näkyvillä.',
    'home.featureHoursTitle': 'Työtunnit',
    'home.featureHoursText': 'Kirjaa tallityöt päivämäärän, hevosen, kuvauksen ja tuntien mukaan.',
    'home.featureFeedTitle': 'Ruokavarasto PRO',
    'home.featureFeedText': 'Seuraa varastoa, päivittäistä kulutusta, ostotarpeita ja vähäisiä määriä.',
    'home.featureCalendarTitle': 'Kalenteri PRO',
    'home.featureCalendarText': 'Suunnittele kilpailut, treenit, kengitykset, eläinlääkärikäynnit, ruokinnat ja tapahtumat.',
    'home.featureBackupTitle': 'Varmuuskopio ja pilvi',
    'home.featureBackupText': 'Kirjautuneiden käyttäjien tiedot tallentuvat pilveen, ja paikalliset varmuuskopiot ovat käytettävissä.',
    'home.howEyebrow': 'Näin se toimii',
    'home.howTitle': 'Aloita helposti ja hoida tallin arki yhdestä paikasta.',
    'home.howText': 'EquiTrack pitää päivän työn selkeänä toimistossa, tallikäytävällä ja matkalla.',
    'home.stepLoginTitle': 'Kirjaudu sisään',
    'home.stepLoginText': 'Käytä tallillesi annettua käyttäjätiliä.',
    'home.stepStableTitle': 'Valitse talli',
    'home.stepStableText': 'EquiTrack avaa käyttäjätiliisi liitetyn aktiivisen tallin.',
    'home.stepManageTitle': 'Hallitse päivän työtä',
    'home.stepManageText': 'Päivitä hevoset, tehtävät, ruokinta, työkirjaukset ja tapahtumat päivän aikana.',
    'home.stepSaveTitle': 'Tallenna varatilalla',
    'home.stepSaveText': 'Kirjautuneen käyttäjän data tallentuu pilveen, ja paikallinen tila sekä varmuuskopiot säilyvät käytössä.',
    'home.dailyEyebrow': 'Tallin arkeen tehty',
    'home.dailyTitle': 'Luettava puhelimessa, hyödyllinen tallilla.',
    'home.dailyText': 'EquiTrack on suunniteltu tavalliseen työhön, jolla hevoset hoidetaan ja aikataulut pysyvät hallinnassa.',
    'home.dailyPhone': 'Toimii puhelimella ja työpöydällä',
    'home.dailyRoutine': 'Pitää päivän tallirutiinit helposti silmäiltävinä',
    'home.dailyCalendar': 'Kalenteri kilpailuille, treeneille ja eläinlääkärikäynneille',
    'home.dailyFeed': 'Ruokavaroitukset ja työkirjaukset vähentävät yllätyksiä',
    'home.socialTitle': 'Yhteydet',
    'home.socialHeading': 'Seuraa EquiTrackia',
    'home.socialText': 'Sosiaaliset kanavat ja yhteystiedot voidaan liittää tähän, kun ne ovat valmiit.',
    'home.facebook': 'Facebook',
    'home.instagram': 'Instagram',
    'home.linkedin': 'LinkedIn',
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
    'auth.unauthorized': 'Sinulla ei ole oikeutta tähän toimintoon.',
    'auth.emailPlaceholder': 'sinä@example.com',
    'auth.passwordPlaceholder': 'Salasana',
    'auth.login': 'Kirjaudu',
    'auth.logout': 'Kirjaudu ulos',
    'auth.signedOut': 'Ei kirjautunut',
    'auth.restoring': 'Palautetaan kirjautumista...',
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
    'migration.schemaNeeded': 'Pilveen lataus tarvitsee uusimmat tietokantamigraatiot. Suorita add_local_ids.sql, horse_care_history.sql, race_entry_planner.sql, global_race_programs.sql, horse_racing_profile_fields.sql, central_racing_horses.sql ja racing_horse_performance_history.sql Supabasessa ja yritä uudelleen.',
    'migration.uploadSuccess': 'Pilveen lataus valmis: {horses} hevosta, {tasks} tehtävää, {hours} työkirjausta, {inventory} ruokavaraston tuotetta, {events} kalenteritapahtumaa, {care} hoitomerkintää, {raceOpportunities} lähtöä, {racePlans} suunniteltua ilmoittautumista.',
    'migration.uploadFailed': 'Pilveen lataus epäonnistui: {error}',
    'saveStatus.idle': 'Tallennettu',
    'saveStatus.saving': 'Tallennetaan...',
    'saveStatus.saved': 'Tallennettu',
    'saveStatus.error': 'Tallennus epäonnistui - yritä uudelleen',
    'saveStatus.timeout': 'Pilvitallennus aikakatkaistiin. Yritä uudelleen.',
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
    'cloudMode.title': 'Pilvitila',
    'cloudMode.text': 'Valitse, käyttääkö EquiTrack selaimen paikallista dataa vai tallentaako se tiedot aktiiviseen Supabase-talliin.',
    'cloudMode.currentMode': 'Nykyinen datatila',
    'cloudMode.targetStable': 'Aktiivinen talli',
    'cloudMode.email': 'Kirjautunut sähköposti',
    'cloudMode.localStatus': 'Paikallinen',
    'cloudMode.cloudStatus': 'Pilvi',
    'cloudMode.warningLocalDefault': 'Paikallinen tila säilyttää datan tässä selaimessa.',
    'cloudMode.warningViewCloud': 'Pilvitila tallentaa datan aktiiviseen Supabase-talliin.',
    'cloudMode.warningLocalSafe': 'Paikallinen data säilytetään varalla.',
    'cloudMode.warningNoSync': 'Voit palata paikalliseen tilaan milloin tahansa.',
    'cloudMode.confirmLabel': 'Pilvitila käynnistyy automaattisesti kirjautumisen jälkeen',
    'cloudMode.enableButton': 'Ota pilvitila käyttöön',
    'cloudMode.previewButton': 'Ota pilvitila käyttöön',
    'cloudMode.localButton': 'Palaa paikalliseen tilaan',
    'cloudMode.notReady': 'Kirjaudu sisään ja varmista, että aktiivinen talli on määritetty pilvitilaa varten.',
    'cloudMode.ready': 'Valmis lataamaan pilvidata ja ottamaan pilvitila käyttöön.',
    'cloudMode.loading': 'Ladataan pilvidataa...',
    'cloudMode.enabled': 'Pilvitila käytössä. Sovelluksen muutokset tallennetaan nyt Supabaseen.',
    'cloudMode.returnedLocal': 'Palattu paikalliseen tilaan.',
    'cloudMode.failed': 'Pilvitila epäonnistui: {error}',
    'cloudMode.localFallbackMessage': 'Pilvitila on käytössä. Paikallinen selaindata säilyi muuttumattomana.',
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
    'feedCloud.title': 'Pilvikirjoitustila - Ruokavarasto',
    'feedCloud.text': 'Kokeellinen vaihe: vain ruokavaraston data tallennetaan pilveen.',
    'feedCloud.currentMode': 'Ruokavaraston tila',
    'feedCloud.targetStable': 'Ruokavaraston pilvitalli',
    'feedCloud.localMode': 'Paikallinen',
    'feedCloud.cloudMode': 'Pilvikirjoitus käytössä',
    'feedCloud.warningExperimental': 'Tämä on kokeellinen vaihe.',
    'feedCloud.warningFeedOnly': 'Vain ruokavaraston data tallennetaan pilveen.',
    'feedCloud.warningOthersLocal': 'Kalenteri pysyy toistaiseksi paikallisena.',
    'feedCloud.warningLocalSafe': 'Paikallista ruokavaraston dataa ei poisteta.',
    'feedCloud.warningReturn': 'Voit palauttaa ruokavaraston paikalliseen tilaan.',
    'feedCloud.confirmLabel': 'Kirjoita FEED CLOUD ottaaksesi ruokavaraston pilvikirjoituksen käyttöön',
    'feedCloud.enableButton': 'Ota ruokavaraston pilvikirjoitus käyttöön',
    'feedCloud.localButton': 'Palauta ruokavarasto paikalliseen tilaan',
    'feedCloud.notReady': 'Ruokavaraston pilvikirjoitus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat FEED CLOUD.',
    'feedCloud.ready': 'Valmis ottamaan käyttöön ruokavaraston pilvikirjoituksen.',
    'feedCloud.loading': 'Ladataan pilviruokavarastoa...',
    'feedCloud.enabled': 'Ruokavaraston pilvikirjoitus käytössä. Kalenteri pysyy paikallisena.',
    'feedCloud.returnedLocal': 'Ruokavaraston tallennus palautettu paikalliseen tilaan.',
    'feedCloud.saveFailed': 'Ruokavaraston pilvitallennus epäonnistui: {error}',
    'feedCloud.deleteFailed': 'Ruokavaraston pilvipoisto epäonnistui: {error}',
    'feedCloud.loadFailed': 'Ruokavaraston pilvitila epäonnistui: {error}',
    'feedCloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät ruokavaraston pilvikirjoituksen.',
    'feedCloud.saved': 'Ruokatuote tallennettu pilveen.',
    'feedCloud.deleted': 'Ruokatuote poistettu pilvestä.',
    'feedCloud.shoppingUpdated': 'Ostoslistan tila tallennettu pilveen.',
    'calendarCloud.title': 'Pilvikirjoitustila - Kalenteri',
    'calendarCloud.text': 'Kokeellinen vaihe: vain kalenteritapahtumat tallennetaan pilveen.',
    'calendarCloud.currentMode': 'Kalenteridatan tila',
    'calendarCloud.targetStable': 'Kalenterin pilvitalli',
    'calendarCloud.localMode': 'Paikallinen',
    'calendarCloud.cloudMode': 'Pilvikirjoitus käytössä',
    'calendarCloud.warningExperimental': 'Tämä on kokeellinen vaihe.',
    'calendarCloud.warningCalendarOnly': 'Vain kalenteritapahtumat tallennetaan pilveen.',
    'calendarCloud.warningSeparateModes': 'Muut osiot säilyttävät omat pilvi- tai paikalliset tilansa.',
    'calendarCloud.warningLocalSafe': 'Paikallista kalenteridataa ei poisteta.',
    'calendarCloud.warningReturn': 'Voit palauttaa kalenterin paikalliseen tilaan.',
    'calendarCloud.confirmLabel': 'Kirjoita CALENDAR CLOUD ottaaksesi kalenterin pilvikirjoituksen käyttöön',
    'calendarCloud.enableButton': 'Ota kalenterin pilvikirjoitus käyttöön',
    'calendarCloud.localButton': 'Palauta kalenteri paikalliseen tilaan',
    'calendarCloud.notReady': 'Kalenterin pilvikirjoitus on pois käytöstä, kunnes olet kirjautunut sisään, aktiivinen talli on valittu ja kirjoitat CALENDAR CLOUD.',
    'calendarCloud.ready': 'Valmis ottamaan käyttöön kalenterin pilvikirjoituksen.',
    'calendarCloud.loading': 'Ladataan pilvikalenterin tapahtumia...',
    'calendarCloud.enabled': 'Kalenterin pilvikirjoitus käytössä. Muut osiot säilyttävät omat tilansa.',
    'calendarCloud.returnedLocal': 'Kalenterin tallennus palautettu paikalliseen tilaan.',
    'calendarCloud.saveFailed': 'Kalenteritapahtuman pilvitallennus epäonnistui: {error}',
    'calendarCloud.deleteFailed': 'Kalenteritapahtuman pilvipoisto epäonnistui: {error}',
    'calendarCloud.loadFailed': 'Kalenterin pilvitila epäonnistui: {error}',
    'calendarCloud.permissionBlocked': 'Tietokannan käyttöoikeudet estävät kalenterin pilvikirjoituksen.',
    'calendarCloud.saved': 'Kalenteritapahtuma tallennettu pilveen.',
    'calendarCloud.deleted': 'Kalenteritapahtuma poistettu pilvestä.',
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
    'cloudCleanup.success': 'Pilvisiivoaminen valmis: {events} kalenteritapahtumaa, {care} hoitomerkintää, {inventory} ruokavaraston tuotetta, {hours} työkirjausta, {tasks} tehtävää, {horses} hevosta poistettu.',
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
    'stable.subtitle': 'Hallitse hevoset, tehtävät, työtunnit ja ruokavarasto yhdestä selkeästä päivänäkymästä.',
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
    'today.recentWork': 'Tänään kirjatut työt',
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
    'horses.birth': 'Syntymäaika',
    'horses.gender': 'Sukupuoli',
    'horses.genderMale': 'Ori / uros',
    'horses.genderFemale': 'Tamma',
    'horses.genderGelding': 'Ruuna',
    'horses.genderUnknown': 'Tuntematon',
    'horses.color': 'Vari',
    'horses.registration': 'Rekisterinumero',
    'horses.racingProfile': 'Kilpailuprofiili',
    'horses.countryOfOrigin': 'Alkuperämaa',
    'horses.totalEarnings': 'Kokonaisansiot',
    'horses.last5Earnings': 'Ansiot viimeisissä 5 lähdössä',
    'horses.racingCategory': 'Kilpailukategoria',
    'horses.trainerName': 'Valmentaja',
    'horses.ownerName': 'Omistaja',
    'horses.defaultDriver': 'Vakio-ohjastaja',
    'horses.racingNotes': 'Kilpailumuistiinpanot',
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
  'calendar.subtitle': 'Suunnittele kilpailut, harjoitukset, eläinlääkärikäynnit, ruokinnat ja tallitapahtumat yhdessä rauhallisessa kalenterissa.',
  'calendar.addEvent': 'Lisää tapahtuma',
  'calendar.monthView': 'Kuukausinäkymä',
  'calendar.listView': 'Listanäkymä',
  'calendar.listSubtitle': 'Kaikki suodatetut tapahtumat ovat edelleen tarkistettavissa ja muokattavissa listana.',
  'calendar.prevMonth': 'Edellinen kuukausi',
  'calendar.nextMonth': 'Seuraava kuukausi',
  'calendar.todayButton': 'Tänään',
  'calendar.selectedDay': 'Valittu päivä',
  'calendar.noEventsDay': 'Tälle päivälle ei ole tapahtumia.',
  'calendar.addForDay': 'Lisää tapahtuma tälle päivälle',
  'calendar.eventsTodayMetric': 'Tapahtumat tänään',
  'calendar.upcomingRaces': 'Tulevat kilpailut',
  'calendar.monthMore': '+{count} lisää',
  'calendar.localMode': 'Paikallinen tila',
  'calendar.cloudMode': 'Pilvitila',
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
    'settings.subtitle': 'Pidä käyttäjätili, pilvitallennus, varmuuskopiot ja ylläpitotyökalut selkeästi yhdessä paikassa.',
    'settings.accountEyebrow': 'Tili ja talli',
    'settings.accountTitle': 'Istunnon ja tallennuksen tila',
    'settings.accountText': 'Näe kuka on kirjautunut sisään, mikä talli on aktiivinen ja minne muutokset tallentuvat.',
    'settings.appEyebrow': 'Sovelluksen asetukset',
    'settings.appTitle': 'Kieli ja asennus',
    'settings.appText': 'Valitse käyttöliittymän kieli ja asenna EquiTrack puhelimelle tai tietokoneelle.',
    'settings.backupEyebrow': 'Varmuuskopio ja palautus',
    'settings.backupSectionTitle': 'Suojaa tallin tiedot',
    'settings.backupSectionText': 'Vie varmuuskopioita säännöllisesti ja esikatsele tuotavat tiedostot ennen paikallisen datan korvaamista.',
    'settings.cloudEyebrow': 'Pilvitallennus',
    'settings.cloudTitle': 'Automaattinen pilvitila',
    'settings.cloudText': 'Kirjautuneet käyttäjät käyttävät pilvitallennusta automaattisesti. Paikallinen selaindata säilyy varatilana.',
    'settings.cloudMigrationSummary': 'Siirto ja pilvitarkistukset',
    'settings.cloudMigrationHelp': 'Käytä näitä vanhan selaindatan siirtoon tai pilvimäärien vertailuun.',
    'settings.advancedHelp': 'Edistynyt pilvisiivoaminen on vain virheellisten tai tuplautuneiden pilvimäärien selvittämiseen.',
    'settings.dangerEyebrow': 'Vaaravyöhyke',
    'settings.languageHelp': 'Valitse käyttöliittymän kieli',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Vie päivätty JSON-varmuuskopio tai esikatsele ja palauta tallennettu tiedosto turvallisesti.',
    'settings.backupPreviewTitle': 'Tuonnin esikatselu',
    'settings.backupPreviewText': 'Kun valitset varmuuskopion, EquiTrack näyttää määrät ennen paikallisten tietojen korvaamista.',
    'settings.resetTitle': 'Nollaa paikalliset tiedot',
    'settings.resetText': 'Tämä poistaa hevoset, tehtävät, työkirjaukset, ruokavaraston ja kalenteritapahtumat tästä selaimesta.',
    'settings.resetButton': 'Nollaa paikalliset tiedot',
    'privacy.eyebrow': 'Tietosuoja',
    'privacy.title': 'Tietosuoja',
    'privacy.intro': 'Selkeä yhteenveto siitä, mihin EquiTrack tallentaa tietoja ja miten käyttäjätilejä hallitaan.',
    'privacy.accountData': 'EquiTrack tallentaa käyttäjätilin tiedot Supabaseen.',
    'privacy.cloudData': 'Tallin tiedot tallennetaan Supabase-pilveen, kun olet kirjautunut sisään ja pilvitila on käytössä.',
    'privacy.localData': 'Paikallista selaindataa voidaan tallentaa myös varatilaa tai paikallista varmuuskopiota varten.',
    'privacy.noSale': 'EquiTrack ei myy käyttäjätietoja.',
    'privacy.noSignup': 'EquiTrackissa ei ole julkista rekisteröitymistä.',
    'privacy.adminUsers': 'Valtuutetut ylläpitäjät tai tallin omistajat luovat käyttäjät.',
    'privacy.backups': 'Vie varmuuskopioita säännöllisesti, jos käytät paikallista varatilaa.',
    'privacy.contact': 'Tietosuojakysymyksissä ota yhteyttä EquiTrack-ylläpitäjään.',
    'language.label': 'Kieli',
    'backup.export': 'Lataa varmuuskopio',
    'backup.import': 'Palauta varmuuskopio',
    'backup.noPreview': 'Varmuuskopiota ei ole valittu.',
    'backup.preview': 'Esikatselu: {horses} hevosta, {tasks} tehtävää, {hours} työkirjausta, {inventory} ruokavaraston tuotetta, {events} kalenteritapahtumaa, {care} hoitomerkintää.',
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
    'common.actions': 'Toiminnot',
    'common.notSet': 'ei asetettu',
    'common.noNotes': 'Ei muistiinpanoja.',
    'common.yes': 'Kyllä',
    'common.no': 'Ei',
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
    'home.title': 'EquiTrack',
    'home.pitch': 'Gestisci la scuderia. Segui i cavalli. Mantieni il controllo.',
    'home.description': 'Gestione scuderia nel browser per cavalli, attività, mangime, ore di lavoro e calendario.',
    'home.cta': 'Apri La mia scuderia',
    'home.ctaStable': 'Apri La mia scuderia',
    'home.ctaCalendar': 'Apri Calendario',
    'home.ctaLogin': 'Accedi',
    'home.ctaApp': 'Vai all’app',
    'home.ctaSettings': 'Apri Impostazioni',
    'home.gotIt': 'Ho capito',
    'home.overviewEyebrow': 'Bentornato',
    'home.overviewTitle': 'Panoramica Home',
    'home.overviewText': 'Uno sguardo rapido ai dati della scuderia attivi in EquiTrack.',
    'home.overviewStable': 'Scuderia attiva',
    'home.eventsToday': 'Eventi oggi',
    'home.nextSevenDays': 'Prossimi 7 giorni',
    'home.lowFeedItems': 'Mangimi bassi',
    'home.workHoursTotal': 'Ore di lavoro totali',
    'home.quickLinks': 'Link rapidi',
    'home.openHorses': 'Apri cavalli',
    'home.openTasks': 'Apri attività',
    'home.openCalendar': 'Apri calendario',
    'home.openFeed': 'Apri scorte di mangime',
    'home.openHours': 'Apri ore di lavoro',
    'home.openSettings': 'Apri impostazioni',
    'weather.title': 'Suggerimento uscita di oggi',
    'weather.loading': 'Controllo del meteo di oggi...',
    'weather.location': 'Località meteo: Turku, Finlandia',
    'weather.rain': 'Oggi piove — tieni i cavalli dentro.',
    'weather.noRain': 'Niente pioggia oggi — i cavalli possono uscire.',
    'weather.unavailable': 'Meteo non disponibile — controlla le condizioni manualmente.',
    'weather.disclaimer': 'Usa sempre il tuo giudizio per la sicurezza dei cavalli.',
    'weather.locationUsed': 'Località meteo: {location}',
    'weather.fallbackLocation': 'Uso della località meteo di fallback.',
    'stable.city': 'Città della scuderia',
    'stable.country': 'Paese della scuderia',
    'stable.location': 'Posizione della scuderia',
    'stable.locationNotSet': 'Posizione non impostata',
    'stable.saveLocation': 'Salva posizione',
    'stable.locationSaved': 'Posizione salvata',
    'stable.locationPermissionDenied': 'Non hai il permesso di modificare la posizione della scuderia.',
    'stable.locationReady': 'Aggiorna città e paese usati per il meteo della scuderia.',
    'stable.locationSaving': 'Salvataggio posizione...',
    'stable.locationSaveFailed': 'Impossibile salvare la posizione della scuderia: {error}',
    'home.badgeBrowser': 'Nel browser',
    'home.badgeCloud': 'Sincronizzazione cloud',
    'home.badgeMobile': 'Ottimizzata per mobile',
    'home.badgeFallback': 'Fallback locale',
    'home.badgeLanguages': 'Multilingua',
    'home.accountSignedOut': 'Non connesso',
    'home.accountSignedIn': 'Accesso effettuato: {email}',
    'home.activeStable': 'Scuderia attiva: {name}',
    'home.snapshotEyebrow': 'Spazio di lavoro quotidiano',
    'home.snapshotTitle': 'Tutto ciò che serve alla scuderia, pronto per la giornata.',
    'home.snapshotHorses': 'Profili cavalli e note di cura',
    'home.snapshotTasks': 'Attività giornaliere e stato di completamento',
    'home.snapshotFeed': 'Avvisi mangime prima che le scorte finiscano',
    'home.snapshotCalendar': 'Gare, allenamenti, veterinario ed eventi',
    'home.featureHorsesTitle': 'Gestione cavalli',
    'home.featureHorsesText': 'Tieni profili, note di cura, proprietari e dati sanitari in una vista ordinata.',
    'home.featureTasksTitle': 'Attività',
    'home.featureTasksText': 'Pianifica i lavori giornalieri, segui le attività aperte e mantieni visibili le routine.',
    'home.featureHoursTitle': 'Ore di lavoro',
    'home.featureHoursText': 'Registra il lavoro in scuderia con date, cavalli, descrizioni e ore totali.',
    'home.featureFeedTitle': 'Inventario Mangimi PRO',
    'home.featureFeedText': 'Controlla scorte, consumo giornaliero, lista acquisti e avvisi di scorte basse.',
    'home.featureCalendarTitle': 'Calendario PRO',
    'home.featureCalendarText': 'Pianifica gare, allenamenti, ferrature, visite veterinarie, alimentazione ed eventi.',
    'home.featureBackupTitle': 'Backup e cloud',
    'home.featureBackupText': 'Gli utenti connessi salvano nel cloud, mentre gli strumenti di backup locale restano disponibili.',
    'home.howEyebrow': 'Come funziona',
    'home.howTitle': 'Inizia in modo semplice e gestisci la scuderia da un unico posto.',
    'home.howText': 'EquiTrack mantiene chiaro il lavoro quotidiano in ufficio, in scuderia o in viaggio.',
    'home.stepLoginTitle': 'Accedi',
    'home.stepLoginText': 'Usa l’account assegnato alla tua scuderia.',
    'home.stepStableTitle': 'Scegli la scuderia',
    'home.stepStableText': 'EquiTrack apre la scuderia attiva collegata al tuo account.',
    'home.stepManageTitle': 'Gestisci il lavoro quotidiano',
    'home.stepManageText': 'Aggiorna cavalli, attività, mangime, registri ore ed eventi durante la giornata.',
    'home.stepSaveTitle': 'Salva con fallback',
    'home.stepSaveText': 'I dati degli utenti connessi vengono salvati nel cloud, con modalità locale e backup ancora disponibili.',
    'home.dailyEyebrow': 'Pensata per l’uso quotidiano',
    'home.dailyTitle': 'Leggibile sul telefono, utile in scuderia.',
    'home.dailyText': 'EquiTrack è progettata per il lavoro ordinario che mantiene i cavalli curati e gli orari sotto controllo.',
    'home.dailyPhone': 'Funziona su telefono e desktop',
    'home.dailyRoutine': 'Rende facili da leggere le routine quotidiane',
    'home.dailyCalendar': 'Calendario per gare, allenamenti e visite veterinarie',
    'home.dailyFeed': 'Avvisi mangime e ore di lavoro per ridurre le sorprese',
    'home.socialTitle': 'Contatti',
    'home.socialHeading': 'Segui EquiTrack',
    'home.socialText': 'I canali social e i contatti possono essere collegati qui quando saranno pronti.',
    'home.facebook': 'Facebook',
    'home.instagram': 'Instagram',
    'home.linkedin': 'LinkedIn',
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
    'auth.unauthorized': 'Non sei autorizzato per questa azione.',
    'auth.emailPlaceholder': 'tu@example.com',
    'auth.passwordPlaceholder': 'Password',
    'auth.login': 'Accedi',
    'auth.logout': 'Esci',
    'auth.signedOut': 'Non connesso',
    'auth.restoring': 'Ripristino dell’accesso...',
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
    'migration.schemaNeeded': 'Il caricamento cloud richiede le ultime migrazioni database. Esegui add_local_ids.sql, horse_care_history.sql, race_entry_planner.sql, global_race_programs.sql, horse_racing_profile_fields.sql, central_racing_horses.sql e racing_horse_performance_history.sql in Supabase, poi riprova.',
    'migration.uploadSuccess': 'Caricamento cloud completato: {horses} cavalli, {tasks} attività, {hours} registri ore, {inventory} scorte di mangime, {events} eventi calendario, {care} record di cura, {raceOpportunities} opportunità gara, {racePlans} iscrizioni pianificate.',
    'migration.uploadFailed': 'Caricamento cloud non riuscito: {error}',
    'saveStatus.idle': 'Salvato',
    'saveStatus.saving': 'Salvataggio...',
    'saveStatus.saved': 'Salvato',
    'saveStatus.error': 'Salvataggio non riuscito - riprova',
    'saveStatus.timeout': 'Il salvataggio cloud è scaduto. Riprova.',
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
    'cloudMode.title': 'Modalità cloud',
    'cloudMode.text': 'Scegli se EquiTrack usa i dati locali del browser o salva i dati nella scuderia Supabase attiva.',
    'cloudMode.currentMode': 'Modalità dati attuale',
    'cloudMode.targetStable': 'Scuderia attiva',
    'cloudMode.email': 'Email connessa',
    'cloudMode.localStatus': 'Locale',
    'cloudMode.cloudStatus': 'Cloud',
    'cloudMode.warningLocalDefault': 'La modalità locale conserva i dati in questo browser.',
    'cloudMode.warningViewCloud': 'La modalità cloud salva i dati nella scuderia attiva in Supabase.',
    'cloudMode.warningLocalSafe': 'I dati locali restano disponibili come fallback.',
    'cloudMode.warningNoSync': 'Puoi tornare alla modalità locale in qualsiasi momento.',
    'cloudMode.confirmLabel': 'La modalità cloud si avvia automaticamente dopo il login',
    'cloudMode.enableButton': 'Abilita modalità cloud',
    'cloudMode.previewButton': 'Abilita modalità cloud',
    'cloudMode.localButton': 'Torna alla modalità locale',
    'cloudMode.notReady': 'Accedi e assicurati che una scuderia attiva sia assegnata per usare la modalità cloud.',
    'cloudMode.ready': 'Pronto a caricare i dati cloud e abilitare la modalità cloud.',
    'cloudMode.loading': 'Caricamento dati cloud...',
    'cloudMode.enabled': 'Modalità cloud attiva. Le modifiche ora vengono salvate in Supabase.',
    'cloudMode.returnedLocal': 'Ritorno alla modalità locale.',
    'cloudMode.failed': 'Modalità cloud non riuscita: {error}',
    'cloudMode.localFallbackMessage': 'La modalità cloud è attiva. I dati locali del browser sono rimasti invariati.',
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
    'feedCloud.title': 'Modalità scrittura cloud - Scorte di mangime',
    'feedCloud.text': 'Fase sperimentale: solo le scorte di mangime vengono salvate nel cloud.',
    'feedCloud.currentMode': 'Modalità dati mangime',
    'feedCloud.targetStable': 'Scuderia cloud mangime',
    'feedCloud.localMode': 'Locale',
    'feedCloud.cloudMode': 'Scrittura cloud attiva',
    'feedCloud.warningExperimental': 'Questa è una fase sperimentale.',
    'feedCloud.warningFeedOnly': 'Solo le scorte di mangime verranno salvate nel cloud.',
    'feedCloud.warningOthersLocal': 'Il calendario resta locale per ora.',
    'feedCloud.warningLocalSafe': 'I dati locali delle scorte di mangime non verranno eliminati.',
    'feedCloud.warningReturn': 'Puoi riportare le scorte di mangime in modalità locale.',
    'feedCloud.confirmLabel': 'Digita FEED CLOUD per abilitare la scrittura cloud delle scorte di mangime',
    'feedCloud.enableButton': 'Abilita scrittura cloud scorte di mangime',
    'feedCloud.localButton': 'Riporta scorte di mangime in modalità locale',
    'feedCloud.notReady': 'La scrittura cloud delle scorte di mangime è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti FEED CLOUD.',
    'feedCloud.ready': 'Pronto ad abilitare la scrittura cloud solo per le scorte di mangime.',
    'feedCloud.loading': 'Caricamento scorte di mangime cloud...',
    'feedCloud.enabled': 'Scrittura cloud scorte di mangime attiva. Il calendario resta locale.',
    'feedCloud.returnedLocal': 'Scrittura scorte di mangime tornata in modalità locale.',
    'feedCloud.saveFailed': 'Salvataggio scorte di mangime cloud non riuscito: {error}',
    'feedCloud.deleteFailed': 'Eliminazione scorte di mangime cloud non riuscita: {error}',
    'feedCloud.loadFailed': 'Modalità scorte di mangime cloud non riuscita: {error}',
    'feedCloud.permissionBlocked': 'La scrittura cloud delle scorte di mangime è bloccata dai permessi del database.',
    'feedCloud.saved': 'Mangime salvato nel cloud.',
    'feedCloud.deleted': 'Mangime eliminato dal cloud.',
    'feedCloud.shoppingUpdated': 'Stato lista acquisti salvato nel cloud.',
    'calendarCloud.title': 'Modalità scrittura cloud - Calendario',
    'calendarCloud.text': 'Fase sperimentale: solo gli eventi del calendario vengono salvati nel cloud.',
    'calendarCloud.currentMode': 'Modalità dati calendario',
    'calendarCloud.targetStable': 'Scuderia cloud calendario',
    'calendarCloud.localMode': 'Locale',
    'calendarCloud.cloudMode': 'Scrittura cloud attiva',
    'calendarCloud.warningExperimental': 'Questa è una fase sperimentale.',
    'calendarCloud.warningCalendarOnly': 'Solo gli eventi del calendario verranno salvati nel cloud.',
    'calendarCloud.warningSeparateModes': 'Le altre sezioni mantengono le proprie modalità cloud o locali.',
    'calendarCloud.warningLocalSafe': 'I dati locali del calendario non verranno eliminati.',
    'calendarCloud.warningReturn': 'Puoi riportare il calendario in modalità locale.',
    'calendarCloud.confirmLabel': 'Digita CALENDAR CLOUD per abilitare la scrittura cloud del calendario',
    'calendarCloud.enableButton': 'Abilita scrittura cloud calendario',
    'calendarCloud.localButton': 'Riporta calendario in modalità locale',
    'calendarCloud.notReady': 'La scrittura cloud del calendario è disabilitata finché non hai effettuato l accesso, hai una scuderia attiva e digiti CALENDAR CLOUD.',
    'calendarCloud.ready': 'Pronto ad abilitare la scrittura cloud solo per il calendario.',
    'calendarCloud.loading': 'Caricamento eventi calendario cloud...',
    'calendarCloud.enabled': 'Scrittura cloud calendario attiva. Le altre sezioni mantengono le proprie modalità.',
    'calendarCloud.returnedLocal': 'Scrittura calendario tornata in modalità locale.',
    'calendarCloud.saveFailed': 'Salvataggio evento calendario cloud non riuscito: {error}',
    'calendarCloud.deleteFailed': 'Eliminazione evento calendario cloud non riuscita: {error}',
    'calendarCloud.loadFailed': 'Modalità calendario cloud non riuscita: {error}',
    'calendarCloud.permissionBlocked': 'La scrittura cloud del calendario è bloccata dai permessi del database.',
    'calendarCloud.saved': 'Evento calendario salvato nel cloud.',
    'calendarCloud.deleted': 'Evento calendario eliminato dal cloud.',
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
    'cloudCleanup.success': 'Pulizia cloud completata: {events} eventi calendario, {care} record di cura, {inventory} scorte di mangime, {hours} registri ore, {tasks} attività, {horses} cavalli eliminati.',
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
    'stable.subtitle': 'Gestisci cavalli, attività, ore di lavoro e scorte di mangime da un dashboard giornaliero chiaro.',
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
    'today.recentWork': 'Lavoro registrato oggi',
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
    'horses.birth': 'Data di nascita',
    'horses.gender': 'Sesso',
    'horses.genderMale': 'Maschio',
    'horses.genderFemale': 'Femmina',
    'horses.genderGelding': 'Castrone',
    'horses.genderUnknown': 'Sconosciuto',
    'horses.color': 'Colore',
    'horses.registration': 'Numero registrazione',
    'horses.racingProfile': 'Profilo corse',
    'horses.countryOfOrigin': 'Paese di origine',
    'horses.totalEarnings': 'Vincite totali',
    'horses.last5Earnings': 'Vincite nelle ultime 5 corse',
    'horses.racingCategory': 'Categoria corse',
    'horses.trainerName': 'Allenatore',
    'horses.ownerName': 'Proprietario',
    'horses.defaultDriver': 'Driver predefinito',
    'horses.racingNotes': 'Note corse',
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
  'calendar.subtitle': 'Pianifica gare, allenamenti, visite veterinarie, alimentazione ed eventi della scuderia in un calendario ordinato.',
  'calendar.addEvent': 'Aggiungi evento',
  'calendar.monthView': 'Vista mese',
  'calendar.listView': 'Vista lista',
  'calendar.listSubtitle': 'Tutti gli eventi filtrati restano disponibili per controllo e modifica.',
  'calendar.prevMonth': 'Mese precedente',
  'calendar.nextMonth': 'Mese successivo',
  'calendar.todayButton': 'Oggi',
  'calendar.selectedDay': 'Giorno selezionato',
  'calendar.noEventsDay': 'Nessun evento per questo giorno.',
  'calendar.addForDay': 'Aggiungi evento per questo giorno',
  'calendar.eventsTodayMetric': 'Eventi oggi',
  'calendar.upcomingRaces': 'Gare in arrivo',
  'calendar.monthMore': '+{count} altri',
  'calendar.localMode': 'Modalità locale',
  'calendar.cloudMode': 'Modalità cloud',
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
    'settings.subtitle': 'Tieni account, cloud, backup e strumenti di amministrazione ordinati in un solo posto.',
    'settings.accountEyebrow': 'Account e scuderia',
    'settings.accountTitle': 'Stato sessione e salvataggio',
    'settings.accountText': 'Vedi chi ha effettuato l’accesso, quale scuderia è attiva e dove vengono salvate le modifiche.',
    'settings.appEyebrow': 'Impostazioni app',
    'settings.appTitle': 'Lingua e installazione',
    'settings.appText': 'Scegli la lingua dell’interfaccia e installa EquiTrack su telefono o computer.',
    'settings.backupEyebrow': 'Backup e ripristino',
    'settings.backupSectionTitle': 'Proteggi i dati della scuderia',
    'settings.backupSectionText': 'Esporta backup regolarmente e visualizza l’anteprima dei file importati prima di sostituire i dati locali.',
    'settings.cloudEyebrow': 'Archiviazione cloud',
    'settings.cloudTitle': 'Modalità cloud automatica',
    'settings.cloudText': 'Gli utenti connessi usano automaticamente il cloud. I dati locali del browser restano disponibili come fallback.',
    'settings.cloudMigrationSummary': 'Migrazione e controlli cloud',
    'settings.cloudMigrationHelp': 'Usali per spostare vecchi dati del browser o confrontare i conteggi cloud.',
    'settings.advancedHelp': 'La pulizia cloud avanzata serve solo per risolvere conteggi cloud duplicati o errati.',
    'settings.dangerEyebrow': 'Zona pericolosa',
    'settings.languageHelp': 'Scegli lingua interfaccia',
    'settings.backupTitle': 'Backup PRO',
    'settings.backupText': 'Esporta un backup JSON datato oppure visualizza e ripristina in modo sicuro un file salvato.',
    'settings.backupPreviewTitle': 'Anteprima importazione',
    'settings.backupPreviewText': 'Quando scegli un backup, EquiTrack mostra i conteggi prima di sostituire i dati locali.',
    'settings.resetTitle': 'Reimposta dati locali',
    'settings.resetText': 'Rimuove cavalli, attività, registri ore, scorte di mangime ed eventi da questo browser.',
    'settings.resetButton': 'Reimposta dati locali',
    'privacy.eyebrow': 'Privacy',
    'privacy.title': 'Privacy',
    'privacy.intro': 'Una panoramica semplice di dove EquiTrack salva i dati e di come vengono gestiti gli account.',
    'privacy.accountData': 'EquiTrack salva i dati degli account utente in Supabase.',
    'privacy.cloudData': 'I dati della scuderia vengono salvati nel cloud Supabase quando hai effettuato l’accesso e la modalità cloud è attiva.',
    'privacy.localData': 'I dati locali del browser possono essere salvati anche come fallback o backup locale.',
    'privacy.noSale': 'EquiTrack non vende i dati degli utenti.',
    'privacy.noSignup': 'EquiTrack non usa registrazione pubblica.',
    'privacy.adminUsers': 'Gli utenti vengono creati da amministratori o proprietari autorizzati.',
    'privacy.backups': 'Esporta backup regolarmente se usi i dati locali come fallback.',
    'privacy.contact': 'Per domande sulla privacy, contatta l’amministratore EquiTrack.',
    'language.label': 'Lingua',
    'backup.export': 'Scarica backup',
    'backup.import': 'Ripristina backup',
    'backup.noPreview': 'Nessun backup selezionato.',
    'backup.preview': 'Anteprima: {horses} cavalli, {tasks} attività, {hours} registri ore, {inventory} scorte di mangime, {events} eventi calendario, {care} record di cura.',
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
    'common.actions': 'Azioni',
    'common.notSet': 'non impostata',
    'common.noNotes': 'Nessuna nota.',
    'common.yes': 'Sì',
    'common.no': 'No',
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

Object.assign(translations.en, {
  'cloud.prepTitle': 'Cloud storage',
  'cloud.prepText': 'Signed-in users use cloud storage automatically when an active stable is assigned.',
  'cloud.syncLocal': 'Local browser data remains available as fallback. Export backups regularly.',
  'cloudAdvanced.eyebrow': 'Advanced cloud tools',
  'cloudAdvanced.title': 'Migration and troubleshooting',
  'cloudAdvanced.text': 'These tools are for migration, checking cloud counts, and cleanup. Normal signed-in use does not need them.',
  'admin.eyebrow': 'Admin',
  'admin.title': 'Admin User Management',
  'admin.text': 'Create stable users through the secure Supabase Edge Function. No service role key is stored in the browser.',
  'admin.modelSuper': 'Super Admin creates stable owners and manages the full system.',
  'admin.modelOwner': 'Stable Owners manage their own stable and helper permissions.',
  'admin.modelMember': 'Helper Users only access the features they are allowed to use.',
  'admin.edgeFunction': 'User creation will use a secure Supabase Edge Function.',
  'admin.currentAccess': 'Current access',
  'admin.accessSuper': 'Super Admin',
  'admin.accessAdmin': 'App admin',
  'admin.accessOwner': 'Stable owner',
  'admin.accessManager': 'User manager',
  'admin.accessNone': 'Standard user',
  'admin.email': 'Email',
  'admin.password': 'Temporary password',
  'admin.fullName': 'Full name',
  'admin.stableRole': 'Stable role',
  'admin.roleOwner': 'Owner',
  'admin.roleMember': 'Member',
  'admin.roleViewer': 'Viewer',
  'admin.permissions': 'Permissions',
  'admin.canViewHorses': 'View horses',
  'admin.canEditHorses': 'Edit horses',
  'admin.canViewTasks': 'View tasks',
  'admin.canEditTasks': 'Edit tasks',
  'admin.canViewCalendar': 'View calendar',
  'admin.canEditCalendar': 'Edit calendar',
  'admin.canViewFeed': 'View feed inventory',
  'admin.canEditFeed': 'Edit feed inventory',
  'admin.canViewWorkLogs': 'View work logs',
  'admin.canEditWorkLogs': 'Edit work logs',
  'admin.canManageUsers': 'Manage users',
  'admin.createButton': 'Create user',
  'admin.ready': 'Ready to create a user through the secure Edge Function.',
  'admin.notAllowed': 'You do not have permission to manage users.',
  'admin.noStable': 'An active stable is required before creating a stable user.',
  'admin.ownerOnlySuper': 'Only a Super Admin can create stable owners.',
  'admin.creating': 'Creating user...',
  'admin.created': 'Created {email} as {role}.',
  'admin.failed': 'User creation failed: {error}',
  'admin.stableTitle': 'Create new stable',
  'admin.stableText': 'Super Admins can create a stable and optionally create the first owner account through the secure Edge Function.',
  'admin.stableName': 'Stable name',
  'admin.ownerEmail': 'Owner email',
  'admin.ownerFullName': 'Owner full name',
  'admin.ownerPassword': 'Temporary password',
  'admin.createOwnerAccount': 'Create owner account and assign it to this stable',
  'admin.createStableButton': 'Create stable',
  'admin.stableReady': 'Ready to create a stable through the secure Edge Function.',
  'admin.stableOnlyNote': 'Owner email and password are optional when creating a stable only.',
  'admin.stableNotAllowed': 'Only a Super Admin can create stables.',
  'admin.stableCreating': 'Creating stable...',
  'admin.stableCreated': 'Created stable {stable} for {owner}. Current active stable remains unchanged.',
  'admin.stableCreatedNoOwner': 'Created stable {stable}. Current active stable remains unchanged.',
  'admin.stableFailed': 'Stable creation failed: {error}',
  'admin.ownerRequired': 'Owner email and temporary password are required when creating an owner account.',
  'cloudRead.warningLocalActive': 'Local browser data remains available for comparison.',
  'cloudMode.text': 'Signed-in users use cloud storage automatically when an active stable is assigned. Local data stays available as a fallback.',
  'cloudMode.localStatus': 'Local mode active',
  'cloudMode.cloudStatus': 'Cloud mode active',
  'cloudMode.unavailableStatus': 'Cloud unavailable',
  'cloudMode.warningLocalDefault': 'Signed-in users use cloud storage automatically.',
  'cloudMode.warningViewCloud': 'App changes save to the active stable in Supabase when cloud is available.',
  'cloudMode.warningLocalSafe': 'Local browser data is kept as fallback and is not deleted.',
  'cloudMode.warningNoSync': 'Use local mode on this device only if you need a fallback.',
  'cloudMode.confirmLabel': 'Cloud mode starts automatically after login',
  'cloudMode.enableButton': 'Return to cloud mode',
  'cloudMode.localButton': 'Use local mode on this device',
  'cloudMode.useLocalButton': 'Use local mode on this device',
  'cloudMode.returnCloudButton': 'Return to cloud mode',
  'cloudMode.notReady': 'Sign in and make sure an active stable is assigned to use Cloud mode.',
  'cloudMode.ready': 'Cloud will load automatically when your stable is ready.',
  'cloudMode.autoLoading': 'Loading cloud data for your stable...',
  'cloudMode.enabled': 'Cloud mode active. App changes save to Supabase.',
  'cloudMode.returnedLocal': 'Local mode active on this device.',
  'cloudMode.localOverride': 'Local mode is active on this device. Local browser data is being used.',
  'cloudMode.returnReady': 'Cloud is available. You can return to cloud mode.',
  'cloudMode.noStable': 'No stable assigned to this account yet.',
  'cloudMode.cloudUnavailable': 'Cloud data could not be loaded. Local mode is active.',
  'cloudMode.failed': 'Cloud data could not be loaded. Local mode is active.'
});

Object.assign(translations.fi, {
  'cloud.prepTitle': 'Pilvitallennus',
  'cloud.prepText': 'Kirjautuneet käyttäjät käyttävät pilvitallennusta automaattisesti, kun aktiivinen talli on määritetty.',
  'cloud.syncLocal': 'Paikallinen selaindata säilyy varalla. Vie varmuuskopioita säännöllisesti.',
  'cloudAdvanced.eyebrow': 'Pilven lisätyökalut',
  'cloudAdvanced.title': 'Siirto ja vianetsintä',
  'cloudAdvanced.text': 'Nämä työkalut ovat siirtoa, pilvimäärien tarkistusta ja siivousta varten. Tavallinen käyttö ei tarvitse niitä.',
  'admin.eyebrow': 'Ylläpito',
  'admin.title': 'Käyttäjien hallinta',
  'admin.text': 'Luo tallin käyttäjiä turvallisen Supabase Edge Functionin kautta. Service role -avainta ei tallenneta selaimeen.',
  'admin.modelSuper': 'Super Admin luo tallien omistajat ja hallitsee koko järjestelmää.',
  'admin.modelOwner': 'Tallin omistajat hallitsevat omaa talliaan ja apukäyttäjien oikeuksia.',
  'admin.modelMember': 'Apukäyttäjät pääsevät vain niihin toimintoihin, joihin heillä on lupa.',
  'admin.edgeFunction': 'Käyttäjien luonti tehdään turvallisen Supabase Edge Functionin kautta.',
  'admin.currentAccess': 'Nykyinen käyttöoikeus',
  'admin.accessSuper': 'Super Admin',
  'admin.accessAdmin': 'Sovelluksen ylläpitäjä',
  'admin.accessOwner': 'Tallin omistaja',
  'admin.accessManager': 'Käyttäjähallinta',
  'admin.accessNone': 'Tavallinen käyttäjä',
  'admin.email': 'Sähköposti',
  'admin.password': 'Väliaikainen salasana',
  'admin.fullName': 'Koko nimi',
  'admin.stableRole': 'Tallirooli',
  'admin.roleOwner': 'Omistaja',
  'admin.roleMember': 'Jäsen',
  'admin.roleViewer': 'Katselija',
  'admin.permissions': 'Oikeudet',
  'admin.canViewHorses': 'Näytä hevoset',
  'admin.canEditHorses': 'Muokkaa hevosia',
  'admin.canViewTasks': 'Näytä tehtävät',
  'admin.canEditTasks': 'Muokkaa tehtäviä',
  'admin.canViewCalendar': 'Näytä kalenteri',
  'admin.canEditCalendar': 'Muokkaa kalenteria',
  'admin.canViewFeed': 'Näytä ruokavarasto',
  'admin.canEditFeed': 'Muokkaa ruokavarastoa',
  'admin.canViewWorkLogs': 'Näytä työtunnit',
  'admin.canEditWorkLogs': 'Muokkaa työtunteja',
  'admin.canManageUsers': 'Hallitse käyttäjiä',
  'admin.createButton': 'Luo käyttäjä',
  'admin.ready': 'Valmis luomaan käyttäjän turvallisen Edge Functionin kautta.',
  'admin.notAllowed': 'Sinulla ei ole oikeutta hallita käyttäjiä.',
  'admin.noStable': 'Aktiivinen talli tarvitaan ennen tallikäyttäjän luontia.',
  'admin.ownerOnlySuper': 'Vain Super Admin voi luoda tallin omistajia.',
  'admin.creating': 'Luodaan käyttäjää...',
  'admin.created': 'Luotu {email} roolilla {role}.',
  'admin.failed': 'Käyttäjän luonti epäonnistui: {error}',
  'admin.stableTitle': 'Luo uusi talli',
  'admin.stableText': 'Super Admin voi luoda tallin ja halutessaan ensimmäisen omistajatilin turvallisen Edge Functionin kautta.',
  'admin.stableName': 'Tallin nimi',
  'admin.ownerEmail': 'Omistajan sähköposti',
  'admin.ownerFullName': 'Omistajan koko nimi',
  'admin.ownerPassword': 'Väliaikainen salasana',
  'admin.createOwnerAccount': 'Luo omistajatili ja liitä se tähän talliin',
  'admin.createStableButton': 'Luo talli',
  'admin.stableReady': 'Valmis luomaan tallin turvallisen Edge Functionin kautta.',
  'admin.stableOnlyNote': 'Omistajan sähköposti ja salasana ovat valinnaisia, kun luodaan vain talli.',
  'admin.stableNotAllowed': 'Vain Super Admin voi luoda talleja.',
  'admin.stableCreating': 'Luodaan tallia...',
  'admin.stableCreated': 'Talli {stable} luotu omistajalle {owner}. Nykyinen aktiivinen talli ei vaihdu.',
  'admin.stableCreatedNoOwner': 'Talli {stable} luotu. Nykyinen aktiivinen talli ei vaihdu.',
  'admin.stableFailed': 'Tallin luonti epäonnistui: {error}',
  'admin.ownerRequired': 'Omistajan sähköposti ja väliaikainen salasana vaaditaan, kun omistajatili luodaan.',
  'cloudRead.warningLocalActive': 'Paikallinen selaindata säilyy vertailua varten.',
  'cloudMode.text': 'Kirjautuneet käyttäjät käyttävät pilvitallennusta automaattisesti, kun aktiivinen talli on määritetty. Paikallinen data säilyy varalla.',
  'cloudMode.localStatus': 'Paikallinen tila käytössä',
  'cloudMode.cloudStatus': 'Pilvitila käytössä',
  'cloudMode.unavailableStatus': 'Pilvi ei ole saatavilla',
  'cloudMode.warningLocalDefault': 'Kirjautuneet käyttäjät käyttävät pilvitallennusta automaattisesti.',
  'cloudMode.warningViewCloud': 'Muutokset tallennetaan aktiiviseen Supabase-talliin, kun pilvi on käytettävissä.',
  'cloudMode.warningLocalSafe': 'Paikallinen selaindata säilyy varalla eikä sitä poisteta.',
  'cloudMode.warningNoSync': 'Käytä paikallista tilaa tällä laitteella vain tarvittaessa.',
  'cloudMode.confirmLabel': 'Pilvitila käynnistyy automaattisesti kirjautumisen jälkeen',
  'cloudMode.enableButton': 'Palaa pilvitilaan',
  'cloudMode.localButton': 'Käytä paikallista tilaa tällä laitteella',
  'cloudMode.useLocalButton': 'Käytä paikallista tilaa tällä laitteella',
  'cloudMode.returnCloudButton': 'Palaa pilvitilaan',
  'cloudMode.notReady': 'Kirjaudu sisään ja varmista, että aktiivinen talli on määritetty pilvitilaa varten.',
  'cloudMode.ready': 'Pilvi latautuu automaattisesti, kun talli on valmis.',
  'cloudMode.autoLoading': 'Ladataan tallisi pilvidataa...',
  'cloudMode.enabled': 'Pilvitila käytössä. Sovelluksen muutokset tallennetaan Supabaseen.',
  'cloudMode.returnedLocal': 'Paikallinen tila käytössä tällä laitteella.',
  'cloudMode.localOverride': 'Paikallinen tila on käytössä tällä laitteella. Käytössä on selaimen paikallinen data.',
  'cloudMode.returnReady': 'Pilvi on käytettävissä. Voit palata pilvitilaan.',
  'cloudMode.noStable': 'Tälle tilille ei ole vielä määritetty tallia.',
  'cloudMode.cloudUnavailable': 'Pilvidataa ei voitu ladata. Paikallinen tila on käytössä.',
  'cloudMode.failed': 'Pilvidataa ei voitu ladata. Paikallinen tila on käytössä.'
});

Object.assign(translations.it, {
  'cloud.prepTitle': 'Archiviazione cloud',
  'cloud.prepText': "Gli utenti connessi usano automaticamente l'archiviazione cloud quando è assegnata una scuderia attiva.",
  'cloud.syncLocal': 'I dati locali del browser restano disponibili come fallback. Esporta backup regolarmente.',
  'cloudAdvanced.eyebrow': 'Strumenti cloud avanzati',
  'cloudAdvanced.title': 'Migrazione e risoluzione problemi',
  'cloudAdvanced.text': 'Questi strumenti servono per migrazione, controllo dei conteggi cloud e pulizia. L’uso normale non ne ha bisogno.',
  'admin.eyebrow': 'Admin',
  'admin.title': 'Gestione utenti admin',
  'admin.text': 'Crea utenti della scuderia tramite una Supabase Edge Function sicura. Nessuna service role key viene salvata nel browser.',
  'admin.modelSuper': 'Il Super Admin crea i proprietari delle scuderie e gestisce tutto il sistema.',
  'admin.modelOwner': 'I proprietari gestiscono la propria scuderia e i permessi degli aiutanti.',
  'admin.modelMember': 'Gli aiutanti accedono solo alle funzioni consentite.',
  'admin.edgeFunction': 'La creazione degli utenti userà una Supabase Edge Function sicura.',
  'admin.currentAccess': 'Accesso attuale',
  'admin.accessSuper': 'Super Admin',
  'admin.accessAdmin': 'Admin app',
  'admin.accessOwner': 'Proprietario scuderia',
  'admin.accessManager': 'Gestore utenti',
  'admin.accessNone': 'Utente standard',
  'admin.email': 'Email',
  'admin.password': 'Password temporanea',
  'admin.fullName': 'Nome completo',
  'admin.stableRole': 'Ruolo scuderia',
  'admin.roleOwner': 'Proprietario',
  'admin.roleMember': 'Membro',
  'admin.roleViewer': 'Visualizzatore',
  'admin.permissions': 'Permessi',
  'admin.canViewHorses': 'Vedi cavalli',
  'admin.canEditHorses': 'Modifica cavalli',
  'admin.canViewTasks': 'Vedi attività',
  'admin.canEditTasks': 'Modifica attività',
  'admin.canViewCalendar': 'Vedi calendario',
  'admin.canEditCalendar': 'Modifica calendario',
  'admin.canViewFeed': 'Vedi scorte di mangime',
  'admin.canEditFeed': 'Modifica scorte di mangime',
  'admin.canViewWorkLogs': 'Vedi ore di lavoro',
  'admin.canEditWorkLogs': 'Modifica ore di lavoro',
  'admin.canManageUsers': 'Gestisci utenti',
  'admin.createButton': 'Crea utente',
  'admin.ready': "Pronto a creare un utente tramite l'Edge Function sicura.",
  'admin.notAllowed': 'Non hai il permesso di gestire utenti.',
  'admin.noStable': 'Serve una scuderia attiva prima di creare un utente della scuderia.',
  'admin.ownerOnlySuper': 'Solo un Super Admin può creare proprietari della scuderia.',
  'admin.creating': 'Creazione utente...',
  'admin.created': 'Creato {email} con ruolo {role}.',
  'admin.failed': 'Creazione utente non riuscita: {error}',
  'admin.stableTitle': 'Crea nuova scuderia',
  'admin.stableText': 'I Super Admin possono creare una scuderia e, se necessario, il primo account proprietario tramite la Edge Function sicura.',
  'admin.stableName': 'Nome scuderia',
  'admin.ownerEmail': 'Email proprietario',
  'admin.ownerFullName': 'Nome completo proprietario',
  'admin.ownerPassword': 'Password temporanea',
  'admin.createOwnerAccount': 'Crea account proprietario e assegnalo a questa scuderia',
  'admin.createStableButton': 'Crea scuderia',
  'admin.stableReady': 'Pronto a creare una scuderia tramite la Edge Function sicura.',
  'admin.stableOnlyNote': "Email e password del proprietario sono facoltative quando crei solo la scuderia.",
  'admin.stableNotAllowed': 'Solo un Super Admin può creare scuderie.',
  'admin.stableCreating': 'Creazione scuderia...',
  'admin.stableCreated': 'Scuderia {stable} creata per {owner}. La scuderia attiva attuale non cambia.',
  'admin.stableCreatedNoOwner': 'Scuderia {stable} creata. La scuderia attiva attuale non cambia.',
  'admin.stableFailed': 'Creazione scuderia non riuscita: {error}',
  'admin.ownerRequired': "Email e password temporanea del proprietario sono obbligatorie quando crei un account proprietario.",
  'cloudRead.warningLocalActive': 'I dati locali del browser restano disponibili per il confronto.',
  'cloudMode.text': "Gli utenti connessi usano automaticamente l'archiviazione cloud quando è assegnata una scuderia attiva. I dati locali restano disponibili come fallback.",
  'cloudMode.localStatus': 'Modalità locale attiva',
  'cloudMode.cloudStatus': 'Modalità cloud attiva',
  'cloudMode.unavailableStatus': 'Cloud non disponibile',
  'cloudMode.warningLocalDefault': "Gli utenti connessi usano automaticamente l'archiviazione cloud.",
  'cloudMode.warningViewCloud': 'Le modifiche vengono salvate nella scuderia attiva in Supabase quando il cloud è disponibile.',
  'cloudMode.warningLocalSafe': 'I dati locali del browser restano come fallback e non vengono eliminati.',
  'cloudMode.warningNoSync': 'Usa la modalità locale su questo dispositivo solo se ti serve un fallback.',
  'cloudMode.confirmLabel': 'La modalità cloud si avvia automaticamente dopo il login',
  'cloudMode.enableButton': 'Torna alla modalità cloud',
  'cloudMode.localButton': 'Usa modalità locale su questo dispositivo',
  'cloudMode.useLocalButton': 'Usa modalità locale su questo dispositivo',
  'cloudMode.returnCloudButton': 'Torna alla modalità cloud',
  'cloudMode.notReady': 'Accedi e assicurati che una scuderia attiva sia assegnata per usare la modalità cloud.',
  'cloudMode.ready': 'Il cloud si caricherà automaticamente quando la scuderia sarà pronta.',
  'cloudMode.autoLoading': 'Caricamento dei dati cloud della tua scuderia...',
  'cloudMode.enabled': 'Modalità cloud attiva. Le modifiche vengono salvate in Supabase.',
  'cloudMode.returnedLocal': 'Modalità locale attiva su questo dispositivo.',
  'cloudMode.localOverride': 'La modalità locale è attiva su questo dispositivo. Sono in uso i dati locali del browser.',
  'cloudMode.returnReady': 'Il cloud è disponibile. Puoi tornare alla modalità cloud.',
  'cloudMode.noStable': 'Nessuna scuderia assegnata a questo account.',
  'cloudMode.cloudUnavailable': 'Impossibile caricare i dati cloud. La modalità locale è attiva.',
  'cloudMode.failed': 'Impossibile caricare i dati cloud. La modalità locale è attiva.'
});

Object.assign(translations.en, {
  'alerts.title': 'Alerts',
  'alerts.notifications': 'Notifications',
  'alerts.subtitle': 'A focused list of stable items that may need attention today.',
  'alerts.critical': 'Critical',
  'alerts.attention': 'Attention',
  'alerts.info': 'Info',
  'alerts.count': '{count} active',
  'alerts.noActive': 'No active alerts.',
  'alerts.openAlerts': 'Open alerts',
  'alerts.openFeed': 'Open Feed Inventory',
  'alerts.openTasks': 'Open Tasks',
  'alerts.openCalendar': 'Open Calendar',
  'alerts.openBackup': 'Open Backup',
  'alerts.viewWeather': 'View Home weather',
  'alerts.areaFeed': 'Feed Inventory',
  'alerts.areaTasks': 'Tasks',
  'alerts.areaCalendar': 'Calendar',
  'alerts.areaBackup': 'Backup',
  'alerts.areaWeather': 'Weather',
  'alerts.overdueTasks': 'Overdue tasks',
  'alerts.tasksDueToday': 'Tasks due today',
  'alerts.feedRunningLow': 'Feed running low',
  'alerts.feedCritical': 'Feed critical',
  'alerts.feedEmpty': 'Feed empty',
  'alerts.eventsToday': 'Events today',
  'alerts.eventsTomorrow': 'Events tomorrow',
  'alerts.upcomingRaces': 'Upcoming races',
  'alerts.backupReminder': 'Backup reminder',
  'alerts.weatherTurnout': 'Weather / turnout alert',
  'alerts.rainTurnout': 'Rain today - check turnout decision',
  'alerts.feedEmptyMessage': '{count} feed item(s) are empty or at zero stock.',
  'alerts.feedCriticalMessage': '{count} feed item(s) are critical or may run out very soon.',
  'alerts.feedLowMessage': '{count} feed item(s) are low or may run out soon.',
  'alerts.overdueTasksMessage': '{count} open task(s) are overdue.',
  'alerts.tasksTodayMessage': '{count} open task(s) are due today.',
  'alerts.eventsTodayMessage': '{count} event(s) are scheduled today.',
  'alerts.eventsTomorrowMessage': '{count} event(s) are scheduled tomorrow.',
  'alerts.racesMessage': '{count} race event(s) are coming in the next 7 days.',
  'alerts.backupMissingMessage': 'No backup export has been recorded on this device.',
  'alerts.backupOldMessage': 'Last backup export is {count} days old.',
  'alerts.weatherMessage': 'Rain is detected today. Review turnout before sending horses outside.'
});

Object.assign(translations.fi, {
  'alerts.title': 'Ilmoitukset',
  'alerts.notifications': 'Ilmoitukset',
  'alerts.subtitle': 'Koottu lista tallin asioista, jotka voivat tarvita huomiota tänään.',
  'alerts.critical': 'Kriittinen',
  'alerts.attention': 'Huomio',
  'alerts.info': 'Tieto',
  'alerts.count': '{count} aktiivista',
  'alerts.noActive': 'Ei aktiivisia ilmoituksia.',
  'alerts.openAlerts': 'Avaa ilmoitukset',
  'alerts.openFeed': 'Avaa ruokavarasto',
  'alerts.openTasks': 'Avaa tehtävät',
  'alerts.openCalendar': 'Avaa kalenteri',
  'alerts.openBackup': 'Avaa varmuuskopio',
  'alerts.viewWeather': 'Katso kotisivun sää',
  'alerts.areaFeed': 'Ruokavarasto',
  'alerts.areaTasks': 'Tehtävät',
  'alerts.areaCalendar': 'Kalenteri',
  'alerts.areaBackup': 'Varmuuskopio',
  'alerts.areaWeather': 'Sää',
  'alerts.overdueTasks': 'Myöhässä olevat tehtävät',
  'alerts.tasksDueToday': 'Tänään erääntyvät tehtävät',
  'alerts.feedRunningLow': 'Ruoka vähissä',
  'alerts.feedCritical': 'Ruoka kriittisen vähissä',
  'alerts.feedEmpty': 'Ruoka loppu',
  'alerts.eventsToday': 'Tapahtumat tänään',
  'alerts.eventsTomorrow': 'Tapahtumat huomenna',
  'alerts.upcomingRaces': 'Tulevat lähdöt',
  'alerts.backupReminder': 'Varmuuskopiomuistutus',
  'alerts.weatherTurnout': 'Sää- ja tarhaushuomio',
  'alerts.rainTurnout': 'Tänään sataa - tarkista tarhauspäätös',
  'alerts.feedEmptyMessage': '{count} ruokavaraston tuotetta on loppu tai nollassa.',
  'alerts.feedCriticalMessage': '{count} ruokavaraston tuotetta on kriittisen vähissä tai loppumassa pian.',
  'alerts.feedLowMessage': '{count} ruokavaraston tuotetta on vähissä tai loppumassa pian.',
  'alerts.overdueTasksMessage': '{count} avointa tehtävää on myöhässä.',
  'alerts.tasksTodayMessage': '{count} avointa tehtävää erääntyy tänään.',
  'alerts.eventsTodayMessage': '{count} tapahtumaa on merkitty tälle päivälle.',
  'alerts.eventsTomorrowMessage': '{count} tapahtumaa on merkitty huomiselle.',
  'alerts.racesMessage': '{count} kilpailutapahtumaa on tulossa seuraavan 7 päivän aikana.',
  'alerts.backupMissingMessage': 'Tällä laitteella ei ole vielä kirjattua varmuuskopiovientiä.',
  'alerts.backupOldMessage': 'Viimeisestä varmuuskopioviennistä on {count} päivää.',
  'alerts.weatherMessage': 'Tänään on havaittu sadetta. Tarkista tarhaus ennen hevosten viemistä ulos.'
});

Object.assign(translations.it, {
  'alerts.title': 'Avvisi',
  'alerts.notifications': 'Notifiche',
  'alerts.subtitle': 'Un elenco mirato degli elementi della scuderia che possono richiedere attenzione oggi.',
  'alerts.critical': 'Critico',
  'alerts.attention': 'Attenzione',
  'alerts.info': 'Info',
  'alerts.count': '{count} attivi',
  'alerts.noActive': 'Nessun avviso attivo.',
  'alerts.openAlerts': 'Apri avvisi',
  'alerts.openFeed': 'Apri scorte di mangime',
  'alerts.openTasks': 'Apri attività',
  'alerts.openCalendar': 'Apri calendario',
  'alerts.openBackup': 'Apri backup',
  'alerts.viewWeather': 'Vedi meteo Home',
  'alerts.areaFeed': 'Scorte di mangime',
  'alerts.areaTasks': 'Attività',
  'alerts.areaCalendar': 'Calendario',
  'alerts.areaBackup': 'Backup',
  'alerts.areaWeather': 'Meteo',
  'alerts.overdueTasks': 'Attività in ritardo',
  'alerts.tasksDueToday': 'Attività in scadenza oggi',
  'alerts.feedRunningLow': 'Mangime in esaurimento',
  'alerts.feedCritical': 'Mangime critico',
  'alerts.feedEmpty': 'Mangime finito',
  'alerts.eventsToday': 'Eventi oggi',
  'alerts.eventsTomorrow': 'Eventi domani',
  'alerts.upcomingRaces': 'Corse in arrivo',
  'alerts.backupReminder': 'Promemoria backup',
  'alerts.weatherTurnout': 'Avviso meteo/uscita',
  'alerts.rainTurnout': 'Oggi piove - controlla la decisione sull uscita',
  'alerts.feedEmptyMessage': '{count} voce/i di mangime sono finite o a zero.',
  'alerts.feedCriticalMessage': '{count} voce/i di mangime sono critiche o finiranno molto presto.',
  'alerts.feedLowMessage': '{count} voce/i di mangime sono basse o potrebbero finire presto.',
  'alerts.overdueTasksMessage': '{count} attività aperta/e sono in ritardo.',
  'alerts.tasksTodayMessage': '{count} attività aperta/e scadono oggi.',
  'alerts.eventsTodayMessage': '{count} evento/i sono programmati per oggi.',
  'alerts.eventsTomorrowMessage': '{count} evento/i sono programmati per domani.',
  'alerts.racesMessage': '{count} evento/i di gara sono in arrivo nei prossimi 7 giorni.',
  'alerts.backupMissingMessage': 'Nessuna esportazione backup è stata registrata su questo dispositivo.',
  'alerts.backupOldMessage': 'L ultimo backup esportato ha {count} giorni.',
  'alerts.weatherMessage': 'Oggi è stata rilevata pioggia. Controlla l uscita prima di mandare fuori i cavalli.'
});

Object.assign(translations.en, {
  'auth.restoring': 'Restoring session...',
  'cloud.loadingStable': 'Loading stable...',
  'cloud.loadingData': 'Loading cloud data...',
  'cloudMode.autoLoading': 'Loading cloud data...'
});

Object.assign(translations.en, {
  'support.eyebrow': 'Support',
  'support.title': 'Support',
  'support.phone': 'Support phone',
  'support.email': 'Support email',
  'support.emailButton': 'Email support',
  'support.callButton': 'Call support',
  'support.helper': 'For account, stable or technical issues, contact support.'
});

Object.assign(translations.en, {
  'care.title': 'Health & Care History',
  'care.subtitle': 'Record shoeing, vaccinations, vet visits, medication, injuries, dental care and other notes for each horse.',
  'care.horse': 'Horse',
  'care.type': 'Type',
  'care.titleLabel': 'Title',
  'care.titlePlaceholder': 'Spring vaccination',
  'care.notes': 'Notes',
  'care.notesPlaceholder': 'Care details, instructions or observations',
  'care.nextDue': 'Next due date',
  'care.cost': 'Cost',
  'care.save': 'Save care record',
  'care.empty': 'No health or care history yet.',
  'care.recent': 'Recent care history',
  'care.nextDueShort': 'Next due',
  'care.noHorse': 'Select a horse before saving a care record.',
  'care.saved': 'Care record saved.',
  'care.deleted': 'Care record deleted.',
  'care.dueToday': 'Care due today',
  'care.overdue': 'Care overdue',
  'care.dueSoon': 'Care due soon',
  'care.dueTodayMessage': '{count} care item(s) are due today.',
  'care.overdueMessage': '{count} care item(s) are overdue.',
  'care.dueSoonMessage': '{count} care item(s) are due within the next 7 days.',
  'care.openCare': 'Open care history',
  'careCloud.saved': 'Care record saved to cloud.',
  'careCloud.deleted': 'Care record deleted from cloud.',
  'careCloud.saveFailed': 'Care record could not be saved: {error}',
  'careCloud.deleteFailed': 'Care record could not be deleted: {error}',
  'careCloud.permissionBlocked': 'Care history is blocked by database permissions.',
  'delete.care': 'this care record',
  'message.editing': 'Editing selected record.',
  'careType.shoeing': 'Shoeing',
  'careType.vaccination': 'Vaccination',
  'careType.deworming': 'Deworming',
  'careType.vet': 'Vet visit',
  'careType.medication': 'Medication',
  'careType.injury': 'Injury',
  'careType.dental': 'Dental care',
  'careType.other': 'Other'
});

Object.assign(translations.fi, {
  'auth.restoring': 'Palautetaan kirjautumista...',
  'cloud.loadingStable': 'Ladataan tallia...',
  'cloud.loadingData': 'Ladataan pilvidataa...',
  'cloudMode.autoLoading': 'Ladataan pilvidataa...'
});

Object.assign(translations.fi, {
  'support.eyebrow': 'Tuki',
  'support.title': 'Tuki',
  'support.phone': 'Tuen puhelin',
  'support.email': 'Tuen sähköposti',
  'support.emailButton': 'Lähetä sähköposti tukeen',
  'support.callButton': 'Soita tukeen',
  'support.helper': 'Ota yhteyttä tukeen käyttäjätiliin, talliin tai teknisiin ongelmiin liittyen.'
});

Object.assign(translations.fi, {
  'care.title': 'Terveys- ja hoitohistoria',
  'care.subtitle': 'Kirjaa kengitykset, rokotukset, eläinlääkärikäynnit, lääkitykset, vammat, hammashoidot ja muut hoitomerkinnät.',
  'care.horse': 'Hevonen',
  'care.type': 'Tyyppi',
  'care.titleLabel': 'Otsikko',
  'care.titlePlaceholder': 'Kevätrokotus',
  'care.notes': 'Muistiinpanot',
  'care.notesPlaceholder': 'Hoidon tiedot, ohjeet tai havainnot',
  'care.nextDue': 'Seuraava eräpäivä',
  'care.cost': 'Kustannus',
  'care.save': 'Tallenna hoitomerkintä',
  'care.empty': 'Terveys- tai hoitohistoriaa ei ole vielä.',
  'care.recent': 'Viimeaikainen hoitohistoria',
  'care.nextDueShort': 'Seuraava',
  'care.noHorse': 'Valitse hevonen ennen hoitomerkinnän tallentamista.',
  'care.saved': 'Hoitomerkintä tallennettu.',
  'care.deleted': 'Hoitomerkintä poistettu.',
  'care.dueToday': 'Hoito erääntyy tänään',
  'care.overdue': 'Hoito myöhässä',
  'care.dueSoon': 'Hoito erääntyy pian',
  'care.dueTodayMessage': '{count} hoitomerkintää erääntyy tänään.',
  'care.overdueMessage': '{count} hoitomerkintää on myöhässä.',
  'care.dueSoonMessage': '{count} hoitomerkintää erääntyy seuraavan 7 päivän aikana.',
  'care.openCare': 'Avaa hoitohistoria',
  'careCloud.saved': 'Hoitomerkintä tallennettu pilveen.',
  'careCloud.deleted': 'Hoitomerkintä poistettu pilvestä.',
  'careCloud.saveFailed': 'Hoitomerkintää ei voitu tallentaa: {error}',
  'careCloud.deleteFailed': 'Hoitomerkintää ei voitu poistaa: {error}',
  'careCloud.permissionBlocked': 'Tietokannan oikeudet estävät hoitohistorian käytön.',
  'delete.care': 'tämä hoitomerkintä',
  'message.editing': 'Muokataan valittua merkintää.',
  'careType.shoeing': 'Kengitys',
  'careType.vaccination': 'Rokotus',
  'careType.deworming': 'Madotus',
  'careType.vet': 'Eläinlääkärikäynti',
  'careType.medication': 'Lääkitys',
  'careType.injury': 'Vamma',
  'careType.dental': 'Hammashoito',
  'careType.other': 'Muu'
});

Object.assign(translations.it, {
  'auth.restoring': 'Ripristino dell accesso...',
  'cloud.loadingStable': 'Caricamento scuderia...',
  'cloud.loadingData': 'Caricamento dati cloud...',
  'cloudMode.autoLoading': 'Caricamento dati cloud...'
});

Object.assign(translations.it, {
  'support.eyebrow': 'Supporto',
  'support.title': 'Supporto',
  'support.phone': 'Telefono supporto',
  'support.email': 'Email supporto',
  'support.emailButton': 'Email al supporto',
  'support.callButton': 'Chiama il supporto',
  'support.helper': 'Contatta il supporto per problemi relativi ad account, scuderia o aspetti tecnici.'
});

Object.assign(translations.it, {
  'care.title': 'Storico salute e cure',
  'care.subtitle': 'Registra ferrature, vaccinazioni, visite veterinarie, farmaci, infortuni, cure dentali e altre note per ogni cavallo.',
  'care.horse': 'Cavallo',
  'care.type': 'Tipo',
  'care.titleLabel': 'Titolo',
  'care.titlePlaceholder': 'Vaccinazione primaverile',
  'care.notes': 'Note',
  'care.notesPlaceholder': 'Dettagli, istruzioni o osservazioni',
  'care.nextDue': 'Prossima scadenza',
  'care.cost': 'Costo',
  'care.save': 'Salva nota di cura',
  'care.empty': 'Nessuno storico salute o cure.',
  'care.recent': 'Storico cure recente',
  'care.nextDueShort': 'Prossima',
  'care.noHorse': 'Seleziona un cavallo prima di salvare una nota di cura.',
  'care.saved': 'Nota di cura salvata.',
  'care.deleted': 'Nota di cura eliminata.',
  'care.dueToday': 'Cura in scadenza oggi',
  'care.overdue': 'Cura in ritardo',
  'care.dueSoon': 'Cura in scadenza a breve',
  'care.dueTodayMessage': '{count} voce/i di cura scadono oggi.',
  'care.overdueMessage': '{count} voce/i di cura sono in ritardo.',
  'care.dueSoonMessage': '{count} voce/i di cura scadono nei prossimi 7 giorni.',
  'care.openCare': 'Apri storico cure',
  'careCloud.saved': 'Nota di cura salvata nel cloud.',
  'careCloud.deleted': 'Nota di cura eliminata dal cloud.',
  'careCloud.saveFailed': 'Impossibile salvare la nota di cura: {error}',
  'careCloud.deleteFailed': 'Impossibile eliminare la nota di cura: {error}',
  'careCloud.permissionBlocked': 'Lo storico cure è bloccato dai permessi del database.',
  'delete.care': 'questa nota di cura',
  'message.editing': 'Modifica della voce selezionata.',
  'careType.shoeing': 'Ferratura',
  'careType.vaccination': 'Vaccinazione',
  'careType.deworming': 'Sverminazione',
  'careType.vet': 'Visita veterinaria',
  'careType.medication': 'Farmaco',
  'careType.injury': 'Infortunio',
  'careType.dental': 'Cure dentali',
  'careType.other': 'Altro'
});

Object.assign(translations.en, {
  'nav.raceEntries': 'Race Entries',
  'raceEntries.eyebrow': 'Race Entry Planner',
  'raceEntries.title': 'Plan race entries and prepare emails.',
  'raceEntries.subtitle': 'Plan which horses can be entered into upcoming races and prepare entry emails.',
  'raceEntries.opportunityFormTitle': 'Add race opportunity',
  'raceEntries.opportunityFormHelp': 'Enter monthly racetrack opportunities manually. File import can come later.',
  'raceEntries.planFormTitle': 'Plan horse entry',
  'raceEntries.planFormHelp': 'Select a race opportunity, choose a horse, and prepare an email draft.',
  'raceEntries.racetrack': 'Racetrack name',
  'raceEntries.raceDate': 'Race date',
  'raceEntries.raceNumber': 'Race number',
  'raceEntries.raceName': 'Race name',
  'raceEntries.raceClass': 'Race class / category',
  'raceEntries.distance': 'Distance',
  'raceEntries.startMethod': 'Start method',
  'raceEntries.prizeInfo': 'Prize info',
  'raceEntries.eligibilityNotes': 'Eligibility notes',
  'raceEntries.entryDeadline': 'Entry deadline',
  'raceEntries.contactEmail': 'Racetrack/contact email',
  'raceEntries.opportunity': 'Race opportunity',
  'raceEntries.horse': 'Horse',
  'raceEntries.stable': 'Stable',
  'raceEntries.driver': 'Driver',
  'raceEntries.trainer': 'Trainer / contact person',
  'raceEntries.status': 'Status',
  'raceEntries.statusDraft': 'Draft',
  'raceEntries.statusReady': 'Ready',
  'raceEntries.statusSent': 'Sent manually',
  'raceEntries.saveOpportunity': 'Save race opportunity',
  'raceEntries.savePlan': 'Save planned entry',
  'raceEntries.opportunitiesTitle': 'Race opportunities',
  'raceEntries.opportunitiesHelp': 'Track upcoming race options, planned horses, and email drafts.',
  'raceEntries.empty': 'No race opportunities yet.',
  'raceEntries.noPlans': 'No horses planned for this race yet.',
  'raceEntries.createDraft': 'Create email draft',
  'raceEntries.mailtoNotice': 'This creates an email draft. Check all details before sending.',
  'raceEntries.importTitle': 'Import race file',
  'raceEntries.importHelp': 'Import Italian race-program PDFs, CSV, or plain text as a reviewable draft. PDF/Excel import is best-effort.',
  'raceEntries.importButton': 'Import race file',
  'raceEntries.importPlaceholder': 'Upload an Italian race-program PDF, CSV, or text file. Review imported races before saving.',
  'raceEntries.importLoaded': 'Race file loaded. Review the text and add opportunities manually for now.',
  'raceEntries.importPdf': 'Import PDF',
  'raceEntries.readingPdf': 'Reading PDF...',
  'raceEntries.racesFound': 'Races found: {count}',
  'raceEntries.reviewImported': 'Review imported races before saving.',
  'raceEntries.saveImported': 'Save selected races',
  'raceEntries.removeImported': 'Remove from import',
  'raceEntries.pdfReadFailed': 'Could not read this PDF. Try manual entry.',
  'raceEntries.noRacesFound': 'No races found in this file. Try manual entry.',
  'raceEntries.pdfUnavailable': 'PDF import is unavailable. Please enter races manually.',
  'raceEntries.importSaved': 'Imported {count} race opportunity/opportunities.',
  'raceEntries.importSaveFailed': 'Imported races could not be saved: {error}',
  'raceEntries.importTextLoaded': 'Text file loaded. Races found: {count}. Review before saving.',
  'raceEntries.importCsvLoaded': 'CSV file loaded. Races found: {count}. Review before saving.',
  'raceEntries.savedOpportunity': 'Race opportunity saved.',
  'raceEntries.deletedOpportunity': 'Race opportunity deleted.',
  'raceEntries.savedPlan': 'Planned race entry saved.',
  'raceEntries.deletedPlan': 'Planned race entry deleted.',
  'raceEntries.noContactEmail': 'Add a contact email before creating an email draft.',
  'raceEntries.deadlineSoon': 'Race entry deadline soon',
  'raceEntries.deadlineSoonMessage': '{count} race entry deadline(s) are within the next 7 days.',
  'raceEntries.openRaceEntries': 'Open Race Entries',
  'raceEntries.emailSubject': 'Race entry - {racetrack} - {date} - {horse}',
  'raceEntries.emailGreeting': 'Hello,',
  'raceEntries.emailIntro': 'I would like to enter the following horse for this race.',
  'raceEntries.emailClosing': 'Please confirm the entry details. Thank you.',
  'raceEntries.racetracks': 'Racetracks',
  'raceEntries.raceDays': 'Race days',
  'raceEntries.selectRaceDay': 'Select a race day',
  'raceEntries.racesOnThisDay': 'Races on this day',
  'raceEntries.raceCount': '{count} race(s)',
  'raceEntries.showOnlyPossible': 'Show only races with possible matching horses',
  'raceEntries.searchRaces': 'Search races',
  'raceEntries.noRacesForDay': 'No races for this day.',
  'raceEntries.eligibilityDisclaimer': 'Eligibility is a suggestion. Always verify official race conditions.',
  'eligibility.eligible': 'Eligible',
  'eligibility.notEligible': 'Not eligible',
  'eligibility.manualCheck': 'Manual check',
  'eligibility.reasons': 'Eligibility reasons',
  'eligibility.ageMatches': 'Age matches',
  'eligibility.ageMissing': 'Age missing',
  'eligibility.ageTooYoung': 'Age too young',
  'eligibility.ageTooOld': 'Age too old',
  'eligibility.earningsMatch': 'Earnings match',
  'eligibility.earningsMissing': 'Earnings missing',
  'eligibility.earningsTooLow': 'Earnings too low',
  'eligibility.earningsTooHigh': 'Earnings too high',
  'eligibility.genderMatches': 'Gender matches',
  'eligibility.genderMismatch': 'Gender mismatch',
  'eligibility.genderMissing': 'Gender missing',
  'eligibility.categoryMatches': 'Category matches',
  'eligibility.categoryMissing': 'Category missing',
  'eligibility.categoryManual': 'Category needs manual check',
  'raceEntryCloud.savedOpportunity': 'Race opportunity saved to cloud.',
  'raceEntryCloud.deletedOpportunity': 'Race opportunity deleted from cloud.',
  'raceEntryCloud.savedPlan': 'Planned entry saved to cloud.',
  'raceEntryCloud.deletedPlan': 'Planned entry deleted from cloud.',
  'raceEntryCloud.saveFailed': 'Race entry save failed: {error}',
  'raceEntryCloud.deleteFailed': 'Race entry delete failed: {error}',
  'raceEntryCloud.permissionBlocked': 'Race entries are blocked by database permissions.',
  'delete.raceOpportunity': 'this race opportunity',
  'delete.racePlan': 'this planned race entry',
  'racePrograms.adminTitle': 'Global race programs',
  'racePrograms.adminHelp': 'Super Admin creates and publishes race programs for every stable.',
  'racePrograms.manageTitle': 'Manage race programs',
  'racePrograms.title': 'Program title',
  'racePrograms.month': 'Program month',
  'racePrograms.status': 'Status',
  'racePrograms.statusDraft': 'Draft',
  'racePrograms.statusPublished': 'Published',
  'racePrograms.statusArchived': 'Archived',
  'racePrograms.draftPrograms': 'Draft programs',
  'racePrograms.publishedPrograms': 'Published programs',
  'racePrograms.archivedPrograms': 'Archived programs',
  'racePrograms.saveProgram': 'Save race program',
  'racePrograms.publishedTitle': 'Published race programs',
  'racePrograms.publishedHelp': 'Choose suitable published races and create stable-specific entry plans.',
  'racePrograms.program': 'Race program',
  'racePrograms.importToProgram': 'Import race file to this program',
  'racePrograms.saveImportedToProgram': 'Save selected races to this program',
  'racePrograms.racesInProgram': 'Races in program',
  'racePrograms.createFirst': 'Create a race program first, then import a race file.',
  'racePrograms.selectedImportProgram': 'Import target: {program}',
  'racePrograms.publish': 'Publish',
  'racePrograms.archive': 'Archive',
  'racePrograms.saved': 'Race program saved.',
  'racePrograms.published': 'Race program published.',
  'racePrograms.archived': 'Race program archived.',
  'racePrograms.noPrograms': 'No published race programs yet.',
  'racePrograms.cloudRequired': 'Published race programs require cloud connection.',
  'racePrograms.possibleMatches': 'Possible matching horses',
  'racePrograms.manualCheck': 'Manual check',
  'racePrograms.disclaimer': 'Eligibility is a suggestion. Always verify official race conditions before entering.',
  'racePrograms.createPlan': 'Create entry plan',
  'racePrograms.globalSaveFailed': 'Race program save failed: {error}',
  'racePrograms.noProgramSelected': 'Select a race program before saving imported races.',
  'racingRegistry.title': 'Racing Horse Registry',
  'racingRegistry.help': 'Super Admin maintains shared racing data for eligibility checks.',
  'racingRegistry.add': 'Add racing horse',
  'racingRegistry.edit': 'Edit racing horse',
  'racingRegistry.search': 'Search racing horses',
  'racingRegistry.registration': 'Registration number',
  'racingRegistry.horseName': 'Horse name',
  'racingRegistry.birthYear': 'Birth year',
  'racingRegistry.totalEarnings': 'Total earnings',
  'racingRegistry.last5Earnings': 'Last 5 starts earnings',
  'racingRegistry.lastResultsUpdate': 'Last results update',
  'racingRegistry.linkedTitle': 'Linked racing horse',
  'racingRegistry.linkHorse': 'Link racing horse',
  'racingRegistry.unlinkHorse': 'Unlink racing horse',
  'racingRegistry.save': 'Save racing horse',
  'racingRegistry.saved': 'Racing horse saved.',
  'racingRegistry.empty': 'No racing horses in the registry yet.',
  'racingRegistry.resultsPlaceholder': 'Results PDF import will be added later.',
  'racingRegistry.noLinked': 'No linked racing horse',
  'racingRegistry.linkedData': 'Linked racing data',
  'racingRegistry.saveFailed': 'Racing horse save failed: {error}',
  'racingRegistry.performanceSummary': 'Performance summary',
  'racingRegistry.age': 'Age',
  'racingRegistry.startHistory': 'Start history',
  'racingRegistry.career': 'Career',
  'racingRegistry.last12Months': 'Last 12 months',
  'racingRegistry.currentYear': 'Current year',
  'racingRegistry.last2Months': 'Last 2 months',
  'racingRegistry.starts': 'Starts',
  'racingRegistry.wins': 'Wins',
  'racingRegistry.places': 'Places',
  'racingRegistry.show': 'Show',
  'racingRegistry.earnings': 'Earnings',
  'racingRegistry.records': 'Records',
  'racingRegistry.careerRecord': 'Career record',
  'racingRegistry.twelveMonthRecord': '12 month record',
  'racingRegistry.yearRecord': 'Year record',
  'racingRegistry.shortDistanceRecord': 'Short distance record',
  'racingRegistry.longDistanceRecord': 'Long distance record',
  'racingRegistry.categories': 'Categories',
  'racingRegistry.categoryMc': 'Categoria MC',
  'racingRegistry.categoryMs': 'Categoria MS',
  'racingRegistry.potentialMc': 'Potenziale MC',
  'racingRegistry.potentialMs': 'Potenziale MS',
  'racingRegistry.reclaimAllowed': 'Reclaim allowed',
  'racingRegistry.summaryManualNote': 'Summary values are maintained by Super Admin for now.',
  'racingRegistry.resultsImportFuture': 'Results import will be added later to update earnings and start history from result files.',
  'racingRegistry.importResultsPdf': 'Import results PDF',
  'racingRegistry.resultsImportHelp': 'Upload user-provided Italian results PDFs and review rows before saving.',
  'racingRegistry.resultsImportReady': 'Upload a results PDF to review imported starts.',
  'racingRegistry.readingResultsPdf': 'Reading results PDF...',
  'racingRegistry.resultsFound': 'Results found: {count}',
  'racingRegistry.reviewResults': 'Review imported results',
  'racingRegistry.saveResults': 'Save selected results',
  'racingRegistry.noResultsFound': 'No results found in this file.',
  'racingRegistry.resultsPdfReadFailed': 'Could not read this results PDF.',
  'racingRegistry.noRegistryMatch': 'No registry match',
  'racingRegistry.createRacingHorse': 'Create racing horse',
  'racingRegistry.matchExistingHorse': 'Match existing horse',
  'racingRegistry.skipRow': 'Skip row',
  'racingRegistry.updateEarnings': 'Update horse earnings from gross prize',
  'racingRegistry.duplicateResult': 'Duplicate result detected. This row will update the existing start and will not add earnings again.',
  'racingRegistry.resultsImportSaved': 'Results import saved: {count} row(s), {duplicates} duplicate(s), {skipped} skipped.',
  'racingRegistry.resultsImportSaveFailed': 'Results import failed: {error}',
  'racingRegistry.racetrackCode': 'Racetrack code',
  'racingRegistry.raceCode': 'Race code',
  'racingRegistry.raceAndTrack': 'Race / racetrack',
  'racingRegistry.driver': 'Driver',
  'racingRegistry.placement': 'Placement',
  'racingRegistry.kmTime': 'Km time',
  'racingRegistry.distance': 'Distance',
  'racingRegistry.starters': 'Starters',
  'racingRegistry.shoeing': 'Shoeing',
  'racingRegistry.netPrize': 'Net prize',
  'racingRegistry.grossPrize': 'Gross prize',
  'racingRegistry.videoUrl': 'Video URL',
  'racingRegistry.addStart': 'Add start',
  'racingRegistry.editStart': 'Edit start',
  'racingRegistry.deleteStart': 'Delete start',
  'racingRegistry.startSaved': 'Start saved.',
  'racingRegistry.startDeleted': 'Start deleted.',
  'racingRegistry.startSaveFailed': 'Start history save failed: {error}',
  'racingRegistry.noStarts': 'No starts recorded yet.',
  'racingRegistry.noPerformanceSummary': 'No performance summary entered yet.',
  'racingRegistry.recalculateSummary': 'Recalculate summary',
  'racingRegistry.recalculateHelp': 'Calculates from saved start history.',
  'racingRegistry.summaryRecalculated': 'Summary recalculated from {count} starts.',
  'racingRegistry.noStartsToCalculate': 'No start history to calculate from.',
  'racingRegistry.recalculateAfterImport': 'You can recalculate horse summaries from start history.',
  'raceControl.title': 'Race Control',
  'raceControl.tools': 'Super Admin race tools',
  'raceControl.help': 'Manage central racing horses, results, and published race programs for every stable.',
  'raceControl.addRacingHorse': 'Add racing horse',
  'raceControl.importResults': 'Import results PDF',
  'raceControl.addProgram': 'Add race program',
  'raceControl.importProgram': 'Import race program PDF',
  'raceControl.managePublished': 'Manage published races',
  'raceControl.previewStable': 'Preview stable user view',
  'raceControl.hideStablePreview': 'Hide stable user preview',
  'raceControl.registryCount': 'Racing horses in registry',
  'raceControl.draftPrograms': 'Draft race programs',
  'raceControl.publishedPrograms': 'Published race programs',
  'raceControl.importedStarts': 'Imported result rows / starts',
  'raceControl.upcomingRaceDays': 'Upcoming race days',
  'delete.raceProgram': 'this race program',
  'delete.globalRace': 'this global race'
});

Object.assign(translations.fi, {
  'nav.raceEntries': 'Lähdöt',
  'raceEntries.eyebrow': 'Lähtöihin ilmoittaminen',
  'raceEntries.title': 'Suunnittele ilmoittautumiset ja sähköpostit.',
  'raceEntries.subtitle': 'Suunnittele, mitkä hevoset voidaan ilmoittaa tuleviin lähtöihin, ja valmistele sähköpostiluonnokset.',
  'raceEntries.opportunityFormTitle': 'Lisää lähtömahdollisuus',
  'raceEntries.opportunityFormHelp': 'Kirjaa raviradan kuukausittaiset lähtömahdollisuudet käsin. Tiedostotuonti voidaan lisätä myöhemmin.',
  'raceEntries.planFormTitle': 'Suunnittele hevosen ilmoittaminen',
  'raceEntries.planFormHelp': 'Valitse lähtö, hevonen ja valmistele sähköpostiluonnos.',
  'raceEntries.racetrack': 'Ravirata',
  'raceEntries.raceDate': 'Lähtöpäivä',
  'raceEntries.raceNumber': 'Lähdön numero',
  'raceEntries.raceName': 'Lähdön nimi',
  'raceEntries.raceClass': 'Sarja / kategoria',
  'raceEntries.distance': 'Matka',
  'raceEntries.startMethod': 'Lähtötapa',
  'raceEntries.prizeInfo': 'Palkintotiedot',
  'raceEntries.eligibilityNotes': 'Osallistumisehdot',
  'raceEntries.entryDeadline': 'Ilmoittautumisen määräaika',
  'raceEntries.contactEmail': 'Raviradan/yhteyshenkilön sähköposti',
  'raceEntries.opportunity': 'Lähtömahdollisuus',
  'raceEntries.horse': 'Hevonen',
  'raceEntries.stable': 'Talli',
  'raceEntries.driver': 'Ohjastaja',
  'raceEntries.trainer': 'Valmentaja / yhteyshenkilö',
  'raceEntries.status': 'Tila',
  'raceEntries.statusDraft': 'Luonnos',
  'raceEntries.statusReady': 'Valmis',
  'raceEntries.statusSent': 'Lähetetty käsin',
  'raceEntries.saveOpportunity': 'Tallenna lähtö',
  'raceEntries.savePlan': 'Tallenna suunniteltu ilmoittautuminen',
  'raceEntries.opportunitiesTitle': 'Lähtömahdollisuudet',
  'raceEntries.opportunitiesHelp': 'Seuraa tulevia lähtöjä, suunniteltuja hevosia ja sähköpostiluonnoksia.',
  'raceEntries.empty': 'Lähtömahdollisuuksia ei ole vielä.',
  'raceEntries.noPlans': 'Tähän lähtöön ei ole vielä suunniteltu hevosia.',
  'raceEntries.createDraft': 'Luo sähköpostiluonnos',
  'raceEntries.mailtoNotice': 'Tämä luo sähköpostiluonnoksen. Tarkista tiedot ennen lähettämistä.',
  'raceEntries.importTitle': 'Tuo lähtötiedosto',
  'raceEntries.importHelp': 'Tuo italialaisia lähtöohjelmien PDF-, CSV- tai tekstitiedostoja tarkistettavaksi luonnokseksi. PDF/Excel-tuonti on paras yritys.',
  'raceEntries.importButton': 'Tuo lähtötiedosto',
  'raceEntries.importPlaceholder': 'Lataa italialainen lähtöohjelman PDF-, CSV- tai tekstitiedosto. Tarkista tuodut lähdöt ennen tallennusta.',
  'raceEntries.importLoaded': 'Lähtötiedosto ladattu. Tarkista teksti ja lisää lähdöt käsin toistaiseksi.',
  'raceEntries.importPdf': 'Tuo PDF',
  'raceEntries.readingPdf': 'Luetaan PDF-tiedostoa...',
  'raceEntries.racesFound': 'Lähtöjä löytyi: {count}',
  'raceEntries.reviewImported': 'Tarkista tuodut lähdöt ennen tallennusta.',
  'raceEntries.saveImported': 'Tallenna valitut lähdöt',
  'raceEntries.removeImported': 'Poista tuonnista',
  'raceEntries.pdfReadFailed': 'PDF-tiedostoa ei voitu lukea. Lisää lähdöt käsin.',
  'raceEntries.noRacesFound': 'Tiedostosta ei löytynyt lähtöjä. Kokeile käsin lisäämistä.',
  'raceEntries.pdfUnavailable': 'PDF-tuonti ei ole käytettävissä. Lisää lähdöt käsin.',
  'raceEntries.importSaved': 'Tuotiin {count} lähtöä.',
  'raceEntries.importSaveFailed': 'Tuotuja lähtöjä ei voitu tallentaa: {error}',
  'raceEntries.importTextLoaded': 'Tekstitiedosto ladattu. Lähtöjä löytyi: {count}. Tarkista ennen tallennusta.',
  'raceEntries.importCsvLoaded': 'CSV-tiedosto ladattu. Lähtöjä löytyi: {count}. Tarkista ennen tallennusta.',
  'raceEntries.savedOpportunity': 'Lähtö tallennettu.',
  'raceEntries.deletedOpportunity': 'Lähtö poistettu.',
  'raceEntries.savedPlan': 'Suunniteltu ilmoittautuminen tallennettu.',
  'raceEntries.deletedPlan': 'Suunniteltu ilmoittautuminen poistettu.',
  'raceEntries.noContactEmail': 'Lisää yhteyssähköposti ennen sähköpostiluonnoksen luomista.',
  'raceEntries.deadlineSoon': 'Ilmoittautumisen määräaika lähestyy',
  'raceEntries.deadlineSoonMessage': '{count} ilmoittautumisen määräaikaa on seuraavan 7 päivän aikana.',
  'raceEntries.openRaceEntries': 'Avaa Lähdöt',
  'raceEntries.emailSubject': 'Ilmoittautuminen - {racetrack} - {date} - {horse}',
  'raceEntries.emailGreeting': 'Hei,',
  'raceEntries.emailIntro': 'Haluaisin ilmoittaa seuraavan hevosen tähän lähtöön.',
  'raceEntries.emailClosing': 'Vahvistattehan ilmoittautumisen tiedot. Kiitos.',
  'raceEntries.racetracks': 'Raviradat',
  'raceEntries.raceDays': 'Lähtöpäivät',
  'raceEntries.selectRaceDay': 'Valitse lähtöpäivä',
  'raceEntries.racesOnThisDay': 'Lähdöt tälle päivälle',
  'raceEntries.raceCount': '{count} lähtöä',
  'raceEntries.showOnlyPossible': 'Näytä vain lähdöt, joihin on mahdollisesti sopivia hevosia',
  'raceEntries.searchRaces': 'Hae lähtöjä',
  'raceEntries.noRacesForDay': 'Tälle päivälle ei ole lähtöjä.',
  'raceEntries.eligibilityDisclaimer': 'Sopivuus on ehdotus. Tarkista aina viralliset lähtöehdot.',
  'eligibility.eligible': 'Sopiva',
  'eligibility.notEligible': 'Ei sopiva',
  'eligibility.manualCheck': 'Tarkista käsin',
  'eligibility.reasons': 'Sopivuuden perusteet',
  'eligibility.ageMatches': 'Ikä sopii',
  'eligibility.ageMissing': 'Ikä puuttuu',
  'eligibility.ageTooYoung': 'Liian nuori',
  'eligibility.ageTooOld': 'Liian vanha',
  'eligibility.earningsMatch': 'Ansiot sopivat',
  'eligibility.earningsMissing': 'Ansiot puuttuvat',
  'eligibility.earningsTooLow': 'Ansiot liian pienet',
  'eligibility.earningsTooHigh': 'Ansiot liian suuret',
  'eligibility.genderMatches': 'Sukupuoli sopii',
  'eligibility.genderMismatch': 'Sukupuoli ei sovi',
  'eligibility.genderMissing': 'Sukupuoli puuttuu',
  'eligibility.categoryMatches': 'Kategoria sopii',
  'eligibility.categoryMissing': 'Kategoria puuttuu',
  'eligibility.categoryManual': 'Kategoria vaatii käsin tarkistuksen',
  'raceEntryCloud.savedOpportunity': 'Lähtö tallennettu pilveen.',
  'raceEntryCloud.deletedOpportunity': 'Lähtö poistettu pilvestä.',
  'raceEntryCloud.savedPlan': 'Suunniteltu ilmoittautuminen tallennettu pilveen.',
  'raceEntryCloud.deletedPlan': 'Suunniteltu ilmoittautuminen poistettu pilvestä.',
  'raceEntryCloud.saveFailed': 'Lähdön tallennus epäonnistui: {error}',
  'raceEntryCloud.deleteFailed': 'Lähdön poisto epäonnistui: {error}',
  'raceEntryCloud.permissionBlocked': 'Tietokannan oikeudet estävät lähtöjen käytön.',
  'delete.raceOpportunity': 'tämä lähtö',
  'delete.racePlan': 'tämä suunniteltu ilmoittautuminen',
  'racePrograms.adminTitle': 'Yhteiset lähtöohjelmat',
  'racePrograms.adminHelp': 'Super Admin luo ja julkaisee lähtöohjelmat kaikille talleille.',
  'racePrograms.manageTitle': 'Hallitse lähtöohjelmia',
  'racePrograms.title': 'Ohjelman nimi',
  'racePrograms.month': 'Ohjelman kuukausi',
  'racePrograms.status': 'Tila',
  'racePrograms.statusDraft': 'Luonnos',
  'racePrograms.statusPublished': 'Julkaistu',
  'racePrograms.statusArchived': 'Arkistoitu',
  'racePrograms.draftPrograms': 'Luonnosohjelmat',
  'racePrograms.publishedPrograms': 'Julkaistut ohjelmat',
  'racePrograms.archivedPrograms': 'Arkistoidut ohjelmat',
  'racePrograms.saveProgram': 'Tallenna lähtöohjelma',
  'racePrograms.publishedTitle': 'Julkaistut lähtöohjelmat',
  'racePrograms.publishedHelp': 'Valitse sopivat julkaistut lähdöt ja luo tallikohtaiset ilmoittautumissuunnitelmat.',
  'racePrograms.program': 'Lähtöohjelma',
  'racePrograms.importToProgram': 'Tuo lähtötiedosto tähän ohjelmaan',
  'racePrograms.saveImportedToProgram': 'Tallenna valitut lähdöt tähän ohjelmaan',
  'racePrograms.racesInProgram': 'Lähtöjä ohjelmassa',
  'racePrograms.createFirst': 'Luo ensin raviohjelma ja tuo sitten lähtötiedosto.',
  'racePrograms.selectedImportProgram': 'Tuonnin kohde: {program}',
  'racePrograms.publish': 'Julkaise',
  'racePrograms.archive': 'Arkistoi',
  'racePrograms.saved': 'Lähtöohjelma tallennettu.',
  'racePrograms.published': 'Lähtöohjelma julkaistu.',
  'racePrograms.archived': 'Lähtöohjelma arkistoitu.',
  'racePrograms.noPrograms': 'Julkaistuja lähtöohjelmia ei ole vielä.',
  'racePrograms.cloudRequired': 'Julkaistut lähtöohjelmat vaativat pilviyhteyden.',
  'racePrograms.possibleMatches': 'Mahdollisesti sopivat hevoset',
  'racePrograms.manualCheck': 'Tarkista käsin',
  'racePrograms.disclaimer': 'Sopivuus on ehdotus. Tarkista aina viralliset lähtöehdot ennen ilmoittamista.',
  'racePrograms.createPlan': 'Luo ilmoittautumissuunnitelma',
  'racePrograms.globalSaveFailed': 'Lähtöohjelman tallennus epäonnistui: {error}',
  'racePrograms.noProgramSelected': 'Valitse lähtöohjelma ennen tuotujen lähtöjen tallennusta.',
  'racingRegistry.title': 'Kilpahevosrekisteri',
  'racingRegistry.help': 'Super Admin ylläpitää yhteisiä kilpailutietoja sopivuusarvioita varten.',
  'racingRegistry.add': 'Lisää kilpahevonen',
  'racingRegistry.edit': 'Muokkaa kilpahevosta',
  'racingRegistry.search': 'Hae kilpahevosia',
  'racingRegistry.registration': 'Rekisterinumero',
  'racingRegistry.horseName': 'Hevosen nimi',
  'racingRegistry.birthYear': 'Syntymävuosi',
  'racingRegistry.totalEarnings': 'Kokonaisansiot',
  'racingRegistry.last5Earnings': 'Ansiot viimeisissä 5 lähdössä',
  'racingRegistry.lastResultsUpdate': 'Tulosten viimeisin päivitys',
  'racingRegistry.linkedTitle': 'Linkitetty kilpahevonen',
  'racingRegistry.linkHorse': 'Linkitä kilpahevonen',
  'racingRegistry.unlinkHorse': 'Poista kilpahevoslinkki',
  'racingRegistry.save': 'Tallenna kilpahevonen',
  'racingRegistry.saved': 'Kilpahevonen tallennettu.',
  'racingRegistry.empty': 'Rekisterissä ei ole vielä kilpahevosia.',
  'racingRegistry.resultsPlaceholder': 'Tulosten PDF-tuonti lisätään myöhemmin.',
  'racingRegistry.noLinked': 'Ei linkitettyä kilpahevosta',
  'racingRegistry.linkedData': 'Linkitetyt kilpailutiedot',
  'racingRegistry.saveFailed': 'Kilpahevosen tallennus epäonnistui: {error}',
  'racingRegistry.performanceSummary': 'Suoritusyhteenveto',
  'racingRegistry.age': 'Ikä',
  'racingRegistry.startHistory': 'Lähtöhistoria',
  'racingRegistry.career': 'Ura',
  'racingRegistry.last12Months': 'Viimeiset 12 kk',
  'racingRegistry.currentYear': 'Kuluva vuosi',
  'racingRegistry.last2Months': 'Viimeiset 2 kk',
  'racingRegistry.starts': 'Lähdöt',
  'racingRegistry.wins': 'Voitot',
  'racingRegistry.places': 'Sijat',
  'racingRegistry.show': 'Kolmannet',
  'racingRegistry.earnings': 'Ansiot',
  'racingRegistry.records': 'Ennätykset',
  'racingRegistry.careerRecord': 'Uraennätys',
  'racingRegistry.twelveMonthRecord': '12 kk ennätys',
  'racingRegistry.yearRecord': 'Vuoden ennätys',
  'racingRegistry.shortDistanceRecord': 'Lyhyen matkan ennätys',
  'racingRegistry.longDistanceRecord': 'Pitkän matkan ennätys',
  'racingRegistry.categories': 'Kategoriat',
  'racingRegistry.categoryMc': 'Categoria MC',
  'racingRegistry.categoryMs': 'Categoria MS',
  'racingRegistry.potentialMc': 'Potenziale MC',
  'racingRegistry.potentialMs': 'Potenziale MS',
  'racingRegistry.reclaimAllowed': 'Myyntilähtö sallittu',
  'racingRegistry.summaryManualNote': 'Super Admin ylläpitää yhteenvetotietoja toistaiseksi käsin.',
  'racingRegistry.resultsImportFuture': 'Tulostuonti lisätään myöhemmin ansioiden ja lähtöhistorian päivittämiseen.',
  'racingRegistry.importResultsPdf': 'Tuo tulos-PDF',
  'racingRegistry.resultsImportHelp': 'Lataa käyttäjän toimittama italialainen tulos-PDF ja tarkista rivit ennen tallennusta.',
  'racingRegistry.resultsImportReady': 'Lataa tulos-PDF lähtöjen tarkistusta varten.',
  'racingRegistry.readingResultsPdf': 'Luetaan tulos-PDF:ää...',
  'racingRegistry.resultsFound': 'Tuloksia löytyi: {count}',
  'racingRegistry.reviewResults': 'Tarkista tuodut tulokset',
  'racingRegistry.saveResults': 'Tallenna valitut tulokset',
  'racingRegistry.noResultsFound': 'Tästä tiedostosta ei löytynyt tuloksia.',
  'racingRegistry.resultsPdfReadFailed': 'Tulos-PDF:ää ei voitu lukea.',
  'racingRegistry.noRegistryMatch': 'Ei rekisteriosumaa',
  'racingRegistry.createRacingHorse': 'Luo kilpahevonen',
  'racingRegistry.matchExistingHorse': 'Yhdistä olemassa olevaan hevoseen',
  'racingRegistry.skipRow': 'Ohita rivi',
  'racingRegistry.updateEarnings': 'Päivitä hevosen ansiot bruttopalkinnosta',
  'racingRegistry.duplicateResult': 'Kaksoistulos havaittu. Tämä rivi päivittää olemassa olevan lähdön eikä lisää ansioita uudelleen.',
  'racingRegistry.resultsImportSaved': 'Tulosimportti tallennettu: {count} riviä, {duplicates} kaksoiskappaletta, {skipped} ohitettu.',
  'racingRegistry.resultsImportSaveFailed': 'Tulosimportti epäonnistui: {error}',
  'racingRegistry.racetrackCode': 'Raviradan koodi',
  'racingRegistry.raceCode': 'Lähdön koodi',
  'racingRegistry.raceAndTrack': 'Lähtö / ravirata',
  'racingRegistry.driver': 'Ohjastaja',
  'racingRegistry.placement': 'Sijoitus',
  'racingRegistry.kmTime': 'Km-aika',
  'racingRegistry.distance': 'Matka',
  'racingRegistry.starters': 'Lähtijät',
  'racingRegistry.shoeing': 'Kengitys',
  'racingRegistry.netPrize': 'Nettoansiot',
  'racingRegistry.grossPrize': 'Bruttoansiot',
  'racingRegistry.videoUrl': 'Videolinkki',
  'racingRegistry.addStart': 'Lisää lähtö',
  'racingRegistry.editStart': 'Muokkaa lähtöä',
  'racingRegistry.deleteStart': 'Poista lähtö',
  'racingRegistry.startSaved': 'Lähtö tallennettu.',
  'racingRegistry.startDeleted': 'Lähtö poistettu.',
  'racingRegistry.startSaveFailed': 'Lähtöhistorian tallennus epäonnistui: {error}',
  'racingRegistry.noStarts': 'Lähtöjä ei ole vielä tallennettu.',
  'racingRegistry.noPerformanceSummary': 'Suoritusyhteenvetoa ei ole vielä täytetty.',
  'racingRegistry.recalculateSummary': 'Laske yhteenveto uudelleen',
  'racingRegistry.recalculateHelp': 'Lasketaan tallennetusta lähtöhistoriasta.',
  'racingRegistry.summaryRecalculated': 'Yhteenveto laskettu uudelleen {count} lähdöstä.',
  'racingRegistry.noStartsToCalculate': 'Ei lähtöhistoriaa laskentaa varten.',
  'racingRegistry.recalculateAfterImport': 'Voit laskea hevosten yhteenvedot uudelleen lähtöhistoriasta.',
  'raceControl.title': 'Ravien hallinta',
  'raceControl.tools': 'Super Adminin ravityökalut',
  'raceControl.help': 'Hallinnoi keskitettyjä kilpahevosia, tuloksia ja julkaistuja raviohjelmia kaikille talleille.',
  'raceControl.addRacingHorse': 'Lisää kilpahevonen',
  'raceControl.importResults': 'Lisää tulokset',
  'raceControl.addProgram': 'Lisää raviohjelma',
  'raceControl.importProgram': 'Tuo raviohjelman PDF',
  'raceControl.managePublished': 'Hallinnoi julkaistuja lähtöjä',
  'raceControl.previewStable': 'Esikatsele tallikäyttäjän näkymää',
  'raceControl.hideStablePreview': 'Piilota tallikäyttäjän esikatselu',
  'raceControl.registryCount': 'Kilpahevosia rekisterissä',
  'raceControl.draftPrograms': 'Luonnosraviohjelmat',
  'raceControl.publishedPrograms': 'Julkaistut raviohjelmat',
  'raceControl.importedStarts': 'Tuodut tulosrivit / lähdöt',
  'raceControl.upcomingRaceDays': 'Tulevat lähtöpäivät',
  'delete.raceProgram': 'tämä lähtöohjelma',
  'delete.globalRace': 'tämä yhteinen lähtö'
});

Object.assign(translations.it, {
  'nav.raceEntries': 'Iscrizioni',
  'raceEntries.eyebrow': 'Pianificazione iscrizioni gara',
  'raceEntries.title': 'Pianifica iscrizioni e prepara email.',
  'raceEntries.subtitle': 'Pianifica quali cavalli iscrivere alle prossime gare e prepara bozze email.',
  'raceEntries.opportunityFormTitle': 'Aggiungi opportunità gara',
  'raceEntries.opportunityFormHelp': 'Inserisci manualmente le opportunità mensili degli ippodromi. L’importazione file arriverà più avanti.',
  'raceEntries.planFormTitle': 'Pianifica iscrizione cavallo',
  'raceEntries.planFormHelp': 'Seleziona una gara, scegli un cavallo e prepara una bozza email.',
  'raceEntries.racetrack': 'Ippodromo',
  'raceEntries.raceDate': 'Data gara',
  'raceEntries.raceNumber': 'Numero gara',
  'raceEntries.raceName': 'Nome gara',
  'raceEntries.raceClass': 'Classe / categoria',
  'raceEntries.distance': 'Distanza',
  'raceEntries.startMethod': 'Metodo di partenza',
  'raceEntries.prizeInfo': 'Premi',
  'raceEntries.eligibilityNotes': 'Note requisiti',
  'raceEntries.entryDeadline': 'Scadenza iscrizione',
  'raceEntries.contactEmail': 'Email ippodromo/contatto',
  'raceEntries.opportunity': 'Opportunità gara',
  'raceEntries.horse': 'Cavallo',
  'raceEntries.stable': 'Scuderia',
  'raceEntries.driver': 'Driver',
  'raceEntries.trainer': 'Allenatore / referente',
  'raceEntries.status': 'Stato',
  'raceEntries.statusDraft': 'Bozza',
  'raceEntries.statusReady': 'Pronta',
  'raceEntries.statusSent': 'Inviata manualmente',
  'raceEntries.saveOpportunity': 'Salva opportunità gara',
  'raceEntries.savePlan': 'Salva iscrizione pianificata',
  'raceEntries.opportunitiesTitle': 'Opportunità gara',
  'raceEntries.opportunitiesHelp': 'Tieni traccia delle gare future, dei cavalli pianificati e delle bozze email.',
  'raceEntries.empty': 'Nessuna opportunità gara.',
  'raceEntries.noPlans': 'Nessun cavallo pianificato per questa gara.',
  'raceEntries.createDraft': 'Crea bozza email',
  'raceEntries.mailtoNotice': 'Questo crea una bozza email. Controlla i dati prima di inviarla.',
  'raceEntries.importTitle': 'Importa file gare',
  'raceEntries.importHelp': 'Importa PDF, CSV o testi di programmi gara italiani come bozza da rivedere. L’importazione PDF/Excel è indicativa.',
  'raceEntries.importButton': 'Importa file gare',
  'raceEntries.importPlaceholder': 'Carica un PDF, CSV o file di testo di un programma gara italiano. Rivedi le gare importate prima di salvarle.',
  'raceEntries.importLoaded': 'File gara caricato. Rivedi il testo e aggiungi manualmente le opportunità per ora.',
  'raceEntries.importPdf': 'Importa PDF',
  'raceEntries.readingPdf': 'Lettura PDF...',
  'raceEntries.racesFound': 'Gare trovate: {count}',
  'raceEntries.reviewImported': 'Rivedi le gare importate prima di salvarle.',
  'raceEntries.saveImported': 'Salva gare selezionate',
  'raceEntries.removeImported': 'Rimuovi dall’importazione',
  'raceEntries.pdfReadFailed': 'Impossibile leggere questo PDF. Usa l’inserimento manuale.',
  'raceEntries.noRacesFound': 'Nessuna gara trovata in questo file. Prova l’inserimento manuale.',
  'raceEntries.pdfUnavailable': 'Importazione PDF non disponibile. Inserisci le gare manualmente.',
  'raceEntries.importSaved': 'Importate {count} opportunità gara.',
  'raceEntries.importSaveFailed': 'Impossibile salvare le gare importate: {error}',
  'raceEntries.importTextLoaded': 'File di testo caricato. Gare trovate: {count}. Rivedi prima di salvare.',
  'raceEntries.importCsvLoaded': 'File CSV caricato. Gare trovate: {count}. Rivedi prima di salvare.',
  'raceEntries.savedOpportunity': 'Opportunità gara salvata.',
  'raceEntries.deletedOpportunity': 'Opportunità gara eliminata.',
  'raceEntries.savedPlan': 'Iscrizione pianificata salvata.',
  'raceEntries.deletedPlan': 'Iscrizione pianificata eliminata.',
  'raceEntries.noContactEmail': 'Aggiungi un’email di contatto prima di creare una bozza.',
  'raceEntries.deadlineSoon': 'Scadenza iscrizione vicina',
  'raceEntries.deadlineSoonMessage': '{count} scadenza/e iscrizione sono nei prossimi 7 giorni.',
  'raceEntries.openRaceEntries': 'Apri Iscrizioni',
  'raceEntries.emailSubject': 'Iscrizione gara - {racetrack} - {date} - {horse}',
  'raceEntries.emailGreeting': 'Ciao,',
  'raceEntries.emailIntro': 'Vorrei iscrivere il seguente cavallo a questa gara.',
  'raceEntries.emailClosing': 'Confermate per favore i dettagli dell’iscrizione. Grazie.',
  'raceEntries.racetracks': 'Ippodromi',
  'raceEntries.raceDays': 'Giorni di gara',
  'raceEntries.selectRaceDay': 'Seleziona un giorno di gara',
  'raceEntries.racesOnThisDay': 'Gare di questo giorno',
  'raceEntries.raceCount': '{count} gara/e',
  'raceEntries.showOnlyPossible': 'Mostra solo gare con cavalli potenzialmente compatibili',
  'raceEntries.searchRaces': 'Cerca gare',
  'raceEntries.noRacesForDay': 'Nessuna gara per questo giorno.',
  'raceEntries.eligibilityDisclaimer': 'L’idoneità è un suggerimento. Verifica sempre le condizioni ufficiali.',
  'eligibility.eligible': 'Idoneo',
  'eligibility.notEligible': 'Non idoneo',
  'eligibility.manualCheck': 'Controllo manuale',
  'eligibility.reasons': 'Motivi idoneità',
  'eligibility.ageMatches': 'Età compatibile',
  'eligibility.ageMissing': 'Età mancante',
  'eligibility.ageTooYoung': 'Troppo giovane',
  'eligibility.ageTooOld': 'Troppo anziano',
  'eligibility.earningsMatch': 'Vincite compatibili',
  'eligibility.earningsMissing': 'Vincite mancanti',
  'eligibility.earningsTooLow': 'Vincite troppo basse',
  'eligibility.earningsTooHigh': 'Vincite troppo alte',
  'eligibility.genderMatches': 'Sesso compatibile',
  'eligibility.genderMismatch': 'Sesso non compatibile',
  'eligibility.genderMissing': 'Sesso mancante',
  'eligibility.categoryMatches': 'Categoria compatibile',
  'eligibility.categoryMissing': 'Categoria mancante',
  'eligibility.categoryManual': 'Categoria da controllare manualmente',
  'raceEntryCloud.savedOpportunity': 'Opportunità gara salvata nel cloud.',
  'raceEntryCloud.deletedOpportunity': 'Opportunità gara eliminata dal cloud.',
  'raceEntryCloud.savedPlan': 'Iscrizione pianificata salvata nel cloud.',
  'raceEntryCloud.deletedPlan': 'Iscrizione pianificata eliminata dal cloud.',
  'raceEntryCloud.saveFailed': 'Salvataggio iscrizione non riuscito: {error}',
  'raceEntryCloud.deleteFailed': 'Eliminazione iscrizione non riuscita: {error}',
  'raceEntryCloud.permissionBlocked': 'Le iscrizioni sono bloccate dai permessi del database.',
  'delete.raceOpportunity': 'questa opportunità gara',
  'delete.racePlan': 'questa iscrizione pianificata',
  'racePrograms.adminTitle': 'Programmi gara globali',
  'racePrograms.adminHelp': 'Il Super Admin crea e pubblica programmi gara per tutte le scuderie.',
  'racePrograms.manageTitle': 'Gestisci programmi gara',
  'racePrograms.title': 'Titolo programma',
  'racePrograms.month': 'Mese programma',
  'racePrograms.status': 'Stato',
  'racePrograms.statusDraft': 'Bozza',
  'racePrograms.statusPublished': 'Pubblicato',
  'racePrograms.statusArchived': 'Archiviato',
  'racePrograms.draftPrograms': 'Programmi in bozza',
  'racePrograms.publishedPrograms': 'Programmi pubblicati',
  'racePrograms.archivedPrograms': 'Programmi archiviati',
  'racePrograms.saveProgram': 'Salva programma gara',
  'racePrograms.publishedTitle': 'Programmi gara pubblicati',
  'racePrograms.publishedHelp': 'Scegli le gare pubblicate adatte e crea piani di iscrizione per la tua scuderia.',
  'racePrograms.program': 'Programma gara',
  'racePrograms.importToProgram': 'Importa file gare in questo programma',
  'racePrograms.saveImportedToProgram': 'Salva gare selezionate in questo programma',
  'racePrograms.racesInProgram': 'Gare nel programma',
  'racePrograms.createFirst': 'Crea prima un programma gare, poi importa un file.',
  'racePrograms.selectedImportProgram': 'Destinazione importazione: {program}',
  'racePrograms.publish': 'Pubblica',
  'racePrograms.archive': 'Archivia',
  'racePrograms.saved': 'Programma gara salvato.',
  'racePrograms.published': 'Programma gara pubblicato.',
  'racePrograms.archived': 'Programma gara archiviato.',
  'racePrograms.noPrograms': 'Nessun programma gara pubblicato.',
  'racePrograms.cloudRequired': 'I programmi gara pubblicati richiedono la connessione cloud.',
  'racePrograms.possibleMatches': 'Cavalli potenzialmente compatibili',
  'racePrograms.manualCheck': 'Controllo manuale',
  'racePrograms.disclaimer': 'L’idoneità è un suggerimento. Verifica sempre le condizioni ufficiali prima dell’iscrizione.',
  'racePrograms.createPlan': 'Crea piano iscrizione',
  'racePrograms.globalSaveFailed': 'Salvataggio programma gara non riuscito: {error}',
  'racePrograms.noProgramSelected': 'Seleziona un programma gara prima di salvare le gare importate.',
  'racingRegistry.title': 'Registro cavalli da corsa',
  'racingRegistry.help': 'Il Super Admin mantiene dati corsa condivisi per le verifiche di idoneità.',
  'racingRegistry.add': 'Aggiungi cavallo da corsa',
  'racingRegistry.edit': 'Modifica cavallo da corsa',
  'racingRegistry.search': 'Cerca cavalli da corsa',
  'racingRegistry.registration': 'Numero registrazione',
  'racingRegistry.horseName': 'Nome cavallo',
  'racingRegistry.birthYear': 'Anno di nascita',
  'racingRegistry.totalEarnings': 'Vincite totali',
  'racingRegistry.last5Earnings': 'Vincite ultime 5 corse',
  'racingRegistry.lastResultsUpdate': 'Ultimo aggiornamento risultati',
  'racingRegistry.linkedTitle': 'Cavallo da corsa collegato',
  'racingRegistry.linkHorse': 'Collega cavallo da corsa',
  'racingRegistry.unlinkHorse': 'Scollega cavallo da corsa',
  'racingRegistry.save': 'Salva cavallo da corsa',
  'racingRegistry.saved': 'Cavallo da corsa salvato.',
  'racingRegistry.empty': 'Nessun cavallo nel registro.',
  'racingRegistry.resultsPlaceholder': 'Importazione PDF risultati sarà aggiunta più avanti.',
  'racingRegistry.noLinked': 'Nessun cavallo da corsa collegato',
  'racingRegistry.linkedData': 'Dati corsa collegati',
  'racingRegistry.saveFailed': 'Salvataggio cavallo da corsa non riuscito: {error}',
  'racingRegistry.performanceSummary': 'Riepilogo prestazioni',
  'racingRegistry.age': 'Età',
  'racingRegistry.startHistory': 'Storico partenze',
  'racingRegistry.career': 'Carriera',
  'racingRegistry.last12Months': 'Ultimi 12 mesi',
  'racingRegistry.currentYear': 'Anno corrente',
  'racingRegistry.last2Months': 'Ultimi 2 mesi',
  'racingRegistry.starts': 'Partenze',
  'racingRegistry.wins': 'Vittorie',
  'racingRegistry.places': 'Piazzamenti',
  'racingRegistry.show': 'Terzi',
  'racingRegistry.earnings': 'Vincite',
  'racingRegistry.records': 'Record',
  'racingRegistry.careerRecord': 'Record carriera',
  'racingRegistry.twelveMonthRecord': 'Record 12 mesi',
  'racingRegistry.yearRecord': 'Record anno',
  'racingRegistry.shortDistanceRecord': 'Record breve distanza',
  'racingRegistry.longDistanceRecord': 'Record lunga distanza',
  'racingRegistry.categories': 'Categorie',
  'racingRegistry.categoryMc': 'Categoria MC',
  'racingRegistry.categoryMs': 'Categoria MS',
  'racingRegistry.potentialMc': 'Potenziale MC',
  'racingRegistry.potentialMs': 'Potenziale MS',
  'racingRegistry.reclaimAllowed': 'Reclamare consentito',
  'racingRegistry.summaryManualNote': 'I valori riepilogativi sono mantenuti dal Super Admin per ora.',
  'racingRegistry.resultsImportFuture': 'Importazione risultati sarà aggiunta più avanti per aggiornare vincite e storico partenze.',
  'racingRegistry.importResultsPdf': 'Importa PDF risultati',
  'racingRegistry.resultsImportHelp': 'Carica PDF risultati italiani forniti dall’utente e rivedi le righe prima di salvare.',
  'racingRegistry.resultsImportReady': 'Carica un PDF risultati per rivedere le partenze importate.',
  'racingRegistry.readingResultsPdf': 'Lettura PDF risultati...',
  'racingRegistry.resultsFound': 'Risultati trovati: {count}',
  'racingRegistry.reviewResults': 'Rivedi risultati importati',
  'racingRegistry.saveResults': 'Salva risultati selezionati',
  'racingRegistry.noResultsFound': 'Nessun risultato trovato in questo file.',
  'racingRegistry.resultsPdfReadFailed': 'Impossibile leggere questo PDF risultati.',
  'racingRegistry.noRegistryMatch': 'Nessuna corrispondenza nel registro',
  'racingRegistry.createRacingHorse': 'Crea cavallo da corsa',
  'racingRegistry.matchExistingHorse': 'Abbina cavallo esistente',
  'racingRegistry.skipRow': 'Salta riga',
  'racingRegistry.updateEarnings': 'Aggiorna vincite dal premio lordo',
  'racingRegistry.duplicateResult': 'Risultato duplicato rilevato. Questa riga aggiornerà la partenza esistente senza aggiungere di nuovo le vincite.',
  'racingRegistry.resultsImportSaved': 'Importazione risultati salvata: {count} righe, {duplicates} duplicati, {skipped} saltate.',
  'racingRegistry.resultsImportSaveFailed': 'Importazione risultati non riuscita: {error}',
  'racingRegistry.racetrackCode': 'Codice ippodromo',
  'racingRegistry.raceCode': 'Codice corsa',
  'racingRegistry.raceAndTrack': 'Corsa / ippodromo',
  'racingRegistry.driver': 'Guidatore',
  'racingRegistry.placement': 'Piazzamento',
  'racingRegistry.kmTime': 'Tempo al km',
  'racingRegistry.distance': 'Distanza',
  'racingRegistry.starters': 'Partenti',
  'racingRegistry.shoeing': 'Ferratura',
  'racingRegistry.netPrize': 'Premio netto',
  'racingRegistry.grossPrize': 'Premio lordo',
  'racingRegistry.videoUrl': 'URL video',
  'racingRegistry.addStart': 'Aggiungi partenza',
  'racingRegistry.editStart': 'Modifica partenza',
  'racingRegistry.deleteStart': 'Elimina partenza',
  'racingRegistry.startSaved': 'Partenza salvata.',
  'racingRegistry.startDeleted': 'Partenza eliminata.',
  'racingRegistry.startSaveFailed': 'Salvataggio storico partenze non riuscito: {error}',
  'racingRegistry.noStarts': 'Nessuna partenza registrata.',
  'racingRegistry.noPerformanceSummary': 'Nessun riepilogo prestazioni inserito.',
  'racingRegistry.recalculateSummary': 'Ricalcola riepilogo',
  'racingRegistry.recalculateHelp': 'Calcola dallo storico partenze salvato.',
  'racingRegistry.summaryRecalculated': 'Riepilogo ricalcolato da {count} partenze.',
  'racingRegistry.noStartsToCalculate': 'Nessuno storico partenze da calcolare.',
  'racingRegistry.recalculateAfterImport': 'Puoi ricalcolare i riepiloghi dei cavalli dallo storico partenze.',
  'raceControl.title': 'Controllo corse',
  'raceControl.tools': 'Strumenti corse Super Admin',
  'raceControl.help': 'Gestisci cavalli da corsa centrali, risultati e programmi pubblicati per tutte le scuderie.',
  'raceControl.addRacingHorse': 'Aggiungi cavallo da corsa',
  'raceControl.importResults': 'Importa risultati',
  'raceControl.addProgram': 'Aggiungi programma gare',
  'raceControl.importProgram': 'Importa PDF programma gare',
  'raceControl.managePublished': 'Gestisci corse pubblicate',
  'raceControl.previewStable': 'Anteprima vista scuderia',
  'raceControl.hideStablePreview': 'Nascondi anteprima scuderia',
  'raceControl.registryCount': 'Cavalli nel registro',
  'raceControl.draftPrograms': 'Programmi gare bozza',
  'raceControl.publishedPrograms': 'Programmi gare pubblicati',
  'raceControl.importedStarts': 'Righe risultati / partenze importate',
  'raceControl.upcomingRaceDays': 'Giornate gara future',
  'delete.raceProgram': 'questo programma gara',
  'delete.globalRace': 'questa gara globale'
});

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
  calendarEvents: [],
  careHistory: [],
  raceEntryOpportunities: [],
  raceEntryPlans: []
};

let state = loadData();
let activeView = 'home';
let calendarFilters = { scope: 'all', type: 'all', horse: 'all' };
let calendarCursor = new Date(`${today()}T00:00:00`);
let selectedCalendarDate = today();
let calendarViewMode = 'month';
let turnoutWeather = {
  status: 'loading',
  hasRain: null,
  locationLabel: `${FALLBACK_WEATHER_LOCATION.city}, ${FALLBACK_WEATHER_LOCATION.country}`,
  usingFallback: true
};
let turnoutWeatherLocationKey = '';
let pendingServiceWorker = null;
let supabaseClient = null;
let authUser = null;
let authRestoring = false;
let stableLoading = false;
let cloudDataLoading = false;
let isCloudUploading = false;
let migrationUploadStatusText = '';
let cloudReadStatusText = '';
let cloudReadCounts = null;
let cloudCleanupStatusText = '';
let stableLocationStatusText = '';
let isStableLocationSaving = false;
let isCloudCleaning = false;
let cloudPreviewMode = false;
let cloudWriteMode = false;
let cloudModeStatusText = '';
let cloudLocalOverride = localStorage.getItem(CLOUD_LOCAL_OVERRIDE_KEY) === 'true';
let cloudUnavailable = false;
let horseCloudWriteMode = false;
let horseCloudStatusText = '';
let taskCloudWriteMode = false;
let taskCloudStatusText = '';
let workCloudWriteMode = false;
let workCloudStatusText = '';
let feedCloudWriteMode = false;
let feedCloudStatusText = '';
let calendarCloudWriteMode = false;
let calendarCloudStatusText = '';
let cloudSaveState = 'idle';
let cloudSaveStatusTimer = null;
let raceImportPreviewItems = [];
let racePrograms = [];
let raceProgramRaces = [];
let racingHorses = [];
let racingHorseStarts = [];
let racingHorseSearchTerm = '';
let resultsImportPreviewItems = [];
let raceStablePreviewForAdmin = false;
let selectedPublishedRaceDay = { racetrack: '', date: '' };
let publishedRaceFilter = { possibleOnly: false, search: '' };
let publishedRaceFilterTimer = null;
const cloudMutationLocks = new Set();
let cloudState = {
  status: 'notConnected',
  email: '',
  stableId: '',
  stableName: '',
  locationCity: '',
  locationCountry: '',
  latitude: null,
  longitude: null,
  membershipRole: '',
  profileRole: '',
  canManageUsers: false,
  canEditCalendar: false,
  canEditHorses: false,
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
  homeAuthCta: document.querySelector('#homeAuthCta'),
  homeAccountBadge: document.querySelector('#homeAccountBadge'),
  homeStableBadge: document.querySelector('#homeStableBadge'),
  homeLandingHero: document.querySelector('#homeLandingHero'),
  homeFeatureGrid: document.querySelector('#homeFeatureGrid'),
  homeIconStrip: document.querySelector('#homeIconStrip'),
  homeLandingLower: document.querySelector('#homeLandingLower'),
  homeOverviewSection: document.querySelector('#homeOverviewSection'),
  homeOverviewStable: document.querySelector('#homeOverviewStable'),
  homeOverviewHorses: document.querySelector('#homeOverviewHorses'),
  homeOverviewOpenTasks: document.querySelector('#homeOverviewOpenTasks'),
  homeOverviewTodayTasks: document.querySelector('#homeOverviewTodayTasks'),
  homeOverviewEventsToday: document.querySelector('#homeOverviewEventsToday'),
  homeOverviewEventsWeek: document.querySelector('#homeOverviewEventsWeek'),
  homeOverviewLowFeed: document.querySelector('#homeOverviewLowFeed'),
  homeOverviewHours: document.querySelector('#homeOverviewHours'),
  homeOverviewAlerts: document.querySelector('#homeOverviewAlerts'),
  alertsList: document.querySelector('#alertsList'),
  turnoutWeatherCard: document.querySelector('#turnoutWeatherCard'),
  turnoutWeatherMessage: document.querySelector('#turnoutWeatherMessage'),
  turnoutWeatherLocation: document.querySelector('#turnoutWeatherLocation'),
  homeTipsSection: document.querySelector('#homeTipsSection'),
  dismissHomeTipsButton: document.querySelector('#dismissHomeTipsButton'),
  todayList: document.querySelector('#todayList'),
  horsesList: document.querySelector('#horsesList'),
  tasksList: document.querySelector('#tasksList'),
  hoursList: document.querySelector('#hoursList'),
  inventoryList: document.querySelector('#inventoryList'),
  shoppingList: document.querySelector('#shoppingList'),
  eventsList: document.querySelector('#eventsList'),
  eventsTodayCount: document.querySelector('#eventsTodayCount'),
  eventsWeekCount: document.querySelector('#eventsWeekCount'),
  upcomingRaceCount: document.querySelector('#upcomingRaceCount'),
  scheduledHorseCount: document.querySelector('#scheduledHorseCount'),
  calendarPlannerList: document.querySelector('#calendarPlannerList'),
  calendarStableBadge: document.querySelector('#calendarStableBadge'),
  calendarModeBadge: document.querySelector('#calendarModeBadge'),
  calendarAddEventButton: document.querySelector('#calendarAddEventButton'),
  calendarPrevMonth: document.querySelector('#calendarPrevMonth'),
  calendarNextMonth: document.querySelector('#calendarNextMonth'),
  calendarTodayButton: document.querySelector('#calendarTodayButton'),
  calendarMonthLabel: document.querySelector('#calendarMonthLabel'),
  calendarWeekdays: document.querySelector('#calendarWeekdays'),
  calendarMonthGrid: document.querySelector('#calendarMonthGrid'),
  calendarSelectedDayLabel: document.querySelector('#calendarSelectedDayLabel'),
  calendarSelectedDayAgenda: document.querySelector('#calendarSelectedDayAgenda'),
  calendarAddSelectedDayButton: document.querySelector('#calendarAddSelectedDayButton'),
  calendarListSection: document.querySelector('#calendarListSection'),
  calendarScopeFilter: document.querySelector('#calendarScopeFilter'),
  calendarTypeFilter: document.querySelector('#calendarTypeFilter'),
  calendarHorseFilter: document.querySelector('#calendarHorseFilter'),
  raceEntriesStableBadge: document.querySelector('#raceEntriesStableBadge'),
  raceEntriesModeBadge: document.querySelector('#raceEntriesModeBadge'),
  raceOpportunityForm: document.querySelector('#raceOpportunityForm'),
  racePlanForm: document.querySelector('#racePlanForm'),
  raceOpportunityList: document.querySelector('#raceOpportunityList'),
  raceImportInput: document.querySelector('#raceImportInput'),
  raceImportStatus: document.querySelector('#raceImportStatus'),
  raceImportPreview: document.querySelector('#raceImportPreview'),
  raceImportSaveButton: document.querySelector('#raceImportSaveButton'),
  raceProgramCloudNotice: document.querySelector('#raceProgramCloudNotice'),
  raceProgramAdminPanel: document.querySelector('#raceProgramAdminPanel'),
  raceControlDashboard: document.querySelector('#raceControlDashboard'),
  raceControlSummary: document.querySelector('#raceControlSummary'),
  raceStablePreviewToggle: document.querySelector('#raceStablePreviewToggle'),
  raceProgramForm: document.querySelector('#raceProgramForm'),
  raceProgramAdminList: document.querySelector('#raceProgramAdminList'),
  racingHorseForm: document.querySelector('#racingHorseForm'),
  racingHorseStartForm: document.querySelector('#racingHorseStartForm'),
  racingHorseSearch: document.querySelector('#racingHorseSearch'),
  racingHorseRegistryList: document.querySelector('#racingHorseRegistryList'),
  resultsImportInput: document.querySelector('#resultsImportInput'),
  resultsImportUpdateEarnings: document.querySelector('#resultsImportUpdateEarnings'),
  resultsImportStatus: document.querySelector('#resultsImportStatus'),
  resultsImportPreview: document.querySelector('#resultsImportPreview'),
  resultsImportSaveButton: document.querySelector('#resultsImportSaveButton'),
  raceImportProgramLabel: document.querySelector('#raceImportProgramLabel'),
  raceImportProgramSelect: document.querySelector('#raceImportProgramSelect'),
  publishedRaceProgramList: document.querySelector('#publishedRaceProgramList'),
  raceStablePublishedSection: document.querySelector('#raceStablePublishedSection'),
  raceStableManualSection: document.querySelector('#raceStableManualSection'),
  raceImportPanel: document.querySelector('#raceImportPanel'),
  raceStableOpportunitySection: document.querySelector('#raceStableOpportunitySection'),
  horseForm: document.querySelector('#horseForm'),
  careForm: document.querySelector('#careForm'),
  careHistoryList: document.querySelector('#careHistoryList'),
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
  settingsLogoutButton: document.querySelector('#settingsLogoutButton'),
  loginNavButton: document.querySelector('#loginNavButton'),
  authUserEmail: document.querySelector('#authUserEmail'),
  authSetupNotice: document.querySelector('#authSetupNotice'),
  headerStableName: document.querySelector('#headerStableName'),
  dataModeStatus: document.querySelector('#dataModeStatus'),
  cloudSaveStatus: document.querySelector('#cloudSaveStatus'),
  stableStableBadge: document.querySelector('#stableStableBadge'),
  stableModeBadge: document.querySelector('#stableModeBadge'),
  cloudUserEmail: document.querySelector('#cloudUserEmail'),
  cloudStableName: document.querySelector('#cloudStableName'),
  cloudStableLocation: document.querySelector('#cloudStableLocation'),
  cloudConnectionStatus: document.querySelector('#cloudConnectionStatus'),
  supportPhoneText: document.querySelector('#supportPhoneText'),
  supportEmailText: document.querySelector('#supportEmailText'),
  supportPhoneLink: document.querySelector('#supportPhoneLink'),
  supportEmailLink: document.querySelector('#supportEmailLink'),
  footerSupportLink: document.querySelector('#footerSupportLink'),
  stableLocationSummary: document.querySelector('#stableLocationSummary'),
  stableLocationForm: document.querySelector('#stableLocationForm'),
  stableLocationSaveButton: document.querySelector('#stableLocationSaveButton'),
  stableLocationStatus: document.querySelector('#stableLocationStatus'),
  cloudLocalNotice: document.querySelector('#cloudLocalNotice'),
  adminPlaceholderPanel: document.querySelector('#adminPlaceholderPanel'),
  adminStableSection: document.querySelector('#adminStableSection'),
  adminStableForm: document.querySelector('#adminStableForm'),
  adminCreateStableButton: document.querySelector('#adminCreateStableButton'),
  adminStableStatus: document.querySelector('#adminStableStatus'),
  adminUserForm: document.querySelector('#adminUserForm'),
  adminCreateUserButton: document.querySelector('#adminCreateUserButton'),
  adminUserStatus: document.querySelector('#adminUserStatus'),
  adminAccessStatus: document.querySelector('#adminAccessStatus'),
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
  cloudModeEmail: document.querySelector('#cloudModeEmail'),
  cloudModePreviewButton: document.querySelector('#cloudModePreviewButton'),
  cloudModeLocalButton: document.querySelector('#cloudModeLocalButton'),
  cloudModeReturnButton: document.querySelector('#cloudModeReturnButton'),
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
  feedCloudCurrent: document.querySelector('#feedCloudCurrent'),
  feedCloudStableName: document.querySelector('#feedCloudStableName'),
  feedCloudConfirmInput: document.querySelector('#feedCloudConfirmInput'),
  feedCloudEnableButton: document.querySelector('#feedCloudEnableButton'),
  feedCloudLocalButton: document.querySelector('#feedCloudLocalButton'),
  feedCloudStatus: document.querySelector('#feedCloudStatus'),
  calendarCloudCurrent: document.querySelector('#calendarCloudCurrent'),
  calendarCloudStableName: document.querySelector('#calendarCloudStableName'),
  calendarCloudConfirmInput: document.querySelector('#calendarCloudConfirmInput'),
  calendarCloudEnableButton: document.querySelector('#calendarCloudEnableButton'),
  calendarCloudLocalButton: document.querySelector('#calendarCloudLocalButton'),
  calendarCloudStatus: document.querySelector('#calendarCloudStatus'),
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
    cloudId: item.cloudId || item.cloud_id || '',
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
    racingHorseId: item.racingHorseId || item.racing_horse_id || '',
    name: item.name || 'Unnamed horse',
    nickname: item.nickname || item.stableName || '',
    owner: item.owner || '',
    breed: item.breed || '',
    birth: item.birth || item.birthDate || item.birthYear || item.age || '',
    gender: normalizeHorseGender(item.gender || ''),
    color: item.color || '',
    registration: item.registration || item.registrationNumber || '',
    countryOfOrigin: item.countryOfOrigin || item.country_of_origin || '',
    totalEarnings: item.totalEarnings ?? item.total_earnings ?? '',
    last5Earnings: item.last5Earnings ?? item.last_5_earnings ?? '',
    racingCategory: item.racingCategory || item.racing_category || '',
    trainerName: item.trainerName || item.trainer_name || '',
    ownerName: item.ownerName || item.owner_name || '',
    defaultDriver: item.defaultDriver || item.default_driver || '',
    racingNotes: item.racingNotes || item.racing_notes || '',
    feedingNotes: item.feedingNotes || '',
    careNotes: item.careNotes || '',
    shoeingNotes: item.shoeingNotes || '',
    vaccinationNotes: item.vaccinationNotes || '',
    dewormingNotes: item.dewormingNotes || '',
    vetNotes: item.vetNotes || '',
    notes: item.notes || item.generalNotes || ''
  };
}

function normalizeRacingHorse(item) {
  return {
    id: item.id || '',
    registrationNumber: item.registrationNumber || item.registration_number || '',
    horseName: item.horseName || item.horse_name || item.name || '',
    birthDate: item.birthDate || item.birth_date || '',
    birthYear: item.birthYear ?? item.birth_year ?? '',
    gender: normalizeHorseGender(item.gender || ''),
    countryOfOrigin: item.countryOfOrigin || item.country_of_origin || '',
    totalEarnings: item.totalEarnings ?? item.total_earnings ?? 0,
    last5Earnings: item.last5Earnings ?? item.last_5_earnings ?? '',
    careerStarts: item.careerStarts ?? item.career_starts ?? '',
    careerWins: item.careerWins ?? item.career_wins ?? '',
    careerPlaces: item.careerPlaces ?? item.career_places ?? '',
    careerShow: item.careerShow ?? item.career_show ?? '',
    careerEarnings: item.careerEarnings ?? item.career_earnings ?? '',
    twelveMonthStarts: item.twelveMonthStarts ?? item.twelve_month_starts ?? '',
    twelveMonthWins: item.twelveMonthWins ?? item.twelve_month_wins ?? '',
    twelveMonthPlaces: item.twelveMonthPlaces ?? item.twelve_month_places ?? '',
    twelveMonthShow: item.twelveMonthShow ?? item.twelve_month_show ?? '',
    twelveMonthEarnings: item.twelveMonthEarnings ?? item.twelve_month_earnings ?? '',
    yearStarts: item.yearStarts ?? item.year_starts ?? '',
    yearWins: item.yearWins ?? item.year_wins ?? '',
    yearPlaces: item.yearPlaces ?? item.year_places ?? '',
    yearShow: item.yearShow ?? item.year_show ?? '',
    yearEarnings: item.yearEarnings ?? item.year_earnings ?? '',
    twoMonthStarts: item.twoMonthStarts ?? item.two_month_starts ?? '',
    twoMonthWins: item.twoMonthWins ?? item.two_month_wins ?? '',
    twoMonthPlaces: item.twoMonthPlaces ?? item.two_month_places ?? '',
    twoMonthShow: item.twoMonthShow ?? item.two_month_show ?? '',
    twoMonthEarnings: item.twoMonthEarnings ?? item.two_month_earnings ?? '',
    careerRecord: item.careerRecord || item.career_record || '',
    twelveMonthRecord: item.twelveMonthRecord || item.twelve_month_record || '',
    yearRecord: item.yearRecord || item.year_record || '',
    shortDistanceRecord: item.shortDistanceRecord || item.short_distance_record || '',
    longDistanceRecord: item.longDistanceRecord || item.long_distance_record || '',
    categoryMc: item.categoryMc || item.category_mc || '',
    categoryMs: item.categoryMs || item.category_ms || '',
    potentialMc: item.potentialMc || item.potential_mc || '',
    potentialMs: item.potentialMs || item.potential_ms || '',
    reclaimAllowed: Boolean(item.reclaimAllowed ?? item.reclaim_allowed ?? false),
    racingCategory: item.racingCategory || item.racing_category || '',
    trainerName: item.trainerName || item.trainer_name || '',
    ownerName: item.ownerName || item.owner_name || '',
    defaultDriver: item.defaultDriver || item.default_driver || '',
    notes: item.notes || '',
    lastResultsUpdate: item.lastResultsUpdate || item.last_results_update || '',
    createdBy: item.createdBy || item.created_by || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeRacingHorseStart(item) {
  return {
    id: item.id || '',
    racingHorseId: item.racingHorseId || item.racing_horse_id || '',
    raceDate: item.raceDate || item.race_date || '',
    racetrackCode: item.racetrackCode || item.racetrack_code || '',
    racetrackName: item.racetrackName || item.racetrack_name || '',
    raceCode: item.raceCode || item.race_code || '',
    driverName: item.driverName || item.driver_name || '',
    placement: item.placement || '',
    kilometerTime: item.kilometerTime || item.kilometer_time || '',
    distance: item.distance ?? '',
    startersInfo: item.startersInfo || item.starters_info || '',
    shoeing: item.shoeing || '',
    netPrize: item.netPrize ?? item.net_prize ?? '',
    grossPrize: item.grossPrize ?? item.gross_prize ?? '',
    raceNotes: item.raceNotes || item.race_notes || '',
    videoUrl: item.videoUrl || item.video_url || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeCalendarEvent(item) {
  const type = String(item.type || item.eventType || 'other').toLowerCase();
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
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

function normalizeCareRecord(item) {
  const type = String(item.type || item.careType || 'other').toLowerCase();
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
    horseId: item.horseId || '',
    date: item.date || item.careDate || item.care_date || today(),
    type: CARE_TYPES.includes(type) ? type : 'other',
    title: item.title || '',
    notes: item.notes || '',
    nextDueDate: item.nextDueDate || item.next_due_date || '',
    cost: item.cost === '' || item.cost == null ? '' : toSafeNumber(item.cost),
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeRaceOpportunity(item) {
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
    racetrackName: item.racetrackName || item.racetrack_name || '',
    raceDate: item.raceDate || item.race_date || today(),
    raceNumber: item.raceNumber || item.race_number || '',
    raceName: item.raceName || item.race_name || '',
    raceClass: item.raceClass || item.race_class || '',
    distance: item.distance || '',
    startMethod: item.startMethod || item.start_method || '',
    prizeInfo: item.prizeInfo || item.prize_info || '',
    eligibilityNotes: item.eligibilityNotes || item.eligibility_notes || '',
    entryDeadline: item.entryDeadline || item.entry_deadline || '',
    contactEmail: item.contactEmail || item.contact_email || '',
    notes: item.notes || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeRacePlan(item) {
  const status = String(item.status || 'draft').toLowerCase();
  return {
    id: item.id || createId(),
    cloudId: item.cloudId || item.cloud_id || '',
    opportunityId: item.opportunityId || item.opportunity_id || '',
    programRaceId: item.programRaceId || item.raceProgramRaceId || item.race_program_race_id || '',
    horseId: item.horseId || item.horse_id || '',
    driver: item.driver || '',
    trainer: item.trainer || item.trainer_contact || '',
    notes: item.notes || '',
    status: RACE_ENTRY_STATUSES.includes(status) ? status : 'draft',
    emailSubject: item.emailSubject || item.email_subject || '',
    emailBody: item.emailBody || item.email_body || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeRaceProgram(item) {
  const status = String(item.status || 'draft').toLowerCase();
  return {
    id: item.id || '',
    title: item.title || '',
    racetrackName: item.racetrackName || item.racetrack_name || '',
    locationCity: item.locationCity || item.location_city || '',
    locationCountry: item.locationCountry || item.location_country || '',
    programMonth: item.programMonth || item.program_month || '',
    sourceFileName: item.sourceFileName || item.source_file_name || '',
    status: ['draft', 'published', 'archived'].includes(status) ? status : 'draft',
    createdBy: item.createdBy || item.created_by || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function normalizeRaceProgramRace(item) {
  return {
    id: item.id || '',
    programId: item.programId || item.program_id || '',
    raceDate: item.raceDate || item.race_date || today(),
    raceNumber: item.raceNumber || item.race_number || '',
    raceName: item.raceName || item.race_name || '',
    raceClass: item.raceClass || item.race_class || '',
    distance: item.distance || '',
    startMethod: item.startMethod || item.start_method || '',
    prizeInfo: item.prizeInfo || item.prize_info || '',
    eligibilityNotes: item.eligibilityNotes || item.eligibility_notes || '',
    entryDeadline: item.entryDeadline || item.entry_deadline || '',
    contactEmail: item.contactEmail || item.contact_email || '',
    notes: item.notes || '',
    importedLocalId: item.importedLocalId || item.imported_local_id || '',
    createdAt: item.createdAt || item.created_at || '',
    updatedAt: item.updatedAt || item.updated_at || ''
  };
}

function slugifyRaceImport(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 54) || 'race';
}

function createRaceImportLocalId(race) {
  const date = race.raceDate || 'unknown-date';
  const number = race.raceNumber || 'x';
  return `race-import-${slugifyRaceImport(race.racetrackName || 'napoli')}-${date}-${number}-${slugifyRaceImport(race.raceName)}`;
}

function normalizeItalianProgramText(text) {
  return String(text || '')
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseItalianProgramDate(line) {
  const months = {
    gennaio: '01',
    febbraio: '02',
    marzo: '03',
    aprile: '04',
    maggio: '05',
    giugno: '06',
    luglio: '07',
    agosto: '08',
    settembre: '09',
    ottobre: '10',
    novembre: '11',
    dicembre: '12'
  };
  const match = String(line || '').match(/\b\d+\s*\^\s*GIORNATA\s*-\s*[^\d]*(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})/i);
  if (!match) return '';
  const day = match[1].padStart(2, '0');
  const month = months[match[2].toLowerCase()];
  if (!month) return '';
  return `${match[3]}-${month}-${day}`;
}

function looksLikeItalianRaceLine(line) {
  const value = String(line || '').trim();
  if (!/^\d{1,2}\s+\S+/.test(value)) return false;
  if (/^\d+\s*\^/.test(value)) return false;
  if (/^(?:Mt\.?|Metri)\b/i.test(value)) return false;
  if (/^\d{1,2}\s+(?:maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre|gennaio|febbraio|marzo|aprile)\b/i.test(value)) return false;
  return /[A-Za-zÀ-ÿ]{3,}/.test(value);
}

function isItalianRaceBodyLine(line) {
  return /^(Per|Mt\.?|Metri|Riservata|Riservato|EVENTUALE|VEDI|Batteria|FINALE|CONSOLAZIONE|Massimo|Max)\b/i.test(String(line || '').trim());
}

function parseItalianRaceHeader(line) {
  const match = String(line || '').trim().match(/^(\d{1,2})\s+(.+)$/);
  if (!match) return null;
  const rest = match[2].trim();
  const prizeMatch = rest.match(/\(([^)]*€[^)]*)\)/i);
  const prizeInfo = prizeMatch ? prizeMatch[1].trim() : '';
  const beforePrize = prizeMatch ? rest.slice(0, prizeMatch.index).trim() : rest;
  const afterPrize = prizeMatch ? rest.slice(prizeMatch.index + prizeMatch[0].length).trim() : '';
  return {
    raceNumber: match[1],
    raceName: beforePrize || rest,
    prizeInfo,
    raceClass: afterPrize
  };
}

function extractDistanceFromLines(lines) {
  const match = lines.join(' ').match(/\b(?:Mt\.?|Metri)\s*([\d.,/]+)/i);
  return match ? match[0].replace(/\s+/g, ' ').trim() : '';
}

function extractStartMethodFromLines(lines) {
  const text = lines.join(' ');
  if (/autostart/i.test(text)) return 'Autostart';
  if (/nastri/i.test(text)) return 'Nastri';
  if (/partenza/i.test(text)) {
    const match = text.match(/partenza[^.]{0,60}/i);
    return match ? match[0].trim() : '';
  }
  return '';
}

function extractEligibilityFromLines(lines) {
  const eligibilityLines = lines.filter((line) => /^(Per|Riservata|Riservato|Handicap|Invito)\b/i.test(line.trim()));
  return eligibilityLines.join(' ').trim();
}

function buildRaceOpportunityFromBlock(currentDate, header, bodyLines) {
  const normalizedBody = bodyLines.map((line) => line.trim()).filter(Boolean);
  const opportunity = normalizeRaceOpportunity({
    id: createRaceImportLocalId({
      racetrackName: 'Napoli',
      raceDate: currentDate,
      raceNumber: header.raceNumber,
      raceName: header.raceName
    }),
    racetrackName: 'Napoli',
    raceDate: currentDate,
    raceNumber: header.raceNumber,
    raceName: header.raceName,
    raceClass: header.raceClass,
    distance: extractDistanceFromLines(normalizedBody),
    startMethod: extractStartMethodFromLines(normalizedBody),
    prizeInfo: header.prizeInfo,
    eligibilityNotes: extractEligibilityFromLines(normalizedBody),
    notes: normalizedBody.join('\n')
  });
  opportunity.id = createRaceImportLocalId(opportunity);
  return opportunity;
}

function parseItalianRaceProgramText(text) {
  const lines = normalizeItalianProgramText(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const races = [];
  let currentDate = '';
  let currentHeader = null;
  let currentHeaderLines = [];
  let currentBody = [];

  const finalizeHeaderDraft = () => {
    if (!currentHeader && currentHeaderLines.length) {
      currentHeader = parseItalianRaceHeader(currentHeaderLines.join(' '));
      currentHeaderLines = [];
    }
  };

  const flushRace = () => {
    finalizeHeaderDraft();
    if (!currentHeader || !currentDate) return;
    races.push(buildRaceOpportunityFromBlock(currentDate, currentHeader, currentBody));
    currentHeader = null;
    currentHeaderLines = [];
    currentBody = [];
  };

  lines.forEach((line) => {
    const parsedDate = parseItalianProgramDate(line);
    if (parsedDate) {
      flushRace();
      currentDate = parsedDate;
      return;
    }
    if (!currentDate) return;
    if (/^\d{1,2}$/.test(line)) {
      flushRace();
      currentHeaderLines = [line];
      return;
    }
    if (currentHeaderLines.length) {
      if (isItalianRaceBodyLine(line)) {
        finalizeHeaderDraft();
        if (currentHeader) currentBody.push(line);
        return;
      }
      currentHeaderLines.push(line);
      return;
    }
    if (looksLikeItalianRaceLine(line)) {
      const parsedHeader = parseItalianRaceHeader(line);
      if (parsedHeader) {
        flushRace();
        currentHeaderLines = [line];
        return;
      }
    }
    if (currentHeader) currentBody.push(line);
  });
  flushRace();
  return races;
}

function parseRaceCsvOrText(text, type = 'text') {
  const parsedProgram = parseItalianRaceProgramText(text);
  if (parsedProgram.length || type === 'pdf') return parsedProgram;
  return normalizeItalianProgramText(text)
    .split('\n')
    .map((line, index) => {
      const parts = line.split(/[;,]/).map((part) => part.trim());
      if (parts.length < 2 || !parts[0]) return null;
      const raceDate = isValidDate(parts[1]) || today();
      return normalizeRaceOpportunity({
        id: createRaceImportLocalId({
          racetrackName: parts[0] || 'Napoli',
          raceDate,
          raceNumber: parts[2] || String(index + 1),
          raceName: parts[3] || parts[2] || `Race ${index + 1}`
        }),
        racetrackName: parts[0] || 'Napoli',
        raceDate,
        raceNumber: parts[2] || '',
        raceName: parts[3] || '',
        raceClass: parts[4] || '',
        distance: parts[5] || '',
        prizeInfo: parts[6] || '',
        eligibilityNotes: parts[7] || '',
        contactEmail: parts[8] || '',
        notes: line
      });
    })
    .filter(Boolean);
}

function parseItalianNumber(value) {
  const cleaned = String(value || '').replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function parseItalianResultsDate(value) {
  const match = String(value || '').match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/);
  if (!match) return '';
  return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}

function createResultImportId(row) {
  return [
    'result-import',
    slugifyRaceImport(row.racetrackName || 'napoli'),
    row.raceDate || 'unknown-date',
    row.raceNumber || 'x',
    row.startingNumber || 'x',
    slugifyRaceImport(row.horseName || 'horse')
  ].join('-');
}

function normalizeResultsText(text) {
  return normalizeItalianProgramText(text)
    .replace(/(\d{1,2}\))\s+/g, '\n$1 ')
    .replace(/\s+((?:\d{2}|RP|DI|RI|RC|NP|SQ|R)\s+\d{1,2}\s+)/gi, '\n$1')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseItalianResultsRaceHeader(line) {
  const match = String(line || '').trim().match(/^(\d{1,2})\)\s+(.+?)\s+\(([^)]*)\)\s+Metri\s+(\d+)\s+E\.?\s*([\d.,]+)/i);
  if (!match) return null;
  return {
    raceNumber: match[1],
    raceName: match[2].trim(),
    raceCode: match[3].trim(),
    distance: match[4],
    totalPrize: match[5]
  };
}

function looksLikeResultRow(line) {
  return /^(?:\d{1,2}|RP|DI|RI|RC|NP|SQ|R)\s+\d{1,2}\s+/i.test(String(line || '').trim());
}

function parseItalianResultRow(line, context) {
  const raw = String(line || '').replace(/\s+/g, ' ').trim();
  const tokens = raw.split(' ');
  if (tokens.length < 4) return null;
  const placement = tokens[0];
  const startingNumber = tokens[1];
  let cursor = 2;
  let totalTime = '';
  let distanceIndex = -1;
  for (let index = cursor; index < tokens.length; index += 1) {
    if (/^\d{3,4}$/.test(tokens[index]) && (tokens[index] === String(context.distance) || index > cursor)) {
      distanceIndex = index;
      break;
    }
  }
  if (distanceIndex < 0) return null;
  if (distanceIndex > cursor && /^\d+\.\d{2}\.\d$/i.test(tokens[distanceIndex - 1])) {
    totalTime = tokens[distanceIndex - 1];
    distanceIndex -= 1;
  }
  const horseName = tokens.slice(cursor, distanceIndex).join(' ').trim();
  cursor = distanceIndex;
  if (totalTime) cursor += 1;
  const distance = tokens[cursor] || context.distance || '';
  cursor += 1;
  let kilometerTime = '';
  if (/^\d{1,2}\.\d$/i.test(tokens[cursor] || '')) {
    kilometerTime = tokens[cursor];
    cursor += 1;
  }
  const moneyIndexes = [];
  for (let index = cursor; index < tokens.length; index += 1) {
    if (/^\d{1,3}(?:\.\d{3})*,\d{2}$|^\d+,\d{2}$/.test(tokens[index])) moneyIndexes.push(index);
    if (moneyIndexes.length === 2) break;
  }
  const netPrize = moneyIndexes[0] != null ? parseItalianNumber(tokens[moneyIndexes[0]]) : null;
  const grossPrize = moneyIndexes[1] != null ? parseItalianNumber(tokens[moneyIndexes[1]]) : null;
  const personTokens = moneyIndexes[1] != null ? tokens.slice(moneyIndexes[1] + 1) : tokens.slice(cursor);
  const driverName = personTokens.slice(0, 3).join(' ').replace(/\d+$/, '').trim();
  const remainingPeople = personTokens.slice(3).join(' ').trim();
  return {
    id: createResultImportId({ ...context, startingNumber, horseName }),
    selected: Boolean(horseName),
    raceDate: context.raceDate,
    racetrackName: context.racetrackName,
    raceNumber: context.raceNumber,
    raceName: context.raceName,
    raceCode: context.raceCode,
    startingNumber,
    placement,
    horseName,
    totalTime,
    distance,
    kilometerTime,
    netPrize: netPrize ?? '',
    grossPrize: grossPrize ?? '',
    driverName,
    ownerName: '',
    trainerName: '',
    notes: [remainingPeople, raw].filter(Boolean).join('\n'),
    matchMode: 'skip',
    racingHorseId: '',
    duplicate: false
  };
}

function findRacingHorseByName(horseName) {
  const normalized = String(horseName || '').trim().toLowerCase();
  return racingHorses.find((horse) => String(horse.horseName || '').trim().toLowerCase() === normalized) || null;
}

function hasDuplicateRacingStart(row, racingHorseId = row.racingHorseId) {
  if (!racingHorseId) return false;
  return Boolean(findDuplicateRacingStart(row, racingHorseId));
}

function findDuplicateRacingStart(row, racingHorseId = row.racingHorseId) {
  if (!racingHorseId) return null;
  return racingHorseStarts.find((start) => {
    const normalized = normalizeRacingHorseStart(start);
    return normalized.racingHorseId === racingHorseId
      && normalized.raceDate === row.raceDate
      && String(normalized.racetrackName || '').trim().toLowerCase() === String(row.racetrackName || '').trim().toLowerCase()
      && String(normalized.raceCode || '').trim().toLowerCase() === String(row.raceNumber || row.raceCode || '').trim().toLowerCase();
  }) || null;
}

function enrichResultImportMatches(rows) {
  return rows.map((row) => {
    const match = findRacingHorseByName(row.horseName);
    const racingHorseId = match?.id || row.racingHorseId || '';
    return {
      ...row,
      racingHorseId,
      matchMode: racingHorseId ? 'match' : (row.matchMode || 'skip'),
      duplicate: hasDuplicateRacingStart(row, racingHorseId)
    };
  });
}

function parseItalianResultsPdfText(text) {
  const lines = normalizeResultsText(text).split('\n').map((line) => line.trim()).filter(Boolean);
  let racetrackName = 'Napoli';
  let raceDate = '';
  const rows = [];
  let currentRace = null;
  lines.forEach((line) => {
    const header = line.match(/\b([A-ZÀ-Ý]+)\s+RIUNIONE\s+N\.\s*\d+\s+di\s+(\d{1,2}[./-]\d{1,2}[./-]\d{4})/i);
    if (header) {
      racetrackName = `${header[1].slice(0, 1)}${header[1].slice(1).toLowerCase()}`;
      raceDate = parseItalianResultsDate(header[2]);
      return;
    }
    const raceHeader = parseItalianResultsRaceHeader(line);
    if (raceHeader) {
      currentRace = { ...raceHeader, racetrackName, raceDate };
      return;
    }
    if (currentRace && looksLikeResultRow(line)) {
      const parsed = parseItalianResultRow(line, currentRace);
      if (parsed) rows.push(parsed);
    }
  });
  return enrichResultImportMatches(rows);
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
      calendarEvents: Array.isArray(parsed.calendarEvents) ? parsed.calendarEvents.map(normalizeCalendarEvent) : [],
      careHistory: Array.isArray(parsed.careHistory) ? parsed.careHistory.map(normalizeCareRecord) : [],
      raceEntryOpportunities: Array.isArray(parsed.raceEntryOpportunities) ? parsed.raceEntryOpportunities.map(normalizeRaceOpportunity) : [],
      raceEntryPlans: Array.isArray(parsed.raceEntryPlans) ? parsed.raceEntryPlans.map(normalizeRacePlan) : []
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
  if (cloudWriteMode) {
    showMessage(t('cloudMode.localFallbackMessage'));
    return;
  }
  const localData = loadData();
  const nextState = {
    ...state,
    horses: horseCloudWriteMode ? localData.horses : state.horses,
    tasks: taskCloudWriteMode ? localData.tasks : state.tasks,
    hours: workCloudWriteMode ? localData.hours : state.hours,
    inventory: feedCloudWriteMode ? localData.inventory : state.inventory,
    calendarEvents: calendarCloudWriteMode ? localData.calendarEvents : state.calendarEvents,
    careHistory: state.careHistory,
    raceEntryOpportunities: state.raceEntryOpportunities,
    raceEntryPlans: state.raceEntryPlans
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getCounts(data = state) {
  return {
    horses: Array.isArray(data.horses) ? data.horses.length : 0,
    tasks: Array.isArray(data.tasks) ? data.tasks.length : 0,
    hours: Array.isArray(data.hours) ? data.hours.length : 0,
    inventory: Array.isArray(data.inventory) ? data.inventory.length : 0,
    events: Array.isArray(data.calendarEvents) ? data.calendarEvents.length : 0,
    care: Array.isArray(data.careHistory) ? data.careHistory.length : 0,
    raceOpportunities: Array.isArray(data.raceEntryOpportunities) ? data.raceEntryOpportunities.length : 0,
    racePlans: Array.isArray(data.raceEntryPlans) ? data.raceEntryPlans.length : 0
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
  return counts.horses + counts.tasks + counts.hours + counts.inventory + counts.events + (counts.care || 0) + (counts.raceOpportunities || 0) + (counts.racePlans || 0);
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

function getCloudErrorMessage(error) {
  const message = String(error?.message || error || '');
  if (message.toLowerCase().includes('timed out') || message.toLowerCase().includes('timeout')) {
    return t('saveStatus.timeout');
  }
  if (isTransientCloudError(error)) return t('auth.networkError');
  return message || 'Unknown error';
}

function withTimeout(promise, milliseconds, label) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(`${label} timed out`)), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function retryOnce(operation, label) {
  try {
    return await operation();
  } catch (error) {
    console.warn(`[EquiTrack cloud] ${label} failed, retrying once`, error);
    await delay(700);
    try {
      return await operation();
    } catch (retryError) {
      console.error(`[EquiTrack cloud] ${label} failed after retry`, retryError);
      throw retryError;
    }
  }
}

function setCloudSaveState(nextState) {
  cloudSaveState = nextState;
  if (cloudSaveStatusTimer) {
    window.clearTimeout(cloudSaveStatusTimer);
    cloudSaveStatusTimer = null;
  }
  renderCloudSaveStatus();
  if (nextState === 'saved') {
    cloudSaveStatusTimer = window.setTimeout(() => {
      cloudSaveState = 'idle';
      renderCloudSaveStatus();
    }, 2600);
  }
}

function renderCloudSaveStatus() {
  if (!els.cloudSaveStatus) return;
  const visible = cloudWriteMode || cloudSaveState !== 'idle';
  els.cloudSaveStatus.hidden = !visible;
  els.cloudSaveStatus.textContent = t(`saveStatus.${cloudSaveState}`);
  els.cloudSaveStatus.className = `save-status save-status-${cloudSaveState}`;
}

function isTransientCloudError(error) {
  const message = String(error?.message || error || '').toLowerCase();
  const status = Number(error?.status || 0);
  return (
    error?.name === 'TypeError' ||
    status === 408 ||
    status === 429 ||
    status >= 500 ||
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('timeout') ||
    message.includes('timed out')
  );
}

async function retryCloudWrite(operation, label) {
  try {
    return await operation();
  } catch (error) {
    if (!isTransientCloudError(error) || isPermissionError(error)) throw error;
    console.warn(`[EquiTrack cloud] ${label} failed, retrying once`, error);
    await delay(700);
    return operation();
  }
}

async function executeCloudMutation(table, label, operation) {
  console.info('[EquiTrack cloud] Mutation started', { table, label });
  setCloudSaveState('saving');
  try {
    const response = await retryCloudWrite(
      async () => {
        const result = await withTimeout(operation(), CLOUD_WRITE_TIMEOUT_MS, label);
        if (result?.error) throw result.error;
        return result;
      },
      label
    );
    setCloudSaveState('saved');
    console.info('[EquiTrack cloud] Mutation saved', { table, label });
    return response?.data;
  } catch (error) {
    console.error('[EquiTrack cloud] Mutation failed', { table, label, error });
    setCloudSaveState('error');
    throw error;
  }
}

function getCloudActionKey(action, id = '') {
  return `${action}:${id || 'new'}`;
}

function tryStartCloudAction(action, id = '') {
  const key = getCloudActionKey(action, id);
  if (cloudMutationLocks.has(key)) {
    console.info('[EquiTrack cloud] Duplicate action ignored', { action, id });
    showMessage(t('saveStatus.saving'));
    return null;
  }
  cloudMutationLocks.add(key);
  return key;
}

function finishCloudAction(key) {
  if (key) cloudMutationLocks.delete(key);
}

function getSubmitButton(form) {
  return form?.querySelector('button[type="submit"]');
}

async function runCloudFormSubmit(form, action, id, operation, onSuccess) {
  const lockKey = tryStartCloudAction(action, id);
  if (!lockKey) return;
  const submitButton = getSubmitButton(form);
  if (submitButton) submitButton.disabled = true;
  try {
    const saved = await operation();
    if (saved) onSuccess?.();
  } finally {
    finishCloudAction(lockKey);
    if (submitButton) submitButton.disabled = false;
  }
}

async function runCloudAction(action, id, operation) {
  const lockKey = tryStartCloudAction(action, id);
  if (!lockKey) return false;
  try {
    return await operation();
  } finally {
    finishCloudAction(lockKey);
  }
}

function isProtectedView(viewName) {
  return PROTECTED_VIEWS.includes(viewName);
}

function updateAuthUi() {
  const configured = isSupabaseConfigured();
  const loginReady = configured && Boolean(supabaseClient);
  if (els.authUserEmail) {
    els.authUserEmail.textContent = authRestoring ? t('auth.restoring') : (authUser?.email || t('auth.signedOut'));
    els.authUserEmail.title = authUser?.email || '';
  }
  if (els.loginNavButton) els.loginNavButton.hidden = Boolean(authUser) || authRestoring;
  if (els.logoutButton) els.logoutButton.hidden = !authUser || authRestoring;
  if (els.settingsLogoutButton) els.settingsLogoutButton.hidden = !authUser || authRestoring;
  if (els.loginButton) els.loginButton.disabled = !loginReady || authRestoring;
  if (els.authSetupNotice) {
    els.authSetupNotice.textContent = authRestoring ? t('auth.restoring') : (configured ? (loginReady ? t('auth.setupReady') : t('message.authLoading')) : t('auth.setupNeeded'));
    els.authSetupNotice.classList.toggle('ready', loginReady);
  }
  renderCloudStatus();
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderAdminPlaceholder();
  renderStableLocationSettings();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderFeedCloudMode();
  renderCalendarCloudMode();
  renderCloudCleanup();
  renderHome();
}

function getCurrentUser() {
  return authUser;
}

function getActiveStable() {
  return {
    id: cloudState.stableId || '',
    name: cloudState.stableName || '',
    locationCity: cloudState.locationCity || '',
    locationCountry: cloudState.locationCountry || '',
    latitude: cloudState.latitude,
    longitude: cloudState.longitude
  };
}

function setCloudStatus(nextState = {}) {
  const previousWeatherKey = getStableLocationKey(getActiveStable());
  cloudState = {
    ...cloudState,
    ...nextState
  };
  renderCloudStatus();
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderAdminPlaceholder();
  renderStableLocationSettings();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderFeedCloudMode();
  renderCalendarCloudMode();
  renderCloudCleanup();
  renderHome();
  if (getStableLocationKey(getActiveStable()) !== previousWeatherKey) loadTurnoutWeather();
}

function formatStableLocation(stable = getActiveStable()) {
  const parts = [stable.locationCity, stable.locationCountry].filter(Boolean);
  return parts.length ? parts.join(', ') : '';
}

function getStableLocationKey(stable = getActiveStable()) {
  return [
    stable.locationCity || '',
    stable.locationCountry || '',
    stable.latitude ?? '',
    stable.longitude ?? ''
  ].join('|');
}

function getCloudStatusText() {
  if (authRestoring) return t('auth.restoring');
  if (cloudDataLoading || cloudState.status === 'loadingCloud') return t('cloud.loadingData');
  if (cloudUnavailable) return t('cloudMode.cloudUnavailable');
  if (cloudState.status === 'connected') return t('cloud.connectedAs', { email: cloudState.email });
  if (cloudState.status === 'noStable') return t('cloud.noStable');
  if (cloudState.status === 'permissionBlocked') return t('cloud.permissionBlocked');
  if (cloudState.status === 'error') return t('cloud.loadError');
  if (stableLoading || cloudState.status === 'loading') return t('cloud.loadingStable');
  return t(cloudState.messageKey || 'cloud.notConnected');
}

function renderCloudStatus() {
  const statusText = getCloudStatusText();
  const stableText = cloudState.stableName || '-';
  const stableLocationText = formatStableLocation() || t('stable.locationNotSet');
  const migrationStableText = cloudState.stableName || t('migration.noStable');
  if (els.headerStableName) {
    els.headerStableName.textContent = cloudState.status === 'connected'
      ? t('cloud.activeStable', { name: cloudState.stableName })
      : statusText;
    els.headerStableName.title = els.headerStableName.textContent;
  }
  if (els.cloudUserEmail) els.cloudUserEmail.textContent = cloudState.email || '-';
  if (els.cloudStableName) els.cloudStableName.textContent = stableText;
  if (els.cloudStableLocation) els.cloudStableLocation.textContent = stableLocationText;
  if (els.cloudConnectionStatus) els.cloudConnectionStatus.textContent = statusText;
  if (els.cloudLocalNotice) els.cloudLocalNotice.textContent = t('cloud.syncLocal');
  if (els.migrationStableName) els.migrationStableName.textContent = migrationStableText;
  renderSupportLinks();
}

function getDataModeLabel() {
  if (authRestoring) return t('auth.restoring');
  if (stableLoading || cloudState.status === 'loading') return t('cloud.loadingStable');
  if (cloudDataLoading || cloudState.status === 'loadingCloud') return t('cloud.loadingData');
  if (cloudWriteMode) return t('cloudMode.cloudStatus');
  if (cloudUnavailable) return t('cloudMode.unavailableStatus');
  return t('cloudMode.localStatus');
}

function getSupportMailtoHref() {
  const user = getCurrentUser();
  const activeStable = getActiveStable();
  const body = [
    'Hello EquiTrack support,',
    '',
    'I need help with EquiTrack.',
    '',
    'App context:',
    `Logged-in email: ${user?.email || 'Not signed in'}`,
    `Active stable: ${activeStable.name || 'Not available'}`,
    `Current data mode: ${getDataModeLabel()}`,
    `Browser: ${navigator.userAgent || 'Unknown'}`
  ].join('\n');
  return `mailto:${SUPPORT_CONFIG.email}?subject=${encodeURIComponent(SUPPORT_CONFIG.subject)}&body=${encodeURIComponent(body)}`;
}

function renderSupportLinks() {
  const mailtoHref = getSupportMailtoHref();
  if (els.supportPhoneText) els.supportPhoneText.textContent = SUPPORT_CONFIG.phoneDisplay;
  if (els.supportEmailText) els.supportEmailText.textContent = SUPPORT_CONFIG.email;
  if (els.supportPhoneLink) els.supportPhoneLink.href = SUPPORT_CONFIG.phoneHref;
  if (els.supportEmailLink) els.supportEmailLink.href = mailtoHref;
  if (els.footerSupportLink) els.footerSupportLink.href = getCurrentUser() ? '#support' : mailtoHref;
}

function isAdminUser() {
  return ['admin', 'super_admin'].includes(cloudState.profileRole) || cloudState.membershipRole === 'owner' || cloudState.canManageUsers === true;
}

function isSuperAdmin() {
  return cloudState.profileRole === 'super_admin';
}

function canEditStableLocation() {
  return Boolean(getCurrentUser() && (
    isSuperAdmin()
    || cloudState.membershipRole === 'owner'
    || cloudState.canManageUsers === true
  ));
}

function renderStableLocationSettings() {
  if (!els.stableLocationForm) return;
  const activeStable = getActiveStable();
  const locationText = formatStableLocation(activeStable) || t('stable.locationNotSet');
  const canEdit = canEditStableLocation();
  const formHasFocus = els.stableLocationForm.contains(document.activeElement);
  if (els.stableLocationSummary) els.stableLocationSummary.textContent = locationText;
  if (!formHasFocus) {
    els.stableLocationForm.elements.stableCity.value = activeStable.locationCity || '';
    els.stableLocationForm.elements.stableCountry.value = activeStable.locationCountry || '';
  }
  Array.from(els.stableLocationForm.elements).forEach((element) => {
    if (element.tagName === 'BUTTON') return;
    element.disabled = !canEdit || !activeStable.id || isStableLocationSaving;
  });
  if (els.stableLocationSaveButton) {
    els.stableLocationSaveButton.disabled = !canEdit || !activeStable.id || isStableLocationSaving || !supabaseClient;
  }
  if (els.stableLocationStatus) {
    els.stableLocationStatus.textContent = stableLocationStatusText
      || (canEdit && activeStable.id ? t('stable.locationReady') : t('stable.locationPermissionDenied'));
  }
}

async function handleStableLocationSubmit(event) {
  event.preventDefault();
  const activeStable = getActiveStable();
  if (!canEditStableLocation()) {
    stableLocationStatusText = t('stable.locationPermissionDenied');
    renderStableLocationSettings();
    showMessage(stableLocationStatusText);
    return;
  }
  if (!supabaseClient || !activeStable.id) {
    stableLocationStatusText = t('cloudRead.noStable');
    renderStableLocationSettings();
    showMessage(stableLocationStatusText);
    return;
  }
  const form = event.currentTarget;
  const locationCity = form.elements.stableCity.value.trim();
  const locationCountry = form.elements.stableCountry.value.trim();
  isStableLocationSaving = true;
  stableLocationStatusText = t('stable.locationSaving');
  renderStableLocationSettings();
  try {
    const { data, error } = await supabaseClient
      .from('stables')
      .update({
        location_city: locationCity || null,
        location_country: locationCountry || null,
        latitude: null,
        longitude: null
      })
      .eq('id', activeStable.id)
      .select('id, location_city, location_country, latitude, longitude')
      .single();
    if (error) throw error;
    stableLocationStatusText = t('stable.locationSaved');
    setCloudStatus({
      locationCity: data?.location_city || '',
      locationCountry: data?.location_country || '',
      latitude: data?.latitude == null ? null : Number(data.latitude),
      longitude: data?.longitude == null ? null : Number(data.longitude)
    });
    showMessage(stableLocationStatusText);
  } catch (error) {
    console.error('[EquiTrack stable] Location save failed', error);
    stableLocationStatusText = t('stable.locationSaveFailed', { error: error.message || 'Unknown error' });
    showMessage(stableLocationStatusText);
  } finally {
    isStableLocationSaving = false;
    renderStableLocationSettings();
  }
}

function renderAdminPlaceholder() {
  const canViewAdmin = Boolean(getCurrentUser() && isAdminUser());
  if (els.adminPlaceholderPanel) els.adminPlaceholderPanel.hidden = !canViewAdmin;
  if (!els.adminAccessStatus) return;
  if (cloudState.profileRole === 'super_admin') {
    els.adminAccessStatus.textContent = t('admin.accessSuper');
  } else if (cloudState.profileRole === 'admin') {
    els.adminAccessStatus.textContent = t('admin.accessAdmin');
  } else if (cloudState.membershipRole === 'owner') {
    els.adminAccessStatus.textContent = t('admin.accessOwner');
  } else if (cloudState.canManageUsers === true) {
    els.adminAccessStatus.textContent = t('admin.accessManager');
  } else {
    els.adminAccessStatus.textContent = t('admin.accessNone');
  }
  renderAdminStableForm();
  renderAdminUserForm();
}

function renderAdminStableForm() {
  if (!els.adminStableSection || !els.adminStableForm) return;
  const canCreateStable = Boolean(getCurrentUser() && isSuperAdmin());
  els.adminStableSection.hidden = !canCreateStable;
  if (els.adminCreateStableButton) els.adminCreateStableButton.disabled = !canCreateStable || !supabaseClient;
  if (els.adminStableStatus && !els.adminStableStatus.dataset.busy) {
    els.adminStableStatus.textContent = canCreateStable ? t('admin.stableReady') : t('admin.stableNotAllowed');
  }
}

function getAdminPermissionInputs() {
  if (!els.adminUserForm) return [];
  return ADMIN_PERMISSION_FIELDS
    .map((field) => els.adminUserForm.elements[field])
    .filter(Boolean);
}

function setAdminPermissionValues(role) {
  if (!els.adminUserForm) return;
  const values = {
    viewer: ['can_view_horses', 'can_view_tasks', 'can_view_calendar'],
    member: ['can_view_horses', 'can_view_tasks', 'can_view_calendar'],
    owner: ADMIN_PERMISSION_FIELDS
  };
  const active = new Set(values[role] || values.member);
  getAdminPermissionInputs().forEach((input) => {
    input.checked = active.has(input.name);
    input.disabled = role === 'owner';
  });
}

function renderAdminUserForm() {
  if (!els.adminUserForm) return;
  const canViewAdmin = Boolean(getCurrentUser() && isAdminUser());
  const activeStable = getActiveStable();
  const roleSelect = els.adminUserForm.elements.stableRole;
  const ownerOption = roleSelect?.querySelector('option[value="owner"]');
  if (ownerOption) ownerOption.disabled = !isSuperAdmin();
  if (!isSuperAdmin() && roleSelect?.value === 'owner') {
    roleSelect.value = 'member';
    setAdminPermissionValues('member');
  }
  const canSubmit = canViewAdmin && Boolean(activeStable.id) && Boolean(supabaseClient);
  if (els.adminCreateUserButton) els.adminCreateUserButton.disabled = !canSubmit;
  if (els.adminUserStatus && !els.adminUserStatus.dataset.busy) {
    els.adminUserStatus.textContent = canSubmit ? t('admin.ready') : t(canViewAdmin ? 'admin.noStable' : 'admin.notAllowed');
  }
}

function getSelectedAdminPermissions() {
  const permissions = {};
  getAdminPermissionInputs().forEach((input) => {
    permissions[input.name] = input.checked === true;
  });
  return permissions;
}

async function handleAdminUserSubmit(event) {
  event.preventDefault();
  if (!getCurrentUser() || !isAdminUser()) {
    showMessage(t('admin.notAllowed'));
    return;
  }
  const activeStable = getActiveStable();
  if (!activeStable.id) {
    showMessage(t('admin.noStable'));
    renderAdminUserForm();
    return;
  }
  const form = event.currentTarget;
  const stableRole = form.elements.stableRole.value;
  if (stableRole === 'owner' && !isSuperAdmin()) {
    showMessage(t('admin.ownerOnlySuper'));
    renderAdminUserForm();
    return;
  }
  if (!supabaseClient) {
    showMessage(t('message.authConfigMissing'));
    return;
  }
  const { data, error: sessionError } = await supabaseClient.auth.getSession();
  const accessToken = data?.session?.access_token;
  if (sessionError || !accessToken) {
    showMessage(t('message.authProtected'));
    return;
  }

  const body = {
    email: form.elements.email.value.trim(),
    password: form.elements.password.value,
    full_name: form.elements.fullName.value.trim(),
    stable_id: activeStable.id,
    stable_role: stableRole,
    permissions: getSelectedAdminPermissions()
  };

  if (els.adminCreateUserButton) els.adminCreateUserButton.disabled = true;
  if (els.adminUserStatus) {
    els.adminUserStatus.dataset.busy = 'true';
    els.adminUserStatus.textContent = t('admin.creating');
  }
  let finalStatus = '';
  try {
    const response = await fetch(CREATE_USER_FUNCTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.error) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }
    form.elements.password.value = '';
    const message = t('admin.created', { email: body.email, role: t(`admin.role${stableRole[0].toUpperCase()}${stableRole.slice(1)}`) });
    finalStatus = message;
    showMessage(message);
  } catch (error) {
    console.error('[EquiTrack admin] Create user failed', error);
    const message = t('admin.failed', { error: error.message || 'Unknown error' });
    finalStatus = message;
    showMessage(message);
  } finally {
    if (els.adminUserStatus) delete els.adminUserStatus.dataset.busy;
    renderAdminUserForm();
    if (els.adminUserStatus && finalStatus) els.adminUserStatus.textContent = finalStatus;
  }
}

async function handleAdminStableSubmit(event) {
  event.preventDefault();
  if (!getCurrentUser() || !isSuperAdmin()) {
    showMessage(t('admin.stableNotAllowed'));
    return;
  }
  if (!supabaseClient) {
    showMessage(t('message.authConfigMissing'));
    return;
  }
  const form = event.currentTarget;
  const createOwner = form.elements.createOwner.checked === true;
  const stableName = form.elements.stableName.value.trim();
  const ownerEmail = form.elements.ownerEmail.value.trim();
  const ownerPassword = form.elements.ownerPassword.value;
  if (createOwner && (!ownerEmail || !ownerPassword)) {
    showMessage(t('admin.ownerRequired'));
    if (els.adminStableStatus) els.adminStableStatus.textContent = t('admin.ownerRequired');
    return;
  }

  const { data, error: sessionError } = await supabaseClient.auth.getSession();
  const accessToken = data?.session?.access_token;
  if (sessionError || !accessToken) {
    showMessage(t('message.authProtected'));
    return;
  }

  const body = {
    stable_name: stableName,
    location_city: form.elements.stableCity.value.trim(),
    location_country: form.elements.stableCountry.value.trim(),
    owner_email: createOwner ? ownerEmail : '',
    owner_full_name: createOwner ? form.elements.ownerFullName.value.trim() : '',
    owner_password: createOwner ? ownerPassword : ''
  };

  if (els.adminCreateStableButton) els.adminCreateStableButton.disabled = true;
  if (els.adminStableStatus) {
    els.adminStableStatus.dataset.busy = 'true';
    els.adminStableStatus.textContent = t('admin.stableCreating');
  }
  let finalStatus = '';
  try {
    const response = await fetch(CREATE_STABLE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.error) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }
    form.elements.ownerPassword.value = '';
    finalStatus = result.owner_email
      ? t('admin.stableCreated', { stable: result.stable_name || body.stable_name, owner: result.owner_email })
      : t('admin.stableCreatedNoOwner', { stable: result.stable_name || body.stable_name });
    showMessage(finalStatus);
  } catch (error) {
    console.error('[EquiTrack admin] Create stable failed', error);
    finalStatus = t('admin.stableFailed', { error: error.message || 'Unknown error' });
    showMessage(finalStatus);
  } finally {
    if (els.adminStableStatus) delete els.adminStableStatus.dataset.busy;
    renderAdminStableForm();
    if (els.adminStableStatus && finalStatus) els.adminStableStatus.textContent = finalStatus;
  }
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

async function getOptionalCloudTableCount(table, stableId) {
  try {
    return await getCloudTableCount(table, stableId);
  } catch (error) {
    if (isMissingCloudTableError(error)) {
      console.warn(`[EquiTrack cloud] Optional table ${table} is not available yet. Run the latest Supabase migration.`, error);
      return 0;
    }
    throw error;
  }
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
    const [horses, tasks, hours, inventory, events, care] = await Promise.all([
      getCloudTableCount('horses', stableId),
      getCloudTableCount('tasks', stableId),
      getCloudTableCount('work_logs', stableId),
      getCloudTableCount('feed_items', stableId),
      getCloudTableCount('calendar_events', stableId),
      getOptionalCloudTableCount('horse_care_history', stableId)
    ]);
    cloudReadCounts = { horses, tasks, hours, inventory, events, care };
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
  const currentUser = getCurrentUser();
  let modeText = t('cloudMode.localStatus');
  if (authRestoring) modeText = t('auth.restoring');
  else if (stableLoading || cloudState.status === 'loading') modeText = t('cloud.loadingStable');
  else if (cloudDataLoading || cloudState.status === 'loadingCloud') modeText = t('cloud.loadingData');
  else if (cloudPreviewMode) modeText = t('cloudMode.previewStatus');
  else if (cloudWriteMode) modeText = t('cloudMode.cloudStatus');
  else if (cloudUnavailable || cloudState.status === 'error' || cloudState.status === 'permissionBlocked') modeText = t('cloudMode.unavailableStatus');
  if (els.dataModeStatus) {
    els.dataModeStatus.textContent = modeText;
    els.dataModeStatus.classList.toggle('cloud-preview-active', cloudPreviewMode || cloudWriteMode);
  }
  if (els.cloudModeCurrent) els.cloudModeCurrent.textContent = modeText;
  if (els.cloudModeStableName) els.cloudModeStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.cloudModeEmail) els.cloudModeEmail.textContent = currentUser?.email || t('auth.signedOut');
  const canReturnToCloud = Boolean(currentUser && activeStable.id && !cloudWriteMode && !cloudPreviewMode);
  if (els.cloudModePreviewButton) els.cloudModePreviewButton.disabled = !canReturnToCloud;
  if (els.cloudModeLocalButton) els.cloudModeLocalButton.hidden = !cloudWriteMode && !cloudPreviewMode;
  if (els.cloudModeReturnButton) {
    els.cloudModeReturnButton.hidden = !canReturnToCloud;
    els.cloudModeReturnButton.disabled = !canReturnToCloud;
  }
  if (els.cloudModeStatus) {
    els.cloudModeStatus.textContent = cloudModeStatusText || (canReturnToCloud ? t('cloudMode.returnReady') : t('cloudMode.notReady'));
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

function isMissingCloudTableError(error) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`.toLowerCase();
  return error?.code === '42P01' || error?.code === 'PGRST205' || message.includes('could not find the table');
}

async function fetchOptionalCloudRows(table, stableId, orderColumn = 'created_at') {
  try {
    return await fetchCloudRows(table, stableId, orderColumn);
  } catch (error) {
    if (isMissingCloudTableError(error)) {
      console.warn(`[EquiTrack cloud] Optional table ${table} is not available yet. Run the latest Supabase migration.`, error);
      return [];
    }
    throw error;
  }
}

async function fetchOptionalGlobalRows(table, orderColumn = 'created_at') {
  try {
    const { data, error } = await supabaseClient
      .from(table)
      .select('*')
      .order(orderColumn, { ascending: true });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (isMissingCloudTableError(error)) {
      console.warn(`[EquiTrack cloud] Optional global table ${table} is not available yet. Run the latest Supabase migration.`, error);
      return [];
    }
    throw error;
  }
}

function mapCloudHorse(row) {
  const horse = normalizeHorse({
    id: row.local_id || row.id,
    cloudId: row.id,
    racingHorseId: row.racing_horse_id,
    name: row.name,
    nickname: row.nickname,
    owner: row.owner,
    breed: row.breed,
    birth: row.date_of_birth,
    gender: row.gender,
    color: row.color,
    registration: row.registration_number,
    countryOfOrigin: row.country_of_origin,
    totalEarnings: row.total_earnings,
    last5Earnings: row.last_5_earnings,
    racingCategory: row.racing_category,
    trainerName: row.trainer_name,
    ownerName: row.owner_name,
    defaultDriver: row.default_driver,
    racingNotes: row.racing_notes,
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
    cloudId: row.id,
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
    cloudId: row.id,
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
    result: row.race_result,
    prize: row.prize,
    postRaceNotes: row.post_race_notes
  });
}

function mapCloudCareRecord(row, horseIdMap) {
  return normalizeCareRecord({
    id: row.local_id || row.id,
    cloudId: row.id,
    horseId: horseIdMap.get(row.horse_id) || '',
    date: row.care_date,
    type: row.care_type,
    title: row.title,
    notes: row.notes,
    nextDueDate: row.next_due_date,
    cost: row.cost,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

function mapCloudRaceOpportunity(row) {
  return normalizeRaceOpportunity({
    id: row.local_id || row.id,
    cloudId: row.id,
    racetrackName: row.racetrack_name,
    raceDate: row.race_date,
    raceNumber: row.race_number,
    raceName: row.race_name,
    raceClass: row.race_class,
    distance: row.distance,
    startMethod: row.start_method,
    prizeInfo: row.prize_info,
    eligibilityNotes: row.eligibility_notes,
    entryDeadline: row.entry_deadline,
    contactEmail: row.contact_email,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

function mapCloudRacePlan(row, opportunityIdMap, horseIdMap) {
  return normalizeRacePlan({
    id: row.local_id || row.id,
    cloudId: row.id,
    opportunityId: opportunityIdMap.get(row.opportunity_id) || '',
    programRaceId: row.race_program_race_id || '',
    horseId: horseIdMap.get(row.horse_id) || '',
    driver: row.driver,
    trainer: row.trainer_contact,
    notes: row.notes,
    status: row.status,
    emailSubject: row.email_subject,
    emailBody: row.email_body,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

function mapCloudRaceProgram(row) {
  return normalizeRaceProgram(row);
}

function mapCloudRaceProgramRace(row) {
  return normalizeRaceProgramRace(row);
}

function mapCloudRacingHorse(row) {
  return normalizeRacingHorse(row);
}

function mapCloudRacingHorseStart(row) {
  return normalizeRacingHorseStart(row);
}

async function loadCloudSnapshot(stableId) {
  const [horseRows, taskRows, workRows, feedRows, eventRows, careRows, raceOpportunityRows, racePlanRows, programRows, programRaceRows, racingHorseRows, racingHorseStartRows] = await Promise.all([
    fetchCloudRows('horses', stableId),
    fetchCloudRows('tasks', stableId),
    fetchCloudRows('work_logs', stableId),
    fetchCloudRows('feed_items', stableId),
    fetchCloudRows('calendar_events', stableId, 'date'),
    fetchOptionalCloudRows('horse_care_history', stableId, 'care_date'),
    fetchOptionalCloudRows('race_entry_opportunities', stableId, 'race_date'),
    fetchOptionalCloudRows('race_entry_plans', stableId, 'created_at'),
    fetchOptionalGlobalRows('race_programs', 'created_at'),
    fetchOptionalGlobalRows('race_program_races', 'race_date'),
    fetchOptionalGlobalRows('racing_horses', 'horse_name'),
    fetchOptionalGlobalRows('racing_horse_starts', 'race_date')
  ]);
  const horses = horseRows.map(mapCloudHorse);
  const horseIdMap = new Map(horseRows.map((row, index) => [row.id, horses[index].id]));
  const raceEntryOpportunities = raceOpportunityRows.map(mapCloudRaceOpportunity);
  const opportunityIdMap = new Map(raceOpportunityRows.map((row, index) => [row.id, raceEntryOpportunities[index].id]));
  racePrograms = programRows.map(mapCloudRaceProgram);
  raceProgramRaces = programRaceRows.map(mapCloudRaceProgramRace);
  racingHorses = racingHorseRows.map(mapCloudRacingHorse);
  racingHorseStarts = racingHorseStartRows.map(mapCloudRacingHorseStart);
  return {
    horses,
    tasks: taskRows.map((row) => mapCloudTask(row, horseIdMap)),
    hours: workRows.map((row) => mapCloudWorkLog(row, horseIdMap)),
    inventory: feedRows.map(mapCloudFeedItem),
    calendarEvents: eventRows.map((row) => mapCloudCalendarEvent(row, horseIdMap)),
    careHistory: careRows.map((row) => mapCloudCareRecord(row, horseIdMap)),
    raceEntryOpportunities,
    raceEntryPlans: racePlanRows.map((row) => mapCloudRacePlan(row, opportunityIdMap, horseIdMap))
  };
}

async function enableCloudModePreview() {
  if (horseCloudWriteMode) returnHorseWritesToLocalMode();
  if (taskCloudWriteMode) returnTaskWritesToLocalMode();
  if (workCloudWriteMode) returnWorkWritesToLocalMode();
  if (feedCloudWriteMode) returnFeedWritesToLocalMode();
  if (calendarCloudWriteMode) returnCalendarWritesToLocalMode();
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

async function enableCloudMode(options = {}) {
  const { automatic = false, navigateToStable = false } = options;
  const activeStable = getActiveStable();
  if (!getCurrentUser() || !activeStable.id) {
    cloudModeStatusText = t('cloudMode.notReady');
    renderCloudMode();
    if (!automatic) showMessage(cloudModeStatusText);
    return;
  }
  cloudDataLoading = true;
  cloudUnavailable = false;
  cloudModeStatusText = t(automatic ? 'cloudMode.autoLoading' : 'cloudMode.loading');
  setCloudStatus({
    status: 'loadingCloud',
    messageKey: 'cloud.loadingData'
  });
  renderCloudMode();
  try {
    state = await retryOnce(() => loadCloudSnapshot(activeStable.id), 'Cloud data load');
    cloudWriteMode = true;
    cloudPreviewMode = false;
    cloudDataLoading = false;
    cloudUnavailable = false;
    cloudLocalOverride = false;
    localStorage.removeItem(CLOUD_LOCAL_OVERRIDE_KEY);
    horseCloudWriteMode = false;
    taskCloudWriteMode = false;
    workCloudWriteMode = false;
    feedCloudWriteMode = false;
    calendarCloudWriteMode = false;
    cloudModeStatusText = t('cloudMode.enabled');
    cloudReadCounts = getCounts(state);
    setCloudStatus({
      status: 'connected',
      stableId: activeStable.id,
      stableName: activeStable.name,
      messageKey: 'cloud.connectedAs'
    });
    render();
    if (navigateToStable) showView('stable');
    if (!automatic) showMessage(cloudModeStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Cloud mode failed', error);
    state = loadData();
    cloudWriteMode = false;
    cloudPreviewMode = false;
    cloudDataLoading = false;
    cloudUnavailable = true;
    cloudModeStatusText = t('cloudMode.failed');
    setCloudStatus({
      status: 'connected',
      stableId: activeStable.id,
      stableName: activeStable.name,
      messageKey: 'cloud.connectedAs'
    });
    render();
    showMessage(t('cloudMode.cloudUnavailable'));
  }
}

function disableCloudMode(messageKey = 'cloudMode.returnedLocal') {
  state = loadData();
  cloudPreviewMode = false;
  cloudWriteMode = false;
  cloudUnavailable = false;
  cloudModeStatusText = t(messageKey);
  render();
  showMessage(cloudModeStatusText);
}

function useLocalModeOnThisDevice() {
  cloudLocalOverride = true;
  localStorage.setItem(CLOUD_LOCAL_OVERRIDE_KEY, 'true');
  disableCloudMode('cloudMode.localOverride');
}

async function returnToCloudMode() {
  cloudLocalOverride = false;
  localStorage.removeItem(CLOUD_LOCAL_OVERRIDE_KEY);
  await enableCloudMode({ navigateToStable: false });
}

function returnToLocalDataMode() {
  useLocalModeOnThisDevice();
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
    racing_horse_id: horse.racingHorseId || null,
    name: horse.name,
    nickname: cleanText(horse.nickname),
    owner: cleanText(horse.owner),
    breed: cleanText(horse.breed),
    date_of_birth: cleanText(horse.birth),
    gender: cleanText(horse.gender),
    color: cleanText(horse.color),
    registration_number: cleanText(horse.registration),
    country_of_origin: cleanText(horse.countryOfOrigin),
    total_earnings: horse.totalEarnings === '' ? null : toSafeNumber(horse.totalEarnings, 0),
    last_5_earnings: horse.last5Earnings === '' ? null : toSafeNumber(horse.last5Earnings, 0),
    racing_category: cleanText(horse.racingCategory),
    trainer_name: cleanText(horse.trainerName),
    owner_name: cleanText(horse.ownerName),
    default_driver: cleanText(horse.defaultDriver),
    racing_notes: cleanText(horse.racingNotes),
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
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getCloudErrorMessage(error);
    horseCloudStatusText = t('horseCloud.loadFailed', { error: errorMessage });
    horseCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
  const data = await executeCloudMutation('horses', 'horse save', () => {
    const request = rawHorse.cloudId
      ? supabaseClient
        .from('horses')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawHorse.cloudId)
      : supabaseClient
        .from('horses')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
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
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('horseCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteHorseFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const horse = state.horses.find((entry) => entry.id === id);
  if (!horse) return;
  await executeCloudMutation('horses', 'horse delete', () => {
    let query = supabaseClient.from('horses').delete().eq('stable_id', activeStable.id);
    query = horse.cloudId ? query.eq('id', horse.cloudId) : query.eq('local_id', horse.id);
    return query.select('id');
  });
}

async function handleCloudHorseDelete(id) {
  if (!confirmDelete(t('delete.horse'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('horse-delete', id);
  if (!lockKey) return;
  try {
    await deleteHorseFromCloud(id);
    state.horses = state.horses.filter((horse) => horse.id !== id);
    state.careHistory = state.careHistory.filter((record) => record.horseId !== id);
    state.raceEntryPlans = state.raceEntryPlans.filter((plan) => plan.horseId !== id);
    render();
    showMessage(t('horseCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Horse delete failed', error);
    const errorMessage = isPermissionError(error) ? t('horseCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('horseCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
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
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getCloudErrorMessage(error);
    taskCloudStatusText = t('taskCloud.loadFailed', { error: errorMessage });
    taskCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
  const data = await executeCloudMutation('tasks', 'task save', () => {
    const request = rawTask.cloudId
      ? supabaseClient
        .from('tasks')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawTask.cloudId)
      : supabaseClient
        .from('tasks')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
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
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('taskCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteTaskFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  await executeCloudMutation('tasks', 'task delete', () => {
    let query = supabaseClient.from('tasks').delete().eq('stable_id', activeStable.id);
    query = task.cloudId ? query.eq('id', task.cloudId) : query.eq('local_id', task.id);
    return query.select('id');
  });
}

async function handleCloudTaskDelete(id) {
  if (!confirmDelete(t('delete.task'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('task-delete', id);
  if (!lockKey) return;
  try {
    await deleteTaskFromCloud(id);
    state.tasks = state.tasks.filter((task) => task.id !== id);
    render();
    showMessage(t('taskCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Task delete failed', error);
    const errorMessage = isPermissionError(error) ? t('taskCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('taskCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
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
      hours: await loadCloudWorkLogs(gate.activeStable.id),
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getCloudErrorMessage(error);
    workCloudStatusText = t('workCloud.loadFailed', { error: errorMessage });
    workCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
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
  const data = await executeCloudMutation('work_logs', 'work log save', () => {
    const request = rawEntry.cloudId
      ? supabaseClient
        .from('work_logs')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawEntry.cloudId)
      : supabaseClient
        .from('work_logs')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
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
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('workCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteWorkLogFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const entry = state.hours.find((item) => item.id === id);
  if (!entry) return;
  await executeCloudMutation('work_logs', 'work log delete', () => {
    let query = supabaseClient.from('work_logs').delete().eq('stable_id', activeStable.id);
    query = entry.cloudId ? query.eq('id', entry.cloudId) : query.eq('local_id', entry.id);
    return query.select('id');
  });
}

async function handleCloudWorkLogDelete(id) {
  if (!confirmDelete(t('delete.hours'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('work-log-delete', id);
  if (!lockKey) return;
  try {
    await deleteWorkLogFromCloud(id);
    state.hours = state.hours.filter((entry) => entry.id !== id);
    render();
    showMessage(t('workCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Work log delete failed', error);
    const errorMessage = isPermissionError(error) ? t('workCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('workCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
  }
}

function getFeedCloudGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.feedCloudConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'FEED CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly FEED CLOUD');
  if (cloudPreviewMode) reasons.push('cloud preview is read-only');
  if (feedCloudWriteMode) reasons.push('feed cloud writes already enabled');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    canEnable: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderFeedCloudMode() {
  const activeStable = getActiveStable();
  const gate = getFeedCloudGate();
  const modeText = feedCloudWriteMode ? t('feedCloud.cloudMode') : t('feedCloud.localMode');
  if (els.feedCloudCurrent) els.feedCloudCurrent.textContent = modeText;
  if (els.feedCloudStableName) els.feedCloudStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.feedCloudEnableButton) els.feedCloudEnableButton.disabled = !gate.canEnable;
  if (els.feedCloudLocalButton) els.feedCloudLocalButton.hidden = !feedCloudWriteMode;
  if (els.feedCloudStatus) {
    els.feedCloudStatus.textContent = feedCloudStatusText || (gate.canEnable ? t('feedCloud.ready') : t('feedCloud.notReady'));
  }
}

function handleFeedCloudConfirmationChange() {
  feedCloudStatusText = '';
  renderFeedCloudMode();
}

function feedItemToCloudRow(stableId, rawItem) {
  const item = normalizeFeedItem(rawItem);
  return {
    stable_id: stableId,
    local_id: item.id || createId(),
    name: cleanText(item.name) || 'Unnamed feed',
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
}

async function loadCloudFeedItems(stableId) {
  const rows = await fetchCloudRows('feed_items', stableId);
  return rows.map(mapCloudFeedItem);
}

async function enableFeedCloudWrites() {
  const gate = getFeedCloudGate();
  if (!gate.canEnable) {
    showMessage(t('feedCloud.notReady'));
    renderFeedCloudMode();
    return;
  }
  feedCloudStatusText = t('feedCloud.loading');
  renderFeedCloudMode();
  try {
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: await loadCloudFeedItems(gate.activeStable.id),
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
    };
    feedCloudWriteMode = true;
    if (els.feedCloudConfirmInput) els.feedCloudConfirmInput.value = '';
    feedCloudStatusText = t('feedCloud.enabled');
    render();
    showView('stable');
    activateTab('inventory');
    showMessage(feedCloudStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Feed inventory cloud mode failed', error);
    const errorMessage = isPermissionError(error) ? t('feedCloud.permissionBlocked') : getCloudErrorMessage(error);
    feedCloudStatusText = t('feedCloud.loadFailed', { error: errorMessage });
    feedCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      calendarEvents: calendarCloudWriteMode ? state.calendarEvents : localData.calendarEvents
    };
    render();
    showMessage(feedCloudStatusText);
  }
}

function returnFeedWritesToLocalMode() {
  state = { ...state, inventory: loadData().inventory };
  feedCloudWriteMode = false;
  feedCloudStatusText = t('feedCloud.returnedLocal');
  render();
  showMessage(feedCloudStatusText);
}

async function saveFeedItemToCloud(rawItem) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = feedItemToCloudRow(activeStable.id, rawItem);
  const data = await executeCloudMutation('feed_items', 'feed item save', () => {
    const request = rawItem.cloudId
      ? supabaseClient
        .from('feed_items')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawItem.cloudId)
      : supabaseClient
        .from('feed_items')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
  return mapCloudFeedItem(data);
}

async function handleCloudFeedItemSave(rawItem, successMessage = t('feedCloud.saved')) {
  try {
    const savedItem = await saveFeedItemToCloud(rawItem);
    const normalizedInput = normalizeFeedItem(rawItem);
    const mergedItem = {
      ...savedItem,
      horseIds: normalizedInput.horseIds,
      perHorseUsage: normalizedInput.perHorseUsage,
      shoppingListed: normalizedInput.shoppingListed,
      lastUpdated: normalizedInput.lastUpdated,
      history: normalizedInput.history
    };
    const existingIndex = state.inventory.findIndex((item) => item.id === mergedItem.id);
    if (existingIndex >= 0) state.inventory[existingIndex] = mergedItem;
    else state.inventory.push(mergedItem);
    render();
    showMessage(successMessage);
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Feed inventory save failed', error);
    const errorMessage = isPermissionError(error) ? t('feedCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('feedCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteFeedItemFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const item = state.inventory.find((entry) => entry.id === id);
  if (!item) return;
  await executeCloudMutation('feed_items', 'feed item delete', () => {
    let query = supabaseClient.from('feed_items').delete().eq('stable_id', activeStable.id);
    query = item.cloudId ? query.eq('id', item.cloudId) : query.eq('local_id', item.id);
    return query.select('id');
  });
}

async function handleCloudFeedItemDelete(id) {
  if (!confirmDelete(t('delete.inventory'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('feed-delete', id);
  if (!lockKey) return;
  try {
    await deleteFeedItemFromCloud(id);
    state.inventory = state.inventory.filter((item) => item.id !== id);
    render();
    showMessage(t('feedCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Feed inventory delete failed', error);
    const errorMessage = isPermissionError(error) ? t('feedCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('feedCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
  }
}

function getCalendarCloudGate() {
  const currentUser = getCurrentUser();
  const activeStable = getActiveStable();
  const confirmationValue = els.calendarCloudConfirmInput?.value || '';
  const confirmationReady = confirmationValue === 'CALENDAR CLOUD';
  const reasons = [];
  if (!currentUser) reasons.push('missing auth user');
  if (!activeStable.id) reasons.push('missing active stable id');
  if (!confirmationReady) reasons.push('confirmation is not exactly CALENDAR CLOUD');
  if (cloudPreviewMode) reasons.push('cloud preview is read-only');
  if (calendarCloudWriteMode) reasons.push('calendar cloud writes already enabled');
  return {
    currentUserExists: Boolean(currentUser),
    activeStable,
    confirmationValue,
    canEnable: reasons.length === 0,
    reason: reasons.length ? reasons.join('; ') : 'enabled'
  };
}

function renderCalendarCloudMode() {
  const activeStable = getActiveStable();
  const gate = getCalendarCloudGate();
  const modeText = calendarCloudWriteMode ? t('calendarCloud.cloudMode') : t('calendarCloud.localMode');
  if (els.calendarCloudCurrent) els.calendarCloudCurrent.textContent = modeText;
  if (els.calendarCloudStableName) els.calendarCloudStableName.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.calendarCloudEnableButton) els.calendarCloudEnableButton.disabled = !gate.canEnable;
  if (els.calendarCloudLocalButton) els.calendarCloudLocalButton.hidden = !calendarCloudWriteMode;
  if (els.calendarCloudStatus) {
    els.calendarCloudStatus.textContent = calendarCloudStatusText || (gate.canEnable ? t('calendarCloud.ready') : t('calendarCloud.notReady'));
  }
}

function handleCalendarCloudConfirmationChange() {
  calendarCloudStatusText = '';
  renderCalendarCloudMode();
}

function getCloudHorseIdsForCalendarEvent(event) {
  return event.horseIds
    .map((horseId) => state.horses.find((horse) => horse.id === horseId)?.cloudId)
    .filter(Boolean);
}

function calendarEventToCloudRow(stableId, rawEvent, horseIdMap = null) {
  const event = normalizeCalendarEvent(rawEvent);
  const horseIds = horseIdMap
    ? event.horseIds.map((horseId) => horseIdMap.get(horseId)).filter(Boolean)
    : getCloudHorseIdsForCalendarEvent(event);
  return {
    stable_id: stableId,
    local_id: event.id || createId(),
    date: isValidDate(event.date) || today(),
    time: cleanText(event.time),
    name: cleanText(event.name) || 'Untitled event',
    event_type: event.type,
    location: cleanText(event.location),
    horse_ids: horseIds,
    handler: cleanText(event.handler),
    notes: cleanText(event.notes),
    race_number: cleanText(event.raceNumber),
    start_number: cleanText(event.startNumber),
    driver: cleanText(event.driver),
    placement: cleanText(event.placement),
    race_result: cleanText(event.result),
    prize: cleanText(event.prize),
    post_race_notes: cleanText(event.postRaceNotes)
  };
}

function careRecordToCloudRow(stableId, rawRecord, horseIdMap = null) {
  const record = normalizeCareRecord(rawRecord);
  const horseId = horseIdMap
    ? horseIdMap.get(record.horseId)
    : state.horses.find((horse) => horse.id === record.horseId)?.cloudId;
  return {
    stable_id: stableId,
    local_id: record.id || createId(),
    horse_id: horseId || null,
    care_date: isValidDate(record.date) || today(),
    care_type: record.type,
    title: cleanText(record.title),
    notes: cleanText(record.notes),
    next_due_date: isValidDate(record.nextDueDate),
    cost: nullableNumber(record.cost)
  };
}

function raceOpportunityToCloudRow(stableId, rawOpportunity) {
  const opportunity = normalizeRaceOpportunity(rawOpportunity);
  return {
    stable_id: stableId,
    local_id: opportunity.id || createId(),
    racetrack_name: cleanText(opportunity.racetrackName) || 'Unnamed racetrack',
    race_date: isValidDate(opportunity.raceDate) || today(),
    race_number: cleanText(opportunity.raceNumber),
    race_name: cleanText(opportunity.raceName),
    race_class: cleanText(opportunity.raceClass),
    distance: cleanText(opportunity.distance),
    start_method: cleanText(opportunity.startMethod),
    prize_info: cleanText(opportunity.prizeInfo),
    eligibility_notes: cleanText(opportunity.eligibilityNotes),
    entry_deadline: isValidDate(opportunity.entryDeadline),
    contact_email: cleanText(opportunity.contactEmail),
    notes: cleanText(opportunity.notes)
  };
}

function racePlanToCloudRow(stableId, rawPlan) {
  const plan = normalizeRacePlan(rawPlan);
  const opportunity = state.raceEntryOpportunities.find((entry) => entry.id === plan.opportunityId);
  const horse = state.horses.find((entry) => entry.id === plan.horseId);
  return {
    stable_id: stableId,
    local_id: plan.id || createId(),
    opportunity_id: opportunity?.cloudId || null,
    race_program_race_id: plan.programRaceId || null,
    horse_id: horse?.cloudId || null,
    driver: cleanText(plan.driver),
    trainer_contact: cleanText(plan.trainer),
    notes: cleanText(plan.notes),
    status: RACE_ENTRY_STATUSES.includes(plan.status) ? plan.status : 'draft',
    email_subject: cleanText(plan.emailSubject),
    email_body: cleanText(plan.emailBody)
  };
}

function raceProgramToCloudRow(rawProgram) {
  const program = normalizeRaceProgram(rawProgram);
  return {
    title: cleanText(program.title) || 'Untitled race program',
    racetrack_name: cleanText(program.racetrackName) || 'Unnamed racetrack',
    location_city: cleanText(program.locationCity),
    location_country: cleanText(program.locationCountry),
    program_month: cleanText(program.programMonth),
    source_file_name: cleanText(program.sourceFileName),
    status: ['draft', 'published', 'archived'].includes(program.status) ? program.status : 'draft',
    created_by: getCurrentUser()?.id || null
  };
}

function raceProgramRaceToCloudRow(programId, rawRace) {
  const race = normalizeRaceOpportunity(rawRace);
  return {
    program_id: programId,
    race_date: isValidDate(race.raceDate) || today(),
    race_number: cleanText(race.raceNumber),
    race_name: cleanText(race.raceName),
    race_class: cleanText(race.raceClass),
    distance: cleanText(race.distance),
    start_method: cleanText(race.startMethod),
    prize_info: cleanText(race.prizeInfo),
    eligibility_notes: cleanText(race.eligibilityNotes),
    entry_deadline: isValidDate(race.entryDeadline),
    contact_email: cleanText(race.contactEmail),
    notes: cleanText(race.notes),
    imported_local_id: race.id || createRaceImportLocalId(race)
  };
}

function racingHorseToCloudRow(rawHorse) {
  const horse = normalizeRacingHorse(rawHorse);
  const intOrNull = (value) => value === '' || value == null ? null : toSafeNumber(value, null);
  const moneyOrNull = (value) => value === '' || value == null ? null : toSafeNumber(value, null);
  return {
    registration_number: cleanText(horse.registrationNumber) || null,
    horse_name: cleanText(horse.horseName) || 'Unnamed horse',
    birth_date: isValidDate(horse.birthDate),
    birth_year: horse.birthYear === '' ? null : toSafeNumber(horse.birthYear, null),
    gender: cleanText(horse.gender || 'unknown'),
    country_of_origin: cleanText(horse.countryOfOrigin),
    total_earnings: horse.totalEarnings === '' ? 0 : toSafeNumber(horse.totalEarnings, 0),
    last_5_earnings: horse.last5Earnings === '' ? null : toSafeNumber(horse.last5Earnings, 0),
    career_starts: intOrNull(horse.careerStarts),
    career_wins: intOrNull(horse.careerWins),
    career_places: intOrNull(horse.careerPlaces),
    career_show: intOrNull(horse.careerShow),
    career_earnings: moneyOrNull(horse.careerEarnings),
    twelve_month_starts: intOrNull(horse.twelveMonthStarts),
    twelve_month_wins: intOrNull(horse.twelveMonthWins),
    twelve_month_places: intOrNull(horse.twelveMonthPlaces),
    twelve_month_show: intOrNull(horse.twelveMonthShow),
    twelve_month_earnings: moneyOrNull(horse.twelveMonthEarnings),
    year_starts: intOrNull(horse.yearStarts),
    year_wins: intOrNull(horse.yearWins),
    year_places: intOrNull(horse.yearPlaces),
    year_show: intOrNull(horse.yearShow),
    year_earnings: moneyOrNull(horse.yearEarnings),
    two_month_starts: intOrNull(horse.twoMonthStarts),
    two_month_wins: intOrNull(horse.twoMonthWins),
    two_month_places: intOrNull(horse.twoMonthPlaces),
    two_month_show: intOrNull(horse.twoMonthShow),
    two_month_earnings: moneyOrNull(horse.twoMonthEarnings),
    career_record: cleanText(horse.careerRecord),
    twelve_month_record: cleanText(horse.twelveMonthRecord),
    year_record: cleanText(horse.yearRecord),
    short_distance_record: cleanText(horse.shortDistanceRecord),
    long_distance_record: cleanText(horse.longDistanceRecord),
    category_mc: cleanText(horse.categoryMc),
    category_ms: cleanText(horse.categoryMs),
    potential_mc: cleanText(horse.potentialMc),
    potential_ms: cleanText(horse.potentialMs),
    reclaim_allowed: Boolean(horse.reclaimAllowed),
    racing_category: cleanText(horse.racingCategory),
    trainer_name: cleanText(horse.trainerName),
    owner_name: cleanText(horse.ownerName),
    default_driver: cleanText(horse.defaultDriver),
    notes: cleanText(horse.notes),
    last_results_update: isValidDate(horse.lastResultsUpdate),
    created_by: getCurrentUser()?.id || null
  };
}

function racingHorseStartToCloudRow(rawStart) {
  const start = normalizeRacingHorseStart(rawStart);
  return {
    racing_horse_id: start.racingHorseId,
    race_date: isValidDate(start.raceDate),
    racetrack_code: cleanText(start.racetrackCode),
    racetrack_name: cleanText(start.racetrackName),
    race_code: cleanText(start.raceCode),
    driver_name: cleanText(start.driverName),
    placement: cleanText(start.placement),
    kilometer_time: cleanText(start.kilometerTime),
    distance: start.distance === '' ? null : toSafeNumber(start.distance, null),
    starters_info: cleanText(start.startersInfo),
    shoeing: cleanText(start.shoeing),
    net_prize: start.netPrize === '' ? null : toSafeNumber(start.netPrize, null),
    gross_prize: start.grossPrize === '' ? null : toSafeNumber(start.grossPrize, null),
    race_notes: cleanText(start.raceNotes),
    video_url: cleanText(start.videoUrl)
  };
}

async function saveRacingHorseToCloud(rawHorse) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  const row = racingHorseToCloudRow(rawHorse);
  const data = await executeCloudMutation('racing_horses', 'racing horse save', () => {
    const request = rawHorse.id
      ? supabaseClient.from('racing_horses').update(row).eq('id', rawHorse.id)
      : supabaseClient.from('racing_horses').insert(row);
    return request.select('*').single();
  });
  return mapCloudRacingHorse(data);
}

async function saveRacingHorseStartToCloud(rawStart) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  const row = racingHorseStartToCloudRow(rawStart);
  const data = await executeCloudMutation('racing_horse_starts', 'racing horse start save', () => {
    const request = rawStart.id
      ? supabaseClient.from('racing_horse_starts').update(row).eq('id', rawStart.id)
      : supabaseClient.from('racing_horse_starts').insert(row);
    return request.select('*').single();
  });
  return mapCloudRacingHorseStart(data);
}

async function deleteRacingHorseStartFromCloud(id) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  await executeCloudMutation('racing_horse_starts', 'racing horse start delete', () => supabaseClient
    .from('racing_horse_starts')
    .delete()
    .eq('id', id));
}

async function saveRaceProgramToCloud(rawProgram) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  const row = raceProgramToCloudRow(rawProgram);
  const data = await executeCloudMutation('race_programs', 'race program save', () => {
    const request = rawProgram.id
      ? supabaseClient.from('race_programs').update(row).eq('id', rawProgram.id)
      : supabaseClient.from('race_programs').insert(row);
    return request.select('*').single();
  });
  return mapCloudRaceProgram(data);
}

async function updateRaceProgramStatus(programId, status) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  const data = await executeCloudMutation('race_programs', 'race program status', () => supabaseClient
    .from('race_programs')
    .update({ status })
    .eq('id', programId)
    .select('*')
    .single());
  return mapCloudRaceProgram(data);
}

async function saveGlobalRaceToCloud(programId, rawRace) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  const row = raceProgramRaceToCloudRow(programId, rawRace);
  const data = await executeCloudMutation('race_program_races', 'global race save', () => {
    const request = rawRace.globalRaceId
      ? supabaseClient.from('race_program_races').update(row).eq('id', rawRace.globalRaceId)
      : supabaseClient.from('race_program_races').upsert(row, { onConflict: 'program_id,imported_local_id' });
    return request.select('*').single();
  });
  return mapCloudRaceProgramRace(data);
}

async function deleteGlobalRaceFromCloud(id) {
  if (!isSuperAdmin()) throw new Error(t('auth.unauthorized'));
  await executeCloudMutation('race_program_races', 'global race delete', () => supabaseClient
    .from('race_program_races')
    .delete()
    .eq('id', id)
    .select('id'));
}

async function loadCloudCalendarEvents(stableId) {
  const rows = await fetchCloudRows('calendar_events', stableId, 'date');
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return rows.map((row) => mapCloudCalendarEvent(row, horseIdMap));
}

async function enableCalendarCloudWrites() {
  const gate = getCalendarCloudGate();
  if (!gate.canEnable) {
    showMessage(t('calendarCloud.notReady'));
    renderCalendarCloudMode();
    return;
  }
  calendarCloudStatusText = t('calendarCloud.loading');
  renderCalendarCloudMode();
  try {
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory,
      calendarEvents: await loadCloudCalendarEvents(gate.activeStable.id)
    };
    calendarCloudWriteMode = true;
    if (els.calendarCloudConfirmInput) els.calendarCloudConfirmInput.value = '';
    calendarCloudStatusText = t('calendarCloud.enabled');
    render();
    showView('calendar');
    showMessage(calendarCloudStatusText);
  } catch (error) {
    console.error('[EquiTrack cloud] Calendar cloud mode failed', error);
    const errorMessage = isPermissionError(error) ? t('calendarCloud.permissionBlocked') : getCloudErrorMessage(error);
    calendarCloudStatusText = t('calendarCloud.loadFailed', { error: errorMessage });
    calendarCloudWriteMode = false;
    const localData = loadData();
    state = {
      ...localData,
      horses: horseCloudWriteMode ? state.horses : localData.horses,
      tasks: taskCloudWriteMode ? state.tasks : localData.tasks,
      hours: workCloudWriteMode ? state.hours : localData.hours,
      inventory: feedCloudWriteMode ? state.inventory : localData.inventory
    };
    render();
    showMessage(calendarCloudStatusText);
  }
}

function returnCalendarWritesToLocalMode() {
  state = { ...state, calendarEvents: loadData().calendarEvents };
  calendarCloudWriteMode = false;
  calendarCloudStatusText = t('calendarCloud.returnedLocal');
  render();
  showMessage(calendarCloudStatusText);
}

async function saveCalendarEventToCloud(rawEvent) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = calendarEventToCloudRow(activeStable.id, rawEvent);
  const data = await executeCloudMutation('calendar_events', 'calendar event save', () => {
    const request = rawEvent.cloudId
      ? supabaseClient
        .from('calendar_events')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawEvent.cloudId)
      : supabaseClient
        .from('calendar_events')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return mapCloudCalendarEvent(data, horseIdMap);
}

async function handleCloudCalendarEventSave(rawEvent) {
  try {
    const savedEvent = await saveCalendarEventToCloud(rawEvent);
    const existingIndex = state.calendarEvents.findIndex((entry) => entry.id === savedEvent.id);
    if (existingIndex >= 0) state.calendarEvents[existingIndex] = savedEvent;
    else state.calendarEvents.push(savedEvent);
    render();
    showMessage(t('calendarCloud.saved'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Calendar event save failed', error);
    const errorMessage = isPermissionError(error) ? t('calendarCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('calendarCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteCalendarEventFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const calendarEvent = state.calendarEvents.find((entry) => entry.id === id);
  if (!calendarEvent) return;
  await executeCloudMutation('calendar_events', 'calendar event delete', () => {
    let query = supabaseClient.from('calendar_events').delete().eq('stable_id', activeStable.id);
    query = calendarEvent.cloudId ? query.eq('id', calendarEvent.cloudId) : query.eq('local_id', calendarEvent.id);
    return query.select('id');
  });
}

async function handleCloudCalendarEventDelete(id) {
  if (!confirmDelete(t('delete.event'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('calendar-delete', id);
  if (!lockKey) return;
  try {
    await deleteCalendarEventFromCloud(id);
    state.calendarEvents = state.calendarEvents.filter((entry) => entry.id !== id);
    render();
    showMessage(t('calendarCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Calendar event delete failed', error);
    const errorMessage = isPermissionError(error) ? t('calendarCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('calendarCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
  }
}

async function saveCareRecordToCloud(rawRecord) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = careRecordToCloudRow(activeStable.id, rawRecord);
  const data = await executeCloudMutation('horse_care_history', 'care history save', () => {
    const request = rawRecord.cloudId
      ? supabaseClient
        .from('horse_care_history')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawRecord.cloudId)
      : supabaseClient
        .from('horse_care_history')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return mapCloudCareRecord(data, horseIdMap);
}

async function handleCloudCareRecordSave(rawRecord) {
  try {
    const savedRecord = await saveCareRecordToCloud(rawRecord);
    const existingIndex = state.careHistory.findIndex((entry) => entry.id === savedRecord.id);
    if (existingIndex >= 0) state.careHistory[existingIndex] = savedRecord;
    else state.careHistory.push(savedRecord);
    render();
    showMessage(t('careCloud.saved'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Care history save failed', error);
    const errorMessage = isPermissionError(error) ? t('careCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('careCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteCareRecordFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const careRecord = state.careHistory.find((entry) => entry.id === id);
  if (!careRecord) return;
  await executeCloudMutation('horse_care_history', 'care history delete', () => {
    let query = supabaseClient.from('horse_care_history').delete().eq('stable_id', activeStable.id);
    query = careRecord.cloudId ? query.eq('id', careRecord.cloudId) : query.eq('local_id', careRecord.id);
    return query.select('id');
  });
}

async function handleCloudCareRecordDelete(id) {
  if (!confirmDelete(t('delete.care'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('care-delete', id);
  if (!lockKey) return;
  try {
    await deleteCareRecordFromCloud(id);
    state.careHistory = state.careHistory.filter((entry) => entry.id !== id);
    render();
    showMessage(t('careCloud.deleted'));
  } catch (error) {
    console.error('[EquiTrack cloud] Care history delete failed', error);
    const errorMessage = isPermissionError(error) ? t('careCloud.permissionBlocked') : getCloudErrorMessage(error);
    showMessage(t('careCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
  }
}

async function saveRaceOpportunityToCloud(rawOpportunity) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = raceOpportunityToCloudRow(activeStable.id, rawOpportunity);
  const data = await executeCloudMutation('race_entry_opportunities', 'race opportunity save', () => {
    const request = rawOpportunity.cloudId
      ? supabaseClient
        .from('race_entry_opportunities')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawOpportunity.cloudId)
      : supabaseClient
        .from('race_entry_opportunities')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
  return mapCloudRaceOpportunity(data);
}

async function handleCloudRaceOpportunitySave(rawOpportunity) {
  try {
    const savedOpportunity = await saveRaceOpportunityToCloud(rawOpportunity);
    const existingIndex = state.raceEntryOpportunities.findIndex((entry) => entry.id === savedOpportunity.id);
    if (existingIndex >= 0) state.raceEntryOpportunities[existingIndex] = savedOpportunity;
    else state.raceEntryOpportunities.push(savedOpportunity);
    render();
    showMessage(t('raceEntryCloud.savedOpportunity'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Race opportunity save failed', error);
    const errorMessage = isPermissionError(error)
      ? t('raceEntryCloud.permissionBlocked')
      : isMissingCloudTableError(error)
        ? t('migration.schemaNeeded')
        : getCloudErrorMessage(error);
    showMessage(t('raceEntryCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteRaceOpportunityFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const opportunity = state.raceEntryOpportunities.find((entry) => entry.id === id);
  if (!opportunity) return;
  await executeCloudMutation('race_entry_opportunities', 'race opportunity delete', () => {
    let query = supabaseClient.from('race_entry_opportunities').delete().eq('stable_id', activeStable.id);
    query = opportunity.cloudId ? query.eq('id', opportunity.cloudId) : query.eq('local_id', opportunity.id);
    return query.select('id');
  });
}

async function handleCloudRaceOpportunityDelete(id) {
  if (!confirmDelete(t('delete.raceOpportunity'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('race-opportunity-delete', id);
  if (!lockKey) return;
  try {
    await deleteRaceOpportunityFromCloud(id);
    state.raceEntryOpportunities = state.raceEntryOpportunities.filter((entry) => entry.id !== id);
    state.raceEntryPlans = state.raceEntryPlans.filter((entry) => entry.opportunityId !== id);
    render();
    showMessage(t('raceEntryCloud.deletedOpportunity'));
  } catch (error) {
    console.error('[EquiTrack cloud] Race opportunity delete failed', error);
    const errorMessage = isPermissionError(error)
      ? t('raceEntryCloud.permissionBlocked')
      : isMissingCloudTableError(error)
        ? t('migration.schemaNeeded')
        : getCloudErrorMessage(error);
    showMessage(t('raceEntryCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
  }
}

async function saveRacePlanToCloud(rawPlan) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const row = racePlanToCloudRow(activeStable.id, rawPlan);
  const data = await executeCloudMutation('race_entry_plans', 'race plan save', () => {
    const request = rawPlan.cloudId
      ? supabaseClient
        .from('race_entry_plans')
        .update(row)
        .eq('stable_id', activeStable.id)
        .eq('id', rawPlan.cloudId)
      : supabaseClient
        .from('race_entry_plans')
        .upsert(row, { onConflict: 'stable_id,local_id' });
    return request.select('*').single();
  });
  const opportunityIdMap = new Map(state.raceEntryOpportunities.filter((entry) => entry.cloudId).map((entry) => [entry.cloudId, entry.id]));
  const horseIdMap = new Map(state.horses.filter((horse) => horse.cloudId).map((horse) => [horse.cloudId, horse.id]));
  return mapCloudRacePlan(data, opportunityIdMap, horseIdMap);
}

async function handleCloudRacePlanSave(rawPlan) {
  try {
    const savedPlan = await saveRacePlanToCloud(rawPlan);
    const existingIndex = state.raceEntryPlans.findIndex((entry) => entry.id === savedPlan.id);
    if (existingIndex >= 0) state.raceEntryPlans[existingIndex] = savedPlan;
    else state.raceEntryPlans.push(savedPlan);
    render();
    showMessage(t('raceEntryCloud.savedPlan'));
    return true;
  } catch (error) {
    console.error('[EquiTrack cloud] Race plan save failed', error);
    const errorMessage = isPermissionError(error)
      ? t('raceEntryCloud.permissionBlocked')
      : isMissingCloudTableError(error)
        ? t('migration.schemaNeeded')
        : getCloudErrorMessage(error);
    showMessage(t('raceEntryCloud.saveFailed', { error: errorMessage }));
    return false;
  }
}

async function deleteRacePlanFromCloud(id) {
  const activeStable = getActiveStable();
  if (!activeStable.id) throw new Error(t('cloudRead.noStable'));
  const plan = state.raceEntryPlans.find((entry) => entry.id === id);
  if (!plan) return;
  await executeCloudMutation('race_entry_plans', 'race plan delete', () => {
    let query = supabaseClient.from('race_entry_plans').delete().eq('stable_id', activeStable.id);
    query = plan.cloudId ? query.eq('id', plan.cloudId) : query.eq('local_id', plan.id);
    return query.select('id');
  });
}

async function handleCloudRacePlanDelete(id) {
  if (!confirmDelete(t('delete.racePlan'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  const lockKey = tryStartCloudAction('race-plan-delete', id);
  if (!lockKey) return;
  try {
    await deleteRacePlanFromCloud(id);
    state.raceEntryPlans = state.raceEntryPlans.filter((entry) => entry.id !== id);
    render();
    showMessage(t('raceEntryCloud.deletedPlan'));
  } catch (error) {
    console.error('[EquiTrack cloud] Race plan delete failed', error);
    const errorMessage = isPermissionError(error)
      ? t('raceEntryCloud.permissionBlocked')
      : isMissingCloudTableError(error)
        ? t('migration.schemaNeeded')
        : getCloudErrorMessage(error);
    showMessage(t('raceEntryCloud.deleteFailed', { error: errorMessage }));
  } finally {
    finishCloudAction(lockKey);
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

async function deleteOptionalCloudRowsForStable(table, stableId) {
  try {
    return await deleteCloudRowsForStable(table, stableId);
  } catch (error) {
    if (isMissingCloudTableError(error)) {
      console.warn(`[EquiTrack cloud] Optional table ${table} is not available yet. Run the latest Supabase migration.`, error);
      return 0;
    }
    throw error;
  }
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
  const counts = { events: 0, care: 0, racePlans: 0, raceOpportunities: 0, inventory: 0, hours: 0, tasks: 0, horses: 0 };
  try {
    counts.racePlans = await deleteOptionalCloudRowsForStable('race_entry_plans', stableId);
    counts.raceOpportunities = await deleteOptionalCloudRowsForStable('race_entry_opportunities', stableId);
    counts.events = await deleteCloudRowsForStable('calendar_events', stableId);
    counts.care = await deleteOptionalCloudRowsForStable('horse_care_history', stableId);
    counts.inventory = await deleteCloudRowsForStable('feed_items', stableId);
    counts.hours = await deleteCloudRowsForStable('work_logs', stableId);
    counts.tasks = await deleteCloudRowsForStable('tasks', stableId);
    counts.horses = await deleteCloudRowsForStable('horses', stableId);

    if (els.cloudCleanupConfirmInput) els.cloudCleanupConfirmInput.value = '';
    const message = t('cloudCleanup.success', counts);
    cloudCleanupStatusText = message;
    cloudReadCounts = null;
    if (cloudWriteMode) {
      state = loadData();
      cloudWriteMode = false;
      cloudModeStatusText = t('cloudMode.returnedLocal');
    }
    await checkCloudDataPreview();
    cloudCleanupStatusText = message;
    render();
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
    return feedItemToCloudRow(stableId, rawItem);
  });
}

function buildCalendarRows(stableId, horseIdMap, sourceData = state) {
  return sourceData.calendarEvents.map((rawEvent) => {
    return calendarEventToCloudRow(stableId, rawEvent, horseIdMap);
  });
}

function buildCareRows(stableId, horseIdMap, sourceData = state) {
  return (sourceData.careHistory || []).map((rawRecord) => {
    return careRecordToCloudRow(stableId, rawRecord, horseIdMap);
  });
}

function buildRaceOpportunityRows(stableId, sourceData = state) {
  return (sourceData.raceEntryOpportunities || []).map((rawOpportunity) => {
    return raceOpportunityToCloudRow(stableId, rawOpportunity);
  });
}

function buildRacePlanRows(stableId, opportunityIdMap, horseIdMap, sourceData = state) {
  return (sourceData.raceEntryPlans || []).map((rawPlan) => {
    const plan = normalizeRacePlan(rawPlan);
    return {
      stable_id: stableId,
      local_id: plan.id || createId(),
      opportunity_id: opportunityIdMap.get(plan.opportunityId) || null,
      horse_id: horseIdMap.get(plan.horseId) || null,
      driver: cleanText(plan.driver),
      trainer_contact: cleanText(plan.trainer),
      notes: cleanText(plan.notes),
      status: RACE_ENTRY_STATUSES.includes(plan.status) ? plan.status : 'draft',
      email_subject: cleanText(plan.emailSubject),
      email_body: cleanText(plan.emailBody)
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
  const counts = { horses: 0, tasks: 0, hours: 0, inventory: 0, events: 0, care: 0, raceOpportunities: 0, racePlans: 0 };
  try {
    const localUploadData = loadData();
    const uploadedHorses = await upsertCloudRows('horses', buildHorseRows(stableId, localUploadData));
    counts.horses = uploadedHorses.length;
    const horseIdMap = new Map(uploadedHorses.map((horse) => [horse.local_id, horse.id]));

    counts.tasks = (await upsertCloudRows('tasks', buildTaskRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    counts.hours = (await upsertCloudRows('work_logs', buildWorkLogRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    counts.inventory = (await upsertCloudRows('feed_items', buildFeedRows(stableId, localUploadData), 'local_id')).length;
    counts.events = (await upsertCloudRows('calendar_events', buildCalendarRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    counts.care = (await upsertCloudRows('horse_care_history', buildCareRows(stableId, horseIdMap, localUploadData), 'local_id')).length;
    const uploadedRaceOpportunities = await upsertCloudRows('race_entry_opportunities', buildRaceOpportunityRows(stableId, localUploadData));
    counts.raceOpportunities = uploadedRaceOpportunities.length;
    const opportunityIdMap = new Map(uploadedRaceOpportunities.map((opportunity) => [opportunity.local_id, opportunity.id]));
    counts.racePlans = (await upsertCloudRows('race_entry_plans', buildRacePlanRows(stableId, opportunityIdMap, horseIdMap, localUploadData), 'local_id')).length;

    const uploadedAt = new Date().toISOString();
    localStorage.setItem(LAST_CLOUD_UPLOAD_KEY, uploadedAt);
    if (els.migrationConfirmInput) els.migrationConfirmInput.value = '';
    const message = t('migration.uploadSuccess', counts);
    migrationUploadStatusText = message;
    if (els.migrationUploadStatus) els.migrationUploadStatus.textContent = message;
    showMessage(message);
  } catch (error) {
    console.error('[EquiTrack cloud] Manual upload failed', error);
    const errorMessage = isMissingLocalIdSchemaError(error) || isMissingCloudTableError(error) ? t('migration.schemaNeeded') : getAuthErrorMessage(error);
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
      .select('stable_id, role, can_manage_users, can_edit_calendar, can_edit_horses')
      .eq('user_id', user.id)
      .limit(1),
    10000,
    'stable_members query'
  );
  console.info('[EquiTrack cloud] stable_members query result', { memberships, membershipError });
  if (membershipError) {
    console.error('[EquiTrack cloud] stable_members lookup failed', {
      userId: user.id,
      code: membershipError.code,
      status: membershipError.status,
      message: membershipError.message,
      details: membershipError.details,
      hint: membershipError.hint,
      error: membershipError
    });
    throw membershipError;
  }
  const membership = Array.isArray(memberships) ? memberships[0] : null;
  if (!membership?.stable_id) return null;
  let { data: stables, error: stableError } = await withTimeout(
    supabaseClient
      .from('stables')
      .select('id, name, location_city, location_country, latitude, longitude')
      .eq('id', membership.stable_id)
      .limit(1),
    10000,
    'stables query'
  );
  if (stableError && isMissingStableLocationColumns(stableError)) {
    console.warn('[EquiTrack cloud] Stable location columns are not available yet. Run supabase/migrations/stable_location.sql.');
    const fallbackResult = await withTimeout(
      supabaseClient
        .from('stables')
        .select('id, name')
        .eq('id', membership.stable_id)
        .limit(1),
      10000,
      'stables fallback query'
    );
    stables = fallbackResult.data;
    stableError = fallbackResult.error;
  }
  console.info('[EquiTrack cloud] stables query result', { stables, stableError });
  if (stableError) {
    console.error('[EquiTrack cloud] stable lookup failed', {
      userId: user.id,
      stableId: membership.stable_id,
      code: stableError.code,
      status: stableError.status,
      message: stableError.message,
      details: stableError.details,
      hint: stableError.hint,
      error: stableError
    });
    throw stableError;
  }
  const stable = Array.isArray(stables) ? stables[0] : null;
  if (!stable) return null;
  return {
    stableId: stable.id,
    stableName: stable.name,
    locationCity: stable.location_city || '',
    locationCountry: stable.location_country || '',
    latitude: stable.latitude == null ? null : Number(stable.latitude),
    longitude: stable.longitude == null ? null : Number(stable.longitude),
    membershipRole: membership.role || 'member',
    canManageUsers: membership.can_manage_users === true,
    canEditCalendar: membership.can_edit_calendar === true,
    canEditHorses: membership.can_edit_horses === true
  };
}

function isMissingStableLocationColumns(error) {
  const text = `${error.code || ''} ${error.message || ''} ${error.details || ''} ${error.hint || ''}`.toLowerCase();
  return text.includes('42703')
    || text.includes('location_city')
    || text.includes('location_country')
    || text.includes('latitude')
    || text.includes('longitude')
    || text.includes('schema cache');
}

async function getUserProfileRole(user = getCurrentUser()) {
  if (!supabaseClient || !user) return '';
  const { data: profiles, error } = await withTimeout(
    supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .limit(1),
    10000,
    'profiles query'
  );
  console.info('[EquiTrack cloud] profiles query result', { profiles, error });
  if (error) {
    console.error('[EquiTrack cloud] profile role lookup failed', {
      userId: user.id,
      code: error.code,
      status: error.status,
      message: error.message,
      details: error.details,
      hint: error.hint,
      error
    });
    throw error;
  }
  const profile = Array.isArray(profiles) ? profiles[0] : null;
  return profile?.role || 'user';
}

async function refreshCloudConnection() {
  const user = getCurrentUser();
  if (!user) {
    stableLoading = false;
    cloudDataLoading = false;
    cloudUnavailable = false;
    if (cloudPreviewMode) {
      state = loadData();
      cloudPreviewMode = false;
      cloudModeStatusText = '';
    }
    if (cloudWriteMode) {
      state = loadData();
      cloudWriteMode = false;
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
    if (feedCloudWriteMode) {
      state = loadData();
      feedCloudWriteMode = false;
      feedCloudStatusText = '';
    }
    if (calendarCloudWriteMode) {
      state = loadData();
      calendarCloudWriteMode = false;
      calendarCloudStatusText = '';
    }
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      locationCity: '',
      locationCountry: '',
      latitude: null,
      longitude: null,
      membershipRole: '',
      profileRole: '',
      canManageUsers: false,
      canEditCalendar: false,
      canEditHorses: false,
      messageKey: 'cloud.notConnected'
    });
    return cloudState.status;
  }
  stableLoading = true;
  cloudDataLoading = false;
  cloudUnavailable = false;
  cloudModeStatusText = t('cloud.loadingStable');
  setCloudStatus({
    status: 'loading',
    email: user.email || '',
    stableId: '',
    stableName: '',
    locationCity: '',
    locationCountry: '',
    latitude: null,
    longitude: null,
    membershipRole: '',
    profileRole: '',
    canManageUsers: false,
    canEditCalendar: false,
    canEditHorses: false,
    messageKey: 'cloud.loadingStable'
  });
  renderCloudMode();
  try {
    const { profileRole, stable } = await retryOnce(async () => ({
      profileRole: await getUserProfileRole(user),
      stable: await getUserStable(user)
    }), 'Active stable load');
    stableLoading = false;
    if (!stable) {
      if (cloudWriteMode || cloudPreviewMode) {
        state = loadData();
        cloudWriteMode = false;
        cloudPreviewMode = false;
      }
      cloudUnavailable = false;
      cloudModeStatusText = t('cloudMode.noStable');
      setCloudStatus({
        status: 'noStable',
        email: user.email || '',
        stableId: '',
        stableName: '',
        locationCity: '',
        locationCountry: '',
        latitude: null,
        longitude: null,
        membershipRole: '',
        profileRole,
        canManageUsers: false,
        canEditCalendar: false,
        canEditHorses: false,
        messageKey: 'cloud.noStable'
      });
      showMessage(t('cloudMode.noStable'));
      return cloudState.status;
    }
    setCloudStatus({
      status: 'connected',
      email: user.email || '',
      stableId: stable.stableId,
      stableName: stable.stableName,
      locationCity: stable.locationCity || '',
      locationCountry: stable.locationCountry || '',
      latitude: stable.latitude,
      longitude: stable.longitude,
      membershipRole: stable.membershipRole || 'member',
      profileRole,
      canManageUsers: stable.canManageUsers === true,
      canEditCalendar: stable.canEditCalendar === true,
      canEditHorses: stable.canEditHorses === true,
      messageKey: 'cloud.connectedAs'
    });
    if (cloudLocalOverride) {
      if (cloudWriteMode || cloudPreviewMode) {
        state = loadData();
        cloudWriteMode = false;
        cloudPreviewMode = false;
      }
      cloudUnavailable = false;
      cloudModeStatusText = t('cloudMode.localOverride');
      render();
      return cloudState.status;
    }
    await enableCloudMode({ automatic: true });
    return cloudState.status;
  } catch (error) {
    stableLoading = false;
    cloudDataLoading = false;
    logAuthError('Stable lookup failed', error);
    if (cloudWriteMode || cloudPreviewMode) {
      state = loadData();
      cloudWriteMode = false;
      cloudPreviewMode = false;
    }
    cloudUnavailable = true;
    if (isPermissionError(error)) {
      cloudModeStatusText = t('cloudMode.cloudUnavailable');
      setCloudStatus({
        status: 'permissionBlocked',
        email: user.email || '',
        stableId: '',
        stableName: '',
        locationCity: '',
        locationCountry: '',
        latitude: null,
        longitude: null,
        membershipRole: '',
        profileRole: '',
        canManageUsers: false,
        canEditCalendar: false,
        canEditHorses: false,
        messageKey: 'cloud.permissionBlocked'
      });
      showMessage(t('cloud.permissionBlocked'));
      return cloudState.status;
    }
    cloudModeStatusText = t('cloudMode.cloudUnavailable');
    setCloudStatus({
      status: 'error',
      email: user.email || '',
      stableId: '',
      stableName: '',
      locationCity: '',
      locationCountry: '',
      latitude: null,
      longitude: null,
      membershipRole: '',
      profileRole: '',
      canManageUsers: false,
      canEditCalendar: false,
      canEditHorses: false,
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
  authRestoring = true;
  updateAuthUi();
  if (!isSupabaseConfigured()) {
    authRestoring = false;
    updateAuthUi();
    return;
  }
  showMessage(t('auth.restoring'));
  try {
    await loadSupabaseScript();
    if (!window.supabase?.createClient) throw new Error('Could not load Supabase client.');
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.SUPABASE_URL, SUPABASE_CONFIG.SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    console.info('[EquiTrack auth] Supabase client initialized', getAuthDiagnostics());
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.info('[EquiTrack auth] Auth state changed', { event, hasSession: Boolean(session) });
      authUser = session?.user || null;
      if (event === 'INITIAL_SESSION' && authRestoring) {
        updateAuthUi();
        return;
      }
      if (event === 'SIGNED_OUT') {
        disableCloudMode('cloudMode.returnedLocal');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await refreshCloudConnection();
      }
      authRestoring = false;
      updateAuthUi();
      if (!authUser && isProtectedView(activeView)) showView('login');
    });
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    authUser = data.session?.user || null;
    console.info('[EquiTrack auth] Session restore complete', { hasSession: Boolean(data.session), email: authUser?.email || '' });
    await refreshCloudConnection();
  } catch (error) {
    logAuthError('Session initialization failed', error);
    stableLoading = false;
    cloudDataLoading = false;
    showMessage(getAuthErrorMessage(error));
  } finally {
    authRestoring = false;
    updateAuthUi();
  }
}

function showView(viewName) {
  if (isProtectedView(viewName) && !authUser) {
    if (authRestoring) {
      showMessage(t('auth.restoring'));
      return;
    }
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

function dismissHomeTips() {
  localStorage.setItem(HOME_TIPS_KEY, 'true');
  renderHome();
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
  if (els.careForm?.elements.horseId) {
    els.careForm.elements.horseId.innerHTML = [`<option value="">${t('care.horse')}</option>`]
      .concat(state.horses.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`))
      .join('');
  }
  if (els.careForm?.elements.type) {
    els.careForm.elements.type.innerHTML = CARE_TYPES
      .map((type) => `<option value="${type}">${t(`careType.${type}`)}</option>`)
      .join('');
  }

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
  if (els.horseForm?.elements.racingHorseId) {
    els.horseForm.elements.racingHorseId.innerHTML = [`<option value="">${t('racingRegistry.noLinked')}</option>`]
      .concat(racingHorses
        .sort((a, b) => a.horseName.localeCompare(b.horseName))
        .map((horse) => `<option value="${horse.id}">${escapeHtml([horse.horseName, horse.registrationNumber].filter(Boolean).join(' - '))}</option>`))
      .join('');
  }
  if (els.racingHorseStartForm?.elements.racingHorseId) {
    els.racingHorseStartForm.elements.racingHorseId.innerHTML = [`<option value="">${t('racingRegistry.horseName')}</option>`]
      .concat(racingHorses
        .sort((a, b) => a.horseName.localeCompare(b.horseName))
        .map((horse) => `<option value="${horse.id}">${escapeHtml([horse.horseName, horse.registrationNumber].filter(Boolean).join(' - '))}</option>`))
      .join('');
  }
  renderRaceEntryOptions();
}

function renderRaceEntryOptions() {
  if (!els.racePlanForm) return;
  const opportunityOptions = state.raceEntryOpportunities
    .map(normalizeRaceOpportunity)
    .sort((a, b) => a.raceDate.localeCompare(b.raceDate))
    .map((opportunity) => {
      const label = [opportunity.raceDate, opportunity.racetrackName, opportunity.raceNumber && `#${opportunity.raceNumber}`, opportunity.raceName]
        .filter(Boolean)
        .join(' - ');
      return `<option value="${opportunity.id}">${escapeHtml(label)}</option>`;
    });
  els.racePlanForm.elements.opportunityId.innerHTML = [`<option value="">${t('raceEntries.opportunity')}</option>`].concat(opportunityOptions).join('');
  els.racePlanForm.elements.horseId.innerHTML = [`<option value="">${t('raceEntries.horse')}</option>`]
    .concat(state.horses.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`))
    .join('');
  els.racePlanForm.elements.status.innerHTML = RACE_ENTRY_STATUSES
    .map((status) => `<option value="${status}">${t(`raceEntries.status${status.charAt(0).toUpperCase()}${status.slice(1)}`)}</option>`)
    .join('');
}

function renderHome() {
  const user = getCurrentUser();
  const activeStable = getActiveStable();
  const todayValue = today();
  const now = new Date(`${todayValue}T00:00:00`);
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const isReturningStableUser = Boolean(user && activeStable.id);
  const showLandingHome = !isReturningStableUser;
  const tipsDismissed = localStorage.getItem(HOME_TIPS_KEY) === 'true';
  if (els.homeAuthCta) {
    els.homeAuthCta.dataset.viewLink = user ? 'stable' : 'login';
    els.homeAuthCta.textContent = user ? t('home.ctaApp') : t('home.ctaLogin');
    els.homeAuthCta.disabled = authRestoring;
  }
  if (els.homeAccountBadge) {
    els.homeAccountBadge.textContent = authRestoring ? t('auth.restoring') : (user?.email ? t('home.accountSignedIn', { email: user.email }) : t('home.accountSignedOut'));
    els.homeAccountBadge.title = user?.email || '';
  }
  if (els.homeStableBadge) {
    if (activeStable.name) {
      els.homeStableBadge.textContent = t('home.activeStable', { name: activeStable.name });
    } else if (user) {
      els.homeStableBadge.textContent = getCloudStatusText();
    } else {
      els.homeStableBadge.textContent = cloudWriteMode ? t('calendar.cloudMode') : t('calendar.localMode');
    }
  }
  if (els.homeLandingHero) els.homeLandingHero.hidden = !showLandingHome;
  if (els.homeFeatureGrid) els.homeFeatureGrid.hidden = !showLandingHome;
  if (els.homeIconStrip) els.homeIconStrip.hidden = !showLandingHome;
  if (els.homeLandingLower) els.homeLandingLower.hidden = !showLandingHome;
  if (els.homeOverviewSection) els.homeOverviewSection.hidden = !isReturningStableUser;
  if (els.homeTipsSection) els.homeTipsSection.hidden = tipsDismissed || isReturningStableUser;
  if (els.homeOverviewStable) els.homeOverviewStable.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.homeOverviewHorses) els.homeOverviewHorses.textContent = state.horses.length;
  if (els.homeOverviewOpenTasks) els.homeOverviewOpenTasks.textContent = state.tasks.filter((task) => !task.done).length;
  if (els.homeOverviewTodayTasks) els.homeOverviewTodayTasks.textContent = state.tasks.filter((task) => task.date === todayValue && !task.done).length;
  if (els.homeOverviewEventsToday) els.homeOverviewEventsToday.textContent = state.calendarEvents.filter((event) => event.date === todayValue).length;
  if (els.homeOverviewEventsWeek) {
    els.homeOverviewEventsWeek.textContent = state.calendarEvents.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return eventDate >= now && eventDate <= weekEnd;
    }).length;
  }
  if (els.homeOverviewLowFeed) {
    els.homeOverviewLowFeed.textContent = state.inventory.filter((item) => {
      const status = getFeedStatus(item).key;
      return status === 'low' || status === 'critical' || status === 'empty';
    }).length;
  }
  if (els.homeOverviewHours) {
    els.homeOverviewHours.textContent = state.hours.reduce((total, entry) => total + Number(entry.hours || 0), 0).toFixed(1);
  }
  renderTurnoutSuggestion();
  renderAlerts();
}

function renderTurnoutSuggestion() {
  if (!els.turnoutWeatherCard || !els.turnoutWeatherMessage) return;
  const statusClass = turnoutWeather.status === 'ready'
    ? (turnoutWeather.hasRain ? 'rain' : 'ok')
    : turnoutWeather.status;
  els.turnoutWeatherCard.classList.remove('turnout-weather-card--loading', 'turnout-weather-card--ok', 'turnout-weather-card--rain', 'turnout-weather-card--error');
  els.turnoutWeatherCard.classList.add(`turnout-weather-card--${statusClass}`);
  if (turnoutWeather.status === 'ready') {
    els.turnoutWeatherMessage.textContent = t(turnoutWeather.hasRain ? 'weather.rain' : 'weather.noRain');
  } else {
    els.turnoutWeatherMessage.textContent = t(turnoutWeather.status === 'error' ? 'weather.unavailable' : 'weather.loading');
  }
  if (els.turnoutWeatherLocation) {
    const locationText = t('weather.locationUsed', { location: turnoutWeather.locationLabel || `${FALLBACK_WEATHER_LOCATION.city}, ${FALLBACK_WEATHER_LOCATION.country}` });
    els.turnoutWeatherLocation.textContent = turnoutWeather.usingFallback
      ? `${locationText} ${t('weather.fallbackLocation')}`
      : locationText;
  }
}

async function loadTurnoutWeather() {
  const stable = getActiveStable();
  const locationKey = getStableLocationKey(stable) || 'fallback';
  if (turnoutWeather.status !== 'error' && turnoutWeatherLocationKey === locationKey && turnoutWeather.status !== 'loading') return;
  turnoutWeatherLocationKey = locationKey;
  const fallbackLabel = `${FALLBACK_WEATHER_LOCATION.city}, ${FALLBACK_WEATHER_LOCATION.country}`;
  const locationLabel = formatStableLocation(stable) || fallbackLabel;
  try {
    turnoutWeather = {
      status: 'loading',
      hasRain: null,
      locationLabel,
      usingFallback: !formatStableLocation(stable)
    };
    renderTurnoutSuggestion();
    const weatherLocation = await resolveWeatherLocation(stable);
    turnoutWeather.locationLabel = weatherLocation.label;
    turnoutWeather.usingFallback = weatherLocation.usingFallback;
    renderTurnoutSuggestion();
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(weatherLocation.latitude)}&longitude=${encodeURIComponent(weatherLocation.longitude)}&daily=precipitation_sum,rain_sum&timezone=auto&forecast_days=1`;
    const response = await fetch(weatherUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Weather request failed with ${response.status}`);
    const data = await response.json();
    const precipitation = Number(data?.daily?.precipitation_sum?.[0] || 0);
    const rain = Number(data?.daily?.rain_sum?.[0] || 0);
    turnoutWeather = {
      status: 'ready',
      hasRain: precipitation > 0 || rain > 0,
      locationLabel: weatherLocation.label,
      usingFallback: weatherLocation.usingFallback
    };
  } catch (error) {
    console.warn('[EquiTrack weather] Turnout weather unavailable', error);
    turnoutWeather = {
      status: 'error',
      hasRain: null,
      locationLabel: turnoutWeather.locationLabel || fallbackLabel,
      usingFallback: turnoutWeather.usingFallback !== false
    };
  } finally {
    renderTurnoutSuggestion();
    renderAlerts();
  }
}

function getDateOffset(baseDate, offsetDays) {
  const date = new Date(`${baseDate}T00:00:00Z`);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function isDateBetween(dateValue, startValue, endValue) {
  if (!dateValue) return false;
  return dateValue >= startValue && dateValue <= endValue;
}

function getLastBackupAgeDays() {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  if (!lastBackup) return null;
  const lastBackupDate = new Date(lastBackup);
  if (Number.isNaN(lastBackupDate.getTime())) return null;
  return Math.floor((Date.now() - lastBackupDate.getTime()) / 86400000);
}

function getActiveAlerts() {
  const todayValue = today();
  const tomorrowValue = getDateOffset(todayValue, 1);
  const weekEndValue = getDateOffset(todayValue, 7);
  const alerts = [];

  const feedStatusCounts = state.inventory.reduce((counts, item) => {
    const status = getFeedStatus(item).key;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});
  if (feedStatusCounts.empty) {
    alerts.push({
      id: 'feed-empty',
      severity: 'critical',
      titleKey: 'alerts.feedEmpty',
      messageKey: 'alerts.feedEmptyMessage',
      messageParams: { count: feedStatusCounts.empty },
      areaKey: 'alerts.areaFeed',
      actionKey: 'alerts.openFeed',
      action: 'feed'
    });
  }
  if (feedStatusCounts.critical) {
    alerts.push({
      id: 'feed-critical',
      severity: 'critical',
      titleKey: 'alerts.feedCritical',
      messageKey: 'alerts.feedCriticalMessage',
      messageParams: { count: feedStatusCounts.critical },
      areaKey: 'alerts.areaFeed',
      actionKey: 'alerts.openFeed',
      action: 'feed'
    });
  }
  if (feedStatusCounts.low) {
    alerts.push({
      id: 'feed-low',
      severity: 'attention',
      titleKey: 'alerts.feedRunningLow',
      messageKey: 'alerts.feedLowMessage',
      messageParams: { count: feedStatusCounts.low },
      areaKey: 'alerts.areaFeed',
      actionKey: 'alerts.openFeed',
      action: 'feed'
    });
  }

  const openTasks = state.tasks.filter((task) => !task.done);
  const overdueTasks = openTasks.filter((task) => task.date && task.date < todayValue);
  const tasksDueToday = openTasks.filter((task) => task.date === todayValue);
  if (overdueTasks.length) {
    alerts.push({
      id: 'tasks-overdue',
      severity: 'critical',
      titleKey: 'alerts.overdueTasks',
      messageKey: 'alerts.overdueTasksMessage',
      messageParams: { count: overdueTasks.length },
      areaKey: 'alerts.areaTasks',
      actionKey: 'alerts.openTasks',
      action: 'tasks'
    });
  }
  if (tasksDueToday.length) {
    alerts.push({
      id: 'tasks-today',
      severity: 'attention',
      titleKey: 'alerts.tasksDueToday',
      messageKey: 'alerts.tasksTodayMessage',
      messageParams: { count: tasksDueToday.length },
      areaKey: 'alerts.areaTasks',
      actionKey: 'alerts.openTasks',
      action: 'tasks'
    });
  }

  const normalizedEvents = state.calendarEvents.map(normalizeCalendarEvent);
  const eventsToday = normalizedEvents.filter((event) => event.date === todayValue);
  const eventsTomorrow = normalizedEvents.filter((event) => event.date === tomorrowValue);
  const upcomingRaces = normalizedEvents.filter((event) => event.type === 'race' && isDateBetween(event.date, todayValue, weekEndValue));
  if (eventsToday.length) {
    alerts.push({
      id: 'events-today',
      severity: 'info',
      titleKey: 'alerts.eventsToday',
      messageKey: 'alerts.eventsTodayMessage',
      messageParams: { count: eventsToday.length },
      areaKey: 'alerts.areaCalendar',
      actionKey: 'alerts.openCalendar',
      action: 'calendar'
    });
  }
  if (eventsTomorrow.length) {
    alerts.push({
      id: 'events-tomorrow',
      severity: 'info',
      titleKey: 'alerts.eventsTomorrow',
      messageKey: 'alerts.eventsTomorrowMessage',
      messageParams: { count: eventsTomorrow.length },
      areaKey: 'alerts.areaCalendar',
      actionKey: 'alerts.openCalendar',
      action: 'calendar'
    });
  }
  if (upcomingRaces.length) {
    alerts.push({
      id: 'races-week',
      severity: 'attention',
      titleKey: 'alerts.upcomingRaces',
      messageKey: 'alerts.racesMessage',
      messageParams: { count: upcomingRaces.length },
      areaKey: 'alerts.areaCalendar',
      actionKey: 'alerts.openCalendar',
      action: 'calendar'
    });
  }

  const normalizedCareRecords = state.careHistory.map(normalizeCareRecord).filter((record) => record.nextDueDate);
  const careOverdue = normalizedCareRecords.filter((record) => record.nextDueDate < todayValue);
  const careDueToday = normalizedCareRecords.filter((record) => record.nextDueDate === todayValue);
  const careDueSoon = normalizedCareRecords.filter((record) => record.nextDueDate > todayValue && record.nextDueDate <= weekEndValue);
  if (careOverdue.length) {
    alerts.push({
      id: 'care-overdue',
      severity: 'critical',
      titleKey: 'care.overdue',
      messageKey: 'care.overdueMessage',
      messageParams: { count: careOverdue.length },
      areaKey: 'care.title',
      actionKey: 'care.openCare',
      action: 'care'
    });
  }
  if (careDueToday.length) {
    alerts.push({
      id: 'care-today',
      severity: 'attention',
      titleKey: 'care.dueToday',
      messageKey: 'care.dueTodayMessage',
      messageParams: { count: careDueToday.length },
      areaKey: 'care.title',
      actionKey: 'care.openCare',
      action: 'care'
    });
  }
  if (careDueSoon.length) {
    alerts.push({
      id: 'care-week',
      severity: 'info',
      titleKey: 'care.dueSoon',
      messageKey: 'care.dueSoonMessage',
      messageParams: { count: careDueSoon.length },
      areaKey: 'care.title',
      actionKey: 'care.openCare',
      action: 'care'
    });
  }

  const raceDeadlinesSoon = state.raceEntryOpportunities
    .map(normalizeRaceOpportunity)
    .filter((opportunity) => opportunity.entryDeadline && isDateBetween(opportunity.entryDeadline, todayValue, weekEndValue))
    .concat(raceProgramRaces.filter((race) => race.entryDeadline && isDateBetween(race.entryDeadline, todayValue, weekEndValue)));
  if (raceDeadlinesSoon.length) {
    alerts.push({
      id: 'race-entry-deadline',
      severity: 'attention',
      titleKey: 'raceEntries.deadlineSoon',
      messageKey: 'raceEntries.deadlineSoonMessage',
      messageParams: { count: raceDeadlinesSoon.length },
      areaKey: 'raceEntries.eyebrow',
      actionKey: 'raceEntries.openRaceEntries',
      action: 'raceEntries'
    });
  }

  if (turnoutWeather.status === 'ready' && turnoutWeather.hasRain) {
    alerts.push({
      id: 'weather-rain',
      severity: 'attention',
      titleKey: 'alerts.weatherTurnout',
      messageKey: 'alerts.weatherMessage',
      areaKey: 'alerts.areaWeather',
      actionKey: 'alerts.viewWeather',
      action: 'weather'
    });
  }

  const backupAgeDays = getLastBackupAgeDays();
  if (backupAgeDays === null) {
    alerts.push({
      id: 'backup-missing',
      severity: 'info',
      titleKey: 'alerts.backupReminder',
      messageKey: 'alerts.backupMissingMessage',
      areaKey: 'alerts.areaBackup',
      actionKey: 'alerts.openBackup',
      action: 'backup'
    });
  } else if (backupAgeDays > 14) {
    alerts.push({
      id: 'backup-old',
      severity: 'info',
      titleKey: 'alerts.backupReminder',
      messageKey: 'alerts.backupOldMessage',
      messageParams: { count: backupAgeDays },
      areaKey: 'alerts.areaBackup',
      actionKey: 'alerts.openBackup',
      action: 'backup'
    });
  }

  return alerts;
}

function renderAlerts() {
  const alerts = getActiveAlerts();
  if (els.homeOverviewAlerts) els.homeOverviewAlerts.textContent = alerts.length;
  if (!els.alertsList) return;
  if (!alerts.length) {
    els.alertsList.innerHTML = `<p class="empty-state alerts-empty">${t('alerts.noActive')}</p>`;
    return;
  }
  const groupedAlerts = ['critical', 'attention', 'info']
    .map((severity) => ({
      severity,
      items: alerts.filter((alert) => alert.severity === severity)
    }))
    .filter((group) => group.items.length);

  els.alertsList.innerHTML = groupedAlerts.map((group) => `
    <section class="alert-group alert-group-${group.severity}" aria-label="${escapeHtml(t(`alerts.${group.severity}`))}">
      <div class="alert-group-heading">
        <span class="alert-severity-badge alert-severity-${group.severity}">${escapeHtml(t(`alerts.${group.severity}`))}</span>
        <span>${escapeHtml(t('alerts.count', { count: group.items.length }))}</span>
      </div>
      <div class="alert-group-list">
        ${group.items.map((alert) => `
          <article class="alert-card alert-card-${alert.severity}">
            <div>
              <div class="alert-meta">
                <span>${escapeHtml(t(alert.areaKey))}</span>
              </div>
              <h4>${escapeHtml(t(alert.titleKey))}</h4>
              <p>${escapeHtml(t(alert.messageKey, alert.messageParams || {}))}</p>
            </div>
            ${alert.action ? `<button class="button secondary alert-action" type="button" data-alert-action="${alert.action}">${escapeHtml(t(alert.actionKey))}</button>` : ''}
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

async function resolveWeatherLocation(stable = getActiveStable()) {
  const latitude = Number(stable.latitude);
  const longitude = Number(stable.longitude);
  const label = formatStableLocation(stable);
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return {
      latitude,
      longitude,
      label: label || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      usingFallback: false
    };
  }
  if (stable.locationCity || stable.locationCountry) {
    const query = [stable.locationCity, stable.locationCountry].filter(Boolean).join(', ');
    try {
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
      const response = await fetch(geocodeUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Geocoding request failed with ${response.status}`);
      const data = await response.json();
      const result = data?.results?.[0];
      if (result?.latitude != null && result?.longitude != null) {
        return {
          latitude: Number(result.latitude),
          longitude: Number(result.longitude),
          label: label || [result.name, result.country].filter(Boolean).join(', '),
          usingFallback: false
        };
      }
    } catch (error) {
      console.warn('[EquiTrack weather] Stable location geocoding failed', error);
    }
  }
  return {
    latitude: FALLBACK_WEATHER_LOCATION.latitude,
    longitude: FALLBACK_WEATHER_LOCATION.longitude,
    label: `${FALLBACK_WEATHER_LOCATION.city}, ${FALLBACK_WEATHER_LOCATION.country}`,
    usingFallback: true
  };
}

function render() {
  renderHome();
  renderSummary();
  renderHorseOptions();
  renderStableHeader();
  renderToday();
  renderHorses();
  renderCareHistory();
  renderTasks();
  renderHours();
  renderInventory();
  renderShoppingList();
  renderEvents();
  renderCalendarMonth();
  renderCalendarPlanner();
  renderRaceEntries();
  renderBackupStatus();
  renderMigrationPreview();
  renderCloudReadPreview();
  renderCloudMode();
  renderCloudSaveStatus();
  renderHorseCloudMode();
  renderTaskCloudMode();
  renderWorkCloudMode();
  renderFeedCloudMode();
  renderCalendarCloudMode();
  renderCloudCleanup();
}

function renderStableHeader() {
  const activeStable = getActiveStable();
  if (els.stableStableBadge) els.stableStableBadge.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.stableModeBadge) els.stableModeBadge.textContent = cloudWriteMode ? t('calendar.cloudMode') : t('calendar.localMode');
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
    if (els.upcomingRaceCount) {
      els.upcomingRaceCount.textContent = state.calendarEvents
        .map(normalizeCalendarEvent)
        .filter((event) => event.type === 'race' && event.date >= todayValue)
        .length;
    }
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
  const workToday = state.hours.map(normalizeWorkLog).filter((entry) => entry.date === todayValue);
  const feedWarnings = state.inventory
    .map(normalizeFeedItem)
    .filter((item) => ['low', 'critical', 'empty'].includes(getFeedStatus(item).key));

  if (!tasksToday.length && !eventsToday.length && !feedWarnings.length && !workToday.length) {
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
  if (workToday.length) {
    sections.push(`
      <article class="today-card">
        <h4>${t('today.recentWork')}</h4>
        ${workToday.slice(0, 3).map((entry) => `<p>${escapeHtml(`${entry.worker} - ${Number(entry.hours || 0).toFixed(2)} ${t('common.hours')}`)}</p>`).join('')}
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
    const linkedRacingHorse = getLinkedRacingHorse(horse);
    const headline = [horse.breed, horse.gender, horse.color].filter(Boolean).join(' · ');
    const importantMeta = [
      horse.owner && `${t('horses.owner')}: ${horse.owner}`,
      horse.birth && `${t('horses.birth')}: ${horse.birth}`,
      horse.registration && `${t('horses.registration')}: ${horse.registration}`
    ].filter(Boolean);
    const careRecords = state.careHistory
      .map(normalizeCareRecord)
      .filter((record) => record.horseId === horse.id)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3);
    return `
      <article class="item-card horse-card horse-profile-card premium-stable-card">
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
                ['horses.color', horse.color]
              ])}
              ${renderHorseDetailGroup('horses.racingProfile', [
                ['horses.registration', horse.registration],
                ['horses.birth', horse.birth],
                ['horses.gender', horse.gender],
                ['horses.countryOfOrigin', horse.countryOfOrigin],
                ['horses.totalEarnings', horse.totalEarnings],
                ['horses.last5Earnings', horse.last5Earnings],
                ['horses.racingCategory', horse.racingCategory],
                ['horses.trainerName', horse.trainerName],
                ['horses.ownerName', horse.ownerName],
                ['horses.defaultDriver', horse.defaultDriver],
                ['horses.racingNotes', horse.racingNotes]
              ])}
              ${linkedRacingHorse ? renderHorseDetailGroup('racingRegistry.linkedData', [
                ['racingRegistry.registration', linkedRacingHorse.registrationNumber],
                ['racingRegistry.totalEarnings', linkedRacingHorse.careerEarnings || linkedRacingHorse.totalEarnings],
                ['racingRegistry.last5Earnings', linkedRacingHorse.last5Earnings],
                ['horses.racingCategory', linkedRacingHorse.racingCategory],
                ['racingRegistry.categoryMc', linkedRacingHorse.categoryMc],
                ['racingRegistry.categoryMs', linkedRacingHorse.categoryMs],
                ['racingRegistry.career', formatRacingStatLine(linkedRacingHorse, 'career')],
                ['racingRegistry.currentYear', formatRacingStatLine(linkedRacingHorse, 'year')],
                ['racingRegistry.lastResultsUpdate', linkedRacingHorse.lastResultsUpdate]
              ]) : renderHorseDetailGroup('racingRegistry.linkedTitle', [
                ['racingRegistry.noLinked', '']
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
            <section class="horse-care-preview">
              <h5>${t('care.recent')}</h5>
              ${careRecords.length ? careRecords.map(renderCareLine).join('') : `<p>${t('care.empty')}</p>`}
            </section>
            ${linkedRacingHorse ? renderRacingHorseProfile(linkedRacingHorse, { compact: true }) : ''}
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
      <article class="item-card task-card premium-stable-card ${task.done ? 'task-done' : 'task-open'}">
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
    <article class="item-card work-card premium-stable-card">
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
      <article class="item-card feed-card premium-stable-card">
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

function formatCalendarMonthLabel(date) {
  return new Intl.DateTimeFormat(currentLanguage, { month: 'long', year: 'numeric' }).format(date);
}

function formatSelectedDayLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat(currentLanguage, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

function toCalendarDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getEventsForDate(dateString) {
  return state.calendarEvents
    .map(normalizeCalendarEvent)
    .filter((event) => event.date === dateString)
    .sort((a, b) => `${a.time || '00:00'} ${a.name}`.localeCompare(`${b.time || '00:00'} ${b.name}`));
}

function renderCalendarEventMeta(event) {
  const horses = event.horseIds
    .map((id) => state.horses.find((horse) => horse.id === id)?.name)
    .filter(Boolean);
  return [
    event.time && escapeHtml(event.time),
    `<span class="event-type-pill event-type-${event.type}">${t(`eventType.${event.type}`)}</span>`,
    horses.length && escapeHtml(horses.join(', ')),
    event.location && escapeHtml(event.location)
  ].filter(Boolean).join('');
}

function renderSelectedDayAgenda() {
  if (!els.calendarSelectedDayLabel || !els.calendarSelectedDayAgenda) return;
  els.calendarSelectedDayLabel.textContent = formatSelectedDayLabel(selectedCalendarDate);
  const dayEvents = getEventsForDate(selectedCalendarDate);
  if (!dayEvents.length) {
    els.calendarSelectedDayAgenda.innerHTML = `<p class="empty-state">${t('calendar.noEventsDay')}</p>`;
    return;
  }
  els.calendarSelectedDayAgenda.innerHTML = dayEvents.map((event) => {
    const horses = event.horseIds
      .map((id) => state.horses.find((horse) => horse.id === id)?.name)
      .filter(Boolean);
    return `
      <article class="selected-event-card">
        <div>
          <span class="event-type-pill event-type-${event.type}">${t(`eventType.${event.type}`)}</span>
          <h4>${escapeHtml(event.name)}</h4>
          <p>${escapeHtml([event.time, event.location].filter(Boolean).join(' - ') || t('common.notSet'))}</p>
          <p>${horses.length ? escapeHtml(horses.join(', ')) : t('tasks.noHorse')}</p>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-event" data-id="${event.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-event" data-id="${event.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderCareLine(record) {
  const nextDue = record.nextDueDate ? ` · ${t('care.nextDueShort')}: ${record.nextDueDate}` : '';
  return `<p><span class="pill care-type-pill">${t(`careType.${record.type}`)}</span> ${escapeHtml(record.date)} - ${escapeHtml(record.title || t(`careType.${record.type}`))}${escapeHtml(nextDue)}</p>`;
}

function renderCareHistory() {
  if (!els.careHistoryList) return;
  if (!state.careHistory.length) {
    els.careHistoryList.innerHTML = `<p class="empty-state">${t('care.empty')}</p>`;
    return;
  }
  const sortedRecords = state.careHistory
    .map(normalizeCareRecord)
    .sort((a, b) => b.date.localeCompare(a.date));
  els.careHistoryList.innerHTML = sortedRecords.map((record) => {
    const horse = state.horses.find((item) => item.id === record.horseId);
    const meta = [
      horse?.name || t('tasks.noHorse'),
      t(`careType.${record.type}`),
      record.nextDueDate && `${t('care.nextDueShort')}: ${record.nextDueDate}`,
      record.cost !== '' && record.cost != null && `${t('care.cost')}: ${formatNumber(record.cost)}`
    ].filter(Boolean);
    return `
      <article class="item-card care-card premium-stable-card">
        <div>
          <h4>${escapeHtml(record.title || t(`careType.${record.type}`))}</h4>
          <p>${escapeHtml(record.notes || t('common.noNotes'))}</p>
          <div class="item-meta">
            <span class="pill">${escapeHtml(record.date)}</span>
            ${meta.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-care" data-id="${record.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-care" data-id="${record.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderCalendarMonth() {
  if (!els.calendarMonthGrid || !els.calendarWeekdays) return;
  const activeStable = getActiveStable();
  if (els.calendarStableBadge) els.calendarStableBadge.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.calendarModeBadge) els.calendarModeBadge.textContent = cloudWriteMode ? t('calendar.cloudMode') : t('calendar.localMode');
  if (els.calendarListSection) els.calendarListSection.hidden = calendarViewMode !== 'list';
  document.querySelectorAll('[data-calendar-view-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.calendarViewMode === calendarViewMode);
  });

  const monthStart = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1);
  const gridStart = new Date(monthStart);
  const mondayOffset = (gridStart.getDay() + 6) % 7;
  gridStart.setDate(gridStart.getDate() - mondayOffset);
  if (els.calendarMonthLabel) els.calendarMonthLabel.textContent = formatCalendarMonthLabel(monthStart);

  const weekdayBase = new Date(2026, 0, 5);
  els.calendarWeekdays.innerHTML = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekdayBase);
    date.setDate(weekdayBase.getDate() + index);
    return `<span>${new Intl.DateTimeFormat(currentLanguage, { weekday: 'short' }).format(date)}</span>`;
  }).join('');

  const todayValue = today();
  els.calendarMonthGrid.innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dateString = toCalendarDateString(date);
    const dayEvents = getEventsForDate(dateString);
    const outside = date.getMonth() !== monthStart.getMonth();
    const selected = dateString === selectedCalendarDate;
    const isToday = dateString === todayValue;
    const visibleEvents = dayEvents.slice(0, 3);
    return `
      <button class="calendar-day ${outside ? 'outside-month' : ''} ${selected ? 'selected' : ''} ${isToday ? 'today' : ''}" type="button" data-calendar-date="${dateString}">
        <span class="calendar-day-number">${date.getDate()}</span>
        <span class="calendar-day-events">
          ${visibleEvents.map((event) => `<span class="calendar-event-pill event-type-${event.type}" data-action="edit-event" data-id="${event.id}">${escapeHtml(event.time ? `${event.time} ${event.name}` : event.name)}</span>`).join('')}
          ${dayEvents.length > visibleEvents.length ? `<span class="calendar-event-more">${t('calendar.monthMore', { count: dayEvents.length - visibleEvents.length })}</span>` : ''}
        </span>
      </button>
    `;
  }).join('');
  renderSelectedDayAgenda();
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
            <span class="pill event-type-pill event-type-${event.type}">${t(`eventType.${event.type}`)}</span>
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

function getRacePlansForOpportunity(opportunityId) {
  return state.raceEntryPlans
    .map(normalizeRacePlan)
    .filter((plan) => plan.opportunityId === opportunityId);
}

function getRacePlansForProgramRace(programRaceId) {
  return state.raceEntryPlans
    .map(normalizeRacePlan)
    .filter((plan) => plan.programRaceId === programRaceId);
}

function canCreateRacePlans() {
  return cloudState.membershipRole === 'owner'
    || cloudState.profileRole === 'super_admin'
    || cloudState.canManageUsers
    || cloudState.canEditCalendar
    || cloudState.canEditHorses;
}

function getHorseAgeAtRace(horse, raceDate) {
  const year = Number(String(raceDate || '').slice(0, 4));
  if (!year) return null;
  const birth = normalizeHorse(horse).birth;
  const match = String(birth || '').match(/\d{4}/);
  if (!match) return null;
  return year - Number(match[0]);
}

function getLinkedRacingHorse(horse) {
  if (!cloudWriteMode) return null;
  const normalized = normalizeHorse(horse);
  return normalized.racingHorseId ? racingHorses.find((entry) => entry.id === normalized.racingHorseId) || null : null;
}

function getHorseRacingData(horseInput) {
  const horse = normalizeHorse(horseInput);
  const linked = getLinkedRacingHorse(horse);
  if (!linked) return horse;
  const linkedCareerEarnings = linked.careerEarnings === '' || linked.careerEarnings == null ? linked.totalEarnings : linked.careerEarnings;
  return normalizeHorse({
    ...horse,
    name: horse.name,
    registration: linked.registrationNumber || horse.registration,
    birth: linked.birthDate || linked.birthYear || horse.birth,
    gender: linked.gender || horse.gender,
    countryOfOrigin: linked.countryOfOrigin || horse.countryOfOrigin,
    totalEarnings: linkedCareerEarnings ?? horse.totalEarnings,
    last5Earnings: linked.last5Earnings ?? horse.last5Earnings,
    racingCategory: linked.racingCategory || linked.categoryMc || linked.categoryMs || horse.racingCategory,
    trainerName: linked.trainerName || horse.trainerName,
    ownerName: linked.ownerName || horse.ownerName,
    defaultDriver: linked.defaultDriver || horse.defaultDriver,
    racingNotes: linked.notes || horse.racingNotes
  });
}

function normalizeHorseGender(value) {
  const text = String(value || '').trim().toLowerCase();
  if (!text) return 'unknown';
  if (/female|mare|femmina|tamma|stute|f$/.test(text)) return 'female';
  if (/gelding|ruuna|castrone/.test(text)) return 'gelding';
  if (/male|stallion|maschio|ori|m$/.test(text)) return 'male';
  return ['male', 'female', 'gelding', 'unknown'].includes(text) ? text : 'unknown';
}

function parseItalianMoney(value) {
  const normalized = String(value || '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function getRaceEligibilityRules(race) {
  const text = `${race.eligibilityNotes || ''} ${race.raceClass || ''}`.toLowerCase();
  const ageRules = [];
  let match;
  const rangeMatch = text.match(/(\d+)\s*(?:e|\/|-)\s*(\d+)\s*anni/);
  if (rangeMatch) ageRules.push({ min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) });
  const andOlderPattern = /(\d+)\s*anni\s*ed\s*oltre/g;
  const exactAgePattern = /(\d+)\s*anni(?!\s*ed\s*oltre)/g;
  while ((match = andOlderPattern.exec(text)) !== null) ageRules.push({ min: Number(match[1]), max: null });
  while ((match = exactAgePattern.exec(text)) !== null) {
    const age = Number(match[1]);
    if (!ageRules.some((rule) => rule.min === age && rule.max === age)) ageRules.push({ min: age, max: age });
  }
  const earningsRange = text.match(/vincitori\s+da\s*€?\s*([\d.,]+)\s+ad\s*€?\s*([\d.,]+)/);
  const nonWinnersLast5 = text.match(/non\s+vincitori\s+di\s*€?\s*([\d.,]+)\s+nelle\s+ultime\s+5/);
  const nonWinners = !nonWinnersLast5 ? text.match(/non\s+vincitori\s+di\s*€?\s*([\d.,]+)/) : null;
  const categoryMatch = text.match(/(?:cat\.?|categoria)\s*([a-g](?:\s*[\/eo,-]\s*[a-g])*)/i);
  return {
    ageRules,
    gender: /femmine/i.test(text) ? 'female' : /maschi/i.test(text) ? 'male' : '',
    earningsMin: earningsRange ? parseItalianMoney(earningsRange[1]) : null,
    earningsMax: earningsRange ? parseItalianMoney(earningsRange[2]) : nonWinners ? parseItalianMoney(nonWinners[1]) : null,
    last5Max: nonWinnersLast5 ? parseItalianMoney(nonWinnersLast5[1]) : null,
    categories: categoryMatch ? Array.from(new Set(categoryMatch[1].toUpperCase().match(/[A-G]/g) || [])) : [],
    categoryManual: /superiore/i.test(text)
  };
}

function evaluateHorseRaceEligibility(horseInput, race) {
  const horse = getHorseRacingData(horseInput);
  const rules = getRaceEligibilityRules(race);
  const reasons = [];
  let hasFailure = false;
  let hasManual = false;
  const hasParsedRule = rules.ageRules.length
    || rules.gender
    || rules.earningsMin != null
    || rules.earningsMax != null
    || rules.last5Max != null
    || rules.categories.length;
  if (!hasParsedRule) hasManual = true;
  if (rules.ageRules.length) {
    const age = getHorseAgeAtRace(horse, race.raceDate);
    if (age == null) {
      hasManual = true;
      reasons.push('eligibility.ageMissing');
    } else if (rules.ageRules.some((rule) => age >= rule.min && (rule.max == null || age <= rule.max))) {
      reasons.push('eligibility.ageMatches');
    } else {
      hasFailure = true;
      reasons.push(age < Math.min(...rules.ageRules.map((rule) => rule.min)) ? 'eligibility.ageTooYoung' : 'eligibility.ageTooOld');
    }
  }
  if (rules.gender) {
    const gender = normalizeHorseGender(horse.gender);
    if (gender === 'unknown') {
      hasManual = true;
      reasons.push('eligibility.genderMissing');
    } else if (gender === rules.gender) {
      reasons.push('eligibility.genderMatches');
    } else if (gender === 'gelding' && rules.gender === 'male') {
      hasManual = true;
      reasons.push('eligibility.genderMissing');
    } else {
      hasFailure = true;
      reasons.push('eligibility.genderMismatch');
    }
  }
  if (rules.earningsMin != null || rules.earningsMax != null) {
    const earnings = horse.totalEarnings === '' ? null : toSafeNumber(horse.totalEarnings, NaN);
    if (!Number.isFinite(earnings)) {
      hasManual = true;
      reasons.push('eligibility.earningsMissing');
    } else if ((rules.earningsMin == null || earnings >= rules.earningsMin) && (rules.earningsMax == null || earnings < rules.earningsMax)) {
      reasons.push('eligibility.earningsMatch');
    } else {
      hasFailure = true;
      reasons.push(rules.earningsMin != null && earnings < rules.earningsMin ? 'eligibility.earningsTooLow' : 'eligibility.earningsTooHigh');
    }
  }
  if (rules.last5Max != null) {
    const earnings = horse.last5Earnings === '' ? null : toSafeNumber(horse.last5Earnings, NaN);
    if (!Number.isFinite(earnings)) {
      hasManual = true;
      reasons.push('eligibility.earningsMissing');
    } else if (earnings < rules.last5Max) {
      reasons.push('eligibility.earningsMatch');
    } else {
      hasFailure = true;
      reasons.push('eligibility.earningsTooHigh');
    }
  }
  if (rules.categories.length) {
    const category = String(horse.racingCategory || '').trim().toUpperCase();
    if (!category) {
      hasManual = true;
      reasons.push('eligibility.categoryMissing');
    } else if (rules.categoryManual) {
      hasManual = true;
      reasons.push('eligibility.categoryManual');
    } else if (rules.categories.includes(category)) {
      reasons.push('eligibility.categoryMatches');
    } else {
      hasFailure = true;
      reasons.push('eligibility.categoryManual');
    }
  }
  return {
    horse,
    status: hasFailure ? 'not_eligible' : hasManual ? 'manual_check' : 'eligible',
    reasons: reasons.length ? reasons : ['eligibility.manualCheck']
  };
}

function getEligibilityHorseBuckets(race) {
  const possible = [];
  const manual = [];
  const notEligible = [];
  state.horses.map(normalizeHorse).forEach((horse) => {
    const result = evaluateHorseRaceEligibility(horse, race);
    if (result.status === 'eligible') possible.push(result);
    else if (result.status === 'manual_check') manual.push(result);
    else notEligible.push(result);
  });
  return { possible, manual, notEligible };
}

function getUpcomingRaceDayCount() {
  const todayString = today();
  return new Set(raceProgramRaces
    .filter((race) => race.raceDate >= todayString)
    .map((race) => race.raceDate)
    .filter(Boolean)).size;
}

function renderRaceControlDashboard() {
  const isAdmin = isSuperAdmin();
  if (els.raceControlDashboard) els.raceControlDashboard.hidden = !isAdmin;
  if (!isAdmin) return;
  if (els.raceStablePreviewToggle) {
    els.raceStablePreviewToggle.textContent = raceStablePreviewForAdmin
      ? t('raceControl.hideStablePreview')
      : t('raceControl.previewStable');
  }
  if (!els.raceControlSummary) return;
  const cards = [
    ['raceControl.registryCount', racingHorses.length],
    ['raceControl.draftPrograms', racePrograms.filter((program) => program.status === 'draft').length],
    ['raceControl.publishedPrograms', racePrograms.filter((program) => program.status === 'published').length],
    ['raceControl.importedStarts', racingHorseStarts.length],
    ['raceControl.upcomingRaceDays', getUpcomingRaceDayCount()]
  ];
  els.raceControlSummary.innerHTML = cards.map(([labelKey, value]) => `
    <article class="summary-card premium-icon-card">
      <span>${escapeHtml(value)}</span>
      <strong>${t(labelKey)}</strong>
    </article>
  `).join('');
}

function renderRaceProgramOptions() {
  if (!els.raceImportProgramSelect) return;
  const currentValue = els.raceImportProgramSelect.value;
  const programs = racePrograms
    .filter((program) => program.status !== 'archived')
    .sort((a, b) => `${b.createdAt}`.localeCompare(`${a.createdAt}`));
  els.raceImportProgramSelect.innerHTML = [`<option value="">${t('racePrograms.program')}</option>`]
    .concat(programs.map((program) => `<option value="${program.id}">${escapeHtml(program.title || program.racetrackName || program.id)}</option>`))
    .join('');
  if (programs.some((program) => program.id === currentValue)) els.raceImportProgramSelect.value = currentValue;
}

function getRaceProgramStatusLabel(status) {
  const safeStatus = status || 'draft';
  return t(`racePrograms.status${safeStatus.charAt(0).toUpperCase()}${safeStatus.slice(1)}`);
}

function renderRaceProgramAdminCard(program) {
  const races = raceProgramRaces.filter((race) => race.programId === program.id);
  const location = [program.racetrackName, program.locationCity, program.locationCountry].filter(Boolean).join(' - ');
  return `
    <article class="item-card premium-stable-card race-program-admin-card">
      <div>
        <h4>${escapeHtml(program.title || program.racetrackName || t('racePrograms.title'))}</h4>
        <p>${escapeHtml([location, program.programMonth].filter(Boolean).join(' - '))}</p>
        <div class="item-meta">
          <span class="pill">${getRaceProgramStatusLabel(program.status)}</span>
          <span class="pill">${t('raceEntries.racetrack')}: ${escapeHtml(program.racetrackName || '-')}</span>
          <span class="pill">${t('racePrograms.racesInProgram')}: ${races.length}</span>
        </div>
        <div class="race-plan-list">
          ${races.slice(0, 8).map((race) => `
            <article class="race-plan-card">
              <div>
                <strong>${escapeHtml([race.raceDate, race.raceNumber, race.raceName].filter(Boolean).join(' - '))}</strong>
                <p>${escapeHtml([race.prizeInfo, race.distance].filter(Boolean).join(' - ') || t('common.noNotes'))}</p>
              </div>
              <div class="item-actions">
                <button class="button ghost" type="button" data-action="edit-global-race" data-id="${race.id}">${t('common.edit')}</button>
                <button class="button ghost danger" type="button" data-action="delete-global-race" data-id="${race.id}">${t('common.delete')}</button>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-race-program" data-id="${program.id}">${t('common.edit')}</button>
        <label class="file-button button secondary">
          <span>${t('racePrograms.importToProgram')}</span>
          <input type="file" accept=".pdf,.csv,.txt,application/pdf,text/csv,text/plain" data-program-import-id="${program.id}">
        </label>
        <button class="button ghost" type="button" data-action="publish-race-program" data-id="${program.id}">${t('racePrograms.publish')}</button>
        <button class="button ghost" type="button" data-action="archive-race-program" data-id="${program.id}">${t('racePrograms.archive')}</button>
      </div>
    </article>
  `;
}

function renderRaceProgramAdmin() {
  const isAdmin = isSuperAdmin();
  if (els.raceProgramAdminPanel) els.raceProgramAdminPanel.hidden = !isAdmin || !cloudWriteMode;
  if (els.raceImportProgramLabel) els.raceImportProgramLabel.hidden = !isAdmin || !cloudWriteMode;
  if (!els.raceProgramAdminList) return;
  if (!isAdmin || !cloudWriteMode) {
    els.raceProgramAdminList.innerHTML = '';
    return;
  }
  renderRaceProgramOptions();
  if (!racePrograms.length) {
    els.raceProgramAdminList.innerHTML = `<p class="empty-state">${t('racePrograms.createFirst')}</p>`;
    return;
  }
  const groups = [
    { key: 'draft', title: t('racePrograms.draftPrograms') },
    { key: 'published', title: t('racePrograms.publishedPrograms') },
    { key: 'archived', title: t('racePrograms.archivedPrograms') }
  ];
  els.raceProgramAdminList.innerHTML = `
    <div class="race-program-management-heading">
      <h4>${t('racePrograms.manageTitle')}</h4>
      <p>${t('racePrograms.adminHelp')}</p>
    </div>
    ${groups.map((group) => {
      const programs = racePrograms.filter((program) => (program.status || 'draft') === group.key);
      if (!programs.length) return '';
      return `
        <section class="race-program-status-group">
          <h4>${group.title}</h4>
          <div class="item-list race-program-list">
            ${programs
              .sort((a, b) => `${b.createdAt}`.localeCompare(`${a.createdAt}`))
              .map(renderRaceProgramAdminCard)
              .join('')}
          </div>
        </section>
      `;
    }).join('')}
  `;
}

function formatRacingStatLine(horse, prefix) {
  return `${t('racingRegistry.starts')}: ${horse[`${prefix}Starts`] || 0} | ${t('racingRegistry.wins')}: ${horse[`${prefix}Wins`] || 0} | ${t('racingRegistry.places')}: ${horse[`${prefix}Places`] || 0} | ${t('racingRegistry.show')}: ${horse[`${prefix}Show`] || 0} | ${t('racingRegistry.earnings')}: ${horse[`${prefix}Earnings`] || 0}`;
}

function hasRacingPerformanceSummary(horse) {
  return ['career', 'twelveMonth', 'year', 'twoMonth'].some((prefix) => (
    horse[`${prefix}Starts`] || horse[`${prefix}Wins`] || horse[`${prefix}Places`] || horse[`${prefix}Show`] || horse[`${prefix}Earnings`]
  ));
}

function renderRacingPerformanceSummary(horse) {
  const cards = [
    ['racingRegistry.career', 'career'],
    ['racingRegistry.last12Months', 'twelveMonth'],
    ['racingRegistry.currentYear', 'year'],
    ['racingRegistry.last2Months', 'twoMonth']
  ];
  return `
    <section class="racing-performance-grid">
      ${cards.map(([labelKey, prefix]) => `
        <article class="racing-mini-card">
          <strong>${t(labelKey)}</strong>
          <div class="racing-stat-row">
            <span><b>${escapeHtml(horse[`${prefix}Starts`] || 0)}</b>${t('racingRegistry.starts')}</span>
            <span><b>${escapeHtml(horse[`${prefix}Wins`] || 0)}</b>${t('racingRegistry.wins')}</span>
            <span><b>${escapeHtml(horse[`${prefix}Places`] || 0)}</b>${t('racingRegistry.places')}</span>
            <span><b>${escapeHtml(horse[`${prefix}Show`] || 0)}</b>${t('racingRegistry.show')}</span>
            <span><b>${escapeHtml(horse[`${prefix}Earnings`] || 0)}</b>${t('racingRegistry.earnings')}</span>
          </div>
        </article>
      `).join('')}
      ${hasRacingPerformanceSummary(horse) ? '' : `<p class="empty-state">${t('racingRegistry.noPerformanceSummary')}</p>`}
    </section>
  `;
}

function renderRacingRecords(horse) {
  return renderHorseDetailGroup('racingRegistry.records', [
    ['racingRegistry.careerRecord', horse.careerRecord],
    ['racingRegistry.twelveMonthRecord', horse.twelveMonthRecord],
    ['racingRegistry.yearRecord', horse.yearRecord],
    ['racingRegistry.shortDistanceRecord', horse.shortDistanceRecord],
    ['racingRegistry.longDistanceRecord', horse.longDistanceRecord]
  ]);
}

function renderRacingCategories(horse) {
  return renderHorseDetailGroup('racingRegistry.categories', [
    ['racingRegistry.categoryMc', horse.categoryMc],
    ['racingRegistry.categoryMs', horse.categoryMs],
    ['racingRegistry.potentialMc', horse.potentialMc],
    ['racingRegistry.potentialMs', horse.potentialMs],
    ['racingRegistry.reclaimAllowed', horse.reclaimAllowed ? t('common.yes') : t('common.no')]
  ]);
}

function getRacingStartsForHorse(racingHorseId) {
  return racingHorseStarts
    .map(normalizeRacingHorseStart)
    .filter((start) => start.racingHorseId === racingHorseId)
    .sort((a, b) => String(b.raceDate || '').localeCompare(String(a.raceDate || '')));
}

function parseRacingPlacement(value) {
  const match = String(value || '').trim().match(/^0*(\d{1,2})/);
  return match ? Number(match[1]) : null;
}

function parseKilometerTime(value) {
  const match = String(value || '').trim().match(/\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const number = Number(match[0].replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

function getBestKilometerTime(starts, fallback = '') {
  const best = starts
    .map((start) => ({ value: start.kilometerTime, score: parseKilometerTime(start.kilometerTime) }))
    .filter((entry) => Number.isFinite(entry.score))
    .sort((a, b) => a.score - b.score)[0];
  return best?.value || fallback || '';
}

function summarizeRacingStarts(starts) {
  return starts.reduce((summary, start) => {
    const placement = parseRacingPlacement(start.placement);
    summary.starts += 1;
    if (placement === 1) summary.wins += 1;
    if (placement != null && placement <= 3) summary.places += 1;
    if (placement != null && placement <= 5) summary.show += 1;
    summary.earnings += toSafeNumber(start.grossPrize, 0);
    return summary;
  }, { starts: 0, wins: 0, places: 0, show: 0, earnings: 0 });
}

function dateMonthsAgo(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().slice(0, 10);
}

function assignRacingSummary(summary, prefix, values) {
  summary[`${prefix}Starts`] = values.starts;
  summary[`${prefix}Wins`] = values.wins;
  summary[`${prefix}Places`] = values.places;
  summary[`${prefix}Show`] = values.show;
  summary[`${prefix}Earnings`] = Number(values.earnings.toFixed(2));
}

function calculateRacingHorseSummary(horse) {
  const starts = getRacingStartsForHorse(horse.id);
  if (!starts.length) return null;
  const currentYear = String(new Date().getFullYear());
  const twelveMonthStart = dateMonthsAgo(12);
  const twoMonthStart = dateMonthsAgo(2);
  const yearStarts = starts.filter((start) => String(start.raceDate || '').startsWith(currentYear));
  const twelveMonthStarts = starts.filter((start) => start.raceDate && start.raceDate >= twelveMonthStart);
  const twoMonthStarts = starts.filter((start) => start.raceDate && start.raceDate >= twoMonthStart);
  const career = summarizeRacingStarts(starts);
  const latestFive = starts.slice(0, 5);
  const summary = {};
  assignRacingSummary(summary, 'career', career);
  assignRacingSummary(summary, 'twelveMonth', summarizeRacingStarts(twelveMonthStarts));
  assignRacingSummary(summary, 'year', summarizeRacingStarts(yearStarts));
  assignRacingSummary(summary, 'twoMonth', summarizeRacingStarts(twoMonthStarts));
  summary.totalEarnings = summary.careerEarnings;
  summary.last5Earnings = Number(latestFive.reduce((sum, start) => sum + toSafeNumber(start.grossPrize, 0), 0).toFixed(2));
  summary.careerRecord = getBestKilometerTime(starts, horse.careerRecord);
  summary.shortDistanceRecord = getBestKilometerTime(starts.filter((start) => toSafeNumber(start.distance, 0) < 2000), horse.shortDistanceRecord);
  summary.longDistanceRecord = getBestKilometerTime(starts.filter((start) => toSafeNumber(start.distance, 0) >= 2000), horse.longDistanceRecord);
  summary.yearRecord = getBestKilometerTime(yearStarts, horse.yearRecord);
  summary.twelveMonthRecord = getBestKilometerTime(twelveMonthStarts, horse.twelveMonthRecord);
  summary.lastResultsUpdate = starts[0]?.raceDate || horse.lastResultsUpdate || '';
  return { starts, summary };
}

async function recalculateRacingHorseSummary(id) {
  if (!isSuperAdmin()) return;
  const horse = racingHorses.find((entry) => entry.id === id);
  if (!horse) return;
  const calculated = calculateRacingHorseSummary(horse);
  if (!calculated) {
    showMessage(t('racingRegistry.noStartsToCalculate'));
    return;
  }
  try {
    const saved = await saveRacingHorseToCloud({ ...horse, ...calculated.summary });
    const existingIndex = racingHorses.findIndex((entry) => entry.id === saved.id);
    if (existingIndex >= 0) racingHorses[existingIndex] = saved;
    render();
    showMessage(t('racingRegistry.summaryRecalculated', { count: calculated.starts.length }));
  } catch (error) {
    console.error('[EquiTrack racing registry] Summary recalculation failed', error);
    showMessage(t('racingRegistry.saveFailed', { error: getCloudErrorMessage(error) }));
  }
}

function renderRacingStartHistory(horse, editable = false, limit = 0) {
  const starts = getRacingStartsForHorse(horse.id);
  const visibleStarts = limit ? starts.slice(0, limit) : starts;
  if (!visibleStarts.length) {
    return `<section class="racing-start-history"><h5>${t('racingRegistry.startHistory')}</h5><p class="empty-state">${t('racingRegistry.noStarts')} ${t('racingRegistry.resultsImportFuture')}</p></section>`;
  }
  return `
    <section class="racing-start-history">
      <h5>${t('racingRegistry.startHistory')}</h5>
      <div class="racing-start-table-wrap">
        <table class="racing-start-table">
          <thead>
            <tr>
              <th>${t('raceEntries.raceDate')}</th>
              <th>${t('racingRegistry.raceAndTrack')}</th>
              <th>${t('racingRegistry.driver')}</th>
              <th>${t('racingRegistry.placement')}</th>
              <th>${t('racingRegistry.kmTime')}</th>
              <th>${t('racingRegistry.distance')}</th>
              <th>${t('racingRegistry.starters')}</th>
              <th>${t('racingRegistry.shoeing')}</th>
              <th>${t('racingRegistry.netPrize')}</th>
              <th>${t('racingRegistry.grossPrize')}</th>
              <th>${t('common.notesSimple')}</th>
              ${editable ? `<th>${t('common.actions')}</th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${visibleStarts.map((start) => `
              <tr>
                <td>${escapeHtml(start.raceDate || t('common.notSet'))}</td>
                <td>${escapeHtml([start.racetrackCode, start.racetrackName, start.raceCode].filter(Boolean).join(' - ') || t('common.notSet'))}</td>
                <td>${escapeHtml(start.driverName || t('common.notSet'))}</td>
                <td>${escapeHtml(start.placement || t('common.notSet'))}</td>
                <td>${escapeHtml(start.kilometerTime || t('common.notSet'))}</td>
                <td>${escapeHtml(start.distance || t('common.notSet'))}</td>
                <td>${escapeHtml(start.startersInfo || t('common.notSet'))}</td>
                <td>${escapeHtml(start.shoeing || t('common.notSet'))}</td>
                <td>${escapeHtml(start.netPrize || t('common.notSet'))}</td>
                <td>${escapeHtml(start.grossPrize || t('common.notSet'))}</td>
                <td>${escapeHtml(start.raceNotes || t('common.noNotes'))}${start.videoUrl ? `<br><a href="${escapeHtml(start.videoUrl)}" target="_blank" rel="noopener noreferrer">${t('racingRegistry.videoUrl')}</a>` : ''}</td>
                ${editable ? `
                  <td class="racing-start-actions">
                    <button class="button ghost" type="button" data-action="edit-racing-start" data-id="${start.id}">${t('common.edit')}</button>
                    <button class="button ghost danger" type="button" data-action="delete-racing-start" data-id="${start.id}">${t('common.delete')}</button>
                  </td>
                ` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function getRacingHorseAgeText(horse) {
  const birthYear = Number(horse.birthYear || String(horse.birthDate || '').slice(0, 4));
  if (!birthYear) return '';
  return `${new Date().getFullYear() - birthYear}`;
}

function renderRacingHorseProfile(horse, { editable = false, compact = false } = {}) {
  const headerMeta = [
    horse.registrationNumber && `${t('racingRegistry.registration')}: ${horse.registrationNumber}`,
    getRacingHorseAgeText(horse) && `${t('racingRegistry.age')}: ${getRacingHorseAgeText(horse)}`,
    horse.gender && `${t('horses.gender')}: ${t(`horses.gender${horse.gender.charAt(0).toUpperCase()}${horse.gender.slice(1)}`) || horse.gender}`,
    horse.countryOfOrigin,
    horse.racingCategory && `${t('horses.racingCategory')}: ${horse.racingCategory}`,
    `${t('racingRegistry.totalEarnings')}: ${horse.careerEarnings || horse.totalEarnings || 0}`,
    horse.lastResultsUpdate && `${t('racingRegistry.lastResultsUpdate')}: ${horse.lastResultsUpdate}`
  ].filter(Boolean);
  return `
    <section class="racing-profile-shell ${compact ? 'compact' : ''}">
      <div class="racing-profile-header">
        <div>
          <p class="eyebrow">${t('racingRegistry.title')}</p>
          <h4>${escapeHtml(horse.horseName)}</h4>
          <div class="item-meta">${headerMeta.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('')}</div>
        </div>
        ${editable ? `<div class="item-actions">
          <button class="button ghost" type="button" data-action="recalculate-racing-summary" data-id="${horse.id}">${t('racingRegistry.recalculateSummary')}</button>
          <button class="button ghost" type="button" data-action="edit-racing-horse" data-id="${horse.id}">${t('common.edit')}</button>
        </div>` : ''}
      </div>
      ${editable ? `<p class="update-note">${t('racingRegistry.recalculateHelp')}</p>` : ''}
      ${renderRacingPerformanceSummary(horse)}
      <div class="horse-detail-grid racing-profile-panels">
        ${renderRacingRecords(horse)}
        ${renderRacingCategories(horse)}
      </div>
      ${renderRacingStartHistory(horse, editable, compact ? 5 : 0)}
    </section>
  `;
}

function renderResultsImportPreview() {
  if (!els.resultsImportPreview) return;
  if (!resultsImportPreviewItems.length) {
    els.resultsImportPreview.innerHTML = '';
    if (els.resultsImportSaveButton) els.resultsImportSaveButton.hidden = true;
    return;
  }
  const horseOptions = [`<option value="">${t('racingRegistry.noRegistryMatch')}</option>`]
    .concat(racingHorses
      .sort((a, b) => a.horseName.localeCompare(b.horseName))
      .map((horse) => `<option value="${horse.id}">${escapeHtml([horse.horseName, horse.registrationNumber].filter(Boolean).join(' - '))}</option>`))
    .join('');
  const grouped = new Map();
  resultsImportPreviewItems.forEach((row) => {
    const key = `${row.raceNumber} ${row.raceName}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  els.resultsImportPreview.innerHTML = `
    <div class="module-header">
      <div>
        <h4>${t('racingRegistry.reviewResults')}</h4>
        <p>${t('racingRegistry.resultsFound', { count: resultsImportPreviewItems.length })}</p>
      </div>
    </div>
    ${Array.from(grouped.entries()).map(([raceLabel, rows]) => `
      <section class="race-import-group">
        <h5>${escapeHtml(raceLabel)}</h5>
        <div class="race-import-list">
          ${rows.map((row) => `
            <article class="race-import-card" data-result-id="${row.id}">
              <label class="checkbox-line">
                <input type="checkbox" data-result-field="selected" ${row.selected ? 'checked' : ''}>
                <span>${escapeHtml([row.placement, row.startingNumber, row.horseName].filter(Boolean).join(' - '))}</span>
              </label>
              ${row.duplicate ? `<p class="status-text warning">${t('racingRegistry.duplicateResult')}</p>` : ''}
              <div class="entry-form compact-form">
                <label><span>${t('racingRegistry.horseName')}</span><input data-result-field="horseName" value="${escapeHtml(row.horseName)}"></label>
                <label><span>${t('racingRegistry.placement')}</span><input data-result-field="placement" value="${escapeHtml(row.placement)}"></label>
                <label><span>${t('raceEntries.raceNumber')}</span><input data-result-field="raceNumber" value="${escapeHtml(row.raceNumber)}"></label>
                <label><span>${t('racingRegistry.distance')}</span><input data-result-field="distance" value="${escapeHtml(row.distance)}"></label>
                <label><span>${t('racingRegistry.kmTime')}</span><input data-result-field="kilometerTime" value="${escapeHtml(row.kilometerTime)}"></label>
                <label><span>${t('racingRegistry.netPrize')}</span><input data-result-field="netPrize" type="number" step="0.01" value="${escapeHtml(row.netPrize)}"></label>
                <label><span>${t('racingRegistry.grossPrize')}</span><input data-result-field="grossPrize" type="number" step="0.01" value="${escapeHtml(row.grossPrize)}"></label>
                <label><span>${t('racingRegistry.driver')}</span><input data-result-field="driverName" value="${escapeHtml(row.driverName)}"></label>
                <label><span>${t('horses.ownerName')}</span><input data-result-field="ownerName" value="${escapeHtml(row.ownerName)}"></label>
                <label><span>${t('horses.trainerName')}</span><input data-result-field="trainerName" value="${escapeHtml(row.trainerName)}"></label>
                <label><span>${t('racingRegistry.matchExistingHorse')}</span><select data-result-field="racingHorseId">${horseOptions}</select></label>
                <label><span>${t('racingRegistry.noRegistryMatch')}</span><select data-result-field="matchMode">
                  <option value="skip">${t('racingRegistry.skipRow')}</option>
                  <option value="create">${t('racingRegistry.createRacingHorse')}</option>
                  <option value="match">${t('racingRegistry.matchExistingHorse')}</option>
                </select></label>
                <label class="full"><span>${t('common.notesSimple')}</span><textarea data-result-field="notes" rows="3">${escapeHtml(row.notes)}</textarea></label>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('')}
  `;
  resultsImportPreviewItems.forEach((row) => {
    const card = els.resultsImportPreview.querySelector(`[data-result-id="${CSS.escape(row.id)}"]`);
    if (!card) return;
    const horseSelect = card.querySelector('[data-result-field="racingHorseId"]');
    const modeSelect = card.querySelector('[data-result-field="matchMode"]');
    if (horseSelect) horseSelect.value = row.racingHorseId || '';
    if (modeSelect) modeSelect.value = row.matchMode || (row.racingHorseId ? 'match' : 'skip');
  });
  if (els.resultsImportSaveButton) {
    els.resultsImportSaveButton.hidden = false;
    els.resultsImportSaveButton.disabled = !resultsImportPreviewItems.some((row) => row.selected);
  }
}

function renderRacingHorseRegistry() {
  if (!els.racingHorseRegistryList || !els.racingHorseForm) return;
  const isAdmin = isSuperAdmin() && cloudWriteMode;
  els.racingHorseForm.hidden = !isAdmin;
  if (els.racingHorseStartForm) els.racingHorseStartForm.hidden = !isAdmin;
  if (els.resultsImportInput?.closest('.race-results-import-panel')) els.resultsImportInput.closest('.race-results-import-panel').hidden = !isAdmin;
  if (els.racingHorseSearch) els.racingHorseSearch.hidden = !isAdmin;
  if (!isAdmin) {
    els.racingHorseRegistryList.innerHTML = '';
    return;
  }
  const search = racingHorseSearchTerm.trim().toLowerCase();
  const filtered = racingHorses
    .filter((horse) => !search || [horse.horseName, horse.registrationNumber].filter(Boolean).join(' ').toLowerCase().includes(search))
    .sort((a, b) => a.horseName.localeCompare(b.horseName));
  if (!filtered.length) {
    els.racingHorseRegistryList.innerHTML = `<p class="empty-state">${t('racingRegistry.empty')}</p>`;
    return;
  }
  els.racingHorseRegistryList.innerHTML = filtered.map((horse) => `
    <article class="item-card premium-stable-card racing-horse-card">
      <div>
        <h4>${escapeHtml(horse.horseName)}</h4>
        <p>${escapeHtml([horse.registrationNumber, horse.countryOfOrigin, horse.racingCategory].filter(Boolean).join(' - '))}</p>
        <div class="item-meta">
          <span class="pill">${t('racingRegistry.totalEarnings')}: ${escapeHtml(horse.careerEarnings || horse.totalEarnings || 0)}</span>
          <span class="pill">${t('racingRegistry.last5Earnings')}: ${escapeHtml(horse.last5Earnings || '-')}</span>
          <span class="pill">${t('racingRegistry.startHistory')}: ${escapeHtml(getRacingStartsForHorse(horse.id).length)}</span>
          <span class="pill">${t('racingRegistry.lastResultsUpdate')}: ${escapeHtml(horse.lastResultsUpdate || '-')}</span>
        </div>
        <details class="horse-details">
          <summary>${t('racingRegistry.performanceSummary')}</summary>
          ${renderRacingHorseProfile(horse, { editable: true })}
        </details>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-racing-horse" data-id="${horse.id}">${t('common.edit')}</button>
      </div>
    </article>
  `).join('');
}

function renderPublishedRacePrograms() {
  if (!els.publishedRaceProgramList) return;
  if (els.raceProgramCloudNotice) els.raceProgramCloudNotice.hidden = cloudWriteMode;
  if (!cloudWriteMode) {
    els.publishedRaceProgramList.innerHTML = `<p class="empty-state">${t('racePrograms.cloudRequired')}</p>`;
    return;
  }
  const publishedPrograms = racePrograms.filter((program) => program.status === 'published');
  if (!publishedPrograms.length) {
    els.publishedRaceProgramList.innerHTML = `<p class="empty-state">${t('racePrograms.noPrograms')}</p>`;
    return;
  }
  const publishedRaceContexts = publishedPrograms.flatMap((program) => raceProgramRaces
    .filter((race) => race.programId === program.id)
    .map((race) => ({ race, program })));
  if (!publishedRaceContexts.length) {
    els.publishedRaceProgramList.innerHTML = `<p class="empty-state">${t('raceEntries.noRacesForDay')}</p>`;
    return;
  }
  const grouped = new Map();
  publishedRaceContexts.forEach((context) => {
    const racetrack = context.program.racetrackName || context.race.racetrackName || t('raceEntries.racetrack');
    const date = context.race.raceDate || '';
    if (!grouped.has(racetrack)) grouped.set(racetrack, new Map());
    const days = grouped.get(racetrack);
    if (!days.has(date)) days.set(date, []);
    days.get(date).push(context);
  });
  const firstRacetrack = Array.from(grouped.keys())[0] || '';
  const firstDate = firstRacetrack ? Array.from(grouped.get(firstRacetrack).keys()).sort()[0] || '' : '';
  const selectedRacetrackExists = selectedPublishedRaceDay.racetrack && grouped.has(selectedPublishedRaceDay.racetrack);
  const selectedDateExists = selectedRacetrackExists && grouped.get(selectedPublishedRaceDay.racetrack).has(selectedPublishedRaceDay.date);
  if (!selectedDateExists) selectedPublishedRaceDay = { racetrack: firstRacetrack, date: firstDate };
  const selectedContexts = (grouped.get(selectedPublishedRaceDay.racetrack)?.get(selectedPublishedRaceDay.date) || [])
    .sort((a, b) => `${a.race.raceNumber} ${a.race.raceName}`.localeCompare(`${b.race.raceNumber} ${b.race.raceName}`));
  const search = publishedRaceFilter.search.trim().toLowerCase();
  const filteredContexts = selectedContexts.filter(({ race }) => {
    const { possible } = getEligibilityHorseBuckets(race);
    const matchesPossible = !publishedRaceFilter.possibleOnly || possible.length > 0;
    const haystack = [race.raceName, race.raceNumber, race.raceClass, race.eligibilityNotes, race.distance, race.prizeInfo]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return matchesPossible && (!search || haystack.includes(search));
  });
  els.publishedRaceProgramList.innerHTML = `
    <div class="race-day-browser">
      <aside class="race-day-sidebar">
        <div class="module-header compact">
          <div>
            <h3>${t('raceEntries.racetracks')}</h3>
            <p>${t('raceEntries.selectRaceDay')}</p>
          </div>
        </div>
        <div class="race-track-list">
          ${Array.from(grouped.entries()).map(([racetrack, days]) => `
            <article class="race-track-group">
              <h4>${escapeHtml(racetrack)}</h4>
              <div class="race-day-list">
                ${Array.from(days.entries())
                  .sort(([dateA], [dateB]) => `${dateA}`.localeCompare(`${dateB}`))
                  .map(([date, races]) => {
                    const active = racetrack === selectedPublishedRaceDay.racetrack && date === selectedPublishedRaceDay.date;
                    return `
                      <button class="race-day-button ${active ? 'active' : ''}" type="button" data-action="select-published-race-day" data-racetrack="${escapeHtml(racetrack)}" data-date="${escapeHtml(date)}">
                        <span>${escapeHtml(date || t('raceEntries.raceDate'))}</span>
                        <small>${t('raceEntries.raceCount', { count: races.length })}</small>
                      </button>
                    `;
                  }).join('')}
              </div>
            </article>
          `).join('')}
        </div>
      </aside>
      <section class="race-day-detail">
        <div class="module-header">
          <div>
            <h3>${t('raceEntries.racesOnThisDay')}</h3>
            <p>${escapeHtml([selectedPublishedRaceDay.racetrack, selectedPublishedRaceDay.date].filter(Boolean).join(' - '))}</p>
          </div>
        </div>
        <div class="race-day-filters">
          <label><span>${t('raceEntries.searchRaces')}</span><input data-race-filter="search" value="${escapeHtml(publishedRaceFilter.search)}" placeholder="${t('raceEntries.searchRaces')}"></label>
          <label class="checkbox-line inline-checkbox">
            <input type="checkbox" data-race-filter="possibleOnly" ${publishedRaceFilter.possibleOnly ? 'checked' : ''}>
            <span>${t('raceEntries.showOnlyPossible')}</span>
          </label>
        </div>
        <p class="update-note">${t('raceEntries.eligibilityDisclaimer')}</p>
        <div class="race-import-list">
          ${filteredContexts.length
            ? filteredContexts.map(({ race, program }) => renderGlobalRaceCard(race, program)).join('')
            : `<p class="empty-state">${t('raceEntries.noRacesForDay')}</p>`}
        </div>
      </section>
    </div>
  `;
}

function renderGlobalRaceCard(race, program) {
  const plans = getRacePlansForProgramRace(race.id);
  const { possible, manual, notEligible } = getEligibilityHorseBuckets(race);
  const possibleHorses = possible.map((entry) => entry.horse);
  const manualHorses = manual.map((entry) => entry.horse);
  const horseOrder = [
    ...possibleHorses,
    ...manualHorses.filter((horse) => !possibleHorses.some((entry) => entry.id === horse.id)),
    ...state.horses.filter((horse) => !possibleHorses.some((entry) => entry.id === horse.id) && !manualHorses.some((entry) => entry.id === horse.id))
  ];
  const firstHorse = getHorseRacingData(horseOrder[0] || {});
  const horseOptions = horseOrder.map((horse) => `<option value="${horse.id}">${escapeHtml(horse.name)}</option>`).join('');
  const details = [
    race.raceClass && `${t('raceEntries.raceClass')}: ${race.raceClass}`,
    race.prizeInfo && `${t('raceEntries.prizeInfo')}: ${race.prizeInfo}`,
    race.distance && `${t('raceEntries.distance')}: ${race.distance}`,
    race.entryDeadline && `${t('raceEntries.entryDeadline')}: ${race.entryDeadline}`,
    race.contactEmail && `${t('raceEntries.contactEmail')}: ${race.contactEmail}`
  ].filter(Boolean);
  return `
    <article class="item-card race-entry-card premium-stable-card" data-program-race-id="${race.id}">
      <div>
        <h4>${escapeHtml([race.raceNumber, race.raceName].filter(Boolean).join(' ') || t('raceEntries.raceName'))}</h4>
        <p>${escapeHtml([race.raceDate, program.racetrackName].filter(Boolean).join(' - '))}</p>
        <div class="item-meta">${details.map((detail) => `<span class="pill">${escapeHtml(detail)}</span>`).join('')}</div>
        ${race.eligibilityNotes ? `<div class="detail-box"><strong>${t('raceEntries.eligibilityNotes')}</strong><p>${escapeHtml(race.eligibilityNotes)}</p></div>` : ''}
        <div class="detail-box">
          <strong>${t('racePrograms.possibleMatches')}</strong>
          <div class="horse-chip-list">
            ${possible.length ? possible.map((entry) => `<span class="horse-chip" title="${escapeHtml(entry.reasons.map((reason) => t(reason)).join(' · '))}">${escapeHtml(entry.horse.name)}</span>`).join('') : `<span class="muted-inline">${t('racePrograms.manualCheck')}</span>`}
          </div>
          ${manual.length ? `<div class="horse-chip-list manual-check"><strong>${t('racePrograms.manualCheck')}:</strong> ${manual.map((entry) => `<span class="horse-chip attention" title="${escapeHtml(entry.reasons.map((reason) => t(reason)).join(' · '))}">${escapeHtml(entry.horse.name)}</span>`).join('')}</div>` : ''}
          ${notEligible.length ? `<details class="eligibility-reasons"><summary>${t('eligibility.notEligible')}</summary>${notEligible.map((entry) => `<p><strong>${escapeHtml(entry.horse.name)}</strong>: ${escapeHtml(entry.reasons.map((reason) => t(reason)).join(', '))}</p>`).join('')}</details>` : ''}
        </div>
        ${plans.length ? `<div class="race-plan-list">${plans.map((plan) => renderRacePlanLine(plan, null)).join('')}</div>` : ''}
        ${canCreateRacePlans() ? `<div class="entry-form compact-form">
          <label><span>${t('raceEntries.horse')}</span><select data-plan-field="horseId">${horseOptions}</select></label>
          <label><span>${t('raceEntries.driver')}</span><input data-plan-field="driver" value="${escapeHtml(firstHorse.defaultDriver)}"></label>
          <label><span>${t('raceEntries.trainer')}</span><input data-plan-field="trainer" value="${escapeHtml(firstHorse.trainerName)}"></label>
          <label class="full"><span>${t('common.notesSimple')}</span><textarea data-plan-field="notes" rows="2"></textarea></label>
          <button class="button primary" type="button" data-action="create-global-race-plan" data-id="${race.id}">${t('racePrograms.createPlan')}</button>
        </div>` : ''}
      </div>
    </article>
  `;
}

function renderRaceImportPreview() {
  if (!els.raceImportPreview) return;
  if (!raceImportPreviewItems.length) {
    els.raceImportPreview.innerHTML = '';
    if (els.raceImportSaveButton) els.raceImportSaveButton.hidden = true;
    return;
  }
  els.raceImportPreview.innerHTML = `
    <div class="module-header">
      <div>
        <h4>${t('raceEntries.reviewImported')}</h4>
        <p>${t('raceEntries.racesFound', { count: raceImportPreviewItems.length })}</p>
      </div>
    </div>
    <div class="race-import-list">
      ${raceImportPreviewItems.map((race) => `
        <article class="race-import-card" data-import-id="${race.id}">
          <label class="checkbox-line">
            <input type="checkbox" data-import-field="selected" ${race.selected ? 'checked' : ''}>
            <span>${escapeHtml([race.raceDate, race.raceNumber, race.raceName].filter(Boolean).join(' - '))}</span>
          </label>
          <div class="entry-form compact-form">
            <label><span>${t('raceEntries.racetrack')}</span><input data-import-field="racetrackName" value="${escapeHtml(race.racetrackName)}"></label>
            <label><span>${t('raceEntries.raceDate')}</span><input data-import-field="raceDate" type="date" value="${escapeHtml(race.raceDate)}"></label>
            <label><span>${t('raceEntries.raceNumber')}</span><input data-import-field="raceNumber" value="${escapeHtml(race.raceNumber)}"></label>
            <label><span>${t('raceEntries.raceName')}</span><input data-import-field="raceName" value="${escapeHtml(race.raceName)}"></label>
            <label><span>${t('raceEntries.prizeInfo')}</span><input data-import-field="prizeInfo" value="${escapeHtml(race.prizeInfo)}"></label>
            <label><span>${t('raceEntries.distance')}</span><input data-import-field="distance" value="${escapeHtml(race.distance)}"></label>
            <label class="full"><span>${t('raceEntries.raceClass')}</span><input data-import-field="raceClass" value="${escapeHtml(race.raceClass)}"></label>
            <label class="full"><span>${t('raceEntries.eligibilityNotes')}</span><textarea data-import-field="eligibilityNotes" rows="2">${escapeHtml(race.eligibilityNotes)}</textarea></label>
            <label class="full"><span>${t('common.notesSimple')}</span><textarea data-import-field="notes" rows="3">${escapeHtml(race.notes)}</textarea></label>
          </div>
          <button class="button ghost danger" type="button" data-action="remove-imported-race" data-id="${race.id}">${t('raceEntries.removeImported')}</button>
        </article>
      `).join('')}
    </div>
  `;
  if (els.raceImportSaveButton) {
    els.raceImportSaveButton.hidden = false;
    els.raceImportSaveButton.disabled = !raceImportPreviewItems.some((race) => race.selected);
    els.raceImportSaveButton.textContent = cloudWriteMode && isSuperAdmin() && els.raceImportProgramSelect?.value
      ? t('racePrograms.saveImportedToProgram')
      : t('raceEntries.saveImported');
  }
}

function renderRaceEntries() {
  if (!els.raceOpportunityList) return;
  const activeStable = getActiveStable();
  const adminMode = isSuperAdmin();
  const showStableView = !adminMode || raceStablePreviewForAdmin;
  if (els.raceEntriesStableBadge) els.raceEntriesStableBadge.textContent = activeStable.name || t('cloudRead.noStable');
  if (els.raceEntriesModeBadge) els.raceEntriesModeBadge.textContent = cloudWriteMode ? t('calendar.cloudMode') : t('calendar.localMode');
  renderRaceControlDashboard();
  renderRaceProgramAdmin();
  renderRacingHorseRegistry();
  renderResultsImportPreview();
  if (els.raceStablePublishedSection) els.raceStablePublishedSection.hidden = !showStableView;
  if (els.raceStableManualSection) els.raceStableManualSection.hidden = adminMode;
  if (els.raceStableOpportunitySection) els.raceStableOpportunitySection.hidden = adminMode;
  if (els.raceImportPanel) els.raceImportPanel.hidden = adminMode && !raceStablePreviewForAdmin && !raceImportPreviewItems.length;
  renderPublishedRacePrograms();
  renderRaceImportPreview();
  if (!showStableView) {
    els.raceOpportunityList.innerHTML = '';
    return;
  }
  if (!state.raceEntryOpportunities.length) {
    els.raceOpportunityList.innerHTML = `<p class="empty-state">${t('raceEntries.empty')}</p>`;
    return;
  }
  const sortedOpportunities = state.raceEntryOpportunities
    .map(normalizeRaceOpportunity)
    .sort((a, b) => `${a.raceDate} ${a.racetrackName}`.localeCompare(`${b.raceDate} ${b.racetrackName}`));
  els.raceOpportunityList.innerHTML = sortedOpportunities.map((opportunity) => {
    const plans = getRacePlansForOpportunity(opportunity.id);
    const details = [
      opportunity.raceNumber && `${t('raceEntries.raceNumber')}: ${opportunity.raceNumber}`,
      opportunity.raceName && `${t('raceEntries.raceName')}: ${opportunity.raceName}`,
      opportunity.raceClass && `${t('raceEntries.raceClass')}: ${opportunity.raceClass}`,
      opportunity.distance && `${t('raceEntries.distance')}: ${opportunity.distance}`,
      opportunity.startMethod && `${t('raceEntries.startMethod')}: ${opportunity.startMethod}`,
      opportunity.entryDeadline && `${t('raceEntries.entryDeadline')}: ${opportunity.entryDeadline}`,
      opportunity.contactEmail && `${t('raceEntries.contactEmail')}: ${opportunity.contactEmail}`
    ].filter(Boolean);
    return `
      <article class="item-card race-entry-card premium-stable-card">
        <div>
          <h4>${escapeHtml(opportunity.racetrackName || t('raceEntries.racetrack'))}</h4>
          <p>${escapeHtml([opportunity.raceDate, opportunity.prizeInfo].filter(Boolean).join(' - ') || t('common.notSet'))}</p>
          <div class="item-meta">
            ${details.map((detail) => `<span class="pill">${escapeHtml(detail)}</span>`).join('')}
          </div>
          ${opportunity.eligibilityNotes ? `<div class="detail-box"><strong>${t('raceEntries.eligibilityNotes')}</strong><p>${escapeHtml(opportunity.eligibilityNotes)}</p></div>` : ''}
          ${opportunity.notes ? `<div class="detail-box"><strong>${t('common.notesSimple')}</strong><p>${escapeHtml(opportunity.notes)}</p></div>` : ''}
          <div class="race-plan-list">
            ${plans.length ? plans.map((plan) => renderRacePlanLine(plan, opportunity)).join('') : `<p class="empty-state">${t('raceEntries.noPlans')}</p>`}
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="plan-race-entry" data-id="${opportunity.id}">${t('raceEntries.savePlan')}</button>
          <button class="button ghost" type="button" data-action="edit-race-opportunity" data-id="${opportunity.id}">${t('common.edit')}</button>
          <button class="button ghost danger" type="button" data-action="delete-race-opportunity" data-id="${opportunity.id}">${t('common.delete')}</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderRacePlanLine(plan, opportunity) {
  const horse = state.horses.find((entry) => entry.id === plan.horseId);
  const globalRace = plan.programRaceId ? raceProgramRaces.find((race) => race.id === plan.programRaceId) : null;
  const meta = [
    horse?.name || t('tasks.noHorse'),
    globalRace && `${globalRace.raceDate} ${globalRace.raceNumber || ''} ${globalRace.raceName || ''}`.trim(),
    plan.driver && `${t('raceEntries.driver')}: ${plan.driver}`,
    plan.trainer && `${t('raceEntries.trainer')}: ${plan.trainer}`,
    t(`raceEntries.status${plan.status.charAt(0).toUpperCase()}${plan.status.slice(1)}`)
  ].filter(Boolean);
  return `
    <article class="race-plan-card">
      <div>
        <strong>${escapeHtml(horse?.name || t('tasks.noHorse'))}</strong>
        <p>${escapeHtml(plan.notes || t('common.noNotes'))}</p>
        <div class="item-meta">${meta.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('')}</div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="draft-race-email" data-id="${plan.id}">${t('raceEntries.createDraft')}</button>
        ${plan.programRaceId ? '' : `<button class="button ghost" type="button" data-action="edit-race-plan" data-id="${plan.id}">${t('common.edit')}</button>`}
        <button class="button ghost danger" type="button" data-action="delete-race-plan" data-id="${plan.id}">${t('common.delete')}</button>
      </div>
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
    racingHorseId: form.elements.racingHorseId?.value || '',
    name: form.elements.name.value.trim(),
    nickname: form.elements.nickname.value.trim(),
    owner: form.elements.owner.value.trim(),
    breed: form.elements.breed.value.trim(),
    birth: form.elements.birth.value.trim(),
    gender: form.elements.gender.value.trim(),
    color: form.elements.color.value.trim(),
    registration: form.elements.registration.value.trim(),
    countryOfOrigin: form.elements.countryOfOrigin.value.trim(),
    totalEarnings: form.elements.totalEarnings.value,
    last5Earnings: form.elements.last5Earnings.value,
    careerStarts: form.elements.careerStarts.value,
    careerWins: form.elements.careerWins.value,
    careerPlaces: form.elements.careerPlaces.value,
    careerShow: form.elements.careerShow.value,
    careerEarnings: form.elements.careerEarnings.value,
    twelveMonthStarts: form.elements.twelveMonthStarts.value,
    twelveMonthWins: form.elements.twelveMonthWins.value,
    twelveMonthPlaces: form.elements.twelveMonthPlaces.value,
    twelveMonthShow: form.elements.twelveMonthShow.value,
    twelveMonthEarnings: form.elements.twelveMonthEarnings.value,
    yearStarts: form.elements.yearStarts.value,
    yearWins: form.elements.yearWins.value,
    yearPlaces: form.elements.yearPlaces.value,
    yearShow: form.elements.yearShow.value,
    yearEarnings: form.elements.yearEarnings.value,
    twoMonthStarts: form.elements.twoMonthStarts.value,
    twoMonthWins: form.elements.twoMonthWins.value,
    twoMonthPlaces: form.elements.twoMonthPlaces.value,
    twoMonthShow: form.elements.twoMonthShow.value,
    twoMonthEarnings: form.elements.twoMonthEarnings.value,
    careerRecord: form.elements.careerRecord.value.trim(),
    twelveMonthRecord: form.elements.twelveMonthRecord.value.trim(),
    yearRecord: form.elements.yearRecord.value.trim(),
    shortDistanceRecord: form.elements.shortDistanceRecord.value.trim(),
    longDistanceRecord: form.elements.longDistanceRecord.value.trim(),
    categoryMc: form.elements.categoryMc.value.trim(),
    categoryMs: form.elements.categoryMs.value.trim(),
    potentialMc: form.elements.potentialMc.value.trim(),
    potentialMs: form.elements.potentialMs.value.trim(),
    reclaimAllowed: form.elements.reclaimAllowed.checked,
    racingCategory: form.elements.racingCategory.value.trim(),
    trainerName: form.elements.trainerName.value.trim(),
    ownerName: form.elements.ownerName.value.trim(),
    defaultDriver: form.elements.defaultDriver.value.trim(),
    racingNotes: form.elements.racingNotes.value.trim(),
    feedingNotes: form.elements.feedingNotes.value.trim(),
    careNotes: form.elements.careNotes.value.trim(),
    shoeingNotes: form.elements.shoeingNotes.value.trim(),
    vaccinationNotes: form.elements.vaccinationNotes.value.trim(),
    dewormingNotes: form.elements.dewormingNotes.value.trim(),
    vetNotes: form.elements.vetNotes.value.trim(),
    notes: form.elements.notes.value.trim()
  };
  if (cloudWriteMode) {
    if (!horse.id) horse.id = createId();
    const existingHorse = state.horses.find((entry) => entry.id === horse.id);
    if (existingHorse?.cloudId) horse.cloudId = existingHorse.cloudId;
    runCloudFormSubmit(form, 'horse-save', horse.id, () => handleCloudHorseSave(horse), () => resetForm(form));
    return;
  }
  upsert('horses', horse);
  resetForm(form);
  showMessage(t('message.horseSaved'));
}

function handleCareSubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  if (!form.elements.horseId.value) {
    showMessage(t('care.noHorse'));
    return;
  }
  const existing = state.careHistory.find((entry) => entry.id === form.elements.id.value);
  const now = new Date().toISOString();
  const careRecord = {
    id: form.elements.id.value,
    horseId: form.elements.horseId.value,
    date: form.elements.date.value,
    type: form.elements.type.value,
    title: form.elements.title.value.trim(),
    notes: form.elements.notes.value.trim(),
    nextDueDate: form.elements.nextDueDate.value,
    cost: form.elements.cost.value,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (cloudWriteMode) {
    if (!careRecord.id) careRecord.id = createId();
    if (existing?.cloudId) careRecord.cloudId = existing.cloudId;
    runCloudFormSubmit(form, 'care-save', careRecord.id, () => handleCloudCareRecordSave(careRecord), () => resetForm(form));
    return;
  }
  upsert('careHistory', normalizeCareRecord(careRecord));
  resetForm(form);
  showMessage(t('care.saved'));
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
  if (cloudWriteMode) {
    if (!task.id) task.id = createId();
    const existingTask = state.tasks.find((entry) => entry.id === task.id);
    if (existingTask?.cloudId) task.cloudId = existingTask.cloudId;
    runCloudFormSubmit(form, 'task-save', task.id, () => handleCloudTaskSave(task), () => {
      resetForm(form);
      form.elements.date.value = today();
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
  if (cloudWriteMode) {
    if (!entry.id) entry.id = createId();
    const existingEntry = state.hours.find((item) => item.id === entry.id);
    if (existingEntry?.cloudId) entry.cloudId = existingEntry.cloudId;
    if (existingEntry?.horseId) entry.horseId = existingEntry.horseId;
    runCloudFormSubmit(form, 'work-log-save', entry.id, () => handleCloudWorkLogSave(entry), () => {
      resetForm(form);
      form.elements.date.value = today();
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
  const feedItem = {
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
  };
  if (cloudWriteMode) {
    if (!feedItem.id) feedItem.id = createId();
    const existingItem = state.inventory.find((item) => item.id === feedItem.id);
    if (existingItem?.cloudId) feedItem.cloudId = existingItem.cloudId;
    runCloudFormSubmit(form, 'feed-save', feedItem.id, () => handleCloudFeedItemSave(feedItem), () => resetForm(form));
    return;
  }
  upsert('inventory', feedItem);
  resetForm(form);
  showMessage(t('message.inventorySaved'));
}

function handleEventSubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const calendarEvent = {
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
  };
  if (cloudWriteMode) {
    if (!calendarEvent.id) calendarEvent.id = createId();
    const existingEvent = state.calendarEvents.find((entry) => entry.id === calendarEvent.id);
    if (existingEvent?.cloudId) calendarEvent.cloudId = existingEvent.cloudId;
    runCloudFormSubmit(form, 'calendar-save', calendarEvent.id, () => handleCloudCalendarEventSave(calendarEvent), () => {
      selectedCalendarDate = calendarEvent.date || selectedCalendarDate;
      calendarCursor = new Date(`${selectedCalendarDate}T00:00:00`);
      resetForm(form);
      form.elements.date.value = selectedCalendarDate;
    });
    return;
  }
  upsert('calendarEvents', calendarEvent);
  selectedCalendarDate = calendarEvent.date || selectedCalendarDate;
  calendarCursor = new Date(`${selectedCalendarDate}T00:00:00`);
  resetForm(form);
  form.elements.date.value = selectedCalendarDate;
  showMessage(t('message.eventSaved'));
}

function handleRaceOpportunitySubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const existing = state.raceEntryOpportunities.find((entry) => entry.id === form.elements.id.value);
  const now = new Date().toISOString();
  const opportunity = {
    id: form.elements.id.value,
    racetrackName: form.elements.racetrackName.value.trim(),
    raceDate: form.elements.raceDate.value,
    raceNumber: form.elements.raceNumber.value.trim(),
    raceName: form.elements.raceName.value.trim(),
    raceClass: form.elements.raceClass.value.trim(),
    distance: form.elements.distance.value.trim(),
    startMethod: form.elements.startMethod.value.trim(),
    prizeInfo: form.elements.prizeInfo.value.trim(),
    eligibilityNotes: form.elements.eligibilityNotes.value.trim(),
    entryDeadline: form.elements.entryDeadline.value,
    contactEmail: form.elements.contactEmail.value.trim(),
    notes: form.elements.notes.value.trim(),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (cloudWriteMode) {
    if (!opportunity.id) opportunity.id = createId();
    if (existing?.cloudId) opportunity.cloudId = existing.cloudId;
    runCloudFormSubmit(form, 'race-opportunity-save', opportunity.id, () => handleCloudRaceOpportunitySave(opportunity), () => resetForm(form));
    return;
  }
  upsert('raceEntryOpportunities', normalizeRaceOpportunity(opportunity));
  resetForm(form);
  showMessage(t('raceEntries.savedOpportunity'));
}

function handleRacePlanSubmit(event) {
  event.preventDefault();
  if (blockCloudPreviewEdit()) return;
  const form = event.currentTarget;
  const existing = state.raceEntryPlans.find((entry) => entry.id === form.elements.id.value);
  const plan = {
    id: form.elements.id.value,
    opportunityId: form.elements.opportunityId.value,
    programRaceId: '',
    horseId: form.elements.horseId.value,
    driver: form.elements.driver.value.trim(),
    trainer: form.elements.trainer.value.trim(),
    notes: form.elements.notes.value.trim(),
    status: form.elements.status.value,
    emailSubject: existing?.emailSubject || '',
    emailBody: existing?.emailBody || '',
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (cloudWriteMode) {
    if (!plan.id) plan.id = createId();
    if (existing?.cloudId) plan.cloudId = existing.cloudId;
    runCloudFormSubmit(form, 'race-plan-save', plan.id, () => handleCloudRacePlanSave(plan), () => resetForm(form));
    return;
  }
  upsert('raceEntryPlans', normalizeRacePlan(plan));
  resetForm(form);
  showMessage(t('raceEntries.savedPlan'));
}

async function handleRaceProgramSubmit(event) {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const form = event.currentTarget;
  const program = {
    id: form.elements.id.value,
    title: form.elements.title.value.trim(),
    racetrackName: form.elements.racetrackName.value.trim(),
    locationCity: form.elements.locationCity.value.trim(),
    locationCountry: form.elements.locationCountry.value.trim(),
    programMonth: form.elements.programMonth.value.trim(),
    status: form.elements.status.value
  };
  try {
    const saved = await saveRaceProgramToCloud(program);
    const existingIndex = racePrograms.findIndex((entry) => entry.id === saved.id);
    if (existingIndex >= 0) racePrograms[existingIndex] = saved;
    else racePrograms.push(saved);
    resetForm(form);
    render();
    showMessage(t('racePrograms.saved'));
  } catch (error) {
    console.error('[EquiTrack race programs] Save failed', error);
    showMessage(t('racePrograms.globalSaveFailed', { error: getCloudErrorMessage(error) }));
  }
}

async function handleRacingHorseSubmit(event) {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const form = event.currentTarget;
  const racingHorse = {
    id: form.elements.id.value,
    registrationNumber: form.elements.registrationNumber.value.trim(),
    horseName: form.elements.horseName.value.trim(),
    birthDate: form.elements.birthDate.value,
    birthYear: form.elements.birthYear.value,
    gender: form.elements.gender.value,
    countryOfOrigin: form.elements.countryOfOrigin.value.trim(),
    totalEarnings: form.elements.totalEarnings.value,
    last5Earnings: form.elements.last5Earnings.value,
    racingCategory: form.elements.racingCategory.value.trim(),
    trainerName: form.elements.trainerName.value.trim(),
    ownerName: form.elements.ownerName.value.trim(),
    defaultDriver: form.elements.defaultDriver.value.trim(),
    notes: form.elements.notes.value.trim(),
    lastResultsUpdate: form.elements.lastResultsUpdate.value
  };
  try {
    const saved = await saveRacingHorseToCloud(racingHorse);
    const existingIndex = racingHorses.findIndex((entry) => entry.id === saved.id);
    if (existingIndex >= 0) racingHorses[existingIndex] = saved;
    else racingHorses.push(saved);
    resetForm(form);
    render();
    showMessage(t('racingRegistry.saved'));
  } catch (error) {
    console.error('[EquiTrack racing registry] Save failed', error);
    showMessage(t('racingRegistry.saveFailed', { error: getCloudErrorMessage(error) }));
  }
}

async function handleRacingHorseStartSubmit(event) {
  event.preventDefault();
  if (!isSuperAdmin()) return;
  const form = event.currentTarget;
  const start = {
    id: form.elements.id.value,
    racingHorseId: form.elements.racingHorseId.value,
    raceDate: form.elements.raceDate.value,
    racetrackCode: form.elements.racetrackCode.value.trim(),
    racetrackName: form.elements.racetrackName.value.trim(),
    raceCode: form.elements.raceCode.value.trim(),
    driverName: form.elements.driverName.value.trim(),
    placement: form.elements.placement.value.trim(),
    kilometerTime: form.elements.kilometerTime.value.trim(),
    distance: form.elements.distance.value,
    startersInfo: form.elements.startersInfo.value.trim(),
    shoeing: form.elements.shoeing.value.trim(),
    netPrize: form.elements.netPrize.value,
    grossPrize: form.elements.grossPrize.value,
    raceNotes: form.elements.raceNotes.value.trim(),
    videoUrl: form.elements.videoUrl.value.trim()
  };
  try {
    const saved = await saveRacingHorseStartToCloud(start);
    const existingIndex = racingHorseStarts.findIndex((entry) => entry.id === saved.id);
    if (existingIndex >= 0) racingHorseStarts[existingIndex] = saved;
    else racingHorseStarts.push(saved);
    resetForm(form);
    render();
    showMessage(t('racingRegistry.startSaved'));
  } catch (error) {
    console.error('[EquiTrack racing registry] Start save failed', error);
    showMessage(t('racingRegistry.startSaveFailed', { error: getCloudErrorMessage(error) }));
  }
}

async function createGlobalRacePlan(raceId, card) {
  if (!canCreateRacePlans()) return;
  const horseId = card.querySelector('[data-plan-field="horseId"]')?.value || '';
  if (!horseId) return;
  const selectedHorse = getHorseRacingData(state.horses.find((horse) => horse.id === horseId) || {});
  const plan = normalizeRacePlan({
    id: createId(),
    opportunityId: '',
    programRaceId: raceId,
    horseId,
    driver: card.querySelector('[data-plan-field="driver"]')?.value || selectedHorse.defaultDriver || '',
    trainer: card.querySelector('[data-plan-field="trainer"]')?.value || selectedHorse.trainerName || '',
    notes: card.querySelector('[data-plan-field="notes"]')?.value || '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  if (cloudWriteMode) {
    await runCloudAction('race-global-plan-save', raceId, async () => {
      const saved = await handleCloudRacePlanSave(plan);
      if (saved) showMessage(t('raceEntryCloud.savedPlan'));
    });
    return;
  }
  upsert('raceEntryPlans', plan);
  showMessage(t('raceEntries.savedPlan'));
}

function selectRaceProgramForImport(programId, openPicker = true) {
  const program = racePrograms.find((entry) => entry.id === programId);
  if (!program || !els.raceImportProgramSelect) return;
  els.raceImportProgramSelect.value = programId;
  raceImportPreviewItems = [];
  renderRaceImportPreview();
  if (els.raceImportStatus) {
    els.raceImportStatus.textContent = t('racePrograms.selectedImportProgram', {
      program: program.title || program.racetrackName || program.id
    });
  }
  const importPanel = els.raceImportInput?.closest('.race-import-panel') || els.raceImportProgramLabel;
  importPanel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (openPicker) window.setTimeout(() => els.raceImportInput?.click(), 150);
}

function prefillGlobalRacePlanDefaults(container) {
  if (!container) return;
  const horseId = container.querySelector('[data-plan-field="horseId"]')?.value || '';
  const horse = getHorseRacingData(state.horses.find((entry) => entry.id === horseId) || {});
  const driverInput = container.querySelector('[data-plan-field="driver"]');
  const trainerInput = container.querySelector('[data-plan-field="trainer"]');
  if (driverInput && !driverInput.value && horse.defaultDriver) driverInput.value = horse.defaultDriver;
  if (trainerInput && !trainerInput.value && horse.trainerName) trainerInput.value = horse.trainerName;
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
    if (cloudWriteMode) handleCloudHorseDelete(id);
    else deleteHorseLocal(id);
  }
  if (action === 'edit-care') fillCareForm(id);
  if (action === 'delete-care') {
    if (cloudWriteMode) handleCloudCareRecordDelete(id);
    else deleteItem('careHistory', id, t('delete.care'), t('care.deleted'));
  }
  if (action === 'toggle-task') toggleTask(id);
  if (action === 'edit-task') fillTaskForm(id);
  if (action === 'delete-task') {
    if (cloudWriteMode) handleCloudTaskDelete(id);
    else deleteItem('tasks', id, t('delete.task'), t('message.taskDeleted'));
  }
  if (action === 'edit-hours') fillHoursForm(id);
  if (action === 'delete-hours') {
    if (cloudWriteMode) handleCloudWorkLogDelete(id);
    else deleteItem('hours', id, t('delete.hours'), t('message.hoursDeleted'));
  }
  if (action === 'edit-inventory') fillInventoryForm(id);
  if (action === 'delete-inventory') {
    if (cloudWriteMode) handleCloudFeedItemDelete(id);
    else deleteItem('inventory', id, t('delete.inventory'), t('message.inventoryDeleted'));
  }
  if (action === 'toggle-shopping') toggleShoppingStatus(id);
  if (action === 'edit-event') fillEventForm(id);
  if (action === 'delete-event') {
    if (cloudWriteMode) handleCloudCalendarEventDelete(id);
    else deleteItem('calendarEvents', id, t('delete.event'), t('message.eventDeleted'));
  }
  if (action === 'plan-race-entry') fillRacePlanForOpportunity(id);
  if (action === 'edit-race-opportunity') fillRaceOpportunityForm(id);
  if (action === 'delete-race-opportunity') {
    if (cloudWriteMode) handleCloudRaceOpportunityDelete(id);
    else deleteRaceOpportunityLocal(id);
  }
  if (action === 'edit-race-plan') fillRacePlanForm(id);
  if (action === 'delete-race-plan') {
    if (cloudWriteMode) handleCloudRacePlanDelete(id);
    else deleteItem('raceEntryPlans', id, t('delete.racePlan'), t('raceEntries.deletedPlan'));
  }
  if (action === 'draft-race-email') createRaceEmailDraft(id);
  if (action === 'create-global-race-plan') createGlobalRacePlan(id, button.closest('[data-program-race-id]'));
  if (action === 'select-published-race-day') {
    selectedPublishedRaceDay = {
      racetrack: button.dataset.racetrack || '',
      date: button.dataset.date || ''
    };
    renderPublishedRacePrograms();
  }
  if (action === 'edit-racing-horse') fillRacingHorseForm(id);
  if (action === 'recalculate-racing-summary') recalculateRacingHorseSummary(id);
  if (action === 'edit-racing-start') fillRacingHorseStartForm(id);
  if (action === 'delete-racing-start') handleRacingHorseStartDelete(id);
  if (action === 'edit-race-program') fillRaceProgramForm(id);
  if (action === 'select-race-program-import') selectRaceProgramForImport(id);
  if (action === 'publish-race-program') changeRaceProgramStatus(id, 'published');
  if (action === 'archive-race-program') changeRaceProgramStatus(id, 'archived');
  if (action === 'edit-global-race') editGlobalRaceInImportPreview(id);
  if (action === 'delete-global-race') handleGlobalRaceDelete(id);
}

function handleCalendarFilterChange() {
  calendarFilters = {
    scope: els.calendarScopeFilter?.value || 'all',
    type: els.calendarTypeFilter?.value || 'all',
    horse: els.calendarHorseFilter?.value || 'all'
  };
  renderEvents();
  renderCalendarMonth();
}

function selectCalendarDate(dateString, fillForm = true) {
  selectedCalendarDate = dateString;
  if (fillForm && els.eventForm) els.eventForm.elements.date.value = dateString;
  renderCalendarMonth();
}

function changeCalendarMonth(delta) {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + delta, 1);
  renderCalendarMonth();
}

function goToCalendarToday() {
  selectedCalendarDate = today();
  calendarCursor = new Date(`${selectedCalendarDate}T00:00:00`);
  if (els.eventForm) els.eventForm.elements.date.value = selectedCalendarDate;
  renderCalendarMonth();
}

function handleCalendarMonthClick(event) {
  const actionTarget = event.target.closest('[data-action="edit-event"]');
  if (actionTarget) {
    event.preventDefault();
    event.stopPropagation();
    fillEventForm(actionTarget.dataset.id);
    return;
  }
  const dayButton = event.target.closest('[data-calendar-date]');
  if (!dayButton) return;
  selectCalendarDate(dayButton.dataset.calendarDate);
}

function addEventForSelectedDay() {
  if (!els.eventForm) return;
  els.eventForm.elements.id.value = '';
  els.eventForm.elements.date.value = selectedCalendarDate;
  els.eventForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleCalendarViewModeClick(event) {
  const button = event.target.closest('[data-calendar-view-mode]');
  if (!button) return;
  calendarViewMode = button.dataset.calendarViewMode === 'list' ? 'list' : 'month';
  renderCalendarMonth();
}

function toggleShoppingStatus(id) {
  if (blockCloudPreviewEdit()) return;
  const found = state.inventory.find((item) => item.id === id);
  if (!found) return;
  const nextItem = { ...normalizeFeedItem(found), shoppingListed: !normalizeFeedItem(found).shoppingListed };
  if (cloudWriteMode) {
    runCloudAction('feed-shopping', id, () => handleCloudFeedItemSave(nextItem, t('feedCloud.shoppingUpdated')));
    return;
  }
  state.inventory = state.inventory.map((item) => (item.id === id ? nextItem : item));
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

function navigateToView(viewName, options = {}) {
  showView(viewName);
  window.setTimeout(() => {
    if (options.tab) activateTab(options.tab);
    const target = options.selector ? document.querySelector(options.selector) : null;
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: options.block || 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }, 80);
}

function handleHomeShortcut(event) {
  const button = event.target.closest('[data-home-shortcut]');
  if (!button) return;
  const shortcutMap = {
    settings: { view: 'settings', selector: '#settingsAccountSection' },
    horses: { view: 'stable', tab: 'horses', selector: '#horsesPanel' },
    tasks: { view: 'stable', tab: 'tasks', selector: '#tasksPanel' },
    calendar: { view: 'calendar', selector: '#calendarView' },
    inventory: { view: 'stable', tab: 'inventory', selector: '#inventoryPanel' },
    hours: { view: 'stable', tab: 'hours', selector: '#hoursPanel' },
    alerts: { view: 'home', selector: '#homeAlertsPanel' }
  };
  const target = shortcutMap[button.dataset.homeShortcut];
  if (!target) return;
  navigateToView(target.view, target);
}

function scrollAdminRaceTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function handleRaceAdminAction(event) {
  const button = event.target.closest('[data-race-admin-action]');
  if (!button || !isSuperAdmin()) return;
  const action = button.dataset.raceAdminAction;
  if (action === 'add-racing-horse') scrollAdminRaceTarget('#racingHorseForm');
  if (action === 'import-results') scrollAdminRaceTarget('.race-results-import-panel');
  if (action === 'add-race-program') scrollAdminRaceTarget('#raceProgramForm');
  if (action === 'import-program') {
    if (els.raceImportPanel) els.raceImportPanel.hidden = false;
    const draft = racePrograms.find((program) => program.status === 'draft') || racePrograms.find((program) => program.status !== 'archived');
    if (draft && els.raceImportProgramSelect) selectRaceProgramForImport(draft.id, false);
    scrollAdminRaceTarget('#raceImportPanel');
  }
  if (action === 'manage-races') scrollAdminRaceTarget('#raceProgramAdminList');
}

function toggleRaceStablePreview() {
  if (!isSuperAdmin()) return;
  raceStablePreviewForAdmin = !raceStablePreviewForAdmin;
  renderRaceEntries();
  if (raceStablePreviewForAdmin) scrollAdminRaceTarget('#raceStablePublishedSection');
}

function handleAlertAction(event) {
  const button = event.target.closest('[data-alert-action]');
  if (!button) return;
  const actionMap = {
    feed: { view: 'stable', tab: 'inventory', selector: '#inventoryPanel' },
    tasks: { view: 'stable', tab: 'tasks', selector: '#tasksPanel' },
    care: { view: 'stable', tab: 'horses', selector: '#careHistoryList' },
    calendar: { view: 'calendar', selector: '#calendarView' },
    raceEntries: { view: 'raceEntries', selector: '#raceEntriesView' },
    backup: { view: 'settings', selector: '#settingsBackupSection' },
    weather: { view: 'home', selector: '#turnoutWeatherCard' }
  };
  const target = actionMap[button.dataset.alertAction];
  if (!target) return;
  navigateToView(target.view, target);
}

function handleFooterSupportLink(event) {
  if (!getCurrentUser()) return;
  event.preventDefault();
  navigateToView('settings', { selector: '#supportSection' });
}

function fillHorseForm(id) {
  const found = state.horses.find((item) => item.id === id);
  if (!found) return;
  const horse = normalizeHorse(found);
  els.horseForm.elements.id.value = horse.id;
  if (els.horseForm.elements.racingHorseId) els.horseForm.elements.racingHorseId.value = horse.racingHorseId;
  els.horseForm.elements.name.value = horse.name;
  els.horseForm.elements.nickname.value = horse.nickname;
  els.horseForm.elements.owner.value = horse.owner;
  els.horseForm.elements.breed.value = horse.breed;
  els.horseForm.elements.birth.value = horse.birth;
  els.horseForm.elements.gender.value = horse.gender;
  els.horseForm.elements.color.value = horse.color;
  els.horseForm.elements.registration.value = horse.registration;
  els.horseForm.elements.countryOfOrigin.value = horse.countryOfOrigin;
  els.horseForm.elements.totalEarnings.value = horse.totalEarnings;
  els.horseForm.elements.last5Earnings.value = horse.last5Earnings;
  els.horseForm.elements.racingCategory.value = horse.racingCategory;
  els.horseForm.elements.trainerName.value = horse.trainerName;
  els.horseForm.elements.ownerName.value = horse.ownerName;
  els.horseForm.elements.defaultDriver.value = horse.defaultDriver;
  els.horseForm.elements.racingNotes.value = horse.racingNotes;
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

function fillCareForm(id) {
  const found = state.careHistory.find((item) => item.id === id);
  if (!found || !els.careForm) return;
  const record = normalizeCareRecord(found);
  els.careForm.elements.id.value = record.id;
  els.careForm.elements.horseId.value = record.horseId;
  els.careForm.elements.date.value = record.date;
  els.careForm.elements.type.value = record.type;
  els.careForm.elements.title.value = record.title;
  els.careForm.elements.notes.value = record.notes;
  els.careForm.elements.nextDueDate.value = record.nextDueDate;
  els.careForm.elements.cost.value = record.cost;
  showView('stable');
  activateTab('horses');
  els.careForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
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
  selectedCalendarDate = item.date || selectedCalendarDate;
  calendarCursor = new Date(`${selectedCalendarDate}T00:00:00`);
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

function fillRaceOpportunityForm(id) {
  const found = state.raceEntryOpportunities.find((entry) => entry.id === id);
  if (!found || !els.raceOpportunityForm) return;
  const opportunity = normalizeRaceOpportunity(found);
  els.raceOpportunityForm.elements.id.value = opportunity.id;
  els.raceOpportunityForm.elements.racetrackName.value = opportunity.racetrackName;
  els.raceOpportunityForm.elements.raceDate.value = opportunity.raceDate;
  els.raceOpportunityForm.elements.raceNumber.value = opportunity.raceNumber;
  els.raceOpportunityForm.elements.raceName.value = opportunity.raceName;
  els.raceOpportunityForm.elements.raceClass.value = opportunity.raceClass;
  els.raceOpportunityForm.elements.distance.value = opportunity.distance;
  els.raceOpportunityForm.elements.startMethod.value = opportunity.startMethod;
  els.raceOpportunityForm.elements.prizeInfo.value = opportunity.prizeInfo;
  els.raceOpportunityForm.elements.eligibilityNotes.value = opportunity.eligibilityNotes;
  els.raceOpportunityForm.elements.entryDeadline.value = opportunity.entryDeadline;
  els.raceOpportunityForm.elements.contactEmail.value = opportunity.contactEmail;
  els.raceOpportunityForm.elements.notes.value = opportunity.notes;
  showView('raceEntries');
  els.raceOpportunityForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

function fillRacePlanForOpportunity(opportunityId) {
  if (!els.racePlanForm) return;
  showView('raceEntries');
  resetForm(els.racePlanForm);
  els.racePlanForm.elements.opportunityId.value = opportunityId;
  els.racePlanForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillRacePlanForm(id) {
  const found = state.raceEntryPlans.find((entry) => entry.id === id);
  if (!found || !els.racePlanForm) return;
  const plan = normalizeRacePlan(found);
  els.racePlanForm.elements.id.value = plan.id;
  els.racePlanForm.elements.opportunityId.value = plan.opportunityId;
  els.racePlanForm.elements.horseId.value = plan.horseId;
  els.racePlanForm.elements.driver.value = plan.driver;
  els.racePlanForm.elements.trainer.value = plan.trainer;
  els.racePlanForm.elements.status.value = plan.status;
  els.racePlanForm.elements.notes.value = plan.notes;
  showView('raceEntries');
  els.racePlanForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

function fillRaceProgramForm(id) {
  const program = racePrograms.find((entry) => entry.id === id);
  if (!program || !els.raceProgramForm) return;
  els.raceProgramForm.elements.id.value = program.id;
  els.raceProgramForm.elements.title.value = program.title;
  els.raceProgramForm.elements.racetrackName.value = program.racetrackName;
  els.raceProgramForm.elements.locationCity.value = program.locationCity;
  els.raceProgramForm.elements.locationCountry.value = program.locationCountry;
  els.raceProgramForm.elements.programMonth.value = program.programMonth;
  els.raceProgramForm.elements.status.value = program.status;
  els.raceProgramForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

function fillRacingHorseForm(id) {
  const horse = racingHorses.find((entry) => entry.id === id);
  if (!horse || !els.racingHorseForm) return;
  const form = els.racingHorseForm;
  form.elements.id.value = horse.id;
  form.elements.registrationNumber.value = horse.registrationNumber;
  form.elements.horseName.value = horse.horseName;
  form.elements.birthDate.value = horse.birthDate;
  form.elements.birthYear.value = horse.birthYear;
  form.elements.gender.value = horse.gender;
  form.elements.countryOfOrigin.value = horse.countryOfOrigin;
  form.elements.totalEarnings.value = horse.totalEarnings;
  form.elements.last5Earnings.value = horse.last5Earnings;
  form.elements.careerStarts.value = horse.careerStarts;
  form.elements.careerWins.value = horse.careerWins;
  form.elements.careerPlaces.value = horse.careerPlaces;
  form.elements.careerShow.value = horse.careerShow;
  form.elements.careerEarnings.value = horse.careerEarnings;
  form.elements.twelveMonthStarts.value = horse.twelveMonthStarts;
  form.elements.twelveMonthWins.value = horse.twelveMonthWins;
  form.elements.twelveMonthPlaces.value = horse.twelveMonthPlaces;
  form.elements.twelveMonthShow.value = horse.twelveMonthShow;
  form.elements.twelveMonthEarnings.value = horse.twelveMonthEarnings;
  form.elements.yearStarts.value = horse.yearStarts;
  form.elements.yearWins.value = horse.yearWins;
  form.elements.yearPlaces.value = horse.yearPlaces;
  form.elements.yearShow.value = horse.yearShow;
  form.elements.yearEarnings.value = horse.yearEarnings;
  form.elements.twoMonthStarts.value = horse.twoMonthStarts;
  form.elements.twoMonthWins.value = horse.twoMonthWins;
  form.elements.twoMonthPlaces.value = horse.twoMonthPlaces;
  form.elements.twoMonthShow.value = horse.twoMonthShow;
  form.elements.twoMonthEarnings.value = horse.twoMonthEarnings;
  form.elements.careerRecord.value = horse.careerRecord;
  form.elements.twelveMonthRecord.value = horse.twelveMonthRecord;
  form.elements.yearRecord.value = horse.yearRecord;
  form.elements.shortDistanceRecord.value = horse.shortDistanceRecord;
  form.elements.longDistanceRecord.value = horse.longDistanceRecord;
  form.elements.categoryMc.value = horse.categoryMc;
  form.elements.categoryMs.value = horse.categoryMs;
  form.elements.potentialMc.value = horse.potentialMc;
  form.elements.potentialMs.value = horse.potentialMs;
  form.elements.reclaimAllowed.checked = horse.reclaimAllowed;
  form.elements.racingCategory.value = horse.racingCategory;
  form.elements.trainerName.value = horse.trainerName;
  form.elements.ownerName.value = horse.ownerName;
  form.elements.defaultDriver.value = horse.defaultDriver;
  form.elements.notes.value = horse.notes;
  form.elements.lastResultsUpdate.value = horse.lastResultsUpdate;
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

function fillRacingHorseStartForm(id) {
  const start = racingHorseStarts.find((entry) => entry.id === id);
  if (!start || !els.racingHorseStartForm) return;
  const form = els.racingHorseStartForm;
  form.elements.id.value = start.id;
  form.elements.racingHorseId.value = start.racingHorseId;
  form.elements.raceDate.value = start.raceDate;
  form.elements.racetrackCode.value = start.racetrackCode;
  form.elements.racetrackName.value = start.racetrackName;
  form.elements.raceCode.value = start.raceCode;
  form.elements.driverName.value = start.driverName;
  form.elements.placement.value = start.placement;
  form.elements.kilometerTime.value = start.kilometerTime;
  form.elements.distance.value = start.distance;
  form.elements.startersInfo.value = start.startersInfo;
  form.elements.shoeing.value = start.shoeing;
  form.elements.netPrize.value = start.netPrize;
  form.elements.grossPrize.value = start.grossPrize;
  form.elements.raceNotes.value = start.raceNotes;
  form.elements.videoUrl.value = start.videoUrl;
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

async function handleRacingHorseStartDelete(id) {
  if (!confirmDelete(t('racingRegistry.deleteStart'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  try {
    await deleteRacingHorseStartFromCloud(id);
    racingHorseStarts = racingHorseStarts.filter((entry) => entry.id !== id);
    render();
    showMessage(t('racingRegistry.startDeleted'));
  } catch (error) {
    console.error('[EquiTrack racing registry] Start delete failed', error);
    showMessage(t('racingRegistry.startSaveFailed', { error: getCloudErrorMessage(error) }));
  }
}

async function changeRaceProgramStatus(id, status) {
  try {
    const saved = await updateRaceProgramStatus(id, status);
    const existingIndex = racePrograms.findIndex((program) => program.id === saved.id);
    if (existingIndex >= 0) racePrograms[existingIndex] = saved;
    render();
    showMessage(status === 'published' ? t('racePrograms.published') : t('racePrograms.archived'));
  } catch (error) {
    console.error('[EquiTrack race programs] Status update failed', error);
    showMessage(t('racePrograms.globalSaveFailed', { error: getCloudErrorMessage(error) }));
  }
}

function editGlobalRaceInImportPreview(id) {
  const race = raceProgramRaces.find((entry) => entry.id === id);
  if (!race) return;
  if (els.raceImportProgramSelect) els.raceImportProgramSelect.value = race.programId;
  raceImportPreviewItems = [{
    ...normalizeRaceOpportunity({
      id: race.importedLocalId || createRaceImportLocalId(race),
      racetrackName: racePrograms.find((program) => program.id === race.programId)?.racetrackName || '',
      raceDate: race.raceDate,
      raceNumber: race.raceNumber,
      raceName: race.raceName,
      raceClass: race.raceClass,
      distance: race.distance,
      startMethod: race.startMethod,
      prizeInfo: race.prizeInfo,
      eligibilityNotes: race.eligibilityNotes,
      entryDeadline: race.entryDeadline,
      contactEmail: race.contactEmail,
      notes: race.notes
    }),
    globalRaceId: race.id,
    selected: true
  }];
  renderRaceImportPreview();
  els.raceImportPreview?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showMessage(t('message.editing'));
}

async function handleGlobalRaceDelete(id) {
  if (!confirmDelete(t('delete.globalRace'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  try {
    await deleteGlobalRaceFromCloud(id);
    raceProgramRaces = raceProgramRaces.filter((race) => race.id !== id);
    render();
    showMessage(t('raceEntries.deletedOpportunity'));
  } catch (error) {
    console.error('[EquiTrack race programs] Global race delete failed', error);
    showMessage(t('raceEntryCloud.deleteFailed', { error: getCloudErrorMessage(error) }));
  }
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

function deleteRaceOpportunityLocal(id) {
  if (blockCloudPreviewEdit()) return;
  if (!confirmDelete(t('delete.raceOpportunity'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  state.raceEntryOpportunities = state.raceEntryOpportunities.filter((entry) => entry.id !== id);
  state.raceEntryPlans = state.raceEntryPlans.filter((entry) => entry.opportunityId !== id);
  saveData();
  render();
  showMessage(t('raceEntries.deletedOpportunity'));
}

function buildRaceEmailDraft(planId) {
  const plan = normalizeRacePlan(state.raceEntryPlans.find((entry) => entry.id === planId) || {});
  const globalRace = plan.programRaceId ? raceProgramRaces.find((entry) => entry.id === plan.programRaceId) : null;
  const globalProgram = globalRace ? racePrograms.find((entry) => entry.id === globalRace.programId) : null;
  const opportunity = globalRace
    ? normalizeRaceOpportunity({
      racetrackName: globalProgram?.racetrackName || '',
      raceDate: globalRace.raceDate,
      raceNumber: globalRace.raceNumber,
      raceName: globalRace.raceName,
      prizeInfo: globalRace.prizeInfo,
      contactEmail: globalRace.contactEmail,
      notes: globalRace.notes
    })
    : normalizeRaceOpportunity(state.raceEntryOpportunities.find((entry) => entry.id === plan.opportunityId) || {});
  const horse = state.horses.find((entry) => entry.id === plan.horseId);
  const activeStable = getActiveStable();
  const horseName = horse?.name || t('tasks.noHorse');
  const subject = t('raceEntries.emailSubject', {
    racetrack: opportunity.racetrackName || t('raceEntries.racetrack'),
    date: opportunity.raceDate || '',
    horse: horseName
  });
  const body = [
    t('raceEntries.emailGreeting'),
    '',
    t('raceEntries.emailIntro'),
    '',
    `${t('raceEntries.racetrack')}: ${opportunity.racetrackName}`,
    `${t('raceEntries.raceDate')}: ${opportunity.raceDate}`,
    `${t('raceEntries.raceNumber')}: ${opportunity.raceNumber || '-'}`,
    `${t('raceEntries.raceName')}: ${opportunity.raceName || '-'}`,
    `${t('raceEntries.horse')}: ${horseName}`,
    `${t('raceEntries.driver')}: ${plan.driver || '-'}`,
    `${t('raceEntries.trainer')}: ${plan.trainer || '-'}`,
    `${t('raceEntries.stable')}: ${activeStable.name || '-'}`,
    `${t('support.email')}: ${getCurrentUser()?.email || '-'}`,
    `${t('common.notesSimple')}: ${plan.notes || opportunity.notes || '-'}`,
    '',
    t('raceEntries.emailClosing')
  ].join('\n');
  return { to: opportunity.contactEmail, subject, body };
}

function createRaceEmailDraft(planId) {
  const draft = buildRaceEmailDraft(planId);
  if (!draft.to) {
    showMessage(t('raceEntries.noContactEmail'));
    return;
  }
  const href = `mailto:${encodeURIComponent(draft.to)}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  window.location.href = href;
}

function loadPdfJs() {
  if (window.pdfjsLib?.getDocument) return Promise.resolve(window.pdfjsLib);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PDFJS_CDN_URL}"]`);
    const script = existing || document.createElement('script');
    script.src = PDFJS_CDN_URL;
    script.async = true;
    script.onload = () => {
      if (!window.pdfjsLib?.getDocument) {
        reject(new Error('PDF.js did not initialize'));
        return;
      }
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error('PDF.js failed to load'));
    if (!existing) document.head.appendChild(script);
  });
}

function linesFromPdfTextContent(textContent) {
  const items = (textContent.items || [])
    .filter((item) => String(item.str || '').trim())
    .map((item) => ({
      text: String(item.str || '').trim(),
      x: Number(item.transform?.[4] || 0),
      y: Number(item.transform?.[5] || 0)
    }))
    .sort((a, b) => Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.x - b.x);
  const lines = [];
  items.forEach((item) => {
    const line = lines.find((entry) => Math.abs(entry.y - item.y) <= 2);
    if (line) line.items.push(item);
    else lines.push({ y: item.y, items: [item] });
  });
  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => line.items.sort((a, b) => a.x - b.x).map((item) => item.text).join(' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfJs();
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    pages.push(linesFromPdfTextContent(textContent).join('\n'));
  }
  return pages.join('\n');
}

function setRaceImportPreview(races, statusKey = 'raceEntries.racesFound') {
  const selectedProgram = racePrograms.find((program) => program.id === els.raceImportProgramSelect?.value);
  raceImportPreviewItems = races.map((race) => ({
    ...normalizeRaceOpportunity({
      ...race,
      racetrackName: selectedProgram?.racetrackName || race.racetrackName
    }),
    id: createRaceImportLocalId({
      ...race,
      racetrackName: selectedProgram?.racetrackName || race.racetrackName
    }),
    selected: race.selected !== false
  }));
  if (els.raceImportStatus) {
    els.raceImportStatus.textContent = raceImportPreviewItems.length
      ? `${t(statusKey, { count: raceImportPreviewItems.length })} ${t('raceEntries.reviewImported')}`
      : t('raceEntries.noRacesFound');
  }
  renderRaceImportPreview();
}

async function handleRaceImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  raceImportPreviewItems = [];
  renderRaceImportPreview();
  try {
    const fileName = file.name.toLowerCase();
    const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
    const isCsv = file.type === 'text/csv' || fileName.endsWith('.csv');
    let text = '';
    if (isPdf) {
      if (els.raceImportStatus) els.raceImportStatus.textContent = t('raceEntries.readingPdf');
      text = await extractPdfText(file);
    } else {
      text = await file.text();
    }
    const races = parseRaceCsvOrText(text, isPdf ? 'pdf' : isCsv ? 'csv' : 'text');
    if (!races.length) {
      if (els.raceImportStatus) els.raceImportStatus.textContent = t('raceEntries.noRacesFound');
      showMessage(t('raceEntries.noRacesFound'));
      return;
    }
    setRaceImportPreview(races, isPdf ? 'raceEntries.racesFound' : isCsv ? 'raceEntries.importCsvLoaded' : 'raceEntries.importTextLoaded');
    showMessage(t('raceEntries.racesFound', { count: races.length }));
  } catch (error) {
    console.error('[EquiTrack race entries] Race file import failed', error);
    const fileName = file.name.toLowerCase();
    const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
    const message = isPdf && /pdf\.js|pdfjs|load|initialize/i.test(String(error?.message || error))
      ? t('raceEntries.pdfUnavailable')
      : isPdf
        ? t('raceEntries.pdfReadFailed')
        : t('raceEntries.importPlaceholder');
    if (els.raceImportStatus) els.raceImportStatus.textContent = message;
    showMessage(message);
  } finally {
    event.target.value = '';
  }
}

async function handleResultsImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  resultsImportPreviewItems = [];
  renderResultsImportPreview();
  try {
    if (!isSuperAdmin() || !cloudWriteMode) {
      showMessage(t('auth.unauthorized'));
      return;
    }
    if (els.resultsImportStatus) els.resultsImportStatus.textContent = t('racingRegistry.readingResultsPdf');
    const text = await extractPdfText(file);
    const rows = parseItalianResultsPdfText(text);
    if (!rows.length) {
      if (els.resultsImportStatus) els.resultsImportStatus.textContent = t('racingRegistry.noResultsFound');
      showMessage(t('racingRegistry.noResultsFound'));
      return;
    }
    resultsImportPreviewItems = rows;
    renderResultsImportPreview();
    if (els.resultsImportStatus) {
      els.resultsImportStatus.textContent = `${t('racingRegistry.resultsFound', { count: rows.length })} ${t('racingRegistry.reviewResults')}`;
    }
    showMessage(t('racingRegistry.resultsFound', { count: rows.length }));
  } catch (error) {
    console.error('[EquiTrack racing registry] Results PDF import failed', error);
    const message = /pdf\.js|pdfjs|load|initialize/i.test(String(error?.message || error))
      ? t('raceEntries.pdfUnavailable')
      : t('racingRegistry.resultsPdfReadFailed');
    if (els.resultsImportStatus) els.resultsImportStatus.textContent = message;
    showMessage(message);
  } finally {
    event.target.value = '';
  }
}

function updateRaceImportPreviewField(target) {
  const card = target.closest('[data-import-id]');
  const field = target.dataset.importField;
  if (!card || !field) return;
  const item = raceImportPreviewItems.find((race) => race.id === card.dataset.importId);
  if (!item) return;
  if (field === 'selected') item.selected = target.checked;
  else item[field] = target.value;
  if (els.raceImportSaveButton) els.raceImportSaveButton.disabled = !raceImportPreviewItems.some((race) => race.selected);
}

function updateResultsImportPreviewField(target) {
  const card = target.closest('[data-result-id]');
  const field = target.dataset.resultField;
  if (!card || !field) return;
  const row = resultsImportPreviewItems.find((entry) => entry.id === card.dataset.resultId);
  if (!row) return;
  if (field === 'selected') row.selected = target.checked;
  else if (field === 'matchMode') {
    row.matchMode = target.value;
    if (target.value === 'match' && !row.racingHorseId) {
      const firstMatch = findRacingHorseByName(row.horseName);
      if (firstMatch) row.racingHorseId = firstMatch.id;
    }
  } else if (field === 'racingHorseId') {
    row.racingHorseId = target.value;
    row.matchMode = target.value ? 'match' : row.matchMode;
  } else {
    row[field] = target.value;
  }
  row.duplicate = hasDuplicateRacingStart(row, row.racingHorseId);
  if (els.resultsImportSaveButton) els.resultsImportSaveButton.disabled = !resultsImportPreviewItems.some((entry) => entry.selected);
  if (field === 'racingHorseId' || field === 'matchMode' || field === 'horseName') renderResultsImportPreview();
}

function removeImportedRace(id) {
  raceImportPreviewItems = raceImportPreviewItems.filter((race) => race.id !== id);
  if (els.raceImportStatus) {
    els.raceImportStatus.textContent = raceImportPreviewItems.length
      ? `${t('raceEntries.racesFound', { count: raceImportPreviewItems.length })} ${t('raceEntries.reviewImported')}`
      : t('raceEntries.noRacesFound');
  }
  renderRaceImportPreview();
}

async function saveImportedRaceOpportunities() {
  if (blockCloudPreviewEdit()) return;
  const selectedProgramId = els.raceImportProgramSelect?.value || '';
  const saveToGlobalProgram = cloudWriteMode && isSuperAdmin() && selectedProgramId;
  if (cloudWriteMode && isSuperAdmin() && !selectedProgramId) {
    showMessage(t('racePrograms.noProgramSelected'));
    return;
  }
  const selected = raceImportPreviewItems.filter((race) => race.selected).map((race) => {
    const normalized = normalizeRaceOpportunity(race);
    const now = new Date().toISOString();
    normalized.id = createRaceImportLocalId(normalized);
    normalized.globalRaceId = race.globalRaceId || '';
    normalized.createdAt = normalized.createdAt || now;
    normalized.updatedAt = now;
    return normalized;
  });
  if (!selected.length) return;
  if (els.raceImportSaveButton) els.raceImportSaveButton.disabled = true;
  try {
    if (saveToGlobalProgram) {
      for (const opportunity of selected) {
        const saved = await saveGlobalRaceToCloud(selectedProgramId, opportunity);
        const existingIndex = raceProgramRaces.findIndex((entry) => entry.id === saved.id || (entry.programId === saved.programId && entry.importedLocalId === saved.importedLocalId));
        if (existingIndex >= 0) raceProgramRaces[existingIndex] = saved;
        else raceProgramRaces.push(saved);
      }
    } else if (cloudWriteMode) {
      for (const opportunity of selected) {
        const existing = state.raceEntryOpportunities.find((entry) => entry.id === opportunity.id);
        if (existing?.cloudId) opportunity.cloudId = existing.cloudId;
        const saved = await saveRaceOpportunityToCloud(opportunity);
        const existingIndex = state.raceEntryOpportunities.findIndex((entry) => entry.id === saved.id);
        if (existingIndex >= 0) state.raceEntryOpportunities[existingIndex] = saved;
        else state.raceEntryOpportunities.push(saved);
      }
    } else {
      selected.forEach((opportunity) => {
        const existingIndex = state.raceEntryOpportunities.findIndex((entry) => entry.id === opportunity.id);
        if (existingIndex >= 0) state.raceEntryOpportunities[existingIndex] = opportunity;
        else state.raceEntryOpportunities.push(opportunity);
      });
      saveData();
    }
    const savedCount = selected.length;
    raceImportPreviewItems = [];
    render();
    if (els.raceImportStatus) els.raceImportStatus.textContent = t('raceEntries.importSaved', { count: savedCount });
    showMessage(t('raceEntries.importSaved', { count: savedCount }));
  } catch (error) {
    console.error('[EquiTrack race entries] Imported race save failed', error);
    const errorMessage = isPermissionError(error)
      ? t('raceEntryCloud.permissionBlocked')
      : isMissingCloudTableError(error)
        ? t('migration.schemaNeeded')
        : getCloudErrorMessage(error);
    showMessage(t('raceEntries.importSaveFailed', { error: errorMessage }));
  } finally {
    if (els.raceImportSaveButton) els.raceImportSaveButton.disabled = !raceImportPreviewItems.some((race) => race.selected);
  }
}

async function ensureRacingHorseForResult(row, updateEarnings) {
  if (row.matchMode === 'match' && row.racingHorseId) {
    return racingHorses.find((horse) => horse.id === row.racingHorseId) || null;
  }
  if (row.matchMode !== 'create') return null;
  const grossPrize = toSafeNumber(row.grossPrize, 0);
  const saved = await saveRacingHorseToCloud({
    horseName: row.horseName,
    ownerName: row.ownerName,
    trainerName: row.trainerName,
    totalEarnings: updateEarnings ? grossPrize : 0,
    careerEarnings: updateEarnings ? grossPrize : '',
    lastResultsUpdate: row.raceDate,
    notes: row.notes
  });
  racingHorses.push(saved);
  row.racingHorseId = saved.id;
  row.matchMode = 'match';
  return saved;
}

async function updateRacingHorseEarningsFromResult(horse, row) {
  const grossPrize = toSafeNumber(row.grossPrize, 0);
  if (!grossPrize) {
    const saved = await saveRacingHorseToCloud({ ...horse, lastResultsUpdate: row.raceDate });
    const existingIndex = racingHorses.findIndex((entry) => entry.id === saved.id);
    if (existingIndex >= 0) racingHorses[existingIndex] = saved;
    return;
  }
  const currentTotal = toSafeNumber(horse.totalEarnings, 0);
  const currentCareer = horse.careerEarnings === '' || horse.careerEarnings == null
    ? currentTotal
    : toSafeNumber(horse.careerEarnings, 0);
  const saved = await saveRacingHorseToCloud({
    ...horse,
    totalEarnings: currentTotal + grossPrize,
    careerEarnings: currentCareer + grossPrize,
    lastResultsUpdate: row.raceDate
  });
  const existingIndex = racingHorses.findIndex((entry) => entry.id === saved.id);
  if (existingIndex >= 0) racingHorses[existingIndex] = saved;
}

async function saveImportedResults() {
  if (!isSuperAdmin() || !cloudWriteMode) {
    showMessage(t('auth.unauthorized'));
    return;
  }
  const selected = resultsImportPreviewItems.filter((row) => row.selected);
  if (!selected.length) return;
  const updateEarnings = Boolean(els.resultsImportUpdateEarnings?.checked);
  if (els.resultsImportSaveButton) els.resultsImportSaveButton.disabled = true;
  let savedCount = 0;
  let skippedCount = 0;
  let duplicateCount = 0;
  try {
    for (const row of selected) {
      const horse = await ensureRacingHorseForResult(row, updateEarnings);
      if (!horse?.id) {
        skippedCount += 1;
        continue;
      }
      const duplicate = findDuplicateRacingStart(row, horse.id);
      const start = {
        id: duplicate?.id || '',
        racingHorseId: horse.id,
        raceDate: row.raceDate,
        racetrackName: row.racetrackName,
        raceCode: row.raceNumber || row.raceCode,
        driverName: row.driverName,
        placement: row.placement,
        kilometerTime: row.kilometerTime,
        distance: row.distance,
        netPrize: row.netPrize,
        grossPrize: row.grossPrize,
        raceNotes: [
          row.raceName && `${t('raceEntries.raceName')}: ${row.raceName}`,
          row.startingNumber && `${t('calendar.startNumber')}: ${row.startingNumber}`,
          row.totalTime && `Total time: ${row.totalTime}`,
          row.ownerName && `${t('horses.ownerName')}: ${row.ownerName}`,
          row.trainerName && `${t('horses.trainerName')}: ${row.trainerName}`,
          row.notes
        ].filter(Boolean).join('\n')
      };
      const savedStart = await saveRacingHorseStartToCloud(start);
      const existingIndex = racingHorseStarts.findIndex((entry) => entry.id === savedStart.id);
      if (existingIndex >= 0) racingHorseStarts[existingIndex] = savedStart;
      else racingHorseStarts.push(savedStart);
      if (duplicate) duplicateCount += 1;
      else if (updateEarnings) await updateRacingHorseEarningsFromResult(horse, row);
      savedCount += 1;
    }
    resultsImportPreviewItems = [];
    render();
    const message = `${t('racingRegistry.resultsImportSaved', { count: savedCount, skipped: skippedCount, duplicates: duplicateCount })} ${t('racingRegistry.recalculateAfterImport')}`;
    if (els.resultsImportStatus) els.resultsImportStatus.textContent = message;
    showMessage(message);
  } catch (error) {
    console.error('[EquiTrack racing registry] Results import save failed', error);
    showMessage(t('racingRegistry.resultsImportSaveFailed', { error: getCloudErrorMessage(error) }));
  } finally {
    if (els.resultsImportSaveButton) els.resultsImportSaveButton.disabled = !resultsImportPreviewItems.some((row) => row.selected);
  }
}

function deleteHorseLocal(id) {
  if (blockCloudPreviewEdit()) return;
  if (!confirmDelete(t('delete.horse'))) {
    showMessage(t('message.deleteCancelled'));
    return;
  }
  state.horses = state.horses.filter((horse) => horse.id !== id);
  state.careHistory = state.careHistory.filter((record) => record.horseId !== id);
  state.raceEntryPlans = state.raceEntryPlans.filter((plan) => plan.horseId !== id);
  saveData();
  render();
  showMessage(t('message.horseDeleted'));
}

function toggleTask(id) {
  if (blockCloudPreviewEdit()) return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  const nextTask = { ...task, done: !task.done };
  if (cloudWriteMode) {
    runCloudAction('task-toggle', id, () => handleCloudTaskSave(nextTask, t('taskCloud.toggled')));
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
    calendarEvents: Array.isArray(data.calendarEvents) ? data.calendarEvents.map(normalizeCalendarEvent) : [],
    careHistory: Array.isArray(data.careHistory) ? data.careHistory.map(normalizeCareRecord) : [],
    raceEntryOpportunities: Array.isArray(data.raceEntryOpportunities) ? data.raceEntryOpportunities.map(normalizeRaceOpportunity) : [],
    raceEntryPlans: Array.isArray(data.raceEntryPlans) ? data.raceEntryPlans.map(normalizeRacePlan) : []
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
    backupFormatVersion: 5,
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
    cloudWriteMode = false;
    cloudPreviewMode = false;
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
    cloudWriteMode = false;
    cloudPreviewMode = false;
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
  cloudWriteMode = false;
  cloudPreviewMode = false;
  state = { horses: [], tasks: [], hours: [], inventory: [], calendarEvents: [], careHistory: [], raceEntryOpportunities: [], raceEntryPlans: [] };
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
    cloudWriteMode = false;
    cloudUnavailable = false;
    cloudModeStatusText = '';
    horseCloudWriteMode = false;
    horseCloudStatusText = '';
    taskCloudWriteMode = false;
    taskCloudStatusText = '';
    workCloudWriteMode = false;
    workCloudStatusText = '';
    feedCloudWriteMode = false;
    feedCloudStatusText = '';
    calendarCloudWriteMode = false;
    calendarCloudStatusText = '';
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      membershipRole: '',
      profileRole: '',
      canManageUsers: false,
      canEditCalendar: false,
      canEditHorses: false,
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
    cloudWriteMode = false;
    cloudUnavailable = false;
    cloudModeStatusText = '';
    horseCloudWriteMode = false;
    horseCloudStatusText = '';
    taskCloudWriteMode = false;
    taskCloudStatusText = '';
    workCloudWriteMode = false;
    workCloudStatusText = '';
    feedCloudWriteMode = false;
    feedCloudStatusText = '';
    calendarCloudWriteMode = false;
    calendarCloudStatusText = '';
    setCloudStatus({
      status: 'notConnected',
      email: '',
      stableId: '',
      stableName: '',
      membershipRole: '',
      profileRole: '',
      canManageUsers: false,
      canEditCalendar: false,
      canEditHorses: false,
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
els.calendarSelectedDayAgenda?.addEventListener('click', handleListClick);
document.querySelector('#stableView').addEventListener('click', handleQuickAction);
els.homeOverviewSection?.addEventListener('click', handleHomeShortcut);
els.raceControlDashboard?.addEventListener('click', handleRaceAdminAction);
els.raceStablePreviewToggle?.addEventListener('click', toggleRaceStablePreview);
els.alertsList?.addEventListener('click', handleAlertAction);
els.footerSupportLink?.addEventListener('click', handleFooterSupportLink);
els.horseForm.addEventListener('submit', handleHorseSubmit);
els.careForm?.addEventListener('submit', handleCareSubmit);
els.taskForm.addEventListener('submit', handleTaskSubmit);
els.hoursForm.addEventListener('submit', handleHoursSubmit);
els.inventoryForm.addEventListener('submit', handleInventorySubmit);
els.eventForm.addEventListener('submit', handleEventSubmit);
els.raceOpportunityForm?.addEventListener('submit', handleRaceOpportunitySubmit);
els.racePlanForm?.addEventListener('submit', handleRacePlanSubmit);
els.raceProgramForm?.addEventListener('submit', handleRaceProgramSubmit);
els.racingHorseForm?.addEventListener('submit', handleRacingHorseSubmit);
els.racingHorseStartForm?.addEventListener('submit', handleRacingHorseStartSubmit);
els.racingHorseSearch?.addEventListener('input', (event) => {
  racingHorseSearchTerm = event.target.value || '';
  renderRacingHorseRegistry();
});
els.raceImportInput?.addEventListener('change', handleRaceImportFile);
els.resultsImportInput?.addEventListener('change', handleResultsImportFile);
els.raceProgramAdminList?.addEventListener('change', (event) => {
  const input = event.target.closest('input[data-program-import-id]');
  if (!input) return;
  selectRaceProgramForImport(input.dataset.programImportId, false);
  handleRaceImportFile(event);
});
els.publishedRaceProgramList?.addEventListener('input', (event) => {
  const filter = event.target.closest('[data-race-filter]');
  if (!filter) return;
  if (filter.dataset.raceFilter === 'search') publishedRaceFilter.search = filter.value || '';
  window.clearTimeout(publishedRaceFilterTimer);
  publishedRaceFilterTimer = window.setTimeout(renderPublishedRacePrograms, 250);
});
els.publishedRaceProgramList?.addEventListener('change', (event) => {
  const planField = event.target.closest('[data-plan-field="horseId"]');
  if (planField) prefillGlobalRacePlanDefaults(planField.closest('[data-program-race-id]'));
  const filter = event.target.closest('[data-race-filter]');
  if (!filter) return;
  if (filter.dataset.raceFilter === 'possibleOnly') publishedRaceFilter.possibleOnly = filter.checked;
  renderPublishedRacePrograms();
});
els.raceImportPreview?.addEventListener('input', (event) => updateRaceImportPreviewField(event.target));
els.raceImportPreview?.addEventListener('change', (event) => updateRaceImportPreviewField(event.target));
els.raceImportPreview?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="remove-imported-race"]');
  if (!button) return;
  removeImportedRace(button.dataset.id);
});
els.raceImportSaveButton?.addEventListener('click', saveImportedRaceOpportunities);
els.resultsImportPreview?.addEventListener('input', (event) => updateResultsImportPreviewField(event.target));
els.resultsImportPreview?.addEventListener('change', (event) => updateResultsImportPreviewField(event.target));
els.resultsImportSaveButton?.addEventListener('click', saveImportedResults);
els.exportButton.addEventListener('click', exportBackup);
els.importInput.addEventListener('change', (event) => importBackup(event.target.files[0]));
els.restoreEmergencyButton?.addEventListener('click', restoreEmergencyBackup);
els.refreshAppButton?.addEventListener('click', refreshForUpdate);
els.resetDataButton.addEventListener('click', resetLocalData);
els.languageSelect.addEventListener('change', handleLanguageChange);
els.loginForm?.addEventListener('submit', handleLoginSubmit);
els.logoutButton?.addEventListener('click', handleLogout);
els.settingsLogoutButton?.addEventListener('click', handleLogout);
els.dismissHomeTipsButton?.addEventListener('click', dismissHomeTips);
els.adminStableForm?.addEventListener('submit', handleAdminStableSubmit);
els.stableLocationForm?.addEventListener('submit', handleStableLocationSubmit);
els.adminUserForm?.addEventListener('submit', handleAdminUserSubmit);
els.adminUserForm?.elements.stableRole?.addEventListener('change', (event) => {
  setAdminPermissionValues(event.target.value);
  renderAdminUserForm();
});
els.migrationConfirmInput?.addEventListener('input', handleMigrationConfirmationChange);
els.migrationUploadButton?.addEventListener('click', uploadLocalDataToCloud);
els.cloudReadButton?.addEventListener('click', checkCloudDataPreview);
els.cloudModePreviewButton?.addEventListener('click', () => enableCloudMode({ navigateToStable: false }));
els.cloudModeLocalButton?.addEventListener('click', useLocalModeOnThisDevice);
els.cloudModeReturnButton?.addEventListener('click', returnToCloudMode);
els.horseCloudConfirmInput?.addEventListener('input', handleHorseCloudConfirmationChange);
els.horseCloudEnableButton?.addEventListener('click', enableHorseCloudWrites);
els.horseCloudLocalButton?.addEventListener('click', returnHorseWritesToLocalMode);
els.taskCloudConfirmInput?.addEventListener('input', handleTaskCloudConfirmationChange);
els.taskCloudEnableButton?.addEventListener('click', enableTaskCloudWrites);
els.taskCloudLocalButton?.addEventListener('click', returnTaskWritesToLocalMode);
els.workCloudConfirmInput?.addEventListener('input', handleWorkCloudConfirmationChange);
els.workCloudEnableButton?.addEventListener('click', enableWorkCloudWrites);
els.workCloudLocalButton?.addEventListener('click', returnWorkWritesToLocalMode);
els.feedCloudConfirmInput?.addEventListener('input', handleFeedCloudConfirmationChange);
els.feedCloudEnableButton?.addEventListener('click', enableFeedCloudWrites);
els.feedCloudLocalButton?.addEventListener('click', returnFeedWritesToLocalMode);
els.calendarCloudConfirmInput?.addEventListener('input', handleCalendarCloudConfirmationChange);
els.calendarCloudEnableButton?.addEventListener('click', enableCalendarCloudWrites);
els.calendarCloudLocalButton?.addEventListener('click', returnCalendarWritesToLocalMode);
els.cloudCleanupConfirmInput?.addEventListener('input', handleCloudCleanupConfirmationChange);
els.cloudCleanupButton?.addEventListener('click', cleanupCloudDataForStable);
els.calendarScopeFilter?.addEventListener('change', handleCalendarFilterChange);
els.calendarTypeFilter?.addEventListener('change', handleCalendarFilterChange);
els.calendarHorseFilter?.addEventListener('change', handleCalendarFilterChange);
els.calendarPrevMonth?.addEventListener('click', () => changeCalendarMonth(-1));
els.calendarNextMonth?.addEventListener('click', () => changeCalendarMonth(1));
els.calendarTodayButton?.addEventListener('click', goToCalendarToday);
els.calendarMonthGrid?.addEventListener('click', handleCalendarMonthClick);
els.calendarAddSelectedDayButton?.addEventListener('click', addEventForSelectedDay);
els.calendarAddEventButton?.addEventListener('click', addEventForSelectedDay);
document.querySelectorAll('[data-calendar-view-mode]').forEach((button) => button.addEventListener('click', handleCalendarViewModeClick));
els.taskForm.elements.date.value = today();
els.hoursForm.elements.date.value = today();
if (els.careForm?.elements.date) els.careForm.elements.date.value = today();
els.eventForm.elements.date.value = today();
if (els.raceOpportunityForm?.elements.raceDate) els.raceOpportunityForm.elements.raceDate.value = today();
setAdminPermissionValues(els.adminUserForm?.elements.stableRole?.value || 'viewer');

applyTranslations();
setupViewNav();
setupOnboarding();
setupTabs();
render();
setupAuth();
loadTurnoutWeather();
updateOfflineStatus(false);
window.addEventListener('online', () => updateOfflineStatus(true));
window.addEventListener('offline', () => updateOfflineStatus(true));
registerServiceWorker();
