import React from 'react'

let pushButton = null;

let isSubscribed = false;
let swRegistration = null;

// Check for service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log("<<<< Service Worker exists >>>>")
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    swRegistration = registration;
  }).catch(function(err) {
    // registration failed s
    console.log('ServiceWorker registration failed: ', err);
  });
}else{
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

const Subscribe = () => (
  <div >
    <h2>Subscribe PWA</h2>
    <button disabled class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
      Enable Push Messaging
    </button>
  </div>
)

export default Subscribe
