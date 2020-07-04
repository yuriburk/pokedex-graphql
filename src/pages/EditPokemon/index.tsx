import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { IPokemon } from 'interfaces';
import { GET_POKEMON } from 'operations/queries/Pokemons';
import Loading from 'components/Loading';
import { Container } from './styles';
import Input from 'components/Input';

const EditPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { loading, data } = useQuery<{ pokemon: IPokemon }>(GET_POKEMON, {
    variables: { id: history.location.state },
  });

  useEffect(() => {
    if (data) {
      setPokemon(data.pokemon);
    }
  }, [data]);

  return (
    <div>
      {loading && !data ? (
        <Loading />
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={(data) => console.log(data)}>
            <h1>Editing {pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />

            <Input name="name" defaultValue={pokemon.name} />
            <Input name="number" defaultValue={pokemon.number} />
          </Form>
        </Container>
      )}
    </div>
  );
};

export default EditPokemon;
