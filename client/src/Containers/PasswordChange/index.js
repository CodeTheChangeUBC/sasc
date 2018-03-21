import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from './../../Components/Form';
import * as userActions from '../../Redux/Actions/userActions';
import * as counsellorActions from '../../Redux/Actions/counsellorActions';
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
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillMount() {
    this.props.removeCounsellorError();
    this.props.removeUserError();
  }

  handleOnChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validateForm(renderError) {
    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    if (newPassword === oldPassword) {
        renderError("The new password cannot be the same as the old password.");
        return false;
    } 

    if (newPassword !== newPasswordConfirm) {
      renderError("Passwords must match.");
      return false;
    }

    this.props.removeUserError();
    this.props.removeCounsellorError();
    
    var ID;
    if (this.props.auth === "counsellor") {
      ID = this.props.counsellor.ID;
    } else if (this.props.auth === "user") {
      ID = this.props.user.ID;
    }

    if (!ID) {
      renderError("Unable to get user ID.");
      return false;
    }

    return true;
  }

  handlePasswordChange(ev) {
    ev.preventDefault();
    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    var validated = false;
    if (this.props.auth === "user") {
      validated = this.validateForm(
        this.props.renderUserError
      );
      if (validated) {
        this.props.changeUserPassword({
          ID: this.props.user.ID,
          oldPassword,
          newPassword
        });
      }
    } else if (this.props.auth === "counsellor") {
      validated = this.validateForm(
        this.props.renderCounsellorError
      );
      if (validated) {
        this.props.changeCounsellorPassword({
          ID: this.props.counsellor.ID,
          oldPassword,
          newPassword
        });
      }
    }
  }

  renderAlert() {
    if (this.props.counsellorStatus.error) {
        return (
            <div className="error">
                {this.props.counsellorStatus.error}
            </div>
        );
    } else if (this.props.counsellorStatus.success) {
      return (
            <div className="success">
                {this.props.counsellorStatus.success}
            </div>
        );
    } else if (this.props.userStatus.error) {
        return (
            <div className="error">
                {this.props.userStatus.error}
            </div>
        );
    } else if (this.props.userStatus.success) {
      return (
            <div className="success">
                {this.props.userStatus.success}
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
      auth: state.auth.auth,
      user: state.user.user,
      counsellor: state.counsellor.counsellor,
      counsellorStatus: state.counsellor.status,
      userStatus: state.user.status
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: userActions.getUser,
    updateUser: userActions.updateUser,
    getCounsellor: counsellorActions.getCounsellor,
    updateCounsellor: counsellorActions.updateCounsellor,
    changeUserPassword: userActions.changeUserPassword,
    changeCounsellorPassword: counsellorActions.changeCounsellorPassword,
    removeUserError: userActions.removeError,
    removeCounsellorError: counsellorActions.removeError,
    renderUserError: userActions.renderUserError,
    renderCounsellorError: counsellorActions.renderCounsellorError
  }, dispatch);
}

PasswordChange.propTypes = {
  auth: PropTypes.string,
  changeUserPassword: PropTypes.func,
  changeCounsellorPassword: PropTypes.func,
  user: PropTypes.object,
  "user.ID": PropTypes.string,
  counsellor: PropTypes.object,
  "counsellor.ID": PropTypes.string,
  counsellorStatus: PropTypes.object,
  userStatus: PropTypes.object,
  renderUserError: PropTypes.func,
  renderCounsellorError: PropTypes.func,
  removeUserError: PropTypes.func,
  removeCounsellorError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);