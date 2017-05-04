import React from 'react'

const applicationServerPublicKey = 'BAJyqorVg8OWJwiRJnz7A2CDFFstpXsyt8m0P3MQPCIxx1PgREuRqt-4lyVDy26rQF0njxQGkzK4aF_sjoooFGM'

let pushButton = document.querySelector('.js-push-btn');
let pushSuported = false;

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

function initialiseUI(swRegistration) {
  //pushButton.disabled = false;
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
  pushSuported = true;
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration);
    swRegistration = registration;
    //initialiseUI();
  }).catch(function(err) {
    // registration failed s
    console.log('ServiceWorker registration failed: ', err);
  });
}else{
  console.warn('Push messaging is not supported');
  //pushButton.textContent = 'Push Not Supported';
}

// should be loaded into subscribeBtn
// it should change its text when clicked
// right now does not even show up
function subscribeBtn(props) {
  return (
    <button disabled className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      onClick = {props.onClick}
      style="width:40px"
      >
      {props.value}
    </button>
  );
}

//
class Subscribe extends React.Component {

  constructor() {
    super();
    this.state = {
      btnDisabled:true,
      btnText:'Enable Push Messaging',
      registration:swRegistration,
      isSubscribed:isSubscribed
    };
  }

  updateBtn () {
    let text = isSubscribed ? 'Disable Push Messaging':'Enable Push Messaging'
    this.setState({
      btnText:text

    });
  }

  disabledBtn (){
    console.log(this.state.btnDisabled, "<<<< btnDisabled >>>>")
    this.setState({
      btnDisabled:pushSuported ? false:true
      //btnText:pushSuported ? this.:
    })
  }

  setSubscribe(val){
    setState({isSubscribed:val})
  }

  componentDidMount(){
    let btn = {}
    btn['btnDisabled'] = pushSuported ? false:true
    if (!pushSuported){
      btn['btnText'] = 'Push Not Supported'
    }
    this.setState(btn)
    /*this.setState({
      btnDisabled:pushSuported ? false:true
      //btnText:pushSuported ? this.:
    })*/
  }

  render(){
    initialiseUI(this.state.registration)

    return(
      <div>
        <h2>Subscribe PWA</h2>
        <button onClick={this.updateBtn.bind(this)}
          disabled={this.state.btnDisabled ? true:false}
          className="btn btn-primary js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          >{this.state.btnText}</button>


      </div>
    )
  }
}
// <button onClick={this.disabledBtn.bind(this)}>{this.state.btnDisabled ? 'true':'false'}</button>
// <subscribeBtn onClick={i => this.handleClick(i)} value={this.state.btnText}/>
export default Subscribe
