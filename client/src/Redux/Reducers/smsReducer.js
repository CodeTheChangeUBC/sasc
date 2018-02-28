import {
    GET_SMS_SETTINGS,
    SET_SMS_SETTINGS,
    REMOVE_SMS_SETTINGS,
    SMS_ERROR,
    REMOVE_ERROR
} from './../Types/smsTypes';
import initialState from './initialState';

export default function(state = initialState.sms, action) {
    switch(action.type) {
        case GET_SMS_SETTINGS:
            return {...state, sms: action.data, status: { error: "", success: ""}};
        case REMOVE_SMS_SETTINGS:
            return {...state, sms: {email: "", twilioPhoneNumber: "", accountSid: "", authToken: ""}, status: { error: "", success: "Successfully removed sms settings."}};
        case SET_SMS_SETTINGS:
            return {...state, sms: action.data, status: { error: "", success: "Successfully set sms settings."}};
        case SMS_ERROR:
            return {...state, status: { error: action.payload, success: ""}};
        case REMOVE_ERROR:
            return {...state, status: { error: "", success: ""}};
    }

    return state;
}