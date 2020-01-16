// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch }
  from 'react-router-dom';
// import { createHistory } from 'history';
import {createBrowserHistory} from 'history';

// start

// internal modules
import store from './components/store';
// import App from './components/app';
import App from './components/app';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
