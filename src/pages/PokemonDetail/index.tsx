import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';

import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import PokemonsList from 'components/PokemonsList';
import Button from 'components/Button';
import Header from 'components/Header';
import { IPokemon } from 'interfaces';
import { findCachedPokemonById } from 'operations/queries/Pokemons/cache';
import { updateCachedPokemon } from 'operations/mutations/Pokemons/cache';
import getValidationErrors from 'utils/getValidationError';
import { pokemonTypesFormArray } from 'utils/getPokemonTypes';
import {
  Container,
  Form,
  ProfileContainer,
  Image,
  TextInfo,
  InputsContainer,
  Fieldset,
  LineContainer,
  SpecialContainer,
  EvolutionContainer,
} from './styles';
import { useApolloClient } from '@apollo/client';
import { GET_POKEMONS } from 'operations/queries/Pokemons/server';
import { pokemonsStore } from 'operations';

interface EditPokemonFormData {
  name: string;
  number: string;
  classification: string;
  maxCP: string;
  maxHP: string;
  height: {
    maximum: string;
    minimum: string;
  };
}

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);
  const [isDisabled, setIsDisabled] = useState(false);

  const history = useHistory();
  const client = useApolloClient();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const cachedPokemon = findCachedPokemonById(id);

    if (cachedPokemon) {
      setPokemon(cachedPokemon);
    }
  }, [id]);

  const updateCache = useCallback(
    (pokemon: IPokemon) => {
      updateCachedPokemon(pokemon);
      client.writeQuery({
        query: GET_POKEMONS,
        variables: { count: 151 },
        data: { pokemons: pokemonsStore() },
      });
    },
    [client],
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

        updateCache(Object.assign({}, pokemon, data));

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [updateCache, pokemon, history],
  );

  const pokemonTypesForm = useMemo(() => pokemonTypesFormArray, []);

  const getPokemonEvolutions = useCallback(() => {
    if (pokemon.evolutions?.length > 0) {
      const pokemonsEvolutions = pokemon.evolutions.map((evolution) =>
        findCachedPokemonById(evolution.id),
      );

      return pokemonsEvolutions as IPokemon[];
    }

    return [] as IPokemon[];
  }, [pokemon]);

  return (
    <Container>
      <Header title="Details">
        <Link to="/">
          <FiArrowLeft size={42} />
        </Link>
      </Header>
      <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
        <ProfileContainer>
          <Image src={pokemon.image} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <TextInfo>#{pokemon.number}</TextInfo>
        </ProfileContainer>

        <InputsContainer>
          <Fieldset disabled={isDisabled}>
            <LineContainer>
              <FormInput label="Name" name="name" defaultValue={pokemon.name} />
              <FormInput
                label="Number"
                name="number"
                defaultValue={pokemon.number}
              />
              <FormInput
                label="Classification"
                name="classification"
                defaultValue={pokemon.classification}
              />
            </LineContainer>

            <LineContainer>
              <FormInput
                label="Image"
                name="image"
                defaultValue={pokemon.image}
              />
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
            </LineContainer>

            <LineContainer>
              <FormInput
                label="Min Weight"
                name="weight.minimum"
                defaultValue={pokemon.weight?.minimum}
              />
              <FormInput
                label="Max Weight"
                name="weight.maximum"
                defaultValue={pokemon.weight?.maximum}
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
                isDisabled={isDisabled}
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
                isDisabled={isDisabled}
              />
            )}

            <h4>Specials</h4>
            {pokemon.attacks?.special &&
              pokemon.attacks.special.map((pokeSpecial, index) => (
                <LineContainer key={index}>
                  <SpecialContainer>
                    <FormInput
                      label="Name"
                      name={`attacks.special[${index}].name`}
                      defaultValue={pokeSpecial.name}
                    />
                    <FormInput
                      label="Damage"
                      name={`attacks.special[${index}].damage`}
                      defaultValue={pokeSpecial.damage}
                    />
                    <FormSelect
                      label="Type"
                      name={`attacks.special[${index}].type`}
                      options={pokemonTypesForm}
                      defaultValue={{
                        value: pokeSpecial.type,
                        label: pokeSpecial.type,
                      }}
                      isDisabled={isDisabled}
                    />
                  </SpecialContainer>
                </LineContainer>
              ))}

            {getPokemonEvolutions()?.length > 0 && (
              <EvolutionContainer>
                <h4>Evolutions</h4>
                <PokemonsList
                  pokemons={getPokemonEvolutions()}
                  containerStyle={{ backgroundColor: '#232129' }}
                />
              </EvolutionContainer>
            )}
          </Fieldset>
          <Button type="submit">Salvar</Button>
        </InputsContainer>
      </Form>
    </Container>
  );
};

export default PokemonDetail;
