import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';

import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import Button from 'components/Button';
import Header from 'components/Header';
import { IPokemon } from 'interfaces';
import { GET_POKEMON_CACHED } from 'operations/queries/Pokemons/cache';
import { updateCachedPokemon } from 'operations/mutations/Pokemons/cache';
import getValidationErrors from 'utils/getValidationError';
import {
  Container,
  Form,
  ProfileContainer,
  Image,
  InputsContainer,
  LineContainer,
} from './styles';
import { pokemonTypesFormArray } from 'utils/getPokemonTypes';

interface EditPokemonFormData {
  name: string;
  number: string;
  maxCP: string;
  maxHP: string;
  height: {
    maximum: string;
    minimum: string;
  };
}

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { loading, data } = useQuery<{ pokemonCached: IPokemon }>(
    GET_POKEMON_CACHED,
    {
      variables: { id: history.location.state },
      onCompleted: (data) => {
        console.log('complete', data);
        setPokemon(data.pokemonCached);
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
          image: Yup.string().required('Imagem obrigatória'),
          height: Yup.object({
            minimum: Yup.string().required('Tamanho mínimo obrigatório'),
            maximum: Yup.string().required('Tamanho máximo obrigatório'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);
        const updatedPokemon = Object.assign({}, pokemon, data);
        console.log(pokemon, updatedPokemon);

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

  const pokemonTypesForm = useMemo(() => pokemonTypesFormArray, []);

  return (
    <div>
      {loading && !data ? (
        <p>Loading...</p>
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

              <LineContainer>
                <FormInput
                  label="Image"
                  name="image"
                  defaultValue={pokemon.image}
                />
              </LineContainer>

              <LineContainer>
                <FormInput
                  label="Max CP"
                  name="maxCP"
                  defaultValue={pokemon.maxCP}
                />
                <FormInput
                  label="Max HP"
                  name="maxHP"
                  defaultValue={pokemon.maxHP}
                />
                <FormInput
                  label="Min Height"
                  name="height.minimum"
                  defaultValue={pokemon.height?.minimum}
                />
                <FormInput
                  label="Max Height"
                  name="height.maximum"
                  defaultValue={pokemon.height?.maximum}
                />
              </LineContainer>

              {pokemon.resistant && (
                <FormSelect
                  label="Resistant"
                  name="resistant"
                  options={pokemonTypesForm}
                  defaultValue={pokemon.resistant.map((resistant) => ({
                    value: resistant,
                    label: resistant,
                  }))}
                  isMulti
                />
              )}

              {pokemon.weaknesses && (
                <FormSelect
                  label="Weakness"
                  name="weaknesses"
                  options={pokemonTypesForm}
                  defaultValue={pokemon.weaknesses.map((weakness) => ({
                    value: weakness,
                    label: weakness,
                  }))}
                  isMulti
                />
              )}

              <h4 style={{ marginTop: '8px' }}>Specials</h4>
              {pokemon.attacks?.special &&
                pokemon.attacks.special.map((pokeSpecial, index) => (
                  <div key={index}>
                    <p>{pokeSpecial.name}</p>
                    <LineContainer key={index}>
                      <FormSelect
                        label="Type"
                        name={`attacks.special[${index}].type`}
                        options={pokemonTypesForm}
                        defaultValue={{
                          value: pokeSpecial.type,
                          label: pokeSpecial.type,
                        }}
                      />
                      <FormInput
                        label="Damage"
                        name={`attacks.special[${index}].damage`}
                        defaultValue={pokeSpecial.damage}
                      />
                    </LineContainer>
                  </div>
                ))}

              <Button type="submit">Salvar</Button>
            </InputsContainer>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default PokemonDetail;
