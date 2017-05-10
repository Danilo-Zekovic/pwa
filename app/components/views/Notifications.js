import React from 'react'

// TODO comment and uncomment depending where do you runn it
// change baseUrl to your domain
//const baseUrl = "http://localhost:3000/sknnzix/"
const baseUrl = "https://pwa.danilozekovic.com/sknnzix/"

// retruns the url where to make the ajax call to
function buildUrl(message, tag, callback){
  console.log(message, "<<<< MESSAGE >>>>");
  let url = ''
  let messageEncoded = encodeURI(message)

  if(tag && tag != "all"){
    url = baseUrl + tag + '/' + messageEncoded
  }else{
    url = baseUrl + messageEncoded
  }

  console.log(url, "<<<< URL >>>>");
  callback(url)
}

// sends the message to server, where it gets pushed to subscribers as push notification
function ajaxCall (message, tag) {
  console.log(message, "<<<< ABOUT TO MAKE AJAX CALL >>>>");
  let xhttp;
  if (window.XMLHttpRequest){
    // modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5, old stuff
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // callback to get the correct url where ajax call will be made
  buildUrl(message, tag, function(res){
    console.log(res);
    // specify type of request (method, url, async)
    xhttp.open("GET", res, true);
    // send request to server
    xhttp.send()
  })


}

class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      notification:"",
      tag:"",
      sent:""
    };
    this.pushNotification = this.pushNotification.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.setTag = this.setTag.bind(this);
  }

  // use ajax to send message to server
  pushNotification(){
    console.log(this.state.notification);
    ajaxCall(this.state.notification, this.state.tag)
    this.setState({
      sent:"Message sent!"
    })
    // clear this.state.sent after 4s
    setTimeout(function(){
      console.log("<<<< TIMEOUT >>>>");
      this.setState({sent:''})
    }.bind(this), 4000)
  }

  // set state.notification to match entered value
  setNotification(event){
    this.setState({
      notification: event.target.value
    });
  }

  // handle checkbox changes
  setTag(event){
    this.setState({
      tag:event.target.value
    })
  }

  render(){
    return(
      <div>
        <h1>Send Push Notifications</h1>

        <div>
          <label><input className="radio-inline" type="radio" name="tagName" value="all" onChange={this.setTag}/>All  </label>
          <label><input className="radio-inline" type="radio" name="tagName" value="soccer" onChange={this.setTag}/>Soccer  </label>
          <label><input className="radio-inline" type="radio" name="tagName" value="basketball" onChange={this.setTag}/>Basketball  </label>
          <label><input className="radio-inline" type="radio" name="tagName" value="football" onChange={this.setTag}/>Football  </label>
          <label><input className="radio-inline" type="radio" name="tagName" value="hockey" onChange={this.setTag}/>Hockey  </label>
          <label><input className="radio-inline" type="radio" name="tagName" value="baseball" onChange={this.setTag}/>Baseball  </label>
        </div>

        <div className="form-group">
          <label for="comment">Notification:</label>
          <textarea className="form-control" rows="5" id="comment"
            value={this.state.notification}
            onChange={this.setNotification}>
          </textarea>
        </div>

        <p>{this.state.sent}</p>

        <button className="btn btn-primary" onClick={this.pushNotification}>Send</button>

      </div>
    )
  }
}

export default Notifications
