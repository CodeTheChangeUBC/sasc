import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated || this.props.authenticatedCounsellor) {
        return [
          (<li className="nav-item" key={1}>
              <Link className="nav-link" to="/account">Account</Link>
          </li>),
          (<li className="nav-item" key={2}>
              <Link className="nav-link" to="/logout">Logout</Link>
          </li>)
        ];
    } else {
        return [
            (<li className="nav-item" key={1}>
                <Link className="nav-link" to="/login">Login</Link>
            </li>),
            (<li className="nav-item" key={2}>
                <Link className="nav-link" to="/register">Register</Link>
            </li>)
        ];
    }
  }

  renderLinksCounsellor() {
    if (this.props.authenticatedCounsellor) {
        return [
            (<li className="nav-item" key={1}>
                <Link to="/chat">Chat</Link>
            </li>),
            (<li className="nav-item" key={2}>
                <Link to="/sms">SMS Settings</Link>
            </li>),
            (<li className="nav-item" key={3}>
                <Link className="nav-link" to="/signupcounsellor">Register a Counsellor</Link>
            </li>)
        ];
    }
  }

  renderLinkChatConnected() {
    if (this.props.chatConnected && !this.props.authenticatedCounsellor) {
      return [
        (<li className="nav-item" key={1}><Link to="/chat">Chat</Link></li>),
        (<li className="nav-item" key={2}><Link className="nav-link" to="/register">Register</Link></li>)
      ];
    }
  }

  render() {
    return (
      <div className="Header">
        <h1 className="header-title">SASC</h1>
        <nav className="Navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            {this.renderLinksCounsellor()}
            {this.renderLinks()}
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
    chatConnected: PropTypes.bool,
    authenticated: PropTypes.bool,
    authenticatedCounsellor: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        chatConnected: state.rooms.room,
        authenticated: state.auth.authenticated,
        authenticatedCounsellor: state.auth.authenticatedCounsellor
    };
}

export default connect(mapStateToProps)(Header);