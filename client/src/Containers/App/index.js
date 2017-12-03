import React, { Component } from 'react';
import './styles.css';
import Header from './../Header';
import AuthHeader from './../AuthHeader';
import Main from './../Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AuthHeader />
        <Main />
      </div>
    );
  }
}

export default App;
