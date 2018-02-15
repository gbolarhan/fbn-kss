var cacheName = 'fbn-cache-v1';
var filesToCache = [
	'/fbn-kss',
	'/fbn-kss/index.html',
	'/fbn-kss/css/app.css',
	'/fbn-kss/css/bootstrap.min.css',
	'/fbn-kss/css/font-awesome.min.css',
	'/fbn-kss/css/material.indigo-pink.min.css',
	'/fbn-kss/img/fbn-h.png',
	'/fbn-kss/img/fbn-v.png',
	'/fbn-kss/utilities/js/app.js',
	'/fbn-kss/toast/build/toastr.min.js',
	'/fbn-kss/utilities/js/jquery-3.2.1.js',
	'/fbn-kss/utilities/js/bootstrap.min.js',
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
	console.log(event.request.url);
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