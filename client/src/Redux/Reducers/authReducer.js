import {
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH_USER,
    AUTH_ERROR,
    REMOVE_ERROR,
    SET_ROLE_USER,
    SET_ROLE_COUNSELLOR,
    FETCH_NAME
} from './../Actions/authActions';
import initialState from './initialState';

export default function(state = initialState.auth, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, error: '', authenticated: true};
        case AUTH_COUNSELLOR:
            return {...state, error: '', authenticatedCounsellor: true};
        case UNAUTH_USER:
            return {...state, authenticated: false, authenticatedCounsellor: false};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: ''};
        case SET_ROLE_USER:
            return {...state, role: 'user'};
        case SET_ROLE_COUNSELLOR:
            return {...state, role: 'counsellor'};
        case FETCH_NAME:
            return { ...state, name: action.payload };
    }

    return state;
}