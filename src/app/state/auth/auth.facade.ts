import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(fromAuth.loaded));
  user$ = this.store.pipe(select(fromAuth.selectUser));
  token$ = this.store.pipe(select(fromAuth.selectToken));

  constructor(private store: Store) {}

  getUser() {
    this.store.dispatch(AuthActions.getUser());
  }
}
