import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

class Header extends Component {
  renderLinks() {
    if (this.props.auth !== "") {
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
    if (this.props.auth === "counsellor") {
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

  renderLinkChatUserConnected() {
    if (this.props.connected && this.props.auth === "user") {
      return [
        (<li className="nav-item" key={1}><Link to="/chat">Chat</Link></li>)
      ];
    }
  }

  renderLinkChatAnonymousConnected() {
    if (this.props.connected && this.props.auth === "")
      return [
        (<li className="nav-item" key={1}><Link className="nav-link" to="/register">Register</Link></li>)
      ];
  }

  render() {
    return (
      <div className="Header">
        <h1 className="header-title">SASC</h1>
        <nav className="Navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            {this.renderLinkChatUserConnected()}
            {this.renderLinksCounsellor()}
            {this.renderLinks()}
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
    connected: PropTypes.bool,
    auth: PropTypes.string
};

function mapStateToProps(state) {
    return {
        connected: state.chat.connected,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Header);