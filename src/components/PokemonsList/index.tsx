import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { PokemonSkeleton } from '../Skeleton/Pokemons';
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
  loading?: boolean;
  pokemons: IPokemon[];
  containerStyle?: Record<string, unknown>;
}

const PokemonsList: React.FC<IPokemonsListProps> = ({
  loading,
  pokemons,
  containerStyle = {},
}) => {
  const history = useHistory();

  const generateDistinctPokemonSpecialsArray = useCallback(
    (pokemon: IPokemon): IPokemonTypes[] =>
      Array.from<IPokemonTypes>(
        new Set(pokemon.attacks.special.map((s) => s.type as IPokemonTypes)),
      ),
    [],
  );

  const handleNavigate = useCallback(
    (pokemon: IPokemon) => history.push(`/edit/${pokemon.id}`),
    [history],
  );

  return (
    <Container>
      {loading ? (
        <PokemonSkeleton />
      ) : (
        <List>
          {pokemons?.map((pokemon: IPokemon, index: number) => (
            <ListItem
              data-testid={`list-item-${pokemon.name}`}
              key={index}
              onClick={() => handleNavigate(pokemon)}
              style={containerStyle}
            >
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
