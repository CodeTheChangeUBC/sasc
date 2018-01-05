import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

class Home extends Component {
  render() {
    if (this.props.chatConnected || this.props.authenticatedCounsellor) {
      return (
        <div className="Home">
          <h2>Home</h2>
          <div>
            <p>
              Go to <Link to="/chat">chat</Link>.
             </p>
          </div>
        </div>
      );
    } else if (this.props.authenticated) {
      return (
        <div className="Home">
          <h2>Home</h2>
          <div className="connectToChat">
            <Link className="launchChat" to="/chat">Launch Chat</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <h2>Home</h2>
          <div className="connectToChat">
            <Link className="launchChat" to="/prechatsurvey">Launch Chat</Link>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
    return {
        chatConnected: state.rooms.room,
        authenticated: state.auth.authenticated,
        authenticatedCounsellor: state.auth.authenticatedCounsellor
    };
}

Home.propTypes = {
    chatConnected: PropTypes.bool,
    authenticated: PropTypes.bool
};


export default Home;