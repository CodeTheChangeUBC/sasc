import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from './../../Components/Form';
import * as authActions from '../../Redux/Actions/authActions';
import * as userActions from '../../Redux/Actions/userActions';
import PropTypes from 'prop-types';
import './styles.css';

class RegisterCounsellor extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    this.props.removeAuthError();
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

      this.props.signupCounsellor(this.state, history, this.props.addUser);
    } else {
      this.setState({error: "Passwords must match."});
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

  // TODO: Form validation
  render() {
    return (
      <div className="RegisterCounsellor">
        <h2>Register Counsellor</h2>
        <Form
          firstName
          lastName
          email
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
      errorMessage: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupCounsellor: authActions.signupCounsellor,
    addUser: userActions.addUser,
    removeAuthError: authActions.removeAuthError
  }, dispatch);
}

RegisterCounsellor.propTypes = {
  addUser: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  signupCounsellor: PropTypes.func,
  errorMessage: PropTypes.string,
  removeAuthError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCounsellor);