import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addTwilioEntry, removeTwilioEntry } from '../../Redux/Actions/smsActions';
import './styles.css';

class SMSSettings extends Component {
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
                    Email: test@example.com
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    Twilio Phone Number: +1-888-888-8888
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    Twilio Account Sid:
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="list-item">
                    Twilio Auth Token:
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

//function mapStateToProps(state) {
//  console.log('state', state);
//  return {
//    item: state.item
//  };
//}

export default SMSSettings;
