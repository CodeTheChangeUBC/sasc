import {
    SUBMIT_SURVEY,
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    REMOVE_USER,
    USER_ERROR,
    REMOVE_ERROR
} from './../Types/userTypes';
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

export function getUser(id) {
    return function (dispatch) {
        dispatch({
            type: GET_USER
        });
    };
}

export function updateUser(id) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER
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