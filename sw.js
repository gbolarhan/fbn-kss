var cacheName = 'fbn-cache-v1';
var filesToCache = [
	'/fbnkss',
	'/fbnkss/index.html',
	'/fbnkss/css/app.css',
	'/fbnkss/css/bootstrap.min.css',
	'/fbnkss/css/font-awesome.min.css',
	'/fbnkss/css/material.indigo-pink.min.css',
	'/fbnkss/img/nn.min.png',
	'/fbnkss/utilities/js/app.js',
	'/fbnkss/toast/build/toastr.min.js',
	'/fbnkss/utilities/js/jquery-1.11.2.js',
	'/fbnkss/utilities/js/bootstrap.min.js',
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