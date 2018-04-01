import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Containers/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './src/Redux/Store/configureStore';
import { Provider } from 'react-redux';
import {
    ROOT_URL,
    BASE_URL } from './src/Redux/Actions/authActions';
import {
    AUTH_USER,
    AUTH_COUNSELLOR,
    UNAUTH
} from './src/Redux/Types/authTypes';
import { ADD_USER } from './src/Redux/Types/userTypes';
import { ADD_COUNSELLOR } from './src/Redux/Types/counsellorTypes';
import axios from "axios";

const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
    axios.post(`${ROOT_URL + BASE_URL}/roles`, {token: token})
        .then(response => {
            if (response.data.role === "counsellor") {
                store.dispatch({type: AUTH_COUNSELLOR});
                store.dispatch({
                    type: ADD_COUNSELLOR,
                    counsellor: response.data.user
                });
            } else if (response.data.role === "user") {
                store.dispatch({type: AUTH_USER});
                store.dispatch({
                    type: ADD_USER,
                    user: response.data.user
                });
            } else if (response.data.role === "none") {
                localStorage.removeItem("token");
                store.dispatch({type: UNAUTH});
            }
        });
}

ReactDOM.render((
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
