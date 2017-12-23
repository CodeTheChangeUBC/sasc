import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import auth from './authReducer';
import form from './formReducer';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  auth,
  form
});

export default rootReducer;