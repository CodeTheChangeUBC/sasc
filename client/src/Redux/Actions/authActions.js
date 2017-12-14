// Types
export const AUTH_USER = "auth_user";
export const UNAUTH_USER = "unauth_user";
export const AUTH_ERROR = "auth_error";

// Actions
import axios from "axios";

export const ROOT_URL = "http://localhost:3000";

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signinCounsellor({email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signincounsellor`, {email, password})
            .then(function (response) {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                history.push("/sms");
            })
            .catch(function () {
                dispatch(authError("Email or password is incorrect."));
            });
    };
}

export function signupCounsellor({firstName, lastName, email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signupcounsellor`, {firstName, lastName, email, password})
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/sms');
            })
            .catch(() => {
                dispatch(authError('Username in use.'));
            });
    };
}

export function signinUser({username, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signin`, {username, password})
            .then(function (response) {
                dispatch({type: AUTH_USER});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(function () {
                dispatch(authError("Username or password is incorrect."));
            });
    };
}

export function signupUser({username, age, gender, phoneNumber, email, password}, history) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {username, age, gender, phoneNumber, email, password})
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/home');
            })
            .catch(() => {
                dispatch(authError('Username in use.'));
            });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return { type: UNAUTH_USER };
}