import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './pages/Router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as serviceWorker from './serviceWorker';

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <Router />
        </Provider>,
        document.getElementById("root")
    );
    serviceWorker.unregister();
});