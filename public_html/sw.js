const CACHE_NAME = 'deniros-barbers-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/images/deniros-logo-brand.png',
  '/images/deniros-favicon-icon.png',
  '/images/about-section-haircut-technique.jpg',
  '/images/about-barbershop-atmosphere.jpg',
  '/images/slider/hero-team-and-client.jpg',
  '/images/slider/precision-haircut-technique.jpg',
  '/images/slider/beard-grooming-styling.jpg',
  '/images/slider/kids-haircut-experience.jpg',
  '/images/slider/modern-fade-technique.jpg',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});