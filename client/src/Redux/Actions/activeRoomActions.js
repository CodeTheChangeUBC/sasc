import {
  SET_ACTIVE_ROOM,
  REMOVE_ACTIVE_ROOM,
  ADD_MESSAGE
} from "./../Types/activeRoomTypes";

export function addMessageToActiveRoom(message) {
    return function (dispatch) {
        dispatch({
            type: ADD_MESSAGE,
            message: message
        });
    };
}

export function setActiveRoom(room) {
    return function (dispatch) {
        dispatch({
            type: SET_ACTIVE_ROOM,
            room: room
        });
    };
}

export function removeActiveRoom() {
    return function (dispatch) {
        dispatch({type: REMOVE_ACTIVE_ROOM});
    };
}