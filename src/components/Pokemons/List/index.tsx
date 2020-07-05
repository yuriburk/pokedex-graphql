import React, { useCallback } from 'react';

import PokemonSkeleton from './Skeleton';
import { IPokemon, IPokemonTypes } from 'interfaces';
import {
  Container,
  List,
  ListItem,
  PokemonInfo,
  Title,
  TextInfo,
  SpecialContainer,
  SpecialInfoContainer,
  SpecialInfo,
  Image,
} from './styles';

interface IPokemonsListProps {
  loading: boolean;
  pokemons: IPokemon[];
  handleNavigate(pokemon: IPokemon): void;
}

const PokemonsList: React.FC<IPokemonsListProps> = ({
  loading,
  pokemons,
  handleNavigate,
}) => {
  const generateDistinctPokemonSpecialsArray = useCallback(
    (pokemon: IPokemon): IPokemonTypes[] =>
      Array.from<IPokemonTypes>(
        new Set(pokemon.attacks.special.map((s) => s.type as IPokemonTypes)),
      ),
    [],
  );

  return (
    <Container>
      {loading ? (
        <PokemonSkeleton />
      ) : (
        <List>
          {pokemons?.map((pokemon: IPokemon, index: number) => (
            <ListItem key={index} onClick={() => handleNavigate(pokemon)}>
              <PokemonInfo>
                <Image src={pokemon.image} alt={pokemon.name} />
                <Title>{pokemon.name}</Title>
                <TextInfo>#{pokemon.number}</TextInfo>
              </PokemonInfo>
              <SpecialContainer>
                {generateDistinctPokemonSpecialsArray(pokemon).map(
                  (type, index) => (
                    <SpecialInfoContainer key={index} pokemonType={type}>
                      <SpecialInfo>{type}</SpecialInfo>
                    </SpecialInfoContainer>
                  ),
                )}
              </SpecialContainer>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default React.memo(PokemonsList);
