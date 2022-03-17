import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import Main from './pages/Main';
import WriteLetter from './components/WriteLetter';

ReactDOM.render(
  <React.StrictMode>
    <WriteLetter />
  </React.StrictMode>,
  document.getElementById('root'),
);
