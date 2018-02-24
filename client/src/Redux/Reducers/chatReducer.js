import {
    CONNECT_TO_CHAT,
    DISCONNECT_FROM_CHAT,
    GET_SESSION_ID,
    SESSION_ERROR
} from './../Types/chatTypes';
import initialState from './initialState';

export default function(state = initialState.chat, action) {
    switch(action.type) {
        case CONNECT_TO_CHAT:
            return {...state, connected: true};
        case DISCONNECT_FROM_CHAT:
            return {...state, connected: false};
        case GET_SESSION_ID:
        	return {...state, sessionID: action.sessionID, status: { error: "", success: ""}};
        case SESSION_ERROR:
        	return {...state, status: { error: action.payload, success: ""}};
    }

    return state;
}