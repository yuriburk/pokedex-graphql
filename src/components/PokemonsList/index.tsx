import React from 'react';

import { Container, Item, Image, Title } from './styles';
import { IPokemon } from 'interfaces';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from 'apollo/queries/Pokemons';

interface IListProps {
  count: number;
}

const UPDATE_POKEMON_MUTATION = gql`
  mutation {
    updatePokemon(id: $id) @client
  }
`;

const List: React.FC<IListProps> = ({ count }) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { count },
  });
  const [updatePokemon] = useMutation(UPDATE_POKEMON_MUTATION);

  return (
    <Container>
      {data?.pokemons.map((pokemon: IPokemon, index: number) => (
        <Item
          key={index}
          onClick={() => updatePokemon({ variables: { id: pokemon.id } })}
        >
          <Image src={pokemon.image} alt={pokemon.name} />
          <Title>{pokemon.name}</Title>
        </Item>
      ))}
    </Container>
  );
};

export default React.memo(List);
