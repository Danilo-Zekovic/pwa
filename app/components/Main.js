import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

const Home = () => (
  <h2>Home</h2>
)

const Roster = () => (
  <div>
    <h2>This is the Marina page!</h2>
    <Switch>
      <Route exact path='/roster' component={FullRoster}/>
      <Route path='/roster/:number' component={Player}/>
    </Switch>
  </div>
)

const Schedule = () => (
  <h2>Schedule</h2>
)

const FullRoster = () => (
  <Link to={'/roster/Mava Mavina'}>Mandarina</Link>
)
const Player = ( props ) => (
  <h2>{props.match.params.number}</h2>
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
