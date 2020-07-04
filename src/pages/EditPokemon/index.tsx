import React, { useRef, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { IPokemon } from 'interfaces';
import { GET_POKEMON_CACHED } from 'operations/queries/Pokemons/cache';
import Loading from 'components/Loading';
import FormInput from 'components/FormInput';
import Button from 'components/Button';
import getValidationErrors from 'utils/getValidationError';
import { Container } from './styles';
import { updateCachedPokemon } from 'operations/mutations/Pokemons/cache';

interface EditPokemonFormData {
  name: string;
  number: string;
}

const EditPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { loading, data } = useQuery<{ pokemonCached: IPokemon }>(
    GET_POKEMON_CACHED,
    {
      variables: { id: history.location.state },
      onCompleted: (data) => {
        setPokemon(data.pokemonCached);
        console.log(data);
      },
    },
  );

  const handleSubmit = useCallback(
    async (data: EditPokemonFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          number: Yup.string().required('Numero obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const updatedPokemon = Object.assign({}, pokemon, data);

        updateCachedPokemon(updatedPokemon);

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [history, pokemon],
  );

  return (
    <div>
      {loading && !data ? (
        <Loading />
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
            <h1>Editing {pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />

            <FormInput name="name" defaultValue={pokemon.name} />
            <FormInput name="number" defaultValue={pokemon.number} />

            <Button type="submit">Entrar</Button>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default EditPokemon;