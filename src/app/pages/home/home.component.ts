import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import * as AuthActions from '../../state/auth/auth.actions';
import * as fromAuth from '../../state/auth/auth.reducer';
import * as PokeActions from '../../state/pokedex/pokedex.actions';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Pokedex';


  public Pokemons: Pokemon[]  = [];

  public userName: string | null = null;
  public userRank: string | null = null;

  constructor(
    private store: Store,
    private _store: Store<fromAuth.State>,
    private _storeP: Store<fromPokedex.State>,
    private route: ActivatedRoute,
    private router: Router
    //private _sanitazer: DomSanitazer
  ){ }

  async ngOnInit(){
    //get token from state
    //auth token
    this.store.dispatch(AuthActions.getUser());
    //get auth user name and role from state
    this._store.select(fromAuth.selectName).subscribe((user:any) => this.userName = user);
    this._store.select(fromAuth.selectUser).subscribe((user:any) => {
      if(user!== null ){ //get Pokemons
      this.store.dispatch(PokeActions.pokemonGetAll({pokemons: this.Pokemons, rank: user.dsRank}));
    }});

  }

  pokedex(){
    this.router.navigate(['pokedex'], {relativeTo:this.route});
  }

  battle(){
    this.router.navigate(['battle'], {relativeTo:this.route});
  }

  shiny(){
    this.router.navigate(['shiny'], {relativeTo:this.route});
  }


  public signOut(){
    this.Pokemons = [];
    this.userName = this.userRank = null;
    this.store.dispatch(AuthActions.logOut());
    this.store.dispatch(PokeActions.logOut());
  }


}
