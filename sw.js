const CACHE_NAME = 'microbioma-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icone.png',
  './g10ax-fwJMw_0001.png',
  './g10ax-fwJMw_0002.png',
  './g10ax-fwJMw_0003.mp4',
  './g10ax-fwJMw_0004.mp3',
  './g10ax-fwJMw.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});