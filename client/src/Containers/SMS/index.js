import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import ChatWindow from "./Chatbox/ChatWindow";
import Sidebar from "./Sidebar/Sidebar";

import "./styles.css";

class SMSConvos extends Component {
  render() {
    return (
      <div className="SMSConvos">
      <p><Link to="/sms/settings">Settings</Link></p>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <p>Hello</p>      
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SMSConvos;
