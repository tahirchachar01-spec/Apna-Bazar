// Minimal Service Worker to enable PWA installation on Android, Windows, Mac, and iOS
const CACHE_NAME = 'apna-bazar-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass through fetch requests
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
