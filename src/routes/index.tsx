import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pokedex from 'pages/Pokedex';
import PokemonDetail from 'pages/PokemonDetail';

const Error = () => <div>Error</div>;

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Pokedex} />
    <Route path="/edit" component={PokemonDetail} />
    <Route path="*" component={Error} />
  </Switch>
);

export default Routes;
