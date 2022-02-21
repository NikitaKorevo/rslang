import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/normalize.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import App from './App';
import RootStore from './store/rootStore';

const rootStore = new RootStore();

export const Context = createContext({ rootStore });

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Context.Provider value={{ rootStore }}>
        <App />
      </Context.Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
