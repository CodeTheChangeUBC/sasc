import {
    CONNECT_TO_CHAT,
    DISCONNECT_FROM_CHAT
} from './../Types/chatTypes';

export function connectToChat() {
    return function (dispatch) {
        dispatch({
            type: CONNECT_TO_CHAT,
            connected: true
        });
    };
}

export function disconnectFromChat() {
    return function (dispatch) {
        dispatch({
            type: DISCONNECT_FROM_CHAT,
            connected: false
        });
    };
}
