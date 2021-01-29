const versionNumber = "v0.0.2 a 20";

let newWorker;

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        console.log("Window Loaded");
        navigator.serviceWorker.register("service-worker.js").then(reg => {
            console.log("[Service Worker] Registered");
            reg.addEventListener("updatefound", () => {
                console.log("[Service Worker] Update Found");

                // An updated service worker has appeared in reg.installing!
                newWorker = reg.installing;

                newWorker.addEventListener("statechange", () => {
                    console.log("[Service Worker] New service worker state changed");

                    // Has service worker state changed?
                    switch (newWorker.state) {
                        case "installed":
                            console.log("[Service Worker] New worker state 'installed'");

                            // There is a new service worker available, show the notification
                            if (navigator.serviceWorker.controller) {
                                //https://stackoverflow.com/a/52238757/12861567
                                /*if ('serviceWorker' in navigator) {
                                    navigator.serviceWorker.getRegistrations().then(function (registrations) {
                                        for (let registration of registrations) {
                                            console.log("[Service Worker] Updating registration");
                                            registration.update();
                                        }
                                    })
                                }*/

                                let notification = document.getElementById("updateButton");
                                notification.removeAttribute("hidden");
                            }

                            break;
                    }
                });
            });
        });
    });
}

