const CACHE_NAME = 'unnat-v10-cache';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/brand-agent.css',
    '/agent.js',
    '/unnat_ai_avatar.png',
    '/manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
