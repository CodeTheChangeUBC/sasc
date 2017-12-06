import { combineReducers } from 'redux';
import messages from './messagesReducer';
import rooms from './roomsReducer';
import activeRoom from './activeRoomReducer';
import signInReducer from './signInReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  messages,
  rooms,
  activeRoom,
  signInReducer,
  form
});

export default rootReducer;