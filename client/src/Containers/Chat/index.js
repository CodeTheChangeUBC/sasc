import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as messageActions from '../../Redux/Actions/messageActions';
import { bindActionCreators } from 'redux';
import MessageBox from './MessageBox';
import PropTypes from 'prop-types';
import './styles.css';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

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
    // this._handleMessageEvent()
    console.log('will mount initated');
   }

  componentDidMount(){
   console.log('did mount');
   this._handleMessageEvent();  
  }

   _handleMessageEvent(){
    console.log('Wait for it...');
    socket.on('chat message', (inboundMessage) => {
      this.props.newMessage({room: this.props.room, newMessage: {user: 'antoin', message: inboundMessage}}); 
      console.log('received message', inboundMessage);
    });
  } 

  handleOnChange(ev) {
   this.setState({ input: ev.target.value}); 
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat message', {message: this.state.input, room: this.props.room.title});
    // this.props.newMessage({room: this.props.room, newMessage: {user: 'antoin', message: this.state.input}})
    this.setState({ input: '' });
  }

  render() {
    console.log('messages is...', this.props.messages);
    return (
      <div className="Chat">
        <MessageBox msgs={this.props.messages} />
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" onChange={this.handleOnChange} value={this.state.input} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { messages: state.activeRoom.messages, room: state.activeRoom };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage: messageActions.newMessage }, dispatch);
}

Chat.propTypes = {
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    newMessage: PropTypes.func,
    msgs: PropTypes.array,
    user: PropTypes.string,
    message: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
