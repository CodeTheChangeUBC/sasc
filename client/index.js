import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Containers/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './src/Redux/Store/configureStore';
import { Provider } from 'react-redux';
import { 
    AUTH_USER, 
    AUTH_COUNSELLOR, 
    checkRoleInToken } from './src/Redux/Actions/authActions';

const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
    // TODO: Figure out whether this is a user or a counsellor
    const user = checkRoleInToken(token);
    if (user === "user") {
        store.dispatch({ type: AUTH_USER });
    } else if (user === "counsellor") {
        store.dispatch({ type: AUTH_COUNSELLOR });
    }
    //store.dispatch({ type: AUTH_COUNSELLOR });
}

ReactDOM.render((
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
