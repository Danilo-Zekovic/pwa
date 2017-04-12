import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Marina from './elements/Marina'

const Home = () => (
  <h2>Home</h2>
)

const Schedule = () => (
  <h2>Schedule</h2>
)

const Main = () => (
  <main style={{marginTop:69 + 'px'}}>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Marina}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

export default Main
