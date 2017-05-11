/*
 * server-routes.js - module to provide server-side routing
*/

import webPush from 'web-push'
import vapidKeys from '../KEY_RING.js'

// Set of possible notification classes
const notifyGroups = ["basketball", "soccer", "baseball", "football", "hockey"]


let savedSubscription = null,
  messageType = null,
  customMessage = null,
  subscriptions = []

export default function ( router, server ) {
  const options = {
    root: __dirname + '/../public'
   }

   // Home and view routes
  router.get('/', function(req, res) {
    res.sendFile('index.html', options)
  })

  router.get('/notifications', function(req, res) {
    console.log('Server notifications chosen')
    res.sendFile('index.html', options)
  })

  router.get('/news', function(req, res) {
    console.log('Server news chosen')
    res.sendFile('index.html', options)
  })

  // Send a notification to one or more subscribed clients
  router.get(['/sknnzix', '/sknnzix/:msg', '/sknnzix/:type/:msg'], function(req, res) {
    messageType = req.params.type
    if (typeof messageType != 'undefined' && (!notifyGroups.includes(messageType))) {
      // console.log('Illegal type detected ' + messageType)
      messageType = 'illegal'
      }
    customMessage = req.params.msg
    // Let the debuggers know what's going on under the hood
    console.log('Sending notifications with ' + customMessage + ' and ' + messageType)
    console.log(' to ' + Object.keys(subscriptions).length + ' subscribers')
    // res.sendFile('index.html', options)
    sendNotifications(customMessage);
    res.sendStatus(200);
  });

  // Client must inform server about a subscription
  // And the server must arrange for its persistence
  router.post('/save-subscription/', function (req, res) {
    const isValidSaveRequest = (req, res) => {
      // TODO: check for complete subscription data
      console.log('Taglist? ' + JSON.stringify(req.body.tags))
      if (!req.body || !req.body.endpoint) {
        // Not a valid subscription.
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          error: {
            id: 'no-endpoint',
            message: 'Subscription must have an endpoint.'
          }
        }));
        return false;
      }
      return true;
    };
    return saveSubscriptionToDatabase(req.body, req.ip, req.connection.remotePort)
    .then(function(subscriptionId) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(function(err) {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.'
        }
      }));
    });

    // Non-persistent save routine--refreshes with server restart
    function saveSubscriptionToDatabase(subscription, ipAddr, port) {
      console.log('In save part of routine')
      // console.log('Sub details' + JSON.stringify(subscription))
      let source = ipAddr + ':' + port
      // Cut syntactic cruft from front of address
      source = source.slice(7)
      console.log('Source: ' +  source)
      savedSubscription = subscription
      subscriptions[source] = subscription
      // Debugging time; let's log whole array
      for (let [source, subscription] of Object.entries(subscriptions)) {
          console.log("Entry: " + JSON.stringify(subscriptions[source]) + ' for ' + source)
        }
      return new Promise(function(resolve, reject) {

        // TODO: add persistence
          resolve(true)
        })
      }
    }) // End save-subscription route

  // Service routines for push notifications
  function sendNotifications(customMessage) {
    // Track index in case we have to delete
    let counter = 0;
    // Iterate through current list of subscriptions
    for (let [source, subscription] of Object.entries(subscriptions)) {
      // console.log("Entry: " + JSON.stringify(subscriptions[source]) + ' for ' + source)
      let payload = 'This is your generic server notification!!';
      if (typeof customMessage !== 'undefined') {
        payload = customMessage
      }
      // console.log('At sending, we have tags of: ' + JSON.stringify(subscription.tags))
      // Code to send notify; remove item if subscription has lapsed
      if (subscription.tags.includes(messageType) || messageType == null) {
      const pushOptions = {
        vapidDetails: {
          subject: 'mailto:' + vapidKeys.EMAIL,
          publicKey: vapidKeys.PUBLIC_KEY,
          privateKey: vapidKeys.PRIVATE_KEY
        },
      }

      webPush.sendNotification(
        subscription,
        payload,
        pushOptions
      )
      // Remove item from array if message server rejects
      .catch((err) => {
        if (err.statusCode === 410) {
          console.log('Removing bad subscription from array')
          delete subscriptions[source]
        } else {
          console.log('Subscription is no longer valid: ', err);
        }
      })
    }
      // Index variable for subscriptions array
      counter++
    }
  }
}
