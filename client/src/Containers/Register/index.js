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
import { bindActionCreators } from 'redux';

import Form from './../../Components/Form';
import * as authActions from '../../Redux/Actions/authActions';
import * as userActions from '../../Redux/Actions/userActions';
import PropTypes from 'prop-types';
import './styles.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      nickname: null,
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
    this.props.removeAuthError();
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
    
    const { password, passwordConfirm } = this.state;

    const pwcheck = (password === passwordConfirm) ? true : false;

    if (pwcheck) {
      this.setState({error: null});
      const { history } = this.props;

      var user = this.state;
      if (this.props.user) {
        user.ID = this.props.user.ID;
      } else {
        user.ID = null;
      }

      this.props.signupUser(user, history, this.props.addUser);

    } else {
      this.setState({error: "Passwords must match."});
    }
    
  }

  renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="error">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

  renderPasswordCheckAlert() {
      if (this.state.error) {
          return (
              <div>
                  {this.state.error}
              </div>
          );
      }
  }

  render() {
    // TODO: style this form so it looks better

    return (
      <div className="Register">
        <h2>Register</h2>
        <Form
          username
          nickname
          age
          gender
          email
          phoneNumber
          password
          passwordConfirm
          button="Register"
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
    return {
      user: state.user,
      errorMessage: state.auth.error
    };
}

Register.propTypes = {
  addUser: PropTypes.func,
  user: PropTypes.object,
  "user.ID": PropTypes.number,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  signupUser: PropTypes.func,
  errorMessage: PropTypes.string,
  removeAuthError: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupUser: authActions.signupUser,
    addUser: userActions.addUser,
    removeAuthError: authActions.removeAuthError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);