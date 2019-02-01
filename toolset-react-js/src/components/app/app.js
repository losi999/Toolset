import React from 'react';
import './app.css';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './../navigationBar/index';
import Registration from './../registration/index';
import Login from './../login/index';

const App = () => {
  return (
    <div className="app">
      <NavigationBar></NavigationBar>
      <div className="content">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
