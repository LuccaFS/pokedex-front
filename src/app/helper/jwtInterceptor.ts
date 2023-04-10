import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap, from  } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from '../state/auth/auth.reducer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _store: Store<fromAuth.State>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    return from(this._store.select(fromAuth.selectToken)
    .pipe(
      switchMap(token => {
        const isApiUrl = request.url.startsWith('https://localhost:5001/api/Access/');
        if (token && isApiUrl) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        }
        return next.handle(request);
      })
    ));
  }
}
