import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => (
  <header>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to='/'>Brand</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/setup'>Setup</Link></li>
            <li><Link to='/marina'>Mandarina</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
