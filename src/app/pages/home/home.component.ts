import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import * as AuthActions from '../../state/auth/auth.actions';
import * as fromAuth from '../../state/auth/auth.reducer';
import * as PokeActions from '../../state/pokedex/pokedex.actions';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';
import { HubFacade } from 'src/app/state/hub.facade';
import { User } from 'src/app/interfaces/user.model';
import { firstValueFrom } from 'rxjs';
import { PokedexFacade } from 'src/app/state/pokedex/pokedex.facade';
import { AuthFacade } from 'src/app/state/auth/auth.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Pokedex';

  user$ = this.authFacade.user$;
  token$ = this.authFacade.token$;

  loaded$ = this.authFacade.loaded$;
  loadedPokedex$ = this.pokeFacade.loadedPokedex$;
  loadedShiny$ = this.pokeFacade.loadedShiny$;

  user!: User | null;

  constructor(
    private authFacade: AuthFacade,
    private pokeFacade: PokedexFacade,
    private hubFacade: HubFacade,
    private route: ActivatedRoute,
    private router: Router //private _sanitazer: DomSanitazer
  ) {}

  async ngOnInit() {
    //get token from state
    //auth token
    this.authFacade.getUser();
    if (this.loaded$) {
      console.log(this.loaded$);
      this.user$.subscribe((user) => {
        if (user) {
          this.user = user;
          this.pokeFacade.getAllPokemon(this.user);
          this.pokeFacade.getShinyHunts(this.user);
        }
      });
    }
    //get auth user name and role from state
    // this._store.select(fromAuth.selectName).subscribe((user:any) => this.userName = user);
    // this._store.select(fromAuth.selectUser).subscribe((user:any) => {
    //   if(user!== null ){ //get Pokemons
    //   this.store.dispatch(PokeActions.pokemonGetAll({pokemons: this.Pokemons, rank: user.dsRank}));
    //   this.store.dispatch(PokeActions.shinyGetHunts({ id: user.id}));
    // }});
  }

  pokedex() {
    this.router.navigate(['pokedex'], { relativeTo: this.route });
  }

  battle() {
    this.router.navigate(['battle'], { relativeTo: this.route });
  }

  shiny() {
    this.router.navigate(['shiny'], { relativeTo: this.route });
  }

  public signOut() {
    this.user = null;
    this.hubFacade.logOut();
  }
}
