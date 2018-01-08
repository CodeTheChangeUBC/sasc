import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import MessageBox from './../../Components/Chat/MessageBox';
import CounsellorBar from './../../Components/Counsellor/CounsellorBar';
import ChatInput from './../../Components/Chat/ChatInput';
import { config } from './../../config';
import PropTypes from 'prop-types';
import './styles.css';

const socket = io(config.host);

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      connected: false
    };
  }

  componentWillMount() {
      if(!(this.state.connected)){
        socket.emit('subscribe', {room: this.props.room.title});
        this.setState({connected: true});
     }
    //console.log('will mount initated');
   }

  render() {
    //console.log('messages is...', this.props.messages);
    if (this.props.authenticatedCounsellor) {
      return (
        <div className="Chat">
          <div className="outer-counsellor-bar">
            <CounsellorBar />
          </div>
          <div className="container-for-title-and-message-box">
            <div className="chat-title">
              <h3>Scott Mescudi</h3>
            </div>
            <MessageBox msgs={this.props.messages} />
            <ChatInput socket={socket} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="Chat">
          <div className="container-for-title-and-message-box">
            <div className="chat-title">
              <h3>Scott Mescudi</h3>
            </div>
            <MessageBox msgs={this.props.messages} />
            <ChatInput socket={socket} />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.activeRoom.messages,
    room: state.activeRoom,
    authenticated: state.auth.authenticated,
    authenticatedCounsellor: state.auth.authenticatedCounsellor,
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

Chat.propTypes = {
    authenticatedCounsellor: PropTypes.bool,
    authenticated: PropTypes.bool,
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    msgs: PropTypes.array,
    user: PropTypes.object,
    message: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
