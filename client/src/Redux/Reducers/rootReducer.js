import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer'; 

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer
});

export default rootReducer;