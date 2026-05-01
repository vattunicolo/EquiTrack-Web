// GitHub Releases endpoint used for the optional Electron desktop download.
const LATEST_RELEASE_URL = 'https://api.github.com/repos/vattunicolo/EquiTrack-Web/releases/latest';

// localStorage key for all browser app data.
const STORAGE_KEY = 'equitrack-web-data-v1';

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
    { id: createId(), name: 'Hay', quantity: 42, unit: 'bales', minimum: 12 },
    { id: createId(), name: 'Oats', quantity: 180, unit: 'kg', minimum: 45 },
    { id: createId(), name: 'Pellets', quantity: 28, unit: 'bags', minimum: 10 }
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
  releasePageLink: document.querySelector('#releasePageLink')
};

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
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : []
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

// Build the horse selector used by the task form.
function renderHorseOptions() {
  const options = ['<option value="">No horse assigned</option>']
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
  els.lowFeedCount.textContent = state.inventory.filter((item) => Number(item.quantity) <= Number(item.minimum)).length;
}

function renderHorses() {
  if (state.horses.length === 0) {
    els.horsesList.innerHTML = '<p class="empty-state">No horses yet. Add the first horse above.</p>';
    return;
  }

  els.horsesList.innerHTML = state.horses.map((horse) => `
    <article class="item-card">
      <div>
        <h4>${escapeHtml(horse.name)}</h4>
        <p>${escapeHtml(horse.notes || 'No notes yet.')}</p>
        <div class="item-meta">
          <span class="pill">Age: ${escapeHtml(horse.age || 'not set')}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-horse" data-id="${horse.id}">Edit</button>
        <button class="button ghost danger" type="button" data-action="delete-horse" data-id="${horse.id}">Delete</button>
      </div>
    </article>
  `).join('');
}

function renderTasks() {
  if (state.tasks.length === 0) {
    els.tasksList.innerHTML = '<p class="empty-state">No daily tasks yet. Add one above.</p>';
    return;
  }

  const sortedTasks = [...state.tasks].sort((a, b) => a.date.localeCompare(b.date));
  els.tasksList.innerHTML = sortedTasks.map((task) => {
    const horse = state.horses.find((item) => item.id === task.horseId);
    return `
      <article class="item-card">
        <div>
          <h4>${escapeHtml(task.title)}</h4>
          <p>${escapeHtml(task.notes || 'No notes yet.')}</p>
          <div class="item-meta">
            <span class="pill">${escapeHtml(task.date)}</span>
            <span class="pill">${horse ? escapeHtml(horse.name) : 'No horse'}</span>
            <span class="pill ${task.done ? 'good' : 'warn'}">${task.done ? 'Done' : 'Open'}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="toggle-task" data-id="${task.id}">${task.done ? 'Reopen' : 'Done'}</button>
          <button class="button ghost" type="button" data-action="edit-task" data-id="${task.id}">Edit</button>
          <button class="button ghost danger" type="button" data-action="delete-task" data-id="${task.id}">Delete</button>
        </div>
      </article>
    `;
  }).join('');
}

function renderHours() {
  if (state.hours.length === 0) {
    els.hoursList.innerHTML = '<p class="empty-state">No work hours logged yet.</p>';
    return;
  }

  els.hoursList.innerHTML = state.hours.map((entry) => `
    <article class="item-card">
      <div>
        <h4>${escapeHtml(entry.worker)}</h4>
        <p>${escapeHtml(entry.notes || 'No notes yet.')}</p>
        <div class="item-meta">
          <span class="pill">${escapeHtml(entry.date)}</span>
          <span class="pill">${Number(entry.hours || 0).toFixed(2)} hours</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="button ghost" type="button" data-action="edit-hours" data-id="${entry.id}">Edit</button>
        <button class="button ghost danger" type="button" data-action="delete-hours" data-id="${entry.id}">Delete</button>
      </div>
    </article>
  `).join('');
}

function renderInventory() {
  if (state.inventory.length === 0) {
    els.inventoryList.innerHTML = '<p class="empty-state">No feed inventory yet. Add hay, oats, pellets, or other supplies.</p>';
    return;
  }

  els.inventoryList.innerHTML = state.inventory.map((item) => {
    const isLow = Number(item.quantity) <= Number(item.minimum);
    return `
      <article class="item-card">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${Number(item.quantity || 0)} ${escapeHtml(item.unit)} available. Reorder below ${Number(item.minimum || 0)}.</p>
          <div class="item-meta">
            <span class="pill ${isLow ? 'warn' : 'good'}">${isLow ? 'Low stock' : 'Stock ok'}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="button ghost" type="button" data-action="edit-inventory" data-id="${item.id}">Edit</button>
          <button class="button ghost danger" type="button" data-action="delete-inventory" data-id="${item.id}">Delete</button>
        </div>
      </article>
    `;
  }).join('');
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
  showMessage('Horse saved.');
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
  showMessage('Task saved.');
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
  showMessage('Work hours saved.');
}

function handleInventorySubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  upsert('inventory', {
    id: form.elements.id.value,
    name: form.elements.name.value.trim(),
    quantity: Number(form.elements.quantity.value),
    unit: form.elements.unit.value.trim(),
    minimum: Number(form.elements.minimum.value)
  });
  resetForm(form);
  showMessage('Feed item saved.');
}

// Delegate edit/delete/toggle actions from all rendered item lists.
function handleListClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'edit-horse') fillHorseForm(id);
  if (action === 'delete-horse') deleteItem('horses', id, 'Horse deleted.');
  if (action === 'toggle-task') toggleTask(id);
  if (action === 'edit-task') fillTaskForm(id);
  if (action === 'delete-task') deleteItem('tasks', id, 'Task deleted.');
  if (action === 'edit-hours') fillHoursForm(id);
  if (action === 'delete-hours') deleteItem('hours', id, 'Work log deleted.');
  if (action === 'edit-inventory') fillInventoryForm(id);
  if (action === 'delete-inventory') deleteItem('inventory', id, 'Feed item deleted.');
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
  els.inventoryForm.elements.quantity.value = item.quantity;
  els.inventoryForm.elements.unit.value = item.unit;
  els.inventoryForm.elements.minimum.value = item.minimum;
  els.inventoryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteItem(collection, id, message) {
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
  showMessage('Backup exported.');
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
      inventory: imported.inventory
    };
    saveData();
    render();
    showMessage('Backup imported.');
  } catch (error) {
    showMessage(`Import failed: ${error.message}`);
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

// Escape release notes before inserting them, then make plain URLs clickable.
function formatChangelog(markdownText) {
  const text = markdownText?.trim() || 'No changelog was provided for this release.';
  return escapeHtml(text).replace(
    /(https?:\/\/[^\s)]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
  );
}

// Keep the desktop download area useful when no GitHub release exists yet.
function showNoRelease(message = 'No desktop release available yet') {
  els.downloadButton.textContent = 'No desktop release yet';
  els.downloadButton.classList.add('disabled');
  els.downloadButton.setAttribute('aria-disabled', 'true');
  els.downloadButton.removeAttribute('href');
  els.releaseStatus.textContent = message;
  els.latestVersion.textContent = 'No release available yet';
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
    const version = release.tag_name || 'Latest release';
    const firstAsset = release.assets?.[0];
    const downloadUrl = firstAsset?.browser_download_url;

    els.latestVersion.textContent = version;
    els.changelog.innerHTML = formatChangelog(release.body);
    if (release.html_url) els.releasePageLink.href = release.html_url;

    if (!downloadUrl) {
      showNoRelease('The latest release exists, but no installer asset has been uploaded yet.');
      els.latestVersion.textContent = version;
      els.changelog.innerHTML = formatChangelog(release.body);
      return;
    }

    els.downloadButton.href = downloadUrl;
    els.downloadButton.textContent = `Download desktop ${version}`;
    els.downloadButton.classList.remove('disabled');
    els.downloadButton.removeAttribute('aria-disabled');
    els.releaseStatus.textContent = `Desktop installer: ${firstAsset.name || 'download available'}`;
  } catch (error) {
    showNoRelease(`No desktop release available yet. ${error.message}`);
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
els.taskForm.elements.date.value = today();
els.hoursForm.elements.date.value = today();

setupTabs();
render();
loadLatestRelease();
