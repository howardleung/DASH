import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Home from './Home';
import Login from './Login';
import Camera from './Camera';
import Analyze from './Analyze';


ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/Home" component={Home} />
    <Route path="/Login" component={Login} />
    <Route path="/Camera" component={Camera} />
    <Route path="/Analyze" component={Analyze} />
  </Switch>
</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
