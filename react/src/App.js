import React, { Component } from 'react';
import './App.scss';
import BrowserLayout from './HOC/BrowserLayout/BrowserLayout';
import ItemInnerLayout from './HOC/ItemInnerLayout/ItemInnerLayout';
import {Route, Switch} from 'react-router-dom';


class App extends Component {

  render() {

    let routes = (
      <Switch>
          <Route path="/" exact component={BrowserLayout}></Route>
          <Route path="/:slug" component={ItemInnerLayout}></Route>
      </Switch>
    );

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
