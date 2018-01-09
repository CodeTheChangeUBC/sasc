import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from './../../Components/Form';
import * as userActions from '../../Redux/Actions/userActions';
import PropTypes from 'prop-types';
import './styles.css';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      oldPassword: null,
      newPassword: null,
      newPasswordConfirm: null,
      error: null,
      success: null
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  handlePasswordChange(ev) {
    ev.preventDefault();
    
    const { oldPassword, newPassword, newPasswordConfirm } = this.state;

    if (newPassword === oldPassword) {
      this.props.renderUserError("The new password cannot be the same as the old password.");
    } else if (newPassword === newPasswordConfirm) {
      this.props.removeError();

      var ID = this.props.user.ID;
      console.log(ID);

      if (ID) {
        this.props.changePassword({ ID, oldPassword, newPassword, newPasswordConfirm });
      } else {
        this.props.renderUserError("Unable to get user ID.");
      }
    } else {
      this.props.renderUserError("Passwords must match.");
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
        return (
            <div className="error">
                {this.props.errorMessage}
            </div>
        );
    } else if (this.props.successMessage) {
      return (
            <div className="success">
                {this.props.successMessage}
            </div>
        );
    }
  }

  render() {
    return (
      <div className="change-password">
        <h2>Change Password</h2>
        <Form
        oldPassword
        newPassword
        newPasswordConfirm
        button={"Change Password"}
        onSubmit={this.handlePasswordChange}
        onChange={this.handleOnChange}
        />
        {this.renderAlert()}
        <div className="back-to-account">
          <p>
            Go back to account <Link to="/account">here</Link>.
           </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.user.user,
      errorMessage: state.user.error,
      successMessage: state.user.success
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: userActions.getUser,
    updateUser: userActions.updateUser,
    changePassword: userActions.changePassword,
    removeError: userActions.removeError,
    renderUserError: userActions.renderUserError
  }, dispatch);
}

PasswordChange.propTypes = {
  changePassword: PropTypes.func,
  user: PropTypes.object,
  "user.ID": PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  renderUserError: PropTypes.func,
  removeError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);