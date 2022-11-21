import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.model';

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
  public selectedName: string = '';
  public hunted: Pokemon | undefined;

  constructor(
    private store: Store,
    private _store: Store<fromPokedex.State>,
    ) { }

  ngOnInit() {
    this._store.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) =>{ this.PokemonList = pokeList
    console.log(this.PokemonList)})
  }


  selected(event: any) {
    console.log(event);
}

}
