import React, { Component } from 'react';

class Display extends Component {
  
  render() {
    return (
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
    );
  }
}

export default Display;