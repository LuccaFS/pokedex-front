import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

import { Store } from '@ngrx/store';
import * as PokeActions from '../../state/pokedex/pokedex.actions';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';

@Component({
  selector: 'app-shiny',
  templateUrl: './shiny.component.html',
  styleUrls: ['./shiny.component.css']
})
export class ShinyComponent implements OnInit {

  public PokemonList: Pokemon[] = [];
  public selectedName: string = 'Bulbasaur';
  public Pokemon: Pokemon | undefined;

  public counter: number = 0;

  constructor(
    private store: Store,
    private _store: Store<fromPokedex.State>,
    private pokedex: PokemonService
    ) { }

  ngOnInit() {
    this._store.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) => this.PokemonList = pokeList)
    this.selected(this.selectedName);
  }


  public selected(event: any) {
    this.pokedex.getPokemonByName(event).then((pokemon) => this.Pokemon = pokemon);
  }

  public encounter(){
    this.counter+=1;
  }

  public undoCounter(){
    if(this.counter>0){
      this.counter-=1;
    }
  }

  public resetCounter(){
    this.counter = 0;
  }

}
