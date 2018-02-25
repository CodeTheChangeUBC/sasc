import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeRoomActions from './../../Redux/Actions/activeRoomActions';
import PropTypes from 'prop-types';

/**
 * Entry that show a student inside counsellor bar
 *
 * TODO: I want to redirect the chat to student's context when I click on an entry
 */
 class CounsellorBarEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.switchActiveRoom = this.switchActiveRoom.bind(this);
    }

    switchActiveRoom() {
        this.props.setActiveRoom(this.props.room);
    }

    render() {
        return (
            <div className="counsellor-bar-entry" onClick={this.switchActiveRoom}>
                <h4>{this.props.room.humans.user.nickname}</h4>
                <p>{this.props.room.humans.user.username}</p>
            </div>
        );
    }

}

CounsellorBarEntry.propTypes = {
    room: PropTypes.object,
    "room.humans": PropTypes.object,
    "room.humans.user": PropTypes.object,
    "room.humans.user.nickname": PropTypes.string,
    "room.humans.user.username": PropTypes.string,
    setActiveRoom: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActiveRoom: activeRoomActions.setActiveRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CounsellorBarEntry);