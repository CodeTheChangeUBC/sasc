import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

import { fetchSMSSettings } from "../../Redux/Actions/smsActions";

class SMSSettings extends Component {

  constructor() {
    super();

    this.updateSMSSettings.bind(this);
    this.getSMSSettings.bind(this);
  }

  componentDidMount() {
    var settingsObj = this.props.fetchSMSSettings();
    this.setState(JSON.parse(settingsObj));
  }

  componentDidUpdate() {
    console.log("state", this.state);
  }

  updateSMSSettings() {
    const { email, twilioPhoneNumber, accountSid, authToken } = this.props;
    const smsSettingsObj = {
        email,
        twilioPhoneNumber,
        accountSid,
        authToken
    };
    //this.props.postSMSSettings(smsSettingsObj);
  }

  getSMSSettings() {
    console.log("inside getSMSSettings");
    return {
      "email": "bean@example.com",
      "twilioPhoneNumber": "123456",
      "accountSid": "aaa",
      "authToken": "bbb"
    };
    //this.props.fetchSMSSettings();
  }

  render() {
    return (
      <div className="SMSSettings">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>SMS To Email Settings</h2>
              
              <form>
                <div className="form-group">
                  <label className="control-label">Chat Contact Main Email:</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">  
                  <label className="control-label">Twilio Phone Number:</label>
                  <input type="text" className="form-control" id="twilio-phone" />
                </div>
                <div className="form-group">
                  <label className="control-label">Twilio Account SID:</label>
                  <input type="text" className="form-control" id="twilio-accountsid" />
                </div>
                <div className="form-group">
                  <label className="control-label">Twilio Auth Token:</label>
                  <input type="text" className="form-control" id="twilio-authtoken" />
                </div>
                  <button type="submit" className="btn btn-primary" name="submit">Submit</button>
              </form>
        
            </div>
            <div className="col-md-6">
              <h4>Current Settings</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="list-item">
                    <p>Email: </p>
                    {this.state.email}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    <p>Twilio Phone Number: </p>
                    {this.state.twilioPhoneNumber}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    <p>Twilio Account Sid: </p>
                    {this.state.accountSid}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    <p>Twilio Auth Token: </p>
                    {this.state.authToken}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SMSSettings.propTypes = {
    updateSMSSettings: PropTypes.func,
    getSMSSettings: PropTypes.func,
    email: PropTypes.string,
    twilioPhoneNumber: PropTypes.string,
    accountSid: PropTypes.string,
    authToken: PropTypes.string,
    fetchSMSSettings: PropTypes.func,
    "smssettings.email": PropTypes.string,
    "smssettings.twilioPhoneNumber": PropTypes.string,
    "smssettings.accountSid": PropTypes.string,
    "smssettings.authToken": PropTypes.string,
    "smssettings": PropTypes.object
};

function mapStateToProps(state) {
  return { 
    smssettings: state.smssettings
  };
}

export default connect(mapStateToProps, { fetchSMSSettings })(SMSSettings);