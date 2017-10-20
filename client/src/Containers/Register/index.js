import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import Form from './../../Components/Form/';
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

  /**
   * once form is submitted, add the user to the database and switch to chat view
   *
   * TODO: if successful registration of user, update view layer
   * TODO: if unsuccessful, show flash message
   */
  handleOnSubmit(ev) {
    ev.preventDefault();

    axios.post('/api/register', this.state)
      .then((resp) => {
        console.log('registering...');
      })
      .catch(console.error);

    this.props.dispatch(signIn(this.state));
  }

  render() {
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
  },
});

export default connect(mapDispatchToProps)(Register);