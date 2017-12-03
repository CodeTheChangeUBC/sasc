import initialState from './initialState';
import { RETRIEVE_SMSSETTINGS } from "../Actions/smsActions";

export default function smssettings(state = initialState.smssettings, action) {
    switch(action.type) {
        case RETRIEVE_SMSSETTINGS:
            return action.smssettings;
        default:
            return state;
    }
}