self.addEventListener("install", () => {self.skipWaiting();});
self.addEventListener("activate", () => {clients.claim();});
const CACHE_VERSION = "v3";
