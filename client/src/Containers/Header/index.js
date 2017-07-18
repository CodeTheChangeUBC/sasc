import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Sasc</h1>
        <nav className="Navigation">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/chat'>Chat</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/sms'>SMS Settings</Link></li>
          </ul>
        </nav>        
      </div>
    );
  }
}

export default Header;