import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

import { Store } from '@ngrx/store';
import * as fromAuth from '../../state/auth/auth.reducer';
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
  public userName: string = '';

  constructor(
    private _storeA: Store<fromAuth.State>,
    private _storeP: Store<fromPokedex.State>,
    private pokedex: PokemonService
    ) { }

  ngOnInit() {

    this._storeA.select(fromAuth.selectUser).subscribe((user:any) => {
      this.userName = user?.dsName;
      let counterOld: any = localStorage.getItem('counter');
      if(counterOld != null){
        counterOld = JSON.parse(counterOld);
        if(this.userName == counterOld.user){
          this.selectedName = counterOld.name
          this.counter = counterOld.count;
        }
      }
    });

    this._storeP.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) => this.PokemonList = pokeList)
    this.selected(this.selectedName);
  }


  public selected(event: any) {
    this.selectedName = event
    this.Pokemon = this.PokemonList.find(pokemon => pokemon.dsName == event);
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

  public saveCounter(){
    let shiny = {
      user: this.userName,
      name: this.selectedName,
      count: this.counter
    }
    localStorage.setItem('counter', JSON.stringify(shiny))
  }

}
