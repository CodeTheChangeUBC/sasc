// Types
export const GET_SMS_SETTINGS = "get_sms_settings";
export const SET_SMS_SETTINGS = "set_sms_settings";
export const REMOVE_SMS_SETTINGS = "remove_sms_settings";
export const SMS_ERROR = "sms_error";
export const REMOVE_ERROR = "remove_error";

// Actions
import axios from "axios";
import {config} from "./../../Config";

const ROOT_URL = config.api;
export const BASE_URL = "/twilio";

function smsError(error) {
    return {
        type: SMS_ERROR,
        payload: error
    };
}

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

export function getSMSDetails() {
    return function (dispatch) {
        axios.get(`${ROOT_URL + BASE_URL}/getSMSDetails`)
            .then(function (response) {
                dispatch({
                    type: GET_SMS_SETTINGS,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch(smsError(error.response.data.error));
            });
    };
}

export function setSMSDetails({email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/setSMSDetails`)
            .then(function () {
                dispatch({type: SET_SMS_SETTINGS});
            })
            .catch(function (error) {
                dispatch(smsError(error.response.data.error));
            });
    };
}

export function removeSMSDetails() {
    return function (dispatch) {
        axios.delete(`${ROOT_URL + BASE_URL}/removeSMSDetails`)
            .then(function () {
                dispatch({type: REMOVE_SMS_SETTINGS});
            })
            .catch(function (error) {
                dispatch(smsError(error.response.data.error));
            });
    };
}