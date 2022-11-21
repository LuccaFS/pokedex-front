import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, from } from 'rxjs';

import { PokemonService } from './../../services/pokemon/pokemon.service';
import * as PokeActions from './pokedex.actions';

@Injectable()
export class PokedexEffects {

  constructor(
    private actions: Actions,
    private pokemonService: PokemonService
  ) { }

  pokemonGetAll$ = createEffect(() => {
    console.log()
    return this.actions.pipe(
      ofType(PokeActions.pokemonGetAll),
      exhaustMap((action) => {
        return from(this.pokemonService.getPokemons(action.pokemons)).pipe(
          map((pokedexFull: any) => {
            return PokeActions.pokemonGetAllSuccess({ pokemons: this.pokemonService.filterPokemons(pokedexFull, action.rank) })
          })
        )
      })
    )
  },
    { dispatch: true }
    )

  pokemonGetAllSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PokeActions.pokemonGetAllSuccess),
      tap(() => {
        console.log('pokedex')
      })
    )
  },
    { dispatch: false }
  );


  logOut$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PokeActions.logOut)
    )
  },
    { dispatch: false }
  )

}


