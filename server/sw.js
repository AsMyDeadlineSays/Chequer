self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        '/',
        '/manifest.webmanifest',
        '/static/app-8948eec0649881cf3cf8.js'
      ]);
    })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return new Promise((res, rej), => {
        fetch(event.request)
          .then(res)
          .catch(rej(response))
      })
    })
  )
});


// self.addEventListener('fetch', function(event) {
//   // Calling event.respondWith means we're in charge
//   // of providing the response. We pass in a promise
//   // that resolves with a response object
//   event.respondWith(
//     // First we look for something in the caches that
//     // matches the request
//     caches.match(event.request).then(function(response) {
//       // If we get something, we return it, otherwise
//       // it's null, and we'll pass the request to
//       // fetch, which will use the network.
//       return response || fetch(event.request);
//     })
//   );
// });