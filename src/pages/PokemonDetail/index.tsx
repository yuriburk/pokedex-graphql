import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Loading from 'components/Loading';
import FormInput from 'components/FormInput';
import Button from 'components/Button';
import { IPokemon } from 'interfaces';
import { GET_POKEMON_CACHED } from 'operations/queries/Pokemons/cache';
import { updateCachedPokemon } from 'operations/mutations/Pokemons/cache';
import getValidationErrors from 'utils/getValidationError';
import {
  Container,
  Form,
  ProfileContainer,
  Image,
  ProfileInfo,
  InputsContainer,
  LineContainer,
} from './styles';
import Header from 'components/Header';
import { FiArrowLeft } from 'react-icons/fi';

interface EditPokemonFormData {
  name: string;
  number: string;
}

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { error, loading, data } = useQuery<{ pokemonCached: IPokemon }>(
    GET_POKEMON_CACHED,
    {
      variables: { id: history.location.state },
      onCompleted: (data) => {
        console.log('complete', data);
        setPokemon(data.pokemonCached);
      },
    },
  );

  useEffect(() => console.log(error), [error]);

  const handleSubmit = useCallback(
    async (data: EditPokemonFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          number: Yup.string().required('Numero obrigatório'),
          image: Yup.string().required('Imagem obrigatória'),
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
          <Header title="Details">
            <FiArrowLeft size={42} onClick={() => history.goBack()} />
          </Header>
          <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
            <ProfileContainer>
              <Image src={pokemon.image} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
              <p>#{pokemon.number}</p>
              <ProfileInfo></ProfileInfo>
            </ProfileContainer>

            <InputsContainer>
              <LineContainer>
                <FormInput
                  label="Name"
                  name="name"
                  defaultValue={pokemon.name}
                />
                <FormInput
                  label="Number"
                  name="number"
                  defaultValue={pokemon.number}
                />
              </LineContainer>

              <FormInput
                label="Image"
                name="image"
                defaultValue={pokemon.image}
              />

              <LineContainer>
                <FormInput
                  label="Max CP"
                  name="maxcp"
                  defaultValue={pokemon.maxCP}
                />
                <FormInput
                  label="Max HP"
                  name="maxhp"
                  defaultValue={pokemon.maxHP}
                />
                <FormInput
                  label="Max Height"
                  name="maxheight"
                  defaultValue={pokemon.height?.maximum}
                />
                <FormInput
                  label="Min Height"
                  name="minheight"
                  defaultValue={pokemon.height?.minimum}
                />
              </LineContainer>

              <Button type="submit">Entrar</Button>
            </InputsContainer>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default PokemonDetail;
