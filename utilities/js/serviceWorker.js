class theServiceWorker {    
    constructor() {
        let reg = {};
        var sub = {};
        var isSubscribed = false;
        var subscribeButton = document.querySelector('#subscribe');
        var serviceWorkerFile = "/fbn-kss/sw.js";  
        
        this.reg = reg;
        this.sub = sub;
        this.isSubscribed = isSubscribed;
        this.subscribeButton = subscribeButton;
        this.serviceWorkerFile = serviceWorkerFile;

    }

    kickStartServiceWorker() {
        let registrationObject = this.performAllRegistrations();        
        this.addClickListener(registrationObject,this.subscribeButton,this.isSubscribed);
    }

    performAllRegistrations() {
        this.checkForServiceWorker();
        this.checkForPushManager();            
        navigator.serviceWorker.register(this.serviceWorkerFile).then( (serviceWorkerRegistration) => {
            console.log(':^)', serviceWorkerRegistration);
            this.addClickListener(registrationObject,this.subscribeButton,this.isSubscribed);
        }).catch( (err) => {
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

    addClickListener(registration,subscribeButton,isSubscribed) {
        subscribeButton.disabled = false; 
        subscribeButton.addEventListener('click', () => {
            if (isSubscribed) {
                this.unsubscribe(this.sub,subscribeButton,isSubscribed);
            } else {
                this.sub = this.subscribe(registration,subscribeButton,isSubscribed);
            }
        });
    }

    // TODO Implement subscribe function
    subscribe(registration,subscribeButton,isSubscribed) {
        registration.pushManager.subscribe({
            userVisibleOnly: true
        }).then((pushSubscription) => {
            this.sub = pushSubscription;
            console.log('Subscribed! endpoint:', pushSubscription.endpoint);
            subscribeButton.textContent = 'Unsubscribe';
            isSubscribed = true;
        })
    }

    // TODO Implement unsubscribe function
    unsubscribe(subscriptionObject,subscribeButton,isSubscribed) {
        subscriptionObject.unsubscribe().then( (event) => {
            this.subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', event);
            this.isSubscribed = false;
        }).catch( (error) => {
            console.log('Error unubscribing', error);
            this.subscribeButton.textContent = 'Subscribe';
        })
    }
}