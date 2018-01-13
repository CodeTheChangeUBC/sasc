import { NEW_MESSAGE } from "./../Types/messageTypes";
export function newMessage(data) {
    return function (dispatch) {
        console.log(data);
        const parsed = JSON.parse(data.newMessage.message);
        const payload = {room: data.room, newMessage: {user: data.newMessage.user, message: parsed.message}};

        dispatch({ type: NEW_MESSAGE, payload });
    };
}
