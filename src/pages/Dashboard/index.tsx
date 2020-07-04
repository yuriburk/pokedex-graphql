import React, { useCallback } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import PokemonsList from 'components/Pokemons/List';
import SearchBox from 'components/SearchBox';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import { GET_POKEMONS_CACHED } from 'operations/queries/Pokemons/cache';
import { createPokemonsCache } from 'operations/mutations/Pokemons/cache';

const Dashboard: React.FC = () => {
  const [getPokemons, { loading }] = useLazyQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count: 151 },
    onCompleted: (data) => createPokemonsCache(data.pokemons),
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
      <SearchBox onChange={(e) => console.log(e.target.value)} />
      <PokemonsList
        loading={loading}
        pokemons={cachedData.pokemonsCached}
        handleNavigate={handleNavigate}
      />
    </div>
  );
};

export default Dashboard;
