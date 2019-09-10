import { combineReducers } from "redux";
import room from "./roomReducer";
import chat from "./chatReducer";
import auth from "./authReducer";
import user from "./userReducer";
import counsellor from "./counsellorReducer";
import sms from "./smsReducer";

const rootReducer = combineReducers({
    room,
    chat,
    auth,
    user,
    counsellor,
    sms
});

export default rootReducer;
