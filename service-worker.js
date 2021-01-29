let cacheName = "v0.0.2 a 16";
let appShellFiles = [
    "index.html",
    "manifest.webapp",
    "register-sw.js",
    "service-worker.js",

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

self.addEventListener("install", (event) => {
    //https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
    console.log('Inside the install handler:', event);
    self.skipWaiting();
    console.log("[Service Worker {" + cacheName + "}] Skipped Waiting");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("[Service Worker {" + cacheName + "}] Caching all: app shell and content");
            location.reload(); // attempt
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log('Inside the activate handler:', event);
    console.log("Deleting caches");
    caches.keys().then(strArray => strArray.forEach(string => {
            console.log("Deleting cache " + string);
            if (string !== cacheName) {
                caches.delete(string);
            }
        })
    );
});

self.addEventListener("fetch", (event) => {
    //https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
    console.log('Inside the fetch handler:', event);
    event.respondWith(
        caches.match(event.request).then((r) => {
            console.log('[Service Worker] Fetching resource: ' + event.request.url);
            return r || fetch(event.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + event.request.url);
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});