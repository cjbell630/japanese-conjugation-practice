if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("app/service-worker.js");
    });
}