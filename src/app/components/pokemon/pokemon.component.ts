import { Component, OnInit, } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.model';

import { Store } from '@ngrx/store';
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
    private _storeP: Store<fromPokedex.State>,
  ) { }

  ngOnInit() {


    this._storeP.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) => this.PokemonList = this.Pokemons = pokeList)
    //await this.pokemon.getPokemons(this.PokemonList)

  }

  filterSearch(searchText: any){
    const searchValue = searchText.toLowerCase();
    this.PokemonList = this.Pokemons.filter((item: Pokemon) => {
      //Special cases
      if(searchValue=="legends" || searchValue=="legendary"){ //Legendary
        return item.isLegendary;

      }else if(searchValue=="ub" || searchValue=="ultra beasts"){ //Ultra Beasts
        return item.idPokemon>792 && item.idPokemon<807;

      }else if(searchValue=="paradox"){ //All Paradox
        return item.idPokemon>=984 && item.idPokemon<=995 || item.idPokemon>=1005 && item.idPokemon<=1008;

      }else if(searchValue=="paradox past" || searchValue=="past" || searchValue=="past paradox"){ //Past Paradox
        return item.idPokemon>=984 && item.idPokemon<990 || item.idPokemon==1005 || item.idPokemon==1007;

      }else if(searchValue=="paradox future"|| searchValue=="future" || searchValue=="future paradox"){ //Future Paradox
        return item.idPokemon>989 && item.idPokemon<=995 || item.idPokemon==1006 || item.idPokemon==1008;

      //Specific paradox cases
      }else if(searchValue=="donphan paradox"){
        return item.idPokemon==232 || item.idPokemon==984 || item.idPokemon==990;
      }else if(searchValue=="volcarona paradox"){
        return item.idPokemon==637 || item.idPokemon==988 || item.idPokemon==994;
      }else if(searchValue=="cyclizar paradox"){
        return item.idPokemon==967 || item.idPokemon==1007 || item.idPokemon==1008;

      }else if(searchValue=="jigglypuff paradox"){
        return item.idPokemon==39 || item.idPokemon==985;
      }else if(searchValue=="amoonguss paradox"){
        return item.idPokemon==591 || item.idPokemon==986;
      }else if(searchValue=="misdreavus paradox"){
        return item.idPokemon==200 || item.idPokemon==987;
      }else if(searchValue=="magneton paradox"){
        return item.idPokemon==82 || item.idPokemon==989;
      }else if(searchValue=="salamence paradox"){
        return item.idPokemon==373 || item.idPokemon==1005;

      }else if(searchValue=="delibird paradox"){
        return item.idPokemon==225 || item.idPokemon==991;
      }else if(searchValue=="hariyama paradox"){
        return item.idPokemon==297 || item.idPokemon==992;
      }else if(searchValue=="hydreigon paradox"){
        return item.idPokemon==635 || item.idPokemon==993;
      }else if(searchValue=="tyranitar paradox"){
        return item.idPokemon==248 || item.idPokemon==995;
      }else if(searchValue=="gardevoir paradox" || searchValue=="gallade paradox"){
        return item.idPokemon==282 || item.idPokemon==475 || item.idPokemon==1006;


      }else{ //normal search
        return item.dsName.toLowerCase().includes(searchValue) || item.idPokemon == +searchText;
      }
    });
  }

}
