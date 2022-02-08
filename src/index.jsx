import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/normalize.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import App from './App';
import Store from './store/store.js';

const store = new Store();
export const Context = createContext({ store });

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
