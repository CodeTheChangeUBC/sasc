import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import smssettings from './smsReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  smssettings
});

export default rootReducer;