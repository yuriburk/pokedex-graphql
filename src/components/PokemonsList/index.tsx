import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { IPokemon } from 'interfaces';
import Button from 'components/Button';
import Loading from 'components/Loading';
import { GET_POKEMONS, GET_POKEMONS_CACHED } from 'operations/queries/Pokemons';
import { cacheLoadedPokemons } from 'operations/mutations/Pokemons';
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
  ButtonContainer,
} from './styles';

interface IPokemonsListProps {
  initialCount?: number;
}

const PokemonsList: React.FC<IPokemonsListProps> = ({ initialCount = 12 }) => {
  const [count, setCount] = useState(initialCount);

  const { loading, data } = useQuery<{
    pokemons: IPokemon[];
  }>(GET_POKEMONS, {
    variables: { count },
  });

  const { data: cachedData } = useQuery(GET_POKEMONS_CACHED);

  const history = useHistory();

  useEffect(() => {
    if (data) {
      cacheLoadedPokemons(data.pokemons);
    }
  }, [data]);

  const handleShowMore = useCallback(
    () => setCount((state) => state + state),
    [],
  );

  const handleNavigate = useCallback(
    (pokemon: IPokemon) => history.push('edit', pokemon.id),
    [history],
  );

  const generateDistinctPokemonSpecialsArray = useCallback(
    (pokemon: IPokemon): string[] =>
      Array.from(new Set(pokemon.attacks.special.map((s) => s.type))),
    [],
  );

  return (
    <Container>
      {cachedData?.pokemonsCached.length > 0 ? (
        <>
          <List>
            {cachedData?.pokemonsCached.map(
              (pokemon: IPokemon, index: number) => (
                <ListItem key={index} onClick={() => handleNavigate(pokemon)}>
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
                  <Image src={pokemon.image} alt={pokemon.name} />
                </ListItem>
              ),
            )}
          </List>
          <ButtonContainer>
            <Button
              type="button"
              onClick={handleShowMore}
              loading={loading}
              style={{ width: '150px' }}
            >
              Show More
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default React.memo(PokemonsList);
