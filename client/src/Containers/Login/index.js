import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Form from './../../Components/Form/';
import * as actions from '../../Redux/Actions/authActions';
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

    const { history } = this.props;

    this.props.signinUser(this.state, history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
        return (
            <div className="alert alert-danger">
                {this.props.errorMessage}
            </div>
        );
    }
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
        {this.renderAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { username, password } = state;
    state.form = {
      username,
      password
    };
    return {
      form: state.form,
      errorMessage: state.auth.error
    };
}

Login = connect(mapStateToProps, actions)(Login);

export default Login;