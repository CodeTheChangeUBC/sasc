import {
    SUBMIT_SURVEY,
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    REMOVE_USER,
    USER_ERROR,
    REMOVE_ERROR,
    PASSWORD_CHANGE
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

export function renderUserError(error) {
    return function (dispatch) {
        dispatch({
            type: USER_ERROR,
            payload: error
        });
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
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                userId: id
            }
        };
        axios.get(`${ROOT_URL + BASE_URL}/:userId`, header)
            .then(function (response) {
                if (response.data.length !== 0) {
                    dispatch({
                        type: GET_USER,
                        user: response.data[0]
                    });
                }
            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
            });
        
    };
}

export function updateUser({ID, username, nickname, age, gender, email, phoneNumber, password}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                userId: ID
            }
        };
        const data = {ID, username, nickname, age, gender, email, phoneNumber, password};
        // This is what it does temporarily
        dispatch({
            type: UPDATE_USER,
            user: data
        });
        /*axios.put(`${ROOT_URL + BASE_URL}/:userId`, data, header)
            .then(function (response) {
                dispatch({
                    type: UPDATE_USER,
                    user: data,
                    success: response.data.success
                });
            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
            });*/
    };
}

export function changePassword({ID, oldPassword, newPassword, newPasswordConfirm}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                userId: ID
            }
        };
        const data = {ID, oldPassword, newPassword, newPasswordConfirm};
        /*axios.put(`${ROOT_URL + BASE_URL}/:userId`, data, header)
            .then(function (response) {
                dispatch({
                    type: PASSWORD_CHANGE,
                    success: response.data.success
                });
            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
            });
        */
        dispatch({
            type: PASSWORD_CHANGE,
            success: "Password did not change because this is unimplemented."
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