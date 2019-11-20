// sw.js
const cacheName = 'v512';
self.addEventListener('install', function (e) {
    console.log('install: update server-worker 2')
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/index.html',
                '/'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // 检测是否已经缓存过
            if (response) {
                console.log('fetch-caches: matched');
                return response;
            }

            var fetchRequest = event.request.clone();
            console.log('fetch-caches: not matched');
            return fetch(fetchRequest).then(
                function (response) {
                    // 检测请求是否有效
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open('v1')
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});