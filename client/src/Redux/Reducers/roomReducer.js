import {
    NEW_ROOM,
    UPDATE_ROOM,
    RESET_ROOM,
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
    case RESET_ROOM:
      // Removes all rooms
      return [];
    case ADD_MESSAGE_TO_ROOM:
      // Find the right room and adds a message to it
      state.forEach(function (room) {
        if (room.roomID === action.roomID) {
          const message = createMessage(action.room, action.message, action.fromCounsellor, room.sessionID);
          room.messages.push(message);
        }
      });
      return state;
    default:
     return state; 
  }
}

function createMessage(room, messageContent, fromCounsellor, sessionID) {
  var message = {
    messageTime: Date.now(),
    sessionID: sessionID,
    counsellorID: room.humans.counsellor,
    userID: room.humans.user,
    messageContent: messageContent,
    fromCounsellor: fromCounsellor,
    fromTwilio: 0
  };
}
