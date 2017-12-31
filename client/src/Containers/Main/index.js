import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './../Home';
import Chat from './../Chat';
import Login from './../Login';
import LoginCounsellor  from './../LoginCounsellor';
import RegisterCounsellor  from './../RegisterCounsellor';
import Signout from './../Signout';
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
          <Route path="/signout" component={Signout} />
          <Route path="/register" component={Register}/>
          <Route path="/sms" component={requireAuthCounsellor(SMSSettings)}/>
        </Switch>
      </div>
    );
  }
}

export default Main;