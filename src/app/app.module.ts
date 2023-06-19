import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { AuthFacade } from './state/auth/auth.facade';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwtInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { pokedexReducer } from './state/pokedex/pokedex.reducer';
import { PokedexEffects } from './state/pokedex/pokedex.effects';
import { PokedexFacade } from './state/pokedex/pokedex.facade';
import { HubFacade } from './state/hub.facade';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { auth: authReducer, pokedex: pokedexReducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([AuthEffects, PokedexEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    HubFacade,
    AuthFacade,
    PokedexFacade,
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {
  constructor() {}
}
