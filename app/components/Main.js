import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Marina from './elements/Marina'
import Home from './elements/Home'
import Setup from './elements/Setup'

const Main = () => (
  <main style={{marginTop:69 + 'px'}} className='container'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/setup' component={Setup}/>
      <Route path='/marina' component={Marina}/>
    </Switch>
  </main>
)

export default Main
