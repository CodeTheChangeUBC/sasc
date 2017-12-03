import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import smssettings from './smsReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  smssettings,
  form
});

export default rootReducer;