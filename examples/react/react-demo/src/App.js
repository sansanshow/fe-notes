import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.scss';
import './assets/iconfont/iconfont.css';
import './styles/common/common.scss';
import Home from './scenes/home';
import Login from './scenes/login';

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
