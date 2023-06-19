import { ShinyHunt } from './../../interfaces/pokemon.model';
import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';


export const pokemonGetAll = createAction(
  '[Pokemon[]] Get all Pokémon',
  props<{ rank: string }>()
)

export const pokemonGetAllSuccess = createAction(
  '[Pokemon[]] Success to Get all Pokémon',
  props<{ pokemons: Pokemon[] }>()
)


export const shinyGetHunts = createAction(
  '[ShinyHunt[]] Get Shiny Hunts from this trainer',
  props<{ id: number}>()
)

export const shinyGetHuntsSuccess = createAction(
  '[ShinyHunt[]] Success to get Shiny Hunts from this trainer',
  props<{ shinies: ShinyHunt[] }>()
)

export const logOut = createAction(
  '[void] Clear pokedex'
)

