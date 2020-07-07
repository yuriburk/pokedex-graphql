import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pokedex from 'pages/Pokedex';
import PokemonDetail from 'pages/PokemonDetail';

const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>NotFound</p>
  </div>
);

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Pokedex} />
    <Route path="/edit/:id" component={PokemonDetail} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
