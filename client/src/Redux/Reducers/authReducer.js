import {
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH,
    AUTH_ERROR,
    REMOVE_ERROR
} from './../Types/authTypes';
import initialState from './initialState';

export default function(state = initialState.auth, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, auth: "user", status: { error: "", success: "Successfully logged in."}};
        case AUTH_COUNSELLOR:
            return {...state, auth: "counsellor", status: { error: "", success: "Successfully logged in."}};
        case UNAUTH:
            return {...state, auth: "", status: { error: "", success: "Successfully logged out."}};
        case AUTH_ERROR:
            return {...state, auth: "", status: { error: action.payload, success: ""}};
        case REMOVE_ERROR:
            return {...state, status: { error: "", success: ""}};
    }

    return state;
}