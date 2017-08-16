import React, { Component } from 'react';

import {bindActionCreators} from 'redux';

import { connect } from 'react-redux';


// import login actions
import * as loginActions from '../../Redux/Actions/loginActions';

// import styles
import './styles.css';


class Login extends Component {
  constructor() {
    super();

    this.logMeIn = this.logMeIn.bind(this);
  }

  logMeIn(event) {
    event.preventDefault();

    const user = {
      phoneNumber: this.phoneNumber.value,
      password: this.password.value
    }

    // connect to database and if login is successful, reroute to the chatbox as user
    console.log("logMeIn called: now executing login and rerouting... (TODO)")

    // TODO: complete method logMeIn

    this.state.user = user;
    this.loginForm.reset();

  }

  render() {
    // TODO: style this form so it looks better
    
    return (
      <div className="login-background">
        <div className="login-shell">
          <h2>Login</h2>
          <form ref={input => this.loginForm = input} onSubmit={(e) => this.logMeIn(e)}>
            <input type="tel" pattern="[0-9]{10}" ref={(input) => this.phoneNumber = input} placeholder="Phone Number" />
            <input type="text" ref={(input) => this.password = input} placeholder="Password" />
            <button type="submit" >Login</button>
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);