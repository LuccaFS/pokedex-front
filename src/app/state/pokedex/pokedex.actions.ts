import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';


export const pokemonGetAll = createAction(
  '[Pokemon[]] Get all Pokémon',
  props<{ pokemons: Pokemon[], rank: string }>()
)

export const pokemonGetAllSuccess = createAction(
  '[Pokemon[]] Success to Get all Pokémon',
  props<{ pokemons: Pokemon[] }>()
)

export const logOut = createAction(
  '[void] Clear pokedex'
)

