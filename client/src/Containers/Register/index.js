/*

Registers using payload:

ID int NOT NULL AUTO_INCREMENT,
    age int,
    gender VARCHAR(24),
    phoneNumber VARCHAR(15) NOT NULL ,
    password VARCHAR(30) NOT NULL,

for gender we have the following options (radio buttons): male, female, non-binary, transgender male, transgender female, other: _______

*/

import React, { Component } from 'react';

import {bindActionCreators} from 'redux';

import { connect } from 'react-redux';

import * as registerActions from '../../Redux/Actions/loginActions';

import './styles.css';

class Register extends Component {
  constructor() {
    super();

    this.registerMe = this.registerMe.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  registerMe(event) {
    event.preventDefault();

    const user = {
      age: this.age.value,
      gender: this.gender.value,
      phoneNumber: this.phoneNumber.value,
      password: this.password.value
    }

    console.log(user);
    // connect to database and if registration is successful, reroute to the chatbox as user
    console.log("registerMe called: now executing registration, auto-login and rerouting... (TODO)");

    // TODO: complete method registerMe

    //this.state.user = user;
    this.registerForm.reset();
  }

  handleChange(event) {
    // TODO: complete handleChange method
    // if user select 'other' for gender, then provide dropdown to enter designation and store it as value "other-[DESIGNATION]"

  }

  render() {
    // TODO: style this form so it looks better

    return (
      <div className="register-background">
        <div className="register-shell">
          <h2>Register</h2>
          <form ref={input => this.registerForm = input} onSubmit={(e) => this.registerMe(e)}>
            <input type="number" ref={(input) => this.age = input} placeholder="Age" />
            <select type="select" name="gender" ref={(input) => this.gender = input} onChange={(e) => this.handleChange(e)}>
              <option value="">Gender</option> 
              <option value="male">Male</option>            
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="transgender-male">Transgender Male</option>
              <option value="transgender-female">Transgnder Female</option>
              <option value="other">Other</option>
            </select>
            <input type="tel" pattern="[0-9]{10}" ref={(input) => this.phoneNumber = input} placeholder="Phone Number" />
            <input type="text" ref={(input) => this.password = input} placeholder="Password" />
            <button type="submit">Register</button>
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
  return bindActionCreators(registerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
