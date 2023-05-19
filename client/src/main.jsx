import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <ToastContainer />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
)
