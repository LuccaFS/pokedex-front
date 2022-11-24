import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, from } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  //login User and save jwt token if successful
  loginRequest$ = createEffect(() => {
      return this.actions.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) => from(this.authService.login(action.login)).pipe(
        map((loginResponse) =>
          AuthActions.loginSuccess({ loginResponse })
        ),
        catchError((error) => of(AuthActions.loginFailure({ error })))
      )),
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(["/home"])
      })
    )},
    {dispatch: false}
  );

  loginFailure$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.loginFailure),
      tap((err)=>{
        console.log(err.error);
        alert("Error!   " + err.error.responseMessage);
      })
    )},
    {dispatch: false}
  )

  logOut$ = createEffect(() =>{
    return this.actions.pipe(
      ofType(AuthActions.logOut),
      tap(() => {
        this.router.navigate(['/login']);
      })
    )},
    {dispatch: false}
  )


  //Register new User
  register$ = createEffect(() =>{
    return this.actions.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) => from(this.authService.register(action.newUser)).pipe(
        map((registerResponse) =>
          AuthActions.registerSuccess({ registerResponse })
        ),
        catchError((error) => of(AuthActions.registerFailure({ error })))
      ))
    );
  });

  registerSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        alert("User Created");
        this.router.navigate(["/login"])
      })
    )
    },
    {dispatch: false}
  );

  registerFailure$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.registerFailure),
      tap((err) => {
        alert("Error! " + (err.error.responseMessage));
      })
    )
    },
    {dispatch: false}
  );


  //get user name by sending jwt token
  getUserName$ = createEffect(()=>{
    return this.actions.pipe(
      ofType(AuthActions.getUser),
      exhaustMap(() =>  from(this.authService.getUser()).pipe(
        map((user) =>
          AuthActions.getUserSuccess({ user })
        )
      ))
    );
    })


}


