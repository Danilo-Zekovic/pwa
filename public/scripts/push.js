// Setup service worker and notiication services
//   Adapted from the code in https://codelabs.developers.google.com/codelabs/push-notifications/#0

// VAPID key
const applicationServerPublicKey = 'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM'

let pushButton = null;

console.log('Setting isSubscribed to false')
var isSubscribed = false;
var permStatus = 'denied'
var swRegistration = null;

// Register service worker and check for push support
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
    swRegistration = swReg

  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

// Called after service worker installation
function initializeUI() {


  Notification.requestPermission(function(status) {
    permStatus = status;
    console.log('Notification permission status:', status);
  });

  // Set the initial subscription value
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      console.log('Service worker got subscription')
      isSubscribed = !(subscription === null);
      console.log('And found it to be ' + isSubscribed)
      })
    })

    // Tell server about sub
    // updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('WTF? ' + JSON.stringify(subscription))
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }
    
}
