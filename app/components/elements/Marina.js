import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

const Marina = () => (
  <div>
    <h2>This is the Marina page!</h2>
    <Zeka/>
  </div>
)
const Zeka = () => (
  <Switch>
    <Route exact path='/marina' component={Mandarina}/>
    <Route path='/marina/:name' component={Player}/>
  </Switch>
)

const Mandarina = () => (
  <Link to={'/marina/Mava Mavina'}>Mandarina</Link>
)
const Player = ( props ) => (
  <h2>{props.match.params.name}</h2>
)

export default Marina
