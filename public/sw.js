// ServiceWorker file
var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/bundle.js',
  '/css/react-select.css',
  '/scripts/push.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      //return response || fetch(event.request);
      if (response){
        console.log("Returning cashed value for: " + event.request.url);
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Copied from https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/good-notification
self.addEventListener('push', event => {
  let thisMessage = event.data.text()
    console.log("We got this message: " + thisMessage)
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'PWA';
    const options = {
      body: thisMessage,
      // icon: 'images/icon.png',
      // badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  })

  self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://www.oscon-pwa.net')
  )
})
