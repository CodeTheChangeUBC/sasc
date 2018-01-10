import {
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH_USER,
    UNAUTH_COUNSELLOR,
    AUTH_ERROR,
    REMOVE_ERROR
} from "./../Types/authTypes";
import axios from "axios";
import {config} from "./../../config";

export const ROOT_URL = config.api;
export const BASE_URL = "/auth";

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

export function signinCounsellor({email, password}, history, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/tokens/counsellors`, {email, password})
            .then(function (response) {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem("token", response.data.token);
                callback(response.data.counsellor);
                history.push("/");
            })
            .catch(function (error) {
                dispatch(authError("Email or password is incorrect."));
            });
    };
}

export function signupCounsellor({firstName, lastName, email, password}, history, callback) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        };
        const data = {firstName, lastName, email, password};
        axios.post(`${ROOT_URL + BASE_URL}/counsellors`, data, header)
            .then(function (response) {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem("token", response.data.token);
                callback({firstName, lastName, email});
                history.push("/");
            })
            .catch(function (error) {
                dispatch(authError(error.response.data.error));
            });
    };
}

export function signinUser({username, password}, history, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/tokens/users`, {username, password})
            .then(function (response) {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                callback(response.data.user);
                history.push("/");
            })
            .catch(function (error) {
                dispatch(authError("Username or password is incorrect."));
            });
    };
}

export function signupUser({ID, username, nickname, age, gender, phoneNumber, email, password}, history, callback) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/users`, {ID, username, nickname, age, gender, phoneNumber, email, password})
            .then(function (response) {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                callback({ID, username, nickname, age, gender, phoneNumber, email});
                history.push("/");
            })
            .catch(function (error) {
                dispatch(authError(error.response.data.error));
            });
    };
}

export function signout(callback1, callback2) {
    return function (dispatch) {
        localStorage.removeItem("token");
        dispatch({type: UNAUTH_USER});
        dispatch({type: UNAUTH_COUNSELLOR});
        callback1();
        callback2();
    };
}
