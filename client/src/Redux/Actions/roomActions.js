import {
    JOIN_ROOM,
    REMOVE_ROOMS,
    ADD_MESSAGE_TO_ROOM,
    GET_SESSION_ID,
    SESSION_ERROR } from "./../Types/roomTypes";
import axios from "axios";
import {config} from "./../../config";

export const ROOT_URL = config.api;
export const BASE_URL = "/sessions";

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

export function removeRooms() {
    return function (dispatch) {
        dispatch({type: REMOVE_ROOMS});
    };
}

function sessionError(error) {
    return {
        type: SESSION_ERROR,
        payload: error
    };
}

// Get session ID from the DB
export function getSessionID() {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        };
        axios.get(`${ROOT_URL + BASE_URL}/id`, header)
            .then(function (response) {
                if (response.data.length !== 0) {
                    var sessionID = response.data[0];
                    dispatch({
                        type: GET_SESSION_ID,
                        sessionID: sessionID
                    });
                }
            })
            .catch(function (error) {
                dispatch(sessionError(error.response.data.error));
            });
    };
}

export function findRoomById(id, rooms) {
    var theRoom = null;
    rooms.forEach(function (room) {
        if (room.roomID === id) {
            theRoom = room;
        }
    });
    return theRoom;
}