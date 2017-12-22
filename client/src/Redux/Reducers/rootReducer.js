import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import auth from './authReducer';
import form from './formReducer';
import chat from './chatReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  auth,
  form,
  chat
});

export default rootReducer;