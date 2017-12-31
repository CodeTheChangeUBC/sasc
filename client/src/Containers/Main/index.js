import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './../Home';
import Chat from './../Chat/ChatApp';
import Login from './../Login';
import LoginCounsellor  from './../LoginCounsellor';
import RegisterCounsellor  from './../RegisterCounsellor';
import Logout from './../Logout';
import Register from './../Register';
import SMSSettings from './../Sms';
import requireAuthCounsellor from './../../Components/Auth/requireAuthCounsellor';
import './styles.css';
import CounsellorBar from "../../Components/Counsellor/CounsellorBar";

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/login" component={Login}/>
          <Route path="/signincounsellor" component={LoginCounsellor}/>
          <Route path="/signupcounsellor" component={RegisterCounsellor}/>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register}/>
          <Route path="/sms" component={SMSSettings}/>
        </Switch>
      </div>
    );
  }
}

export default Main;