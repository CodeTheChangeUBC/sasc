import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  auth: authReducer
});

export default rootReducer;