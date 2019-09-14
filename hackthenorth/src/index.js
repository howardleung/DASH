import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Camera from './Camera';
// other pages here
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Camera} />
      { /*<Route exact path="/something" component={Something} /> */ }
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);
