import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './../login/index';
import NavigationBar from './../navigationBar/index';
import Registration from './../registration/index';
import './app.css';

const App = () => {
  return (
    <div className='app'>
      <NavigationBar></NavigationBar>
      <div className='content'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
