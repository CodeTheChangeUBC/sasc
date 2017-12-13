import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import Form from './../../Components/Form/';
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
    /*axios.post(`${actions.ROOT_URL}/signup`, this.state)
      .then((resp) => {
        console.log('registering...');

        // TODO: if successful registration of user, update view layer
        // TODO: if unsuccessful, show flash message

      })
      .catch(console.error);

    this.props.dispatch(signIn(this.state));*/
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

/*const mapDispatchToProps = dispatch => ({
  signUpUser: (data) => {
    dispatch(signIn(data));
  }
});*/

function mapStateToProps(state) {
    return state;
}

Register.propTypes = {
    dispatch: PropTypes.func
};

export default connect(mapStateToProps, actions)(Register);