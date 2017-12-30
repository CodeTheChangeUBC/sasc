import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Containers/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './src/Redux/Store/configureStore';
import { Provider } from 'react-redux';
import {
    ROOT_URL,
    BASE_URL,
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH_USER } from './src/Redux/Actions/authActions';
import axios from "axios";

const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
    axios.post(`${ROOT_URL + BASE_URL}/checkrole`, {token: token})
        .then(response => {
            if (response.data.role === "counsellor") {
                store.dispatch({type: AUTH_COUNSELLOR});
            } else if (response.data.role === "user") {
                store.dispatch({type: AUTH_USER});
            } else if (response.data.role === "none") {
                store.dispatch({type: UNAUTH_USER});
            }
        })
        .catch(error => {
            console.log(error);
        });
}

ReactDOM.render((
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
