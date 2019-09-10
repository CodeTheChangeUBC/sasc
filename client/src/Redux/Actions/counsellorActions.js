import {
    ADD_COUNSELLOR,
    GET_COUNSELLOR,
    UPDATE_COUNSELLOR,
    REMOVE_COUNSELLOR,
    COUNSELLOR_ERROR,
    PASSWORD_CHANGE,
    REMOVE_ERROR
} from "./../Types/counsellorTypes";
import axios from "axios";
import { config } from "./../../config";

export const ROOT_URL = config.api;
export const BASE_URL = "/counsellors";

export function removeError() {
    return function(dispatch) {
        dispatch({ type: REMOVE_ERROR });
    };
}

function counsellorError(error) {
    return {
        type: COUNSELLOR_ERROR,
        payload: error
    };
}

export function renderCounsellorError(error) {
    return function(dispatch) {
        dispatch({
            type: COUNSELLOR_ERROR,
            payload: error
        });
    };
}

export function addCounsellor(counsellor) {
    return function(dispatch) {
        if (counsellor) {
            if (counsellor.password) {
                delete counsellor.password;
            }
            dispatch({
                type: ADD_COUNSELLOR,
                counsellor: counsellor
            });
        } else {
            dispatch(
                counsellorError(
                    "Counsellor information cannot be added to the login session."
                )
            );
        }
    };
}

export function getCounsellor(id) {
    return function(dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            params: {
                ID: id
            }
        };
        axios
            .get(`${ROOT_URL + BASE_URL}`, header)
            .then(function(response) {
                if (
                    response.data !== null &&
                    response.data !== undefined &&
                    typeof response.data !== "string"
                ) {
                    var counsellor = response.data.counsellor;
                    if (counsellor.password) {
                        delete counsellor.password;
                    }
                    dispatch({
                        type: GET_COUNSELLOR,
                        counsellor: counsellor
                    });
                }
            })
            .catch(function(error) {
                dispatch(counsellorError(error.response.data.error));
            });
    };
}

export function updateCounsellor({ ID, email, firstName, lastName, password }) {
    return function(dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            params: {
                counsellorId: ID
            }
        };
        const data = { ID, email, firstName, lastName, password };

        axios
            .put(`${ROOT_URL + BASE_URL}`, data, header)
            .then(function(response) {
                // If successfully updated on the backend, update on frontend as well.
                if (response.data.success) {
                    if (data.password) {
                        delete data.password;
                    }

                    dispatch({
                        type: UPDATE_COUNSELLOR,
                        counsellor: data,
                        success: response.data.success
                    });
                }
            })
            .catch(function(error) {
                dispatch(counsellorError(error.response.data.error));
            });
    };
}

export function changeCounsellorPassword({ ID, oldPassword, newPassword }) {
    return function(dispatch) {
        const token = localStorage.getItem("token");
        const header = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            params: {
                ID: ID
            }
        };
        const data = { ID, oldPassword, newPassword };
        axios
            .put(`${ROOT_URL + BASE_URL}/password`, data, header)
            .then(function(response) {
                if (response.data.success) {
                    dispatch({
                        type: PASSWORD_CHANGE,
                        success: response.data.success
                    });
                }
            })
            .catch(function(error) {
                dispatch(counsellorError(error.response.data.error));
            });
    };
}

export function removeCounsellor() {
    return function(dispatch) {
        dispatch({
            type: REMOVE_COUNSELLOR
        });
    };
}
