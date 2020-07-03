import { gql } from 'apollo-boost';

interface IArgs {
  id: string;
}

const updatePokemon = (
  _: any,
  args: IArgs,
  { cache, getCacheKey }: any,
): null => {
  const id = getCacheKey({ id: args.id, __typename: 'Pokemon' });

  const fragment = gql`
    fragment pokemonToSelect on Pokemon {
      name
    }
  `;

  const pokemon = cache.readFragment({ fragment, id });
  const data = { ...pokemon, name: 'novo nome' };
  cache.writeFragment({ fragment, id, data });
  return null;
};

const PokemonMutations = {
  updatePokemon,
};

export default PokemonMutations;
