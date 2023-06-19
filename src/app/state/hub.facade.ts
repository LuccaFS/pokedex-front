import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PokeActions from '../state/pokedex/pokedex.actions';

import * as AuthActions from '../state/auth/auth.actions';

@Injectable()
export class HubFacade {
  constructor(private store: Store) {}

  logOut() {
    this.store.dispatch(AuthActions.logOut());
    this.store.dispatch(PokeActions.logOut());
  }
}
