import { Component, OnInit, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import * as fromAuth from '../../state/auth/auth.reducer';
import * as PokeActions from '../../state/pokedex/pokedex.actions';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  title = 'pokedex';

  public Pokemons: Pokemon[] = [];
  public PokemonList: Pokemon[] = [];

  public searchText = '';

  constructor(
    private store: Store,
    private _storeA: Store<fromAuth.State>,
    private _storeP: Store<fromPokedex.State>,
    private pokemon: PokemonService
  ) { }

  ngOnInit() {


    this._storeP.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) => this.PokemonList = this.Pokemons = pokeList)
    //await this.pokemon.getPokemons(this.PokemonList)

  }

  filterSearch(searchValue: any){
    this.PokemonList = this.Pokemons.filter((item: Pokemon) => {
      return item.dsName.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

}
