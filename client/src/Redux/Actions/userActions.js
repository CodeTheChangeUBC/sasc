import {
    SUBMIT_SURVEY,
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    REMOVE_USER,
    USER_ERROR,
    PASSWORD_CHANGE,
    REMOVE_ERROR
} from './../Types/userTypes';
import axios from "axios";
import {config} from "./../../config";

export const ROOT_URL = config.api;
export const BASE_URL = "/users";

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

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
        if (user.password) {
            delete user.password;
        }
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
        axios.get(`${ROOT_URL + BASE_URL}`, header)
            .then(function (response) {
                if (response.data !== null && response.data !== undefined && typeof response.data !== "string") {

                    var user = response.data.user;

                    dispatch({
                        type: GET_USER,
                        user: user
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

        axios.put(`${ROOT_URL + BASE_URL}`, data, header)
            .then(function (response) {

                // If successfully updated on the backend, update on frontend as well.
                if (response.data.success) {

                    if (data.password) {
                        delete data.password;
                    }
                    dispatch({
                        type: UPDATE_USER,
                        user: data,
                        success: response.data.success
                    });
                }

            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
            });
    };
}

export function changeUserPassword({ID, oldPassword, newPassword}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                ID: ID
            }
        };
        const data = {ID, oldPassword, newPassword};

        axios.put(`${ROOT_URL + BASE_URL}/password`, data, header)
            .then(function (response) {
                if (response.data.success) {
                    dispatch({
                        type: PASSWORD_CHANGE,
                        success: response.data.success
                    });
                }
            })
            .catch(function (error) {
                dispatch(userError(error.response.data.error));
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