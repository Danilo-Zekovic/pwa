import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

const Marina = () => (
  <div >
    <h2>This is the Marina page!</h2>
    <Switch>
      <Route exact path='/roster' component={Mandarina}/>
      <Route path='/roster/:name' component={Player}/>
    </Switch>
  </div>
)

const Mandarina = () => (
  <Link to={'/roster/Mava Mavina'}>Mandarina</Link>
)
const Player = ( props ) => (
  <h2>{props.match.params.name}</h2>
)

export default Marina
