import {
    NEW_ROOM,
    UPDATE_ROOM,
    RESET_ROOM,
    ADD_MESSAGE_TO_ROOM
} from "./../Types/roomTypes";
import initialState from './initialState';

export default function roomReducer(state = initialState.rooms, action) {

  switch(action.type) {
    case NEW_ROOM:
      return [...state, action.room];
    case UPDATE_ROOM:
      return [...state];  
    case RESET_ROOM:
      return [];
    case ADD_MESSAGE_TO_ROOM:
      // TODO: find the right room
      return state;
    default:
     return state; 
  }
}