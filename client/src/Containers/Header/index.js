import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
        return <li className="nav-item">
            <Link className="nav-link" to="/signout">Logout</Link>
        </li>
    } else {
        return [
            <li className="nav-item" key={1}>
                <Link className="nav-link" to="/login">Login</Link>
            </li>,
            <li className="nav-item" key={2}>
                <Link className="nav-link" to="/register">Register</Link>
            </li>,
            <li className="nav-item" key={3}>
                <Link className="nav-link" to="/signincounsellor">Login Counsellor</Link>
            </li>,
            <li className="nav-item" key={4}>
                <Link className="nav-link" to="/signupcounsellor">Register Counsellor</Link>
            </li>
        ];
        
    }
  }

  render() {
    return (
      <div className="Header">
        <h1>Sasc</h1>
        <nav className="Navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            {this.renderLinks()}
            <li><Link to="/sms">SMS Settings</Link></li>
          </ul>
        </nav>        
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);