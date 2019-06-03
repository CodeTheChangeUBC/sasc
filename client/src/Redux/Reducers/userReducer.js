import {
    SUBMIT_SURVEY,
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    REMOVE_USER,
    USER_ERROR,
    PASSWORD_CHANGE,
    REMOVE_ERROR
} from "./../Types/userTypes";
import initialState from "./initialState";

export default function(state = initialState.user, action) {
    switch (action.type) {
    case SUBMIT_SURVEY:
        return {
            ...state,
            status: { error: "", success: "Successfully submitted survey." }
        };
    case ADD_USER:
        return {
            ...state,
            user: action.user,
            status: { error: "", success: "" }
        };
    case GET_USER:
        return {
            ...state,
            user: action.user,
            status: { error: "", success: "" }
        };
    case UPDATE_USER:
        return {
            ...state,
            user: action.user,
            status: { error: "", success: "Successfully updated user." }
        };
    case PASSWORD_CHANGE:
        return {
            ...state,
            success: action.success,
            status: { error: "", success: "Successfully changed password." }
        };
    case REMOVE_USER:
        return {
            ...state,
            user: null,
            status: { error: "", success: "Successfully removed user." }
        };
    case USER_ERROR:
        return { ...state, status: { error: action.payload, success: "" } };
    case REMOVE_ERROR:
        return { ...state, status: { error: "", success: "" } };
    }

    return state;
}
