import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from '../../Redux/Actions/messageActions';
import PropTypes from 'prop-types';

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : '',
      messages: props.messages,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  componentDidMount(){
   //console.log('did mount');
   this._handleMessageEvent();
  }

  _handleMessageEvent(){
    //console.log('Wait for it...');
    this.props.socket.on('chat message', (inboundMessage) => {
      if (this.props.authenticatedCounsellor) {
        this.props.newMessage({room: this.props.room, newMessage: {user: this.props.counsellor.firstName, message: inboundMessage}});
      } else {
        this.props.newMessage({room: this.props.room, newMessage: {user: this.props.user.nickname, message: inboundMessage}});
        //console.log('received message', inboundMessage);
      }
    });
  }

  handleOnChange(ev) {
   this.setState({ input: ev.target.value });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    if (this.state.input.trim()) {
      if (this.props.authenticatedCounsellor) {
        this.props.socket.emit('chat message', {user: this.props.counsellor.email, message: this.state.input, room: this.props.room.title});
      } else {
        this.props.socket.emit('chat message', {user: this.props.user.username, message: this.state.input, room: this.props.room.title});
      }

      //this.props.newMessage({room: this.props.room, newMessage: {user: 'antoin', message: this.state.input}})
      this.setState({ input: '' });
    }
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.handleOnSubmit}>
          <input id="chat-input-box" type="text" onChange={this.handleOnChange} value={this.state.input} />
          <input id="send-message" type="submit" value="Send" />
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    room: state.activeRoom,
    authenticated: state.auth.authenticated,
    authenticatedCounsellor: state.auth.authenticatedCounsellor,
    user: state.user.user,
    counsellor: state.counsellor.counsellor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage: messageActions.newMessage }, dispatch);
}

ChatInput.propTypes = {
    authenticatedCounsellor: PropTypes.bool,
    authenticated: PropTypes.bool,
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    newMessage: PropTypes.func,
    user: PropTypes.object,
    counsellor: PropTypes.object,
    message: PropTypes.string,
    socket: PropTypes.object,
    "socket.on": PropTypes.func,
    "socket.emit": PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
