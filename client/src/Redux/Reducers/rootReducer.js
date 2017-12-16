import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import authReducer from './authReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;