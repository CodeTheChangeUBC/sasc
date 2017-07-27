import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './../Home';
import Chat from './../Chat';
import Login from './../Login';
import Register from './../Register';
import SMSSettings from './../SMS/Settings';
import SMSConvos from './../SMS';
import './styles.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/sms/settings" component={SMSSettings}/>
          <Route path="/sms" component={SMSConvos}/>
        </Switch>
      </div>
    );
  }
}

export default Main;