import './index.scss';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { store, App } from 'app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();