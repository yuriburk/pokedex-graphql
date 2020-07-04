import React, { useCallback } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import PokemonsList from 'components/PokemonsList';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS, GET_POKEMONS_CACHED } from 'operations/queries/Pokemons';
import { cachePokemons } from 'operations/mutations/Pokemons';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [getPokemons, { loading }] = useLazyQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count: 151 },
    onCompleted: (data) => cachePokemons(data.pokemons),
  });

  const { data: cachedData } = useQuery(GET_POKEMONS_CACHED, {
    onCompleted: (data) => {
      if (data.pokemonsCached.length === 0) {
        getPokemons();
      }
    },
  });

  const history = useHistory();

  const handleNavigate = useCallback(
    (pokemon: IPokemon) => history.push('edit', pokemon.id),
    [history],
  );

  return (
    <div>
      <h1>PokeList</h1>
      <PokemonsList
        loading={loading}
        pokemons={cachedData.pokemonsCached}
        handleNavigate={handleNavigate}
      />
    </div>
  );
};

export default Dashboard;
