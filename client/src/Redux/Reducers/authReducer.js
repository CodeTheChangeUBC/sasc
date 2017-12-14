import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_NAME
} from './../Actions/authActions';
import initialState from './initialState';

export default function(state = initialState.auth, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, error: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case FETCH_NAME:
            return { ...state, name: action.payload };
    }

    return state;
}