let cacheName = "v0.0.2 a 26";
let appShellFiles = [
    "index.html",
    "manifest.webapp",
    "register-sw.js",

    "res/json-contents.js",
    "res/words.js",

    "script/conjugation-parser.js",
    "script/conjugator.js",
    "script/util.js",

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

self.cacheName = cacheName;

self.addEventListener("install", (event) => {
    //https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
    console.log('Inside the install handler:', event);
    self.skipWaiting();
    console.log("[Service Worker {" + cacheName + "}] Skipped Waiting");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("[Service Worker {" + cacheName + "}] Caching all: app shell and content");
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log('Inside the activate handler:', event);
    console.log("Deleting caches");
    caches.keys().then(strArray => strArray.forEach(string => {
            console.log("Found cache " + string);
            if (string !== cacheName) {
                console.log("Deleting cache " + string);
                //caches.delete(string);
            }
        })
    );
});

self.addEventListener("fetch", (event) => {
    //https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
    console.log('Inside the fetch handler:', event);
    let response;
    caches.open(cacheName).then(cache => { // open my cache
            cache.match(event.request).match(event.request).then((cacheResponse) => {
                console.log("[Service Worker {" + cacheName + "}] Fetching resource: " + event.request.url);
                if (cacheResponse !== null && cacheResponse !== undefined) { // have file in cache
                    response = cacheResponse
                } else { // need to download the file
                    fetch(event.request).then((onlineResponse) => {
                        caches.open(cacheName).then((cache) => {
                            console.log("[Service Worker {" + cacheName + "}] Caching new resource: " + event.request.url);
                            cache.put(event.request, onlineResponse.clone());
                            response = onlineResponse;
                        });
                    });
                }
            });
        }
    );
    event.respondWith(response);
});