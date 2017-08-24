export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const REGISTER = 'REGISTER';

export const signIn = signInData => ({
  type: SIGN_IN,
  payload: signInData
});

export const signOut = () => ({
  type: SIGN_OUT,
  payload: null
});

export const register = () => ({
  type: REGISTER,
  payload: null
});