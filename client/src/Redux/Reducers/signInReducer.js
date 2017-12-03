import { SIGN_IN , SIGN_OUT } from './../Actions/signInActions';

const initialState = {
  signedIn: false,
  username: null
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        signedIn: true,
        username: action.payload.username
      };
    case SIGN_OUT:
      return {
        signedIn: false,
        username: null
      };
    default:
      return state;
  }
};

export default signInReducer;