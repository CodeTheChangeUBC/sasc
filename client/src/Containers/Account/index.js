import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from './../../Components/Form';
import * as userActions from '../../Redux/Actions/userActions';
import * as counsellorActions from '../../Redux/Actions/counsellorActions';
import PropTypes from 'prop-types';
import './styles.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      email: null,
      phoneNumber: null,
      password: null,
      passwordConfirm: null,
      error: null,
      success: null
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillMount() {
    this.props.removeUserError();
    this.props.removeCounsellorError();
    if (this.props.authenticated) {
      this.props.getUser(this.props.user.ID);
    } else if (this.props.authenticatedCounsellor) {
      this.props.getCounsellor(this.props.counsellor.ID);
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

  validateForm(fields, renderError, removeError) {
    const { password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      renderError("Passwords must match.");
      return false;
    }

    if (this.props.role === "user") {
      const { nickname, age, gender, email, phoneNumber } = fields;
      if (!nickname || !age || !gender || !email || !phoneNumber || !password || !passwordConfirm) {
        renderError("You must not leave any field blank.");
        return false;
      }
    } else if (this.props.role === "counsellor") {
      const { email, firstName, lastName, password } = fields;
      if (!email || !firstName || !lastName || !password || !passwordConfirm) {
        renderError("You must not leave any field blank.");
        return false;
      }
    }

    // TODO: Add regex check for email here.

    if (this.props.role === "user") {
      fields.ID = this.props.user.ID;
    } else if (this.props.role === "counsellor") {
      fields.ID = this.props.counsellor.ID;
    }

    if (!fields.ID) {
      renderError("Unable to get user ID.");
      return false;
    }

    return fields;
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    var ID;
    var fields;
    var validated = false;

    if (this.props.role === "user") {
      const {
        nickname,
        age,
        gender,
        email,
        phoneNumber,
        password
      } = this.state;

      fields = {
        nickname: nickname.trim(),
        age: age.trim(),
        gender: gender.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password
      };

      validated = this.validateForm(fields, this.props.renderUserError, this.props.removeUserError);
      if (validated) {
        this.props.updateUser(validated);
      }
    } else if (this.props.role === "counsellor") {
      const {
        email,
        firstName,
        lastName,
        password
      } = this.state;

      fields = {
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password
      };
      validated = this.validateForm(fields, this.props.renderCounsellorError, this.props.removeCounsellorError);
      if (validated) {
        this.props.updateCounsellor(validated);
      }
    }
  }

  renderAlert() {
    if (this.props.errorMessageCounsellor) {
        return (
            <div className="error">
                {this.props.errorMessageCounsellor}
            </div>
        );
    } else if (this.props.successMessageCounsellor) {
      return (
            <div className="success">
                {this.props.successMessageCounsellor}
            </div>
        );
    } else if (this.props.errorMessageUser) {
        return (
            <div className="error">
                {this.props.errorMessageUser}
            </div>
        );
    } else if (this.props.successMessageUser) {
      return (
            <div className="success">
                {this.props.successMessageUser}
            </div>
        );
    }
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div className="Account">
          <h2>User Account Information</h2>
          <div className="current-account">
            <h4>Current Account Settings</h4>
            <div>
              <p>Nickname: {this.props.user.nickname}</p>
            </div>
            <div>
              <p>Age: {this.props.user.age}</p>
            </div>
            <div>
              <p>Gender: {this.props.user.gender}</p>
            </div>
            <div>
              <p>Email: {this.props.user.email}</p>
            </div>
            <div>
              <p>Phone Number: {this.props.user.phoneNumber}</p>
            </div>
          </div>
          <div className="account-form">
            <h4>Change User Account Information</h4>
            <Form
            nickname
            age
            gender
            email
            phoneNumber
            password
            passwordConfirm
            button={"Update"}
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            />
            {this.renderAlert()}
          </div>
          <div className="change-your-password-here"><p>Change your password <Link to="/changepassword">here</Link>.</p></div>
        </div>
      );
    } else if (this.props.authenticatedCounsellor) {
      return (
        <div className="Account">
          <h2>Counsellor Account Information</h2>
          <div className="current-account">
            <h4>Current Account Settings</h4>
            <div>
              <p>Email: {this.props.counsellor.email}</p>
            </div>
            <div>
              <p>First Name: {this.props.counsellor.firstName}</p>
            </div>
            <div>
              <p>Last Name: {this.props.counsellor.lastName}</p>
            </div>
          </div>
          <div className="account-form">
            <h4>Change User Account Information</h4>
            <Form
            firstName
            lastName
            email
            password
            passwordConfirm
            button={"Update"}
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            />
            {this.renderAlert()}
          </div>
          <div className="change-your-password-here"><p>Change your password <Link to="/changepassword">here</Link>.</p></div>
        </div>
      );
    } else {
      return (
        <div className="Account">Unauthorized</div>
      );
    }
  }
}

function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      authenticatedCounsellor: state.auth.authenticatedCounsellor,
      user: state.user.user,
      counsellor: state.counsellor.counsellor,
      role: state.auth.role,
      errorMessageUser: state.user.error,
      successMessageUser: state.user.success,
      errorMessageCounsellor: state.counsellor.error,
      successMessageCounsellor: state.counsellor.success
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: userActions.getUser,
    updateUser: userActions.updateUser,
    getCounsellor: counsellorActions.getCounsellor,
    updateCounsellor: counsellorActions.updateCounsellor,
    removeUserError: userActions.removeUserError,
    removeCounsellorError: counsellorActions.removeCounsellorError,
    renderUserError: userActions.renderUserError,
    renderCounsellorError: counsellorActions.renderCounsellorError
  }, dispatch);
}

Account.propTypes = {
  authenticated: PropTypes.bool,
  authenticatedCounsellor: PropTypes.bool,
  user: PropTypes.object,
  "user.ID": PropTypes.string,
  "user.nickname": PropTypes.string,
  "counsellor.firstName": PropTypes.string,
  "counsellor.lastName": PropTypes.string,
  "user.age": PropTypes.number,
  "user.gender": PropTypes.string,
  "user.email": PropTypes.string,
  "user.phoneNumber": PropTypes.number,
  counsellor: PropTypes.object,
  "counsellor.email": PropTypes.string,
  role: PropTypes.string,
  errorMessageUser: PropTypes.string,
  successMessageUser: PropTypes.string,
  errorMessageCounsellor: PropTypes.string,
  successMessageCounsellor: PropTypes.string,
  renderUserError: PropTypes.func,
  renderCounsellorError: PropTypes.func,
  addUser: PropTypes.func,
  getUser: PropTypes.func,
  getCounsellor: PropTypes.func,
  updateUser: PropTypes.func,
  updateCounsellor: PropTypes.func,
  removeUserError: PropTypes.func,
  removeCounsellorError: PropTypes.func,
  renderError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);