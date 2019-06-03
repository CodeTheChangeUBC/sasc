import {
    NEW_ROOM,
    UPDATE_ROOM,
    REMOVE_ROOMS,
    ADD_MESSAGE_TO_ROOM,
    GET_SESSION_ID,
    SESSION_ERROR,
    SET_ACTIVE_ROOM,
    REMOVE_ACTIVE_ROOM
} from "./../Types/roomTypes";
import initialState from "./initialState";

export default function roomReducer(state = initialState.room, action) {
    switch (action.type) {
    case SET_ACTIVE_ROOM:
        return { ...state, activeRoom: action.roomID };
    case REMOVE_ACTIVE_ROOM:
        return { ...state, activeRoom: null };
    case NEW_ROOM:
        // Creates a room
        return { ...state, rooms: [...state.rooms, action.room] };
    case UPDATE_ROOM:
        // Updates a room
        return { ...state, rooms: [...state.rooms, action.room] };
    case REMOVE_ROOMS:
        // Removes all rooms when you sign out
        return { ...state, rooms: [] };
    case ADD_MESSAGE_TO_ROOM:
        // Find the right room and adds a message to it
        // TODO
        return state;
    case GET_SESSION_ID:
        return {
            ...state,
            sessionID: action.sessionID,
            status: { error: "", success: "" }
        };
    case SESSION_ERROR:
        return { ...state, status: { error: action.payload, success: "" } };
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
