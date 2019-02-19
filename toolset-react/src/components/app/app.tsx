import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'src/components/app/app.css';
import Login from 'src/components/auth/login/index';
import Registration from 'src/components/auth/registration/index';
import NavigationBar from 'src/components/navigationBar/index';

const App: React.FC<{}> = () => {
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
