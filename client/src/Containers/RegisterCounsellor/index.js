import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from './../../Components/Auth/SignupCounsellor';
import * as authActions from '../../Redux/Actions/authActions';
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
    this.props.removeError();
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

      this.props.signupCounsellor(this.state, history);
    } else {
      this.setState({error: "Passwords must match."});
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
      <div className="RegisterCounsellor">
        <h2>Register Counsellor</h2>
        <Form
          firstName
          lastName
          email
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
  const { firstName, lastName, email, password } = state;
    state.form = {
      firstName,
      lastName,
      email,
      password
    };
    return {
      form: state.form,
      errorMessage: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupCounsellor: authActions.signupCounsellor, removeError: authActions.removeError }, dispatch);
}

RegisterCounsellor.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    signupCounsellor: PropTypes.func,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCounsellor);