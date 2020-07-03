import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Dashboard from '../pages/Dashboard';

const Home = () => <div>Home</div>;

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
