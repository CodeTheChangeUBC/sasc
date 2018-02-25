import {
    ADD_COUNSELLOR,
    GET_COUNSELLOR,
    UPDATE_COUNSELLOR,
    REMOVE_COUNSELLOR,
    COUNSELLOR_ERROR,
    PASSWORD_CHANGE
} from './../Types/counsellorTypes';
import initialState from './initialState';

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_COUNSELLOR:
            return {...state, counsellor: action.counsellor, status: { error: "", success: "Successfully added counsellor."}};
        case GET_COUNSELLOR:
            return {...state, counsellor: action.counsellor, status: { error: "", success: "Successfully retrieved counsellor."}};
        case UPDATE_COUNSELLOR:
            return {...state, counsellor: action.counsellor, status: { error: "", success: "Successfully updated counsellor."}};
        case PASSWORD_CHANGE:
            return {...state, status: { error: "", success: action.success}};
        case REMOVE_COUNSELLOR:
            return {...state, counsellor: null, status: { error: "", success: "Successfully removed counsellor."}};
        case COUNSELLOR_ERROR:
            return {...state, status: { error: action.payload, success: ""}};
    }


    return state;
}