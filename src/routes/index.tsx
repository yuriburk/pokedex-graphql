import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pokedex from 'pages/Pokedex';
import PokemonDetail from 'pages/PokemonDetail';
import NotFound from 'pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Pokedex} />
    <Route path="/edit/:id" component={PokemonDetail} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
