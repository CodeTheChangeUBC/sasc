import {
    N,
    NEW_MESSAGE
 } from './../Types/messageTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.activeRoom, action) {
  switch(action.type) {
    /*case 'N':
      return [...state, action.message];*/
    case NEW_MESSAGE:
        return {...state, messages: action.message};
    default:
      return state;
  }
}