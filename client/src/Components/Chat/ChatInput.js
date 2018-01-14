import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from '../../Redux/Actions/messageActions';
import * as activeRoomActions from '../../Redux/Actions/activeRoomActions';
import PropTypes from 'prop-types';

class ChatInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(ev) {
   this.setState({ input: ev.target.value });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();
    if (this.state.input.trim() && this.props.connected) {
      if (this.props.authenticatedCounsellor) {
        this.props.socket.emit('chat message', {user: this.props.counsellor.firstName, message: this.state.input, room: this.props.room.title});
      } else {
        this.props.socket.emit('chat message', {user: this.props.user.nickname, message: this.state.input, room: this.props.room.title});
      }

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
    connected: state.chat.connected,
    room: state.activeRoom.room,
    authenticated: state.auth.authenticated,
    authenticatedCounsellor: state.auth.authenticatedCounsellor,
    user: state.user.user,
    counsellor: state.counsellor.counsellor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

ChatInput.propTypes = {
    authenticatedCounsellor: PropTypes.bool,
    authenticated: PropTypes.bool,
    connected: PropTypes.bool,
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.title": PropTypes.string,
    user: PropTypes.object,
    counsellor: PropTypes.object,
    message: PropTypes.string,
    socket: PropTypes.object,
    "socket.emit": PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
