import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = () => (
  <h2>Home</h2>
)

const Roster = () => (
  <h2>Roster</h2>
)

const Schedule = () => (
  <h2>Schedule</h2>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

export default Main
