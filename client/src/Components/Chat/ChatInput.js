import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      if (this.props.auth === "counsellor") {
        this.props.socket.emit('chat message', {user: this.props.counsellor.firstName, message: this.state.input, room: this.props.room.roomID});
      } else {
        this.props.socket.emit('chat message', {user: this.props.user.nickname, message: this.state.input, room: this.props.room.roomID});
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
    activeRoom: state.activeRoom.activeRoom,
    auth: state.auth.auth,
    counsellor: state.counsellor.counsellor,
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

ChatInput.propTypes = {
    auth: PropTypes.string,
    connected: PropTypes.bool,
    messages: PropTypes.array,
    room: PropTypes.object,
    "room.roomID": PropTypes.number,
    user: PropTypes.object,
    counsellor: PropTypes.object,
    message: PropTypes.string,
    socket: PropTypes.object,
    "socket.emit": PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
