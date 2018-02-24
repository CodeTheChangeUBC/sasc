import { REMOVE_ERROR } from "./../Types/errorTypes";

export function removeError() {
    return function (dispatch) {
        dispatch({type: REMOVE_ERROR});
    };
}