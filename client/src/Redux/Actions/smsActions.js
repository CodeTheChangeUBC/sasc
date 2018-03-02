import {
    GET_SMS_SETTINGS,
    SET_SMS_SETTINGS,
    REMOVE_SMS_SETTINGS,
    SMS_ERROR,
    REMOVE_ERROR
} from './../Types/smsTypes';
import axios from "axios";
import {config} from "./../../config";

const ROOT_URL = config.api;
export const BASE_URL = "/twilio";

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

function smsError(error) {
    return {
        type: SMS_ERROR,
        payload: error
    };
}

export function renderSMSError(error) {
    return function (dispatch) {
        dispatch({
            type: SMS_ERROR,
            payload: error
        });
    };
}

export function getSMSDetails() {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        };
        axios.get(`${ROOT_URL + BASE_URL}/settings`, header)
            .then(function (response) {
                console.log(response.data)
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

export function setSMSDetails({email, twilioPhoneNumber, accountSid, authToken}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        };
        const data = {email, twilioPhoneNumber, accountSid, authToken};
        axios.post(`${ROOT_URL + BASE_URL}/settings`, data, header)
            .then(function () {
                dispatch({
                    type: SET_SMS_SETTINGS,
                    data: data
                });
            })
            .catch(function (error) {
                dispatch(smsError(error.response.data.error));
            });
    };
}

export function removeSMSDetails() {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        };
        axios.delete(`${ROOT_URL + BASE_URL}/settings`, header)
            .then(function () {
                dispatch({type: REMOVE_SMS_SETTINGS});
            })
            .catch(function (error) {
                dispatch(smsError(error.response.data.error));
            });
    };
}
