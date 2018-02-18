var cacheName = 'fbn-cache-v2';
var filesToCache = [
	'/fbn-kss/',
	'/fbn-kss/index.html',
	'/fbn-kss/css/app.css',
	'/fbn-kss/css/bootstrap.min.css',
	'/fbn-kss/css/font-awesome.min.css',
	'/fbn-kss/css/material.indigo-pink.min.css',
	'/fbn-kss/img/fbn-h.png',
	'/fbn-kss/img/fbn-v.png',
	'/fbn-kss/img/giphy.gif',
	'/fbn-kss/utilities/js/idb.js',
	'/fbn-kss/utilities/js/serviceWorker.js',
	'/fbn-kss/utilities/js/app.js',
	'/fbn-kss/toast/build/toastr.min.js',
	'/fbn-kss/utilities/js/jquery-3.2.1.min.js',
	'/fbn-kss/utilities/js/bootstrap.min.js',
	'/fbn-kss/fonts/fontawesome-webfont.woff2',
	'/fbn-kss/fonts/fontawesome-webfont.eot',
	'/fbn-kss/fonts/fontawesome-webfont.svg',
	'/fbn-kss/fonts/fontawesome-webfont.woff',
	'/fbn-kss/fonts/fontawesome-webfont.ttf',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.googleapis.com/css?family=Lobster'
];

self.addEventListener('install', function(reg) {
	reg.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log("[Service Worker] Caching App Shell");
			return cache.addAll(filesToCache);
		})
	)
})

self.addEventListener('fetch', function(event){
	console.log("Fetching :"+event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	)
})

self.addEventListener('activate',function(event){
	caches.keys().then(function(keylist){
		return Promise.all(keylist.filter(function(cache) {
			return cache.startsWith('fbn-') && cache != cacheName;
		}).map(function(key){
			if(key != cacheName) {
				return caches.delete(key);
			}
		}))
	})
})

self.addEventListener('push', function (event) {
	console.log('Push message received', event);
	var title = 'Push Message';
	// Show notification
	event.waitUntil(
		self.registration.showNotification(title, {
			body: 'The Message',
			icon: 'img/nn.min.png',
			tag: 'my-tag'
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	console.log('Notification click: tag', event.notification.tag);
	event.notification.close();
	var url = 'https://attending.io/events/buildpwa-v2';
	event.waitUntil(
		clients.matchAll({
			type: 'window'
		}).then(function (windowClients) {
			windowClients.forEach(function (client) {
				if (client.url == url && 'focus' in client) {
					return client.focus();
				}
			});
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});