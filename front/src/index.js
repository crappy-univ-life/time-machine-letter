import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routers from './pages/Routers';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root'),
);
