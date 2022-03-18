import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import Main from './pages/Main';
import Letter from './components/Letter';
import LetterDetail from './components/LetterDetail';

ReactDOM.render(
  <React.StrictMode>
    <LetterDetail />
  </React.StrictMode>,
  document.getElementById('root'),
);
