import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";

class SMS extends Component {
  render() {
    return (
      <div className="SMS">
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
              <ul className="list-group">
                {
                  <li className="list-group-item">
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loggedIn
  };
}

export default SMS;
