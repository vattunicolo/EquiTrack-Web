const CACHE_NAME = 'equitrack-web-static-v17';
const APP_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './EquiTrack lolo.png'
];
const CACHE_PATHS = new Set(APP_ASSETS);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }
  if (event.request.method !== 'GET') return;
  const path = url.pathname.split('/').pop();
  const isAppRoute = event.request.mode === 'navigate';
  const isStaticAsset = CACHE_PATHS.has(`./${path}`) || CACHE_PATHS.has(url.pathname);
  if (!isAppRoute && !isStaticAsset) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok && isStaticAsset) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      if (isAppRoute) return caches.match('./index.html');
      return caches.match(event.request).then((cached) => cached || caches.match(`./${path}`));
    })
  );
});
