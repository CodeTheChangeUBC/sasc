import { JOIN_ROOM, RESET_ROOM, ADD_MESSAGE_TO_ROOM } from "./../Types/roomTypes";

export function joinRoom(room) { 
  return { type: JOIN_ROOM, room }; 
}

export function addMessageToRoom(data) {
    return function (dispatch) {
        var message = JSON.parse(data.newMessage.message);
        var title = data.room.title;
        dispatch({
            type: ADD_MESSAGE_TO_ROOM,
            title: title,
            message: message
        });
    };
}

export function resetRoom() {
    return function (dispatch) {
        dispatch({type: RESET_ROOM});
    };
}
