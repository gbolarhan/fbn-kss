(function(){
	if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/fbn-kss/sw.js').then(function(reg) {
			console.log("[Service Worker] Registered");
		}).catch(function(err) {
			console.log('[Service Worker] Not Registered');
		})
	}
})();