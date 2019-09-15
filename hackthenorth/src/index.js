import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Camera from './Camera';
import Analyze from './Analyze';
// other pages here
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Camera} />
      <Route path="/analyze" component={Analyze} />
      {/* <Route path="/camera" component={Camera} /> */}
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);
