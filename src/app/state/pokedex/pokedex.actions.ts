import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';


export const pokemonGetAll = createAction(
  '[Pokemon[]] Get all Pokemon',
  props<{ pokemon: Pokemon[] }>()
)

export const pokemonGetAllSuccess = createAction(
  '[Pokemon[]] Success to Get all Pokemon',
  props<{ pokemon: Pokemon[] }>()
)


