import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import MessageBox from './../../Components/Chat/MessageBox';
import CounsellorBar from './../../Components/Counsellor/CounsellorBar';
import ChatInput from './../../Components/Chat/ChatInput';
import * as chatActions from './../../Redux/Actions/chatActions';
import * as messageActions from '../../Redux/Actions/messageActions';
import * as activeRoomActions from '../../Redux/Actions/activeRoomActions';
import * as roomActions from '../../Redux/Actions/roomActions';
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

    this.renderChatBox = this.renderChatBox.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  componentWillMount() {
      if(!(this.props.connected)) {
        socket.emit('subscribe', {room: this.props.room.title});
        this.props.connectToChat();
    }
    //console.log('will mount initated');
  }

  componentDidMount(){
   //console.log('did mount');
   this._handleMessageEvent();
  }

  _handleMessageEvent(){
    //console.log('Wait for it...');
    socket.on('chat message', (inboundMessage) => {
      if (this.props.authenticatedCounsellor) {
        this.props.addMessageToActiveRoom({room: this.props.room, newMessage: {user: this.props.counsellor.firstName, message: inboundMessage}});
        //this.props.addMessageToRoom({room: this.props.room, newMessage: {user: this.props.counsellor.firstName, message: inboundMessage}});
      } else {
        this.props.addMessageToActiveRoom({room: this.props.room, newMessage: {user: this.props.user.nickname, message: inboundMessage}});
        //this.props.addMessageToRoom({room: this.props.room, newMessage: {user: this.props.user.nickname, message: inboundMessage}});
        //console.log('received message', inboundMessage);
      }
      this.forceUpdate();
    });
  }

  renderChatBox() {
    if (Object.keys(this.props.room).length !== 0) {
      return (<div className="container-for-title-and-message-box">
        <div className="chat-title">
          <h3>{this.props.room.humans.user.nickname}</h3>
        </div>
        <MessageBox msgs={this.props.room.messages} />
        <ChatInput socket={socket} />
      </div>);
    } else {
      return (<div className="container-for-title-and-message-box"></div>);
    }
  }

  render() {
    //console.log('messages is...', this.props.messages);
    if (this.props.authenticatedCounsellor) {
      return (
        <div className="Chat">
          <div className="outer-counsellor-bar">
            <CounsellorBar />
          </div>
          {this.renderChatBox()}
        </div>
      );
    } else if (this.props.authenticated || this.props.connected) {
      return (
        <div className="Chat">
          <div className="container-for-title-and-message-box">
            <div className="chat-title">
              <h3>{this.props.room.humans.counsellor.firstName}</h3>
            </div>
            <MessageBox msgs={this.props.messages} />
            <ChatInput socket={socket} />
          </div>
        </div>
      );
    } else {
      return (<div className="Chat"></div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    chat: state.chat.connected,
    user: state.user.user,
    counsellor: state.counsellor.counsellor,
    messages: state.activeRoom.room.messages,
    room: state.activeRoom.room,
    authenticated: state.auth.authenticated,
    authenticatedCounsellor: state.auth.authenticatedCounsellor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMessageToActiveRoom: activeRoomActions.addMessageToActiveRoom,
    addMessageToRoom: roomActions.addMessageToRoom,
    connectToChat: chatActions.connectToChat,
    disconnectFromChat: chatActions.disconnectFromChat
  }, dispatch);
}

Chat.propTypes = {
    authenticatedCounsellor: PropTypes.bool,
    authenticated: PropTypes.bool,
    addMessageToActiveRoom: PropTypes.func,
    connected: PropTypes.bool,
    user: PropTypes.object,
    counsellor: PropTypes.object,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    msgs: PropTypes.array,
    message: PropTypes.string,
    messages: PropTypes.array,
    connectToChat: PropTypes.func,
    disconnectFromChat: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
