var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/bundle.js'
];

self.addEventListener('install', function(evt){
  console.log('The service worker is being installed')

  evt.waitUntil(cashes.open(CACHE_NAME).then(function (cash){
    cash.addAll(urlsToCache)
  }))
})

self.addEventListener('fetch', function(evt){
  console.log('sw serving');

  evt.respondWith(fromCache(evt.request))

  evt.waitUntil(
    update(evt.request).then(refresh)
  )
})

function fromCache(request){
  return caches.open(CACHE_NAME).then(function (cache){
    return cache.match(request)
  })
}

function update (request){
  return caches.open(CACHE_NAME).then(function(cache){
    return fetch(request).then(function(response){
      return cache.put(request, response.clone()).then(function () {
        return response
      })
    })
  })
}

function refresh(response){
  return self/clients.matchAll().then(function(clients){
    clients.forEach(function (client){
      var message = {
        type:'refresh',
        url:response.url,
        eTagresponse.headers.get('ETag')
      }

      client.postMessage(JSON.stringify(message))
    })
  })
}
