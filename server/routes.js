import webpush from 'web-push'
import Datastore from 'nedb'
const db = new Datastore();

const vapidKeys = {
  publicKey:'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM',
  privateKey: 'efx_7WzMG84FsdrU-38LzoB9WhE-U2zcWtNQiXzeGPs'
};

webpush.setVapidDetails(
  'mailto:danilo.zekovic@danilozekovic.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default function ( router, server ) {
  const options = {
    root: __dirname + '/../public'
   }

  router.get('/', function(req, res) {
    res.sendFile('index.html', options)
  })

  // These repetitive routes need abstracting
  router.get('/setup', function(req, res) {
    console.log('Server setup chosen')
    res.sendFile('index.html', options)
  })

  router.get('/subscription', function(req, res) {
    console.log('Server subscription chosen')
    res.sendFile('index.html', options)
  })

  router.get('/marina*', function(req, res) {
    console.log('Server marina chosen')
    res.sendFile('index.html', options)
  })

  router.get('/save-subscription/', function (req, res) {
    const isValidSaveRequest = (req, res) => {
      // Check the request body has at least an endpoint.
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
    return saveSubscriptionToDatabase(req.body)
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

    function saveSubscriptionToDatabase(subscription) {
      return new Promise(function(resolve, reject) {
        db.insert(subscription, function(err, newDoc) {
          if (err) {
            reject(err);
            return;
          }

          resolve(newDoc._id);
        });
      });
    };

  }) // end subscribe

  app.post('/trigger-push-msg/', function (req, res) {
    return getSubscriptionsFromDatabase()
    .then(function(subscriptions) {
      let promiseChain = Promise.resolve();

      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        promiseChain = promiseChain.then(() => {
          return triggerPushMsg(subscription, dataToSend);
        });
      }

      return promiseChain;
    })

    const triggerPushMsg = function(subscription, dataToSend) {
      return webpush.sendNotification(subscription, dataToSend)
      .catch((err) => {
        if (err.statusCode === 410) {
          return deleteSubscriptionFromDatabase(subscription._id);
        } else {
          console.log('Subscription is no longer valid: ', err);
        }
      });
    };
    
  }) //end push

}
