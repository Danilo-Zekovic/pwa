import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import Subscribe from './views/Subscribe'
import Notifications from './views/Notifications'
import News from './views/News'

// client side routes 
const Main = () => (
  <main style={{marginTop:69 + 'px'}} className='container'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/notifications' component={Notifications}/>
      <Route path='/subscribe' component={Subscribe}/>
      <Route path='/news' component={News}/>
    </Switch>
  </main>
)

export default Main
