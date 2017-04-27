import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import UserListContainer from './user/UserListContainer'; // eslint-disable-line import/no-named-as-default
import AddOrEditUserContainer from './user/AddOrEditUserContainer'; // eslint-disable-line import/no-named-as-default
import createBrowserHistory from 'history/createBrowserHistory';
import HeaderNavContainer from './landing/HeaderNavContainer'; // eslint-disable-line import/no-named-as-default

const history = createBrowserHistory();

const App = () => {
  return (
    <div >
      <Router history={history}>
        <div>

          <HeaderNavContainer />

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/users" component={UserListContainer}/>
            <Route exact path="/user" component={AddOrEditUserContainer}/>
            <Route path="/user/:id" component={AddOrEditUserContainer}/>
            <Route component={PageNotFound}/>
          </Switch>

        </div>

      </Router>
    </div>
  );
};


export default App;
