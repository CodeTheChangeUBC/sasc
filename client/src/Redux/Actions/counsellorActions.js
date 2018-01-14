import {
    ADD_COUNSELLOR,
    GET_COUNSELLOR,
    UPDATE_COUNSELLOR,
    REMOVE_COUNSELLOR,
    COUNSELLOR_ERROR,
    REMOVE_ERROR,
    PASSWORD_CHANGE
} from './../Types/counsellorTypes';
import axios from "axios";
import {config} from "./../../config";

export const ROOT_URL = config.api;
export const BASE_URL = "/counsellors";

function counsellorError(error) {
    return {
        type: COUNSELLOR_ERROR,
        payload: error
    };
}

export function renderCounsellorError(error) {
    return function (dispatch) {
        dispatch({
            type: COUNSELLOR_ERROR,
            payload: error
        });
    };
}

export function removeCounsellorError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}

export function addCounsellor(counsellor) {
    return function (dispatch) {
        if (counsellor.password) {
            delete counsellor.password;
        }
        dispatch({
            type: ADD_COUNSELLOR,
            counsellor: counsellor
        });
    };
}

export function getCounsellor(id) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                counsellorId: id
            }
        };
        axios.get(`${ROOT_URL + BASE_URL}/:counsellorId`, header)
            .then(function (response) {
                if (response.data.length !== 0) {
                    var counsellor = response.data[0];
                    if (counsellor.password) {
                        delete counsellor.password;
                    }
                    dispatch({
                        type: GET_COUNSELLOR,
                        counsellor: counsellor
                    });
                }
            })
            .catch(function (error) {
                dispatch(counsellorError(error.response.data.error));
            });
        
    };
}

export function updateCounsellor({ID, email, firstName, lastName, password}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                counsellorId: ID
            }
        };
        const data = {ID, email, firstName, lastName, password};
        // This is what it does temporarily
        if (data.password) {
            delete data.password;
        }
        dispatch({
            type: UPDATE_COUNSELLOR,
            counsellor: data
        });
        /*axios.put(`${ROOT_URL + BASE_URL}/:counsellorId`, data, header)
            .then(function (response) {
                delete data.password;
                dispatch({
                    type: UPDATE_COUNSELLOR,
                    counsellor: data,
                    success: response.data.success
                });
            })
            .catch(function (error) {
                dispatch(counsellorError(error.response.data.error));
            });*/
    };
}

export function changeCounsellorPassword({ID, oldPassword, newPassword, newPasswordConfirm}) {
    return function (dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            params: {
                counsellorId: ID
            }
        };
        const data = {ID, oldPassword, newPassword, newPasswordConfirm};
        /*axios.put(`${ROOT_URL + BASE_URL}/:counsellorId`, data, header)
            .then(function (response) {
                dispatch({
                    type: PASSWORD_CHANGE,
                    success: response.data.success
                });
            })
            .catch(function (error) {
                dispatch(counsellorError(error.response.data.error));
            });
        */
        dispatch({
            type: PASSWORD_CHANGE,
            success: "Password did not change because this is unimplemented."
        });
    };
}

export function removeCounsellor() {
    return function (dispatch) {
        dispatch({
            type: REMOVE_COUNSELLOR
        });
    };
}