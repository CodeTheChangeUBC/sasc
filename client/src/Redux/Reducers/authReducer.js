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
            return {...state, error: "", role: "user", success: "Successfully logged in."};
        case AUTH_COUNSELLOR:
            return {...state, error: "", role: "counsellor", success: "Successfully logged in."};
        case UNAUTH:
            return {...state, role: "", success: "Successfully logged out."};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: "", success: ""};
    }

    return state;
}