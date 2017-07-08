import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/Containers/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './src/Redux/Store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
