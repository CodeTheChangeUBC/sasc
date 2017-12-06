import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sms from "./../../Components/Sms";
import Display from "./Display";
import "./styles.css";

class SMSSettings extends Component {
  /*
  constructor() {
    super();

    this.updateSMSSettings.bind(this);
    this.getSMSSettings.bind(this);
  }

  componentDidMount() {
    var settingsObj = this.props.fetchSMSSettings();
    //this.setState(JSON.parse(settingsObj));
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
  */
  render() {
    return (
      <div className="SMSSettings">
        <div className="container">
          <div className="row">                         
            <Sms />           
            {/* <Display /> */}
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

/*function mapStateToProps(state) {
  return { 
    smssettings: state.smssettings
  };
}

export default connect(mapStateToProps, { fetchSMSSettings })(SMSSettings);*/

export default SMSSettings;