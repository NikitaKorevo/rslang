import React from 'react';
import ReactDOM from 'react-dom';
import './scss/normalize.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
