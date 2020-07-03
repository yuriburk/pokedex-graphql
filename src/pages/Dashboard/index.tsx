import React from 'react';

import PokemonsList from 'components/PokemonsList';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>PokeList</h1>
      <PokemonsList />
    </div>
  );
};

export default Dashboard;
