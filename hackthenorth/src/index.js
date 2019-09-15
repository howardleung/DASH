import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import Login from './Login';


ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/Home" component={Home} />
    <Route path="/Login" component={Login} />
    { /*<Route path="/something" component={Something} /> */ }
  </Switch>
</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
