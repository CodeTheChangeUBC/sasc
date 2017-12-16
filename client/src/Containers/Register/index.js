import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from './../../Components/Auth/SignupUser';
import * as authActions from '../../Redux/Actions/authActions';
import PropTypes from 'prop-types';
import './styles.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: null,
      age: null,
      gender: null,
      phoneNumber: null,
      email: null,
      password: null,
      error: null
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    this.props.removeError();
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
    
    const { password, passwordConfirm } = this.state;

    const pwcheck = (password === passwordConfirm) ? true : false;

    if (pwcheck) {
      this.setState({error: null});
      const { history } = this.props;

      this.props.signupUser(this.state, history);
    } else {
      this.setState({error: "Passwords must match."});
    }
    
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

  renderPasswordCheckAlert() {
      if (this.state.error) {
          return (
              <div className="alert alert-danger">
                  {this.state.error}
              </div>
          );
      }
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
        {this.renderAlert()}
        {this.renderPasswordCheckAlert()}
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { username, age, gender, email, phoneNumber, password } = state;
    state.form = {
      username,
      age,
      gender,
      email,
      phoneNumber,
      password
    };
    return {
      form: state.form,
      errorMessage: state.auth.error
    };
}

Register.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    signupUser: PropTypes.func,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser: authActions.signupUser, removeError: authActions.removeError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);