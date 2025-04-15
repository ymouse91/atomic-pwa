const CACHE_NAME = 'atomic-stats-cache-v2'; // Vaihda tätä uuteen versioon julkaistaessa
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Asennusvaihe – cachetaa tiedostot ja ohita odotus
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Aktivointivaihe – poistaa vanhat cachet ja ottaa hallinnan
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch – vastaa cachella tai hakee verkosta
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Viesti skipWaiting-komennolle (jos käytät frontendissä päivityspainiketta)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

