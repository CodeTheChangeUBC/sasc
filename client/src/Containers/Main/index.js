import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './../Home';
import Chat from './../Chat';
import Login from './../Login';
import SigninCounsellor  from './../../Components/Auth/SigninCounsellor';
import SignupCounsellor  from './../../Components/Auth/SignupCounsellor';
import Signout from './../../Components/Auth/Signout';
import Register from './../Register';
import SMSSettings from './../SMSSettings';
import requireAuthCounsellor from './../../Components/Auth/requireAuthCounsellor';
import './styles.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/login" component={Login}/>
          <Route path="/signincounsellor" component={SigninCounsellor}/>
          <Route path="/signupcounsellor" component={SignupCounsellor}/>
          <Route path="/signout" component={Signout} />
          <Route path="/register" component={Register}/>
          <Route path="/sms" component={requireAuthCounsellor(SMSSettings)}/>
        </Switch>
      </div>
    );
  }
}

export default Main;