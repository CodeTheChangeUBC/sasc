import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <div className="connect-to-chat">
            <Link className="launch-chat" to="/chat">Launch Chat</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <h2>Home</h2>
          <div className="connect-to-chat">
            <Link className="launch-chat" to="/prechatsurvey">Launch Chat</Link>
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
        authenticatedCounsellor: state.auth.authenticatedCounsellor,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

Home.propTypes = {
    chatConnected: PropTypes.bool,
    authenticated: PropTypes.bool,
    authenticatedCounsellor: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);