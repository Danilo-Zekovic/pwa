import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
//import Marina from './views/Marina'
import Home from './views/Home'
//import Setup from './views/Setup'
import Subscribe from './views/Subscribe'
import Notifications from './views/Notifications'

const Main = () => (
  <main style={{marginTop:69 + 'px'}} className='container'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/notifications' component={Notifications}/>
      <Route path='/subscribe' component={Subscribe}/>
    </Switch>
  </main>
)

export default Main
