import 'babel-polyfill';
// import 'es5-shim';
// import 'es6-shim';
// import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from './store/routes';
import configureStore from './store/configure-store';
import rootSaga from './sagas';

 // Global styles
import './styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

store.runSaga(rootSaga);

window.store = store;

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <Router history={ history }>
        { getRoutes(store) }
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
