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
  }

  componentWillMount() {
    this.props.removeUserError();
    this.props.removeCounsellorError();
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
    if (this.props.authenticated) {
      if (newPassword === oldPassword) {
        this.props.renderUserError("The new password cannot be the same as the old password.");
      } else if (newPassword === newPasswordConfirm) {
        this.props.removeUserError();

        var ID = this.props.user.ID;
        console.log(ID);

        if (ID) {
          this.props.changeUserPassword({ ID, oldPassword, newPassword, newPasswordConfirm });
        } else {
          this.props.renderUserError("Unable to get user ID.");
        }
      } else {
        this.props.renderUserError("Passwords must match.");
      }
    } else if (this.props.authenticatedCounsellor) {
      if (newPassword === oldPassword) {
        this.props.renderCounsellorError("The new password cannot be the same as the old password.");
      } else if (newPassword === newPasswordConfirm) {
        this.props.removeCounsellorError();

        var ID = this.props.counsellor.ID;

        if (ID) {
          this.props.changeCounsellorPassword({ ID, oldPassword, newPassword, newPasswordConfirm });
        } else {
          this.props.renderCounsellorError("Unable to get user ID.");
        }
      } else {
        this.props.renderCounsellorError("Passwords must match.");
      }
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
      counsellor: state.counsellor.counsellor,
      errorMessage: state.user.error,
      successMessage: state.user.success
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
    removeUserError: userActions.removeUserError,
    removeCounsellorError: counsellorActions.removeCounsellorError,
    renderUserError: userActions.renderUserError,
    renderCounsellorError: counsellorActions.renderCounsellorError
  }, dispatch);
}

PasswordChange.propTypes = {
  changeUserPassword: PropTypes.func,
  changeCounsellorPassword: PropTypes.func,
  user: PropTypes.object,
  "user.ID": PropTypes.string,
  counsellor: PropTypes.object,
  "counsellor.ID": PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  renderUserError: PropTypes.func,
  renderCounsellorError: PropTypes.func,
  removeUserError: PropTypes.func,
  removeCounsellorError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);