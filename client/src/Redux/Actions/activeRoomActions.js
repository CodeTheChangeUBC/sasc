import {
  SET_ACTIVE_ROOM,
  REMOVE_ACTIVE_ROOM
} from "./../Types/activeRoomTypes";

export function setActiveRoom(roomID) {
    return function (dispatch) {
        dispatch({
            type: SET_ACTIVE_ROOM,
            roomID: roomID
        });
    };
}

export function removeActiveRoom() {
    return function (dispatch) {
        dispatch({type: REMOVE_ACTIVE_ROOM});
    };
}