import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';

import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import Button from 'components/Button';
import Header from 'components/Header';
import { SpecialContainer } from 'components/Pokemons/List/styles';
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
  SpecialsContainer,
} from './styles';

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

  const { id } = useParams();
  console.log(id);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const cachedPokemon = findCachedPokemonById(id);

    if (cachedPokemon) {
      setPokemon(cachedPokemon);
    }
  }, [id]);

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
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [pokemon],
  );

  const pokemonTypesForm = useMemo(() => pokemonTypesFormArray, []);

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
            <LineContainer>
              {pokemon.attacks?.special &&
                pokemon.attacks.special.map((pokeSpecial, index) => (
                  <SpecialsContainer key={index}>
                    <TextInfo>{pokeSpecial.name}</TextInfo>
                    <SpecialContainer>
                      <FormSelect
                        label="Type"
                        name={`attacks.special[${index}].type`}
                        options={pokemonTypesForm}
                        defaultValue={{
                          value: pokeSpecial.type,
                          label: pokeSpecial.type,
                        }}
                        controlStyles={{ width: '120px' }}
                        isDisabled={isDisabled}
                      />
                      <FormInput
                        label="Damage"
                        name={`attacks.special[${index}].damage`}
                        defaultValue={pokeSpecial.damage}
                      />
                    </SpecialContainer>
                  </SpecialsContainer>
                ))}
            </LineContainer>
          </Fieldset>

          <Button type="submit">Salvar</Button>
        </InputsContainer>
      </Form>
    </Container>
  );
};

export default PokemonDetail;
