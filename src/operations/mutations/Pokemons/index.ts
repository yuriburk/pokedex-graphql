import { pokemonsVar } from 'operations';
import { IPokemon } from 'interfaces';

export const updatePokemon = (pokemon: IPokemon, name: string): void => {
  const updatedPokemon = Object.assign({}, pokemon);
  updatedPokemon.name = name;
  pokemonsVar(
    pokemonsVar().map((item) => {
      if (item.id === updatedPokemon.id) {
        return updatedPokemon;
      }

      return item;
    }),
  );
};

export const cacheLoadedPokemons = (pokemons: IPokemon[]): void => {
  const newPokemons = pokemons.filter(
    (item) => !pokemonsVar().find((pokemonVar) => pokemonVar.id === item.id),
  );

  pokemonsVar([...pokemonsVar(), ...newPokemons]);
};

const PokemonMutations = { updatePokemon, cacheLoadedPokemons };

export default PokemonMutations;
