import { pokemonsVar } from 'operations';
import { IPokemon } from 'interfaces';

export const updatePokemon = (pokemon: IPokemon): void => {
  pokemonsVar(
    pokemonsVar().map((item) => {
      if (item.id === pokemon.id) {
        return pokemon;
      }

      return item;
    }),
  );
};

export const cachePokemons = (pokemons: IPokemon[]): void => {
  if (pokemonsVar().length > 0) {
    const newPokemons = pokemons.filter(
      (item) => !pokemonsVar().find((pokemonVar) => pokemonVar.id === item.id),
    );

    if (newPokemons.length > 0) pokemonsVar([...pokemonsVar(), ...newPokemons]);

    return;
  }

  pokemonsVar(pokemons);
};

const PokemonMutations = { updatePokemon, cachePokemons };

export default PokemonMutations;
