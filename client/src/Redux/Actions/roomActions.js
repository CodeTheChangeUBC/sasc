import { JOIN_ROOM, RESET_ROOM } from "./../Types/roomTypes";

export function joinRoom(room) { 
  return { type: JOIN_ROOM, room }; 
}

export function resetRoom() {
    return function (dispatch) {
        dispatch({type: RESET_ROOM});
    };
}