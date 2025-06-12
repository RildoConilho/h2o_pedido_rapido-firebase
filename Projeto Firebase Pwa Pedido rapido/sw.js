// sw.js (Service Worker)

const CACHE_NAME = 'h2o-pedido-rapido-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'sair.html', // Se você tiver uma página sair.html
    'icones/icon-72x72.png',
    'icones/icon-96x96.png',
    'icones/icon-128x128.png',
    'icones/icon-144x144.png',
    'icones/icon-152x152.png',
    'icones/icon-192x192.png',
    'icones/icon-384x384.png',
    'icones/icon-512x512.png',
    'icones/apple-icon-180.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Retorna do cache se encontrado
                }
                return fetch(event.request); // Se não, faz a requisição normal
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Deleta caches antigos
                    }
                })
            );
        })
    );
});