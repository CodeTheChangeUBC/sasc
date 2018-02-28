import { combineReducers } from 'redux';
import rooms from './roomReducer';
import activeRoom from './activeRoomReducer';
import chat from './chatReducer';
import auth from './authReducer';
import user from './userReducer';
import counsellor from './counsellorReducer';
import smssettings from './smsReducer';

const rootReducer = combineReducers({
  rooms,
  activeRoom,
  chat,
  auth,
  user,
  counsellor,
  smssettings
});

export default rootReducer;