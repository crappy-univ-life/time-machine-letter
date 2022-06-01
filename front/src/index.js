import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routers from './pages/Routers';
import store from './store';
import { worker } from './__mocks__/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root'),
);
