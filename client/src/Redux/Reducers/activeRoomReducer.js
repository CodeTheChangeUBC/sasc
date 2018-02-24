import {
  SET_ACTIVE_ROOM,
  REMOVE_ACTIVE_ROOM,
} from "./../Types/activeRoomTypes";
import initialState from './initialState';

export default function activeRoomReducer(state = initialState, action) {
  switch(action.type) {
    case SET_ACTIVE_ROOM:
      return {...state, activeRoom: action.roomID};
    case REMOVE_ACTIVE_ROOM:
      return {...state, activeRoom: null};
    default:
     return state; 
  }

}