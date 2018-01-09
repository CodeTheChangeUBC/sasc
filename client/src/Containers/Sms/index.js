import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Form from './../../Components/Form';
import * as smsActions from '../../Redux/Actions/smsActions';
import PropTypes from 'prop-types';
import './styles.css';

class Sms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      twilioPhoneNumber: "",
      accountSid: "",
      authToken: ""
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    this.props.removeError();
    this.props.getSMSDetails();
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

    this.props.setSMSDetails(this.state);
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

  render() {
    return (
      <div className="Sms">
        <h2>SMS Settings</h2>
        <div className="sms-box">
          <h4>Current Settings</h4>
          <div>
            <p>Email: {this.props.sms.email}</p>
          </div>
          <div>
            <p>Twilio Phone Number: {this.props.sms.twilioPhoneNumber}</p>
          </div>
          <div>
            <p>Twilio Account SID: {this.props.sms.accountSid}</p>
          </div>
          <div>
            <p>Twilio Auth Token: {this.props.sms.authToken}</p>
          </div>
        </div>
        <div className="sms-form">
          <h4>Change Twilio Account Info</h4>
          <Form
            twilioEmail
            twilioPhoneNumber
            accountSid
            authToken
            button="Update"
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
          />
          {this.renderAlert()}
          <div>
            <button id="sms-delete" onClick={this.props.removeSMSDetails}>Remove Settings</button>
          </div>
        </div>
      </div>
    );
  }
}

Sms.propTypes = {
    getSMSDetails: PropTypes.func,
    setSMSDetails: PropTypes.func,
    removeSMSDetails: PropTypes.func,
    history: PropTypes.object,
    removeError: PropTypes.func,
    sms: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  return {
    sms: state.smssettings.sms,
    errorMessage: state.smssettings.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSMSDetails: smsActions.getSMSDetails,
    setSMSDetails: smsActions.setSMSDetails,
    removeSMSDetails: smsActions.removeSMSDetails,
    removeError: smsActions.removeError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sms);