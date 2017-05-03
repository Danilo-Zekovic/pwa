import React from 'react'
import webPush from 'web-push'

console.log("<<<< HEY THIS ACTUALLY WORKS >>>>")
// VAPID key
const applicationServerPublicKey = 'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM'

let pushButton = null;

let isSubscribed = false;
let swRegistration = null

// Check for service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log("<<<< Service Worker exists >>>>")
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    swRegistration = swReg;
  }).catch(function(err) {
    // registration failed s
    console.log('ServiceWorker registration failed: ', err);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

//===================================================
function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

function subscribeUserToPush() {
  return getSWRegistration()
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM'
      )
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}
//===================================================
//===================================================

function sendSubscriptionToBackEnd(subscription) {
  return fetch('/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }

    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });
}

const Subscribe = () => (
  <div >
    <h2>Subscribe PWA</h2>
    <button>Click me</button>
  </div>
)

export default Subscribe
