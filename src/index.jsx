import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/normalize.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store.js';
import { Context } from './store/store.js';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
