// Types
export const AUTH_USER = "auth_user";
export const AUTH_COUNSELLOR = "auth_counsellor";
export const UNAUTH_USER = "unauth_user";
export const AUTH_ERROR = "auth_error";
export const REMOVE_ERROR = "remove_error";

// Actions
import axios from "axios";
import { config } from './../../config';

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

export function signinCounsellor({email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/tokens/counsellors`, {email, password})
            .then(function (response) {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(function (error) {
                if (error.response.data === "Unauthorized") {
                    dispatch(authError("Email or password is incorrect."));
                } else {
                    dispatch(authError(error.response.data));
                }
            });
    };
}

export function signupCounsellor({firstName, lastName, email, password}, history) {
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
            .then(response => {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
            });
    };
}

export function signinUser({username, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/tokens/users`, {username, password})
            .then(function (response) {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(function (error) {
                if (error.response.data === "Unauthorized") {
                    dispatch(authError("Username or password is incorrect."));
                } else {
                    dispatch(authError(error.response.data));
                }
            });
    };
}

export function signupUser({username, age, gender, phoneNumber, email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL + BASE_URL}/users`, {username, age, gender, phoneNumber, email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
            });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return { type: UNAUTH_USER };
}
