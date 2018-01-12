import { NEW_MESSAGE } from "./../Types/messageTypes";
export function newMessage(data) {
    return function (dispatch) {
        const parsed = JSON.parse(data.newMessage.message);
        const payload = {room: data.room, newMessage: {user: data.newMessage.user, message: parsed.message}};

        dispatch({ type: NEW_MESSAGE, payload });
    };
}

export function transformMessageFromDbToChat(messageFromDb) {
    return function (dispatch) {

    };
}

export function transformMessageFromChatToDb(messageFromChat) {
    return function (dispatch) {

    };
}