import {
    REMOVE_ERROR
} from './../Types/errorTypes';
import initialState from './initialState';

export default function(state = initialState, action) {
    switch(action.type) {
        case REMOVE_ERROR:
            return {...state, status: { error: "", success: ""}};
    }

    return state;
}