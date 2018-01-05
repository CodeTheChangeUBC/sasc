// Types
export const SUBMIT_SURVEY = "submit_survey";
export const USER_ERROR = "user_error";
export const REMOVE_ERROR = "remove_error";

// Actions
import axios from "axios";
import { config } from './../../config';

export const ROOT_URL = config.api;
export const BASE_URL = "/users";

function userError(error) {
    return {
        type: USER_ERROR,
        payload: error
    };
}

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

export function submitSurvey({nickname, age, gender, email}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/surveys`, {nickname, age, gender, email})
            .then(response => {
                history.push("/chat");
            })
            .catch(error => {
                dispatch(userError(error.response.data.error));
            });
    };
}