// Päivitetty Service Worker (versio 3)

const CACHE_VERSION = 'v5'; // Päivitä tämä aina julkaistessa uusi versio
const CACHE_NAME = `atomic-stats-cache-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Asennusvaihe: cachetetaan tiedostot
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing and caching app shell');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Aktivointi: poistetaan vanhat cachet
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating new service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: palvelee cachella tai hakee verkosta
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Kuuntelee skipWaiting-komentoa
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
