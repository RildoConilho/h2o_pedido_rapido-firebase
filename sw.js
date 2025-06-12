// sw.js (Service Worker)

const CACHE_NAME = 'h2o-pedido-rapido-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'sair.html', // Se você tiver uma página sair.html, caso contrário remova esta linha
    'firebase-config.js', // Adicionando o arquivo de configuração do Firebase para cache

    // Ícones Android
    'icones/android-launchericon-48-48.png',
    'icones/android-launchericon-72-72.png',
    'icones/android-launchericon-96-96.png',
    'icones/android-launchericon-144-144.png',
    'icones/android-launchericon-192-192.png',
    'icones/android-launchericon-512-512.png',
    'icones/android-launchericon-48-48A.png', // Verifique se esses 'A' são parte dos nomes reais
    'icones/android-launchericon-72-72A.png',
    'icones/android-launchericon-96-96A.png',
    'icones/android-launchericon-144A.png',
    'icones/android-launchericon-192-192A.png',
    'icones/android-launchericon-512-512A.png',

    // Ícones iOS
    'icones/apple-icon-180.png',
    'icones/ios/100.png',
    'icones/ios/1024.png',
    'icones/ios/114.png',
    'icones/ios/120.png',
    'icones/ios/128.png',
    'icones/ios/144.png',
    'icones/ios/152.png',
    'icones/ios/16.png',
    'icones/ios/167.png',
    'icones/ios/180.png',
    'icones/ios/192.png',
    'icones/ios/20.png',
    'icones/ios/256.png',
    'icones/ios/29.png',
    'icones/ios/32.png',
    'icones/ios/40.png',
    'icones/ios/50.png',
    'icones/ios/512.png',
    'icones/ios/57.png',
    'icones/ios/58.png',
    'icones/ios/60.png',
    'icones/ios/64.png',
    'icones/ios/72.png',
    'icones/ios/76.png',
    'icones/ios/80.png',
    'icones/ios/87.png',
    
    // Ícones Windows 11
    'icones/windows11/LargeTile.scale-100.png',
    'icones/windows11/LargeTile.scale-125.png',
    'icones/windows11/LargeTile.scale-150.png',
    'icones/windows11/LargeTile.scale-200.png',
    'icones/windows11/LargeTile.scale-400.png',
    'icones/windows11/SmallTile.scale-100.png',
    'icones/windows11/SmallTile.scale-125.png',
    'icones/windows11/SmallTile.scale-150.png',
    'icones/windows11/SmallTile.scale-200.png',
    'icones/windows11/SmallTile.scale-400.png',
    'icones/windows11/SplashScreen.scale-100.png',
    'icones/windows11/SplashScreen.scale-125.png',
    'icones/windows11/SplashScreen.scale-150.png',
    'icones/windows11/SplashScreen.scale-200.png',
    'icones/windows11/SplashScreen.scale-400.png',
    'icones/windows11/Square150x150Logo.scale-100.png',
    'icones/windows11/Square150x150Logo.scale-125.png',
    'icones/windows11/Square150x150Logo.scale-150.png',
    'icones/windows11/Square150x150Logo.scale-200.png',
    'icones/windows11/Square150x150Logo.scale-400.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
    'icones/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
    'icones/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
    'icones/windows11/Square44x44Logo.scale-100.png',
    'icones/windows11/Square44x44Logo.scale-125.png',
    'icones/windows11/Square44x44Logo.scale-150.png',
    'icones/windows11/Square44x44Logo.scale-200.png',
    'icones/windows11/Square44x44Logo.scale-400.png',
    'icones/windows11/Square44x44Logo.targetsize-16.png',
    'icones/windows11/Square44x44Logo.targetsize-20.png',
    'icones/windows11/Square44x44Logo.targetsize-24.png',
    'icones/windows11/Square44x44Logo.targetsize-256.png',
    'icones/windows11/Square44x44Logo.targetsize-30.png',
    'icones/windows11/Square44x44Logo.targetsize-32.png',
    'icones/windows11/Square44x44Logo.targetsize-36.png',
    'icones/windows11/Square44x44Logo.targetsize-40.png',
    'icones/windows11/Square44x44Logo.targetsize-44.png',
    'icones/windows11/Square44x44Logo.targetsize-48.png',
    'icones/windows11/Square44x44Logo.targetsize-60.png',
    'icones/windows11/Square44x44Logo.targetsize-64.png',
    'icones/windows11/Square44x44Logo.targetsize-72.png',
    'icones/windows11/Square44x44Logo.targetsize-80.png',
    'icones/windows11/Square44x44Logo.targetsize-96.png',
    'icones/windows11/StoreLogo.scale-100.png',
    'icones/windows11/StoreLogo.scale-125.png',
    'icones/windows11/StoreLogo.scale-150.png',
    'icones/windows11/StoreLogo.scale-200.png',
    'icones/windows11/StoreLogo.scale-400.png',
    'icones/windows11/Wide310x150Logo.scale-100.png',
    'icones/windows11/Wide310x150Logo.scale-125.png',
    'icones/windows11/Wide310x150Logo.scale-150.png',
    'icones/windows11/Wide310x150Logo.scale-200.png',
    'icones/windows11/Wide310x150Logo.scale-400.png',
    // Outros ícones que podem estar diretamente na pasta 'icones'
    'icones/48x48.png',
    'icones/icons.json', // Se este for um arquivo de configuração JSON, ele pode ser cachead
    'icones/android-launchericon-512-512.png', // A imagem que você me mandou

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