// Service worker: permite instalar Finan Gus y abrirlo sin conexión (datos siempre frescos si hay red)
const CACHE = "finangus-v1.6";
const BASE = ["./", "./index.html", "./manifest.json", "./iconos/icono-192.png", "./iconos/icono-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copia = r.clone();
    caches.open(CACHE).then(c => c.put(e.request, copia));
    return r;
  }).catch(() => caches.match(e.request)));
});
