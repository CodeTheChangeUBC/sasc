import {
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH_USER,
    AUTH_ERROR,
    REMOVE_ERROR
} from './../Actions/authActions';
import initialState from './initialState';

export default function(state = initialState.auth, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, error: '', authenticated: true, role: "user"};
        case AUTH_COUNSELLOR:
            return {...state, error: '', authenticatedCounsellor: true, role: "counsellor"};
        case UNAUTH_USER:
            return {...state, authenticated: false, authenticatedCounsellor: false, role: ""};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: ''};
    }

    return state;
}