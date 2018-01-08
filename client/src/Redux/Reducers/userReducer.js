import {
    SUBMIT_SURVEY,
    ADD_USER,
    REMOVE_USER,
    USER_ERROR,
    REMOVE_ERROR
} from './../Actions/userActions';
import initialState from './initialState';

export default function(state = initialState.user, action) {
    switch(action.type) {
        case SUBMIT_SURVEY:
            return {...state, error: ''};
        case ADD_USER:
            return {...state, error: '', user: action.user};
        case REMOVE_USER:
            return {...state, error: '', user: null};
        case USER_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: ''};
    }

    return state;
}