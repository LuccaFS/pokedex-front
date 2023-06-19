import { ShinyHunt } from './../../interfaces/pokemon.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import {
  logOut,
  pokemonGetAllSuccess,
  shinyGetHuntsSuccess,
} from './pokedex.actions';

export interface State {
  pokemonList: Pokemon[];
  loadedPokemon: boolean;
  shinyHunts: ShinyHunt[];
  loadedShiny: boolean;
}

export const initialState: State = {
  pokemonList: [],
  shinyHunts: [],
  loadedPokemon: false,
  loadedShiny: false,
};

const _pokedexReducer = createReducer(
  initialState,
  on(pokemonGetAllSuccess, (state, { pokemons }) => {
    return {
      ...state,
      pokemonList: pokemons,
      loadedPokemon: true,
    };
  }),
  on(shinyGetHuntsSuccess, (state, { shinies }) => {
    return {
      ...state,
      shinyHunts: shinies,
      loadedShiny: true,
    };
  }),
  on(logOut, () => {
    return initialState;
  })
);

export function pokedexReducer(state: State | undefined, action: Action) {
  return _pokedexReducer(state, action);
}

export const selectPokedexState = createFeatureSelector<State>('pokedex');

export const selectPokemonList = createSelector(
  selectPokedexState,
  (state: State) => state.pokemonList
);

export const selectShinyList = createSelector(
  selectPokedexState,
  (state: State) => state.shinyHunts
);

export const isPokemonLoaded = createSelector(
  selectPokedexState,
  (state: State) => state.loadedPokemon
);

export const isShinyLoaded = createSelector(
  selectPokedexState,
  (state: State) => state.loadedShiny
);
