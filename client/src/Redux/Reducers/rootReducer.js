import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import auth from './authReducer';
import user from './userReducer';
import smssettings from './smsReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  auth,
  user,
  smssettings
});

export default rootReducer;