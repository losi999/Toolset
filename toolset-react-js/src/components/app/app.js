import React from 'react';
import './app.css';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './../navigationBar/index';
import Register from './../register/index';
import Login from './../login/index';

const App = () => {
  return (
    <div className="app">
      <NavigationBar></NavigationBar>
      <div className="content">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
