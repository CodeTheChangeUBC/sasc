// Types
export const AUTH_USER = "auth_user";
export const AUTH_COUNSELLOR = "auth_counsellor";
export const UNAUTH_USER = "unauth_user";
export const AUTH_ERROR = "auth_error";
export const REMOVE_ERROR = "remove_error";
export const SET_ROLE_USER = "set_role_user";
export const SET_ROLE_COUNSELLOR = "set_role_counsellor";
export const FETCH_NAME = 'fetch_name';

// Actions
import axios from "axios";

export const ROOT_URL = "http://localhost:3000";

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
        axios.post(`${ROOT_URL}/signincounsellor`, {email, password})
            .then(function (response) {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem("token", response.data.token);
                history.push("/");
            })
            .catch(function () {
                dispatch(authError("Email or password is incorrect."));
            });
    };
}

export function signupCounsellor({firstName, lastName, email, password}, history) {
    return function (dispatch) {
        var header = { 
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        };
        var data = {firstName, lastName, email, password};
        axios.post(`${ROOT_URL}/signupcounsellor`, data, header)
            .then(response => {
                dispatch({type: AUTH_COUNSELLOR});
                localStorage.setItem('token', response.data.token);
                history.push('/');
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
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
            .catch(error => {
                dispatch(authError(error.response.data.error));
            });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return { type: UNAUTH_USER };
}

export function checkRoleInToken(token) {
    return function(dispatch) {
        console.log("in here")
        axios.post(`${ROOT_URL}/checkrole`, {token: token})
            .then(response => {
                console.log(response);
                if (response.data === "counsellor") {
                    dispatch({type: AUTH_USER});
                } else if (response.data === "user") {
                    dispatch({type: AUTH_COUNSELLOR});
                }
            })
            .catch(error => {
                console.log("error")
                console.log(error);
            });
    };
}

// An example to see how to make authenticated requests to the server
export function fetchName() {
    return function(dispatch) {
    axios.get(`${ROOT_URL}/useronly`, {
        headers: { authorization: localStorage.getItem('token') }
    })
        .then(response => {
            dispatch({
                type: FETCH_NAME,
                payload: response.data.name
            });
            //console.log(response.data.name);
        });
    };
}
