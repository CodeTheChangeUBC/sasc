import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import Form from './../../Components/Auth/SignupUser';
import PropTypes from 'prop-types';
import './styles.css';
import { signIn } from './../../Redux//Actions/signInActions';
import * as actions from '../../Redux/Actions/authActions';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: null,
      age: null,
      gender: null,
      phoneNumber: null,
      email: null,
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

    const { history } = this.props;

    this.props.signupUser(this.state, history);
  }

  // TODO: Form validation
  render() {
    return (
      <div className="Register">
        <h2>Register</h2>
        <Form
      username
          age
          gender
          email
          phoneNumber
          password
          passwordConfirm
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state;
}

Register.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    signupUser: PropTypes.func
};

export default connect(mapStateToProps, actions)(Register);