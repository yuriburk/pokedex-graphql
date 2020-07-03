import React, { useEffect } from 'react';

import { Container, Item, Image, Title } from './styles';
import { IPokemon } from 'interfaces';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS, GET_POKEMONS_CACHED } from 'operations/queries/Pokemons';
import { pokemonsVar } from 'operations';

interface IListProps {
  count: number;
}

const List: React.FC<IListProps> = ({ count }) => {
  const { error, loading, data: pokemonsResponse } = useQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count },
  });
  const { data: localPokemons } = useQuery(GET_POKEMONS_CACHED);

  useEffect(() => {
    if (pokemonsResponse) {
      const newPokemons = pokemonsResponse.pokemons.filter(
        (item) =>
          !pokemonsVar().find((pokemonVar) => pokemonVar.id === item.id),
      );

      pokemonsVar([...pokemonsVar(), ...newPokemons]);
    }
  }, [pokemonsResponse]);

  const updatePokemon = (pokemon: IPokemon, name: string) => {
    console.log(pokemon);
    const updatedPokemon = Object.assign({}, pokemon);
    updatedPokemon.name = name;
    pokemonsVar(
      pokemonsVar().map((item) => {
        if (item.id === updatedPokemon.id) {
          return updatedPokemon;
        }

        return item;
      }),
    );
  };

  if (error) {
    return <div>Erro</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      {localPokemons?.pokemonsUpdated.map(
        (pokemon: IPokemon, index: number) => (
          <Item key={index} onClick={() => updatePokemon(pokemon, 'teste')}>
            <Image src={pokemon.image} alt={pokemon.name} />
            <Title>{pokemon.name}</Title>
          </Item>
        ),
      )}
    </Container>
  );
};

export default React.memo(List);
