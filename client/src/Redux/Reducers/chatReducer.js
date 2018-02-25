import {
    CONNECT_TO_CHAT,
    DISCONNECT_FROM_CHAT
} from './../Types/chatTypes';
import initialState from './initialState';

export default function(state = initialState.chat, action) {
    switch(action.type) {
        case CONNECT_TO_CHAT:
            return {...state, connected: true};
        case DISCONNECT_FROM_CHAT:
            return {...state, connected: false};
    }

    return state;
}