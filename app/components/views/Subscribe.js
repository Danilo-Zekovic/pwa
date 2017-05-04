import React from 'react'

const applicationServerPublicKey = 'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM'

let pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/*function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}*/

function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    //updateBtn();
  });
}

// Check for service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log("<<<< Service Worker exists >>>>")
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration);
    swRegistration = registration;
    initialiseUI();
  }).catch(function(err) {
    // registration failed s
    console.log('ServiceWorker registration failed: ', err);
  });
}else{
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function subscribeBtn(props) {
  return (
    <button disabled className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      onClick = {props.onClick}
      >
      {props.value}
    </button>
  );
}



/*const Subscribe = () => (
  <div >
    <h2>Subscribe PWA</h2>
    <subscribeBtn/>
  </div>
)*/
class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = {
      btnText:'Enable Push Messaging'
    };
  }

  handleClick(i) {
    this.setState({
      btnText:'Disable Push Messaging'
    });
  }

  render{
    return(
      <div>
        <subscribeBtn onClick={i => this.handleClick(i)}/>
      </div>
    )
  }
}

export default Subscribe
