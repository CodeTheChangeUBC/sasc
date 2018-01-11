import {
    ADD_COUNSELLOR,
    GET_COUNSELLOR,
    UPDATE_COUNSELLOR,
    REMOVE_COUNSELLOR,
    COUNSELLOR_ERROR,
    REMOVE_ERROR,
    PASSWORD_CHANGE
} from './../Types/counsellorTypes';
import initialState from './initialState';

export default function(state = initialState.counsellor, action) {
    switch(action.type) {
        case ADD_COUNSELLOR:
            return {...state, error: '', counsellor: action.counsellor};
        case GET_COUNSELLOR:
            return {...state, error: '', counsellor: action.counsellor};
        case UPDATE_COUNSELLOR:
            return {...state, error: '', counsellor: action.counsellor};
        case PASSWORD_CHANGE:
            return {...state, error: '', success: action.success};
        case REMOVE_COUNSELLOR:
            return {...state, error: '', counsellor: null};
        case COUNSELLOR_ERROR:
            return {...state, error: action.payload};
        case REMOVE_ERROR:
            return {...state, error: '', success: ''};
    }


    return state;
}