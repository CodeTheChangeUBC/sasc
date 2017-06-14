import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
};