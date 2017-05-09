import React from 'react'

// input for the notification that will be sent
function InputBox () {
  return(
    <div className="form-group">
      <label for="comment">Notification:</label>
      <textarea className="form-control" rows="5" id="comment"></textarea>
    </div>
  )
}

function ajaxCall () {
  console.log("<<<< ABOUT TO MAKE AJAX CALL >>>>");
  let xhttp;
  if (window.XMLHttpRequest){
    // modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5, old stuff
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // specify type of request (method, url, async)
  //xhttp.open("GET", "https://pwa.danilozekovic.com/sknnzix/WORKS", true);
  xhttp.open("GET", "http://localhost:3000/sknnzix/WORKS", true);
  // send request to server
  xhttp.send()
}

class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      notification:"Hello World"
    };
  }

  // use ajax to send message to server
  pushNotification(){
    console.log(this.state.notification);
    ajaxCall()
  }

  render(){
    return(
      <div>
        <h1>Send Push Notifications</h1>
        <InputBox/>
        <button className="btn btn-primary" onClick={this.pushNotification.bind(this)}>Send</button>
      </div>
    )
  }
}

export default Notifications
