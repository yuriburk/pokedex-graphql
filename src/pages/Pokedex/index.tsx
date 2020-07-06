import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import PokemonsList from 'components/Pokemons/List';
import SearchBox from 'components/SearchBox';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import {
  findCachedPokemonsByName,
  GET_POKEMONS_CACHED,
} from 'operations/queries/Pokemons/cache';
import { createPokemonsCache } from 'operations/mutations/Pokemons/cache';
import { Container } from './styles';
import Header from 'components/Header';

const Pokedex: React.FC = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);

  const history = useHistory();

  const [getPokemons, { loading }] = useLazyQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count: 151 },
    onCompleted: (data) => {
      createPokemonsCache(data.pokemons);
    },
  });

  const { data: cachedData } = useQuery(GET_POKEMONS_CACHED, {
    variables: { count: 151 },
    onCompleted: (data) => {
      if (data.pokemonsCached.length === 0) {
        getPokemons();
      }
    },
  });

  const handleNavigate = useCallback(
    (pokemon: IPokemon) => history.push(`edit/${pokemon.id}`),
    [history],
  );

  const handleSearch = useCallback((value: string): void => {
    const pokemonFound = findCachedPokemonsByName(value);
    setFilteredPokemons(pokemonFound);
  }, []);

  const renderPokemons = useMemo(
    (): IPokemon[] =>
      filteredPokemons.length > 0
        ? filteredPokemons
        : cachedData?.pokemonsCached,
    [filteredPokemons, cachedData],
  );

  return (
    <Container>
      <Header title="Pokédex">
        <SearchBox
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          containerStyle={{
            width: '240px',
            height: '48px',
          }}
        />
      </Header>
      {cachedData && (
        <PokemonsList
          loading={loading}
          pokemons={renderPokemons}
          handleNavigate={handleNavigate}
        />
      )}
    </Container>
  );
};

export default Pokedex;
