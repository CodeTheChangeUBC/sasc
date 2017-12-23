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
import { connect } from 'react-redux';

import axios from 'axios';
import Form from './../../Components/Form/';
import PropTypes from 'prop-types';
import './styles.css';
import { signIn } from './../../Redux//Actions/signInActions';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
    username: null,
      age: null,
      gender: null,
      phoneNumber: null,
      password: null
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }); 
  }

  handleOnSubmit(ev) {
    ev.preventDefault();

    axios.post('/api/register', this.state)
      .then((resp) => {
        console.log('registering...');

        // TODO: if successful registration of user, update view layer
        // TODO: if unsuccessful, show flash message

      })
      .catch(console.error);

    this.props.dispatch(signIn(this.state));
  }

  render() {
    // TODO: style this form so it looks better

    return (
      <div className="Register">
        <h2>Register</h2>
        <Form
      username
          age
          gender
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => {
    dispatch(signIn(data));
  }
});

Register.propTypes = {
    dispatch: PropTypes.func
};

export default connect(mapDispatchToProps)(Register);
