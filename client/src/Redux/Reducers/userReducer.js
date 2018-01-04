import {
    SUBMIT_SURVEY,
    USER_ERROR,
    REMOVE_ERROR
} from './../Actions/userActions';
import initialState from './initialState';

export default function(state = initialState.user, action) {
    switch(action.type) {
        case SUBMIT_SURVEY:
            return {...state, error: ''};
        case USER_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: ''};
    }

    return state;
}