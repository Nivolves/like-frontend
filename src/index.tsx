import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import History from './components/History/History';
import Photos from './components/Photos/Photos';

import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Photos} />
        <Route path="/query/:path" component={Photos} />
        <Route path="/history" component={History} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root'),
);
serviceWorker.register();
