/* Service worker do Domu (PWA).
 * - Guarda a tela /offline e a mostra quando uma navegação falha sem internet.
 * - Mostra os avisos push que o backend enviar (payload JSON: { titulo, corpo, link }).
 */
const CACHE = 'domu-v1'
const OFFLINE = '/offline'

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll([OFFLINE, '/icon-192.png'])))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return
  e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE)))
})

self.addEventListener('push', (e) => {
  let d = { titulo: 'Domu', corpo: 'Você tem uma novidade.', link: '/app/notificacoes' }
  try { d = { ...d, ...e.data.json() } } catch { /* sem payload */ }
  e.waitUntil(self.registration.showNotification(d.titulo, { body: d.corpo, icon: '/icon-192.png', badge: '/icon-192.png', data: { link: d.link } }))
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(self.clients.openWindow(e.notification.data?.link || '/app'))
})
