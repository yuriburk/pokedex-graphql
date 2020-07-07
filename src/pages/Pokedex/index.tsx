import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import PokemonsList from 'components/PokemonsList';
import SearchBox from 'components/SearchBox';
import { IPokemon } from 'interfaces';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import { findCachedPokemonsByName } from 'operations/queries/Pokemons/cache';
import { createPokemonsCache } from 'operations/mutations/Pokemons/cache';
import { Container } from './styles';
import Header from 'components/Header';
import { pokemonsStore } from 'operations';

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>(pokemonsStore());
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);

  const [getPokemons, { loading, data }] = useLazyQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count: 151 },
  });

  useEffect(() => {
    if (pokemonsStore().length === 0) {
      getPokemons();
    }
  }, [getPokemons]);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemons);
      createPokemonsCache(data.pokemons);
    }
  }, [data]);

  const handleSearch = useCallback((value: string): void => {
    const pokemonFound = findCachedPokemonsByName(value);
    setFilteredPokemons(pokemonFound);
  }, []);

  const renderPokemons = useMemo(
    (): IPokemon[] =>
      filteredPokemons.length > 0 ? filteredPokemons : pokemons,
    [filteredPokemons, pokemons],
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
      {pokemons && <PokemonsList loading={loading} pokemons={renderPokemons} />}
    </Container>
  );
};

export default Pokedex;
