import React from 'react';
import ReactDOM from 'react-dom/client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './features';

import App from './App';
import './index.css';

const store = configureStore({ reducer });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
