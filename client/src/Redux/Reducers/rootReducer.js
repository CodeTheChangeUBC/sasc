import { combineReducers } from 'redux';
import messages from './messageReducer';
import rooms from './roomReducer';
import activeRoom from './activeRoomReducer';
import auth from './authReducer';
import user from './userReducer';
import counsellor from './counsellorReducer';
import smssettings from './smsReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  auth,
  user,
  counsellor,
  smssettings
});

export default rootReducer;