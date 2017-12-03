import React, { Component } from 'react';
import SigninCounsellor from "../../Components/Auth/signincounsellor";
import axios from 'axios';

import Form from './../../Components/Form/';
import './styles.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: null,
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
    console.log(this.state);

    axios.post('/api/login', this.state)
      .then((resp) => {
        console.log('logging in...');

        // TODO: if successful login of user, update view layer
        // TODO: if unsuccessful, show flash message

      })
      .catch(console.error);

  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default Login;