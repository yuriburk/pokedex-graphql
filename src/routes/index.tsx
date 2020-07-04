import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';
import Dashboard from 'pages/Dashboard';
import EditPokemon from 'pages/EditPokemon';

const Error = () => <div>Error</div>;

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/edit" component={EditPokemon} />
    <Route path="*" component={Error} />
  </Switch>
);

export default Routes;
