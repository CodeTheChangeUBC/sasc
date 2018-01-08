// Types
export const SUBMIT_SURVEY = "submit_survey";
export const ADD_USER = "add_user";
export const REMOVE_USER = "remove_user";
export const USER_ERROR = "user_error";
export const REMOVE_ERROR = "remove_error";

// Actions
import axios from "axios";
import {config} from "./../../config";

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
            .then(function () {
                dispatch({type: SUBMIT_SURVEY});
                // add user information from pre-chat survey to store
                dispatch({
                    type: ADD_USER,
                    user: {
                        nickname,
                        age,
                        gender,
                        email
                    }
                });
                history.push("/chat");
            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
            });
    };
}

export function addUser(user) {
    return function (dispatch) {
        dispatch({
            type: ADD_USER,
            user: user
        });
    };
}

export function removeUser() {
    return function (dispatch) {
        dispatch({
            type: REMOVE_USER
        });
    };
}