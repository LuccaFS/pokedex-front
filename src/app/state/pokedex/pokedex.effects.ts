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
  ) {}

  //POKEDEX
  pokemonGetAll$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PokeActions.pokemonGetAll),
      exhaustMap((action) => {
        return from(this.pokemonService.getPokemonsAPI()).pipe(
          map((pokedexFull: any) => {
            console.log(pokedexFull.length);
            return PokeActions.pokemonGetAllSuccess({
              pokemons: this.pokemonService.filterPokemons(
                pokedexFull,
                action.rank
              ),
            });
          })
        );
      })
    );
  });

  pokemonGetAllSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(PokeActions.pokemonGetAllSuccess),
        tap(() => {
          console.log('pokedex');
        })
      );
    },
    { dispatch: false }
  );

  //SHINY HUNT
  shinyGetHunts$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PokeActions.shinyGetHunts),
      exhaustMap((action) => {
        return from(this.pokemonService.getShinyHunts(action.id)).pipe(
          map((shinyList: any) => {
            return PokeActions.shinyGetHuntsSuccess({ shinies: shinyList });
          })
        );
      })
    );
  });

  shinyGetHuntsSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(PokeActions.shinyGetHuntsSuccess),
        tap(() => {
          console.log('shiny hunt');
        })
      );
    },
    { dispatch: false }
  );

  logOut$ = createEffect(
    () => {
      return this.actions.pipe(ofType(PokeActions.logOut));
    },
    { dispatch: false }
  );
}
