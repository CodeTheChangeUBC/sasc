import {
  JOIN_ROOM,
  NEW_MESSAGE,
  SET_ACTIVE_ROOM,
  REMOVE_ACTIVE_ROOM,
  ADD_MESSAGE
} from "./../Types/activeRoomTypes";
import initialState from './initialState';

export default function activeRoomReducer(state = initialState.activeRoom, action) {
 
  switch(action.type) {
    case JOIN_ROOM:
      return {...state, room: { title: action.room.title, humans: action.room.humans, messages: action.room.messages }};
      /*return Object.assign({}, state.activeRoom.room, {
        title: action.room.title,
        messages: action.room.messages
      });*/
    /*case NEW_MESSAGE: 
      return Object.assign({}, action.payload.room, { 
        messages: [...action.payload.room.messages, action.payload.newMessage]
      });*/
    case ADD_MESSAGE:
      state.room.messages.push(action.message);
      return {...state};
    case SET_ACTIVE_ROOM:
      return {...state, room: action.room};
    case REMOVE_ACTIVE_ROOM:
      return {...state, room: {}};
    default:
     return state; 
  }

}