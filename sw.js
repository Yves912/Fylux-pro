const CACHE_NAME = 'fylux-pro-cache-v4.5';
const ASSETS = [
    './',
    './index.html', // ou le nom de ton fichier principal
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' // <--- AJOUTE CETTE LIGNE
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Stratégie de récupération : Répondre avec le cache, sinon le réseau
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});