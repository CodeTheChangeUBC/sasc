import {
    NEW_ROOM,
    UPDATE_ROOM,
    REMOVE_ROOMS,
    ADD_MESSAGE_TO_ROOM,
    GET_SESSION_ID,
    SESSION_ERROR
} from "./../Types/roomTypes";
import initialState from './initialState';

export default function roomReducer(state = initialState.rooms, action) {

  switch(action.type) {
    case NEW_ROOM:
      // Creates a room
      return [...state, action.room];
    case UPDATE_ROOM:
      // Updates a room
      return [...state, action.room];  
    case REMOVE_ROOMS:
      // Removes all rooms when you sign out
      return [];
    case ADD_MESSAGE_TO_ROOM:
      // Find the right room and adds a message to it
      state.forEach(function (room, index) {
        if (room.roomID === action.roomID) {
          const message = createMessage(action.room, action.message, action.fromCounsellor, room.sessionID);
          state[index] = room.messages.push(message);
        }
      });
      return state;
    case GET_SESSION_ID:
          return {...state, sessionID: action.sessionID, status: { error: "", success: ""}};
    case SESSION_ERROR:
      return {...state, status: { error: action.payload, success: ""}};
    default:
     return state; 
  }
}

function createMessage(room, messageContent, fromCounsellor, sessionID) {
  return {
    messageTime: Date.now(),
    sessionID: sessionID,
    counsellorID: room.humans.counsellor,
    userID: room.humans.user,
    messageContent: messageContent,
    fromCounsellor: fromCounsellor,
    fromTwilio: 0
  };
}
