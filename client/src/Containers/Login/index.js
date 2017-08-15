import React, { Component } from 'react';
import Form from './../../Components/Form/';
import './styles.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      input : '',
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnChange(ev) {
   this.setState({ input: ev.target.value}); 
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    this.setState({ input: '' });
  }

  render() {
    console.log(this.state.input)
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form
          age
          gender
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default Login;