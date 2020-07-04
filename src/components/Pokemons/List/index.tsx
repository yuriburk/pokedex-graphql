import React, { useCallback, useMemo } from 'react';

import { IPokemon } from 'interfaces';
import Loading from 'components/Loading';
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
    (pokemon: IPokemon): string[] =>
      Array.from(new Set(pokemon.attacks.special.map((s) => s.type))),
    [],
  );

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <List>
            {pokemons?.map((pokemon: IPokemon, index: number) => (
              <ListItem key={index} onClick={() => handleNavigate(pokemon)}>
                <Image src={pokemon.image} alt={pokemon.name} />
                <PokemonInfo>
                  <Title>{pokemon.name}</Title>
                  <TextInfo>#{pokemon.number}</TextInfo>
                  <SpecialContainer>
                    {generateDistinctPokemonSpecialsArray(pokemon).map(
                      (type, index) => (
                        <SpecialInfoContainer key={index}>
                          <SpecialInfo>{type}</SpecialInfo>
                        </SpecialInfoContainer>
                      ),
                    )}
                  </SpecialContainer>
                </PokemonInfo>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default React.memo(PokemonsList);
