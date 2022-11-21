import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { Pokemon } from "src/app/interfaces/pokemon.model";
import { logOut, pokemonGetAllSuccess } from "./pokedex.actions";

export interface State{
  pokemonList: Pokemon[],
  hasLoaded: boolean
}

export const initialState: State = {
  pokemonList: [],
  hasLoaded: false
}

const _pokedexReducer = createReducer(
  initialState,
  on(pokemonGetAllSuccess, (state, {pokemons}) => {
    return {
      ...state,
      pokemonList: pokemons,
      hasLoaded: true
    }
  }),
  on(logOut, () => {
    return initialState;
  }),
);

export function pokedexReducer(state: State | undefined, action: Action) {
  return _pokedexReducer(state, action);
}

export const selectPokedexState =  createFeatureSelector<State>('pokedex');


export const selectPokemonList = createSelector(
  selectPokedexState,
  (state: State) => state.pokemonList
);
