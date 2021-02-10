let cacheName = "v0.0.3 a 7";
let appShellFiles = [
    "./",
    "manifest.webapp",
    "register-sw.js",

    "res/json-contents.js",
    "res/words.js",

    "script/pattern-parser.js",
    "script/conjugator.js",
    "script/util.js",
    "script/game.js",

    "css/main.css",
    "css/sidenav.css",

    "app/images/favicon.ico",
    "app/images/icon-032.png",
    "app/images/icon-064.png",
    "app/images/icon-128.png",
    "app/images/icon-192.png",
    "app/images/icon-256.png",
    "app/images/icon-512.png"
];

const RUNTIME = "runtime";

//https://googlechrome.github.io/samples/service-worker/basic/

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    const currentCaches = [cacheName, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                cache.addAll(appShellFiles);
            })
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [cacheName, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        /*
        if(event.request.url.endsWith("/japanese-conjugation-practice/")){
            console.log("[Service Worker] requested homepage");
            event.request.url = "https://cjbell630.github.io/japanese-conjugation-practice/index.html";
        }*/

        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});