import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import auth from './authReducer';
import form from './formReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  auth,
  form
});

export default rootReducer;