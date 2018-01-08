import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import MessageBox from './../../Components/Chat/MessageBox';
import CounsellorBar from './../../Components/Counsellor/CounsellorBar';
import * as messageActions from '../../Redux/Actions/messageActions';
import { config } from './../../config';
import PropTypes from 'prop-types';
import './styles.css';

const socket = io(config.host);

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : '',
      messages: props.messages,
      connected: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  componentWillMount() {
      if(!(this.state.connected)){
        socket.emit('subscribe', {room: this.props.room.title});
        this.setState({connected: true});
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
        this.props.newMessage({room: this.props.room, newMessage: {user: this.props.user.firstName, message: inboundMessage}});
      } else {
        this.props.newMessage({room: this.props.room, newMessage: {user: this.props.user.nickname, message: inboundMessage}});
        //console.log('received message', inboundMessage);
      }
    });
  } 

  handleOnChange(ev) {
   this.setState({ input: ev.target.value}); 
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    if (this.state.input) {
      socket.emit('chat message', {message: this.state.input, room: this.props.room.title});
      // this.props.newMessage({room: this.props.room, newMessage: {user: 'antoin', message: this.state.input}})
      this.setState({ input: '' });
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
          <div className="container-for-title-and-message-box">
            <div className="chat-title">
              <h3>Scott Mescudi</h3>
            </div>
            <MessageBox msgs={this.props.messages} />
            <form className="chat-input" onSubmit={this.handleOnSubmit}>
                <input id="chat-input-box" type="text" onChange={this.handleOnChange} value={this.state.input} />
                <input id="send-message" type="submit" value="Send" />
            </form>
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
            <form className="chat-input" onSubmit={this.handleOnSubmit}>
                <input id="chat-input-box" type="text" onChange={this.handleOnChange} value={this.state.input} />
                <input id="send-message" type="submit" value="Send" />
            </form>
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
  return bindActionCreators({ newMessage: messageActions.newMessage }, dispatch);
}

Chat.propTypes = {
    authenticatedCounsellor: PropTypes.bool,
    authenticated: PropTypes.bool,
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    newMessage: PropTypes.func,
    msgs: PropTypes.array,
    user: PropTypes.object,
    message: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
