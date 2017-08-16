import { SIGN_IN , SIGN_OUT } from './../Actions/signInActions';

const initialState = {
  signedIn: false,
  phoneNumber: null,
}

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        signedIn: true,
        phoneNumber: action.payload.phoneNumber
      };
    case SIGN_OUT:
      return {
        signedIn: false,
        phoneNumber: null
      };
    default:
      return state;
  }
}

export default signInReducer;