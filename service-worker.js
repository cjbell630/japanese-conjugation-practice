let cacheName = "v0.0.3 a 13";
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
    console.log("[Service Worker " + cacheName + "] install event");
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                cache.addAll(appShellFiles).then(whatever => {
                    console.log("[Service Worker " + cacheName + "] added files");
                    console.log("[Service Worker " + cacheName + "] cache keys: ");
                    cache.keys().then(requests => {
                        console.log(requests);
                        requests.forEach(request => {
                            //my attempt to replace all of the
                            console.log("[Service Worker " + cacheName + "] about to fetch");
                            fetch(request).then(response => {
                                // Cache the newly fetched file for next time
                                cache.put(request, response.clone());
                            });
                        });
                    });
                });
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
    console.log("[Service Worker " + cacheName + "] Intercepted fetch")
    /* GOOGLE VERS
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        //if(event.request.url.endsWith("/japanese-conjugation-practice/")){
        //    console.log("[Service Worker] requested homepage");
        //    event.request.url = "https://cjbell630.github.io/japanese-conjugation-practice/index.html";
        //}

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
    }*/

    event.respondWith(
        //https://stackoverflow.com/a/53496707/12861567
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(resp => {
                // Request found in current cache, or fetch the file
                return resp || fetch(event.request).then(response => {
                    // Cache the newly fetched file for next time
                    cache.put(event.request, response.clone());
                    return response;
                    // Fetch failed, user is offline
                }).catch(() => {
                    // Look in the whole cache to load a fallback version of the file
                    return caches.match(event.request).then(fallback => {
                        return fallback;
                    });
                });
            });
        })
    );
});