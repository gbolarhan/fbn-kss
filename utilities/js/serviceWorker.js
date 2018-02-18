class theServiceWorker {    
    constructor() {
        this.reg = {};
        this.sub;
        this.isSubscribed = false;
        this.subscribeButton = document.querySelector('#subscribe');
        this.serviceWorkerFile = "/fbn-kss/sw.js";        
    }

    kickStartServiceWorker() {
        this.performAllRegistrations();
        this.addClickListener();
    }

    performAllRegistrations() {
        this.checkForServiceWorker();
        this.checkForPushManager();            
        navigator.serviceWorker.register(this.serviceWorkerFile).then(function (serviceWorkerRegistration) {
            console.log(':^)', serviceWorkerRegistration);
            this.reg = serviceWorkerRegistration;
            this.subscribeButton.disabled = false;
        }).catch(function (err) {
            console.error(':^(', err);
        });
    }

    checkForServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.log("Service Worker not supported");
            return;
        }
        console.log('Service Worker is supported');
    }

    checkForPushManager() {
        if(!('PushManager' in window)) {
            console.log("Push Manager not available");
            document.getElementById('pushSection').style.display = "none";
            return;
        };
        console.log("Push Manager available");
    }

    addClickListener() {
        this.subscribeButton.addEventListener('click', function () {
            if (this.isSubscribed) {
                this.unsubscribe();
            } else {
                this.subscribe();
            }
        });
    }

    // TODO Implement subscribe function
    subscribe() {
        this.reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function (pushSubscription) {
            this.sub = pushSubscription;
            console.log('Subscribed! endpoint:', sub.endpoint);
            this.subscribeButton.textContent = 'Unsubscribe';
            this.isSubscribed = true;
        })
    }

    // TODO Implement unsubscribe function
    unsubscribe() {
        this.sub.unsubscribe().then(function (event) {
            this.subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', event);
            this.isSubscribed = false;
        }).catch(function (error) {
            console.log('Error unubscribing', error);
            this.subscribeButton.textContent = 'Subscribe';
        })
    }
}