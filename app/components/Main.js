import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Marina from './elements/Marina'
import Home from './elements/Home'
import Setup from './elements/Setup'
import Subscribe from './elements/Subscribe'

// Check for service worker
if ('serviceWorker' in navigator) {
  console.log("<<<< Service Worker exists >>>>")
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    console.log('Hey this is awesome app!');
  }).catch(function(err) {
    // registration failed s
    console.log('ServiceWorker registration failed: ', err);
  });
}

const Main = () => (
  <main style={{marginTop:69 + 'px'}} className='container'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/setup' component={Setup}/>
      <Route path='/subscribe' component={Subscribe}/>
      <Route path='/marina' component={Marina}/>
    </Switch>
  </main>
)

export default Main
