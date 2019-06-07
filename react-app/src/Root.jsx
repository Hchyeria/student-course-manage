import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Login from './containers/Login';
import 'semantic-ui-css/semantic.min.css';
import './styles/normalize.min.css';
import './styles/index.styl';

const store = configureStore();

const Root = () => 
    <Provider store={store}>
          <Router history={createBrowserHistory()}>
              <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/" component={App} />
              </Switch>
          </Router>
      </Provider>;


export default Root;
