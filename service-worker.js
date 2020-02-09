var cacheName = 'v1';
var cacheFiles = [
    '../CourseWork2_VUE/',
    '../CourseWork2_VUE/login.html',
    '../CourseWork2_VUE/node.js',
    '../CourseWork2_VUE/app.js ',
    '../CourseWork2_VUE/service-worker.js',
    '../CourseWork2_VUE/manifest.json',
    '../CourseWork2_VUE/search.html',
    '../CourseWork2_VUE/service-worker.js',
    '../CourseWork2_VUE/sign_up.html',
    '../CourseWork2_VUE/user_success.html',
]


self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed")

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[Service] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(cachesNames.map(function(thisCacheName){
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    );
    // console.log("[ServiceWorker] Fetching", e.request.url);

    // e.respondWith(
    //     caches.match(e.request).then(function(response) {
    //         if ( response) {
    //             console.log("[ServiceWorker] Found in cache", e.request.url);
    //             return response;
    //         }

    //         return fetch(e.request);
    //     })
    // )
});