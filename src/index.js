import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './styles/index.css';
import "./firebase";

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
