import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import MessageBox from "./../../Components/Chat/MessageBox";
import CounsellorBar from "./../../Components/Counsellor/CounsellorBar";
import ChatInput from "./../../Components/Chat/ChatInput";
import * as chatActions from "./../../Redux/Actions/chatActions";
import * as roomActions from "../../Redux/Actions/roomActions";
import { config } from "./../../config";
import PropTypes from "prop-types";
import "./styles.css";

const socket = io(config.host);

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        };

        this.renderChatBox = this.renderChatBox.bind(this);
        this._handleMessageEvent = this._handleMessageEvent.bind(this);
    }

    componentWillMount() {
        if (!this.props.connected) {
            socket.emit("subscribe", { room: this.props.rooms[0] });
            this.props.connectToChat();
        }
        //console.log('will mount initated');
    }

    componentDidMount() {
        //console.log('did mount');
        this._handleMessageEvent();
    }

    _handleMessageEvent() {
        //console.log('Wait for it...');
        socket.on("chat message", inboundMessage => {
            if (this.props.auth === "counsellor") {
                this.props.addMessageToRoom({
                    room: this.props.rooms[0],
                    newMessage: {
                        user: this.props.counsellor.firstName,
                        message: inboundMessage
                    }
                });
            } else {
                this.props.addMessageToRoom({
                    room: this.props.rooms[0],
                    newMessage: {
                        user: this.props.user.nickname,
                        message: inboundMessage
                    }
                });
                //console.log('received message', inboundMessage);
            }
            this.forceUpdate();
        });
    }

    renderChatBox() {
        // If a counsellor has never connected to any user before, they will have no rooms.
        // However, a user will always have a room when they enter the chat.
        if (Object.keys(this.props.rooms).length !== 0) {
            return (
                <div className="container-for-title-and-message-box">
                    <div className="chat-title">
                        <h3>{/* TODO: Name of user */}</h3>
                    </div>
                    <MessageBox msgs={this.props.rooms[0].messages} />
                    <ChatInput socket={socket} room={this.props.rooms[0]} />
                </div>
            );
        } else {
            return <div className="container-for-title-and-message-box" />;
        }
    }

    render() {
        //console.log('messages is...', this.props.messages);
        if (this.props.auth === "counsellor") {
            return (
                <div className="Chat">
                    <div className="outer-counsellor-bar">
                        <CounsellorBar />
                    </div>
                    {this.renderChatBox()}
                </div>
            );
        } else if (this.props.auth === "user" || this.props.connected) {
            return (
                <div className="Chat">
                    <div className="container-for-title-and-message-box">
                        <div className="chat-title">
                            <h3>{/* TODO: Name of counsellor */}</h3>
                        </div>
                        <MessageBox msgs={this.props.rooms[0].messages} />
                        <ChatInput socket={socket} />
                    </div>
                </div>
            );
        } else {
            return <div className="Chat" />;
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        chat: state.chat.connected,
        user: state.user.user,
        counsellor: state.counsellor.counsellor,
        rooms: state.room.rooms,
        activeRoom: state.room.activeRoom,
        auth: state.auth.auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addMessageToRoom: roomActions.addMessageToRoom,
            connectToChat: chatActions.connectToChat,
            disconnectFromChat: chatActions.disconnectFromChat,
            findRoomById: roomActions.findRoomById
        },
        dispatch
    );
}

Chat.propTypes = {
    auth: PropTypes.string,
    activeRoom: PropTypes.number,
    addMessageToRoom: PropTypes.func,
    connected: PropTypes.bool,
    user: PropTypes.object,
    counsellor: PropTypes.object,
    room: PropTypes.object,
    rooms: PropTypes.array,
    "room.roomID": PropTypes.number,
    msgs: PropTypes.array,
    message: PropTypes.string,
    messages: PropTypes.array,
    connectToChat: PropTypes.func,
    disconnectFromChat: PropTypes.func,
    findRoomById: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
