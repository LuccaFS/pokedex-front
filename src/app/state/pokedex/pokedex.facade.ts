import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromPokedex from './pokedex.reducer';
import * as PokeActions from './pokedex.actions';

import { User } from '../../interfaces/user.model';

@Injectable()
export class PokedexFacade {
  pokedex$ = this.store.pipe(select(fromPokedex.selectPokemonList));
  loadedPokedex$ = this.store.pipe(select(fromPokedex.isPokemonLoaded));
  shiny$ = this.store.pipe(select(fromPokedex.selectShinyList));
  loadedShiny$ = this.store.pipe(select(fromPokedex.isShinyLoaded));

  constructor(private store: Store) {}

  getAllPokemon(user: User | null) {
    if(user)
      this.store.dispatch(PokeActions.pokemonGetAll({ rank: user.dsRank }));
    else
      this.store.dispatch(PokeActions.pokemonGetAll({ rank: 'Master' }));
  }

  getShinyHunts(user: User | null) {
    if(user)
      this.store.dispatch(PokeActions.shinyGetHunts({ id: user.id }));
    else
      this.store.dispatch(PokeActions.shinyGetHunts({ id: 0 }));
  }
}
