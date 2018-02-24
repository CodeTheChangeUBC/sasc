import { JOIN_ROOM, RESET_ROOM, ADD_MESSAGE_TO_ROOM } from "./../Types/roomTypes";

export function joinRoom(room) { 
  return { type: JOIN_ROOM, room }; 
}

export function addMessageToRoom(data) {
    return function (dispatch) {
        var message = JSON.parse(data.newMessage.message);
        var room = data.room;
        var roomID = data.room.roomID;
        dispatch({
            type: ADD_MESSAGE_TO_ROOM,
            roomID: roomID,
            room: room,
            message: message
        });
    };
}

export function resetRoom() {
    return function (dispatch) {
        dispatch({type: RESET_ROOM});
    };
}
