import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class LaunchChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.gotoChat = this.gotoChat.bind(this);
    this.gotoSurvey = this.gotoSurvey.bind(this);
  }

  gotoChat(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push("/chat");
  }

  gotoSurvey(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push("/prechatsurvey");
  }

  render() {
    if (this.props.chatConnected || this.props.auth === "counsellor") {
      return (
        <div>
            <p>
              Go to <Link to="/chat">chat</Link>.
           </p>
        </div>
      );
    } else if (this.props.auth === "user") {
      return (
          <div className="connect-to-chat" onClick={this.gotoChat}>
            <div className="launch-chat" value="Launch Chat">
              Launch Chat
            </div>
          </div>
      );
    } else {
      return (
          <div className="connect-to-chat" onClick={this.gotoSurvey}>
            <div className="launch-chat" value="Launch Chat">
              Launch Chat
            </div>
          </div>
      );
    }
  }
}

function mapStateToProps(state) {
    return {
        chatConnected: state.chat.connected,
        auth: state.auth.auth
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

LaunchChat.propTypes = {
    history: PropTypes.object,
    chatConnected: PropTypes.bool,
    auth: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchChat);