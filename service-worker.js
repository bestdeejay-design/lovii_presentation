const CACHE_NAME = 'lovii-v3';
const ASSETS = [
  '/lovii_presentation/',
  '/lovii_presentation/index.html',
  '/lovii_presentation/strategy/',
  '/lovii_presentation/presentation/',
  '/lovii_presentation/css/theme.css',
  '/lovii_presentation/css/core.css',
  '/lovii_presentation/css/components.css',
  '/lovii_presentation/css/main.css',
  '/lovii_presentation/img/logos/lovii-logo.svg',
  '/lovii_presentation/img/logos/lovii-logo_dark.svg',
  '/lovii_presentation/manifest.json',
  '/lovii_presentation/docs/privacy/',
  '/lovii_presentation/docs/terms/',
  '/lovii_presentation/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        ASSETS.map(url =>
          fetch(url)
            .then(res => {
              if (res.ok) return cache.put(url, res);
            })
            .catch(() => {}) // ignore failed requests
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
      )
      .catch(() => caches.match('/lovii_presentation/'))
  );
});
