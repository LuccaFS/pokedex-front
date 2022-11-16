import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
    let token = '';
    this._store.select(fromAuth.selectToken)
      .subscribe((value: any) => (token = value));
    const isLoggedIn = token != '';
    const isApiUrl = request.url.startsWith('https://localhost:5001/api/Access/');
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request);
  }
}
