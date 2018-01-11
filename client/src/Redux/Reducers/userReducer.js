import {
    SUBMIT_SURVEY,
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    REMOVE_USER,
    USER_ERROR,
    REMOVE_ERROR,
    PASSWORD_CHANGE
} from './../Types/userTypes';
import initialState from './initialState';

export default function(state = initialState.user, action) {
    switch(action.type) {
        case SUBMIT_SURVEY:
            return {...state, error: ''};
        case ADD_USER:
            return {...state, error: '', user: action.user};
        case GET_USER:
            return {...state, error: '', user: action.user};
        case UPDATE_USER:
            return {...state, error: '', user: action.user};
        case PASSWORD_CHANGE:
            return {...state, error: '', success: action.success};
        case REMOVE_USER:
            return {...state, error: '', user: null};
        case USER_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: '', success: ''};
    }

    return state;
}