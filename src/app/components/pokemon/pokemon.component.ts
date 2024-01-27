import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.model';

import { Store } from '@ngrx/store';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';

import * as pokeGroups from '../../services/pokemon/pokemon-groups';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  title = 'pokedex';

  public Pokemons: Pokemon[] = [];
  public PokemonList: Pokemon[] = [];

  public searchText = '';

  constructor(private _storeP: Store<fromPokedex.State>) {}

  ngOnInit() {
    this._storeP
      .select(fromPokedex.selectPokemonList)
      .subscribe(
        (pokeList: any) => (this.PokemonList = this.Pokemons = pokeList)
      );
    //await this.pokemon.getPokemons(this.PokemonList)
  }

  filterSearch(searchText: any) {
    const searchValue = searchText.toLowerCase();
    this.PokemonList = this.Pokemons.filter((item: Pokemon) => {
      switch (true) {
        //All Legendary Pokémon
        case searchValue == 'legendaries' || searchValue == 'all legendaries':
          return item.isLegendary;
        //Legendaries
        case searchValue == 'legends' || searchValue == 'legendary':
          return pokeGroups.legendariesId.includes(item.idPokemon);

        //Sub-legendaries
        case searchValue == 'sub-legendary' || searchValue == 'sub legendary':
          return pokeGroups.subLegendariesId.includes(item.idPokemon);
        case searchValue == 'legendary birds':
          return pokeGroups.legendaryBirdsId.includes(item.idPokemon);
        case searchValue == 'legendary beasts':
          return (
            pokeGroups.legendaryBeastsId.includes(item.idPokemon) &&
            item.idPokemon < 1000
          );
        case searchValue == 'regis':
          return pokeGroups.regisId.includes(item.idPokemon);

        case searchValue == 'swords of justice':
          return (
            (pokeGroups.swordsJusticeId.includes(item.idPokemon) &&
              item.idPokemon < 1000) ||
            item.idPokemon == 647
          );

        case searchValue == 'forces of nature':
          return pokeGroups.forcesNatureId.includes(item.idPokemon);

        case searchValue == 'treasures of ruin':
          return pokeGroups.treasuresRuinId.includes(item.idPokemon);

        case searchValue == 'loyal three' || searchValue == 'lousy three':
          return pokeGroups.loyalThreeId.includes(item.idPokemon);

        case searchValue == 'kitakami':
          return (
            pokeGroups.loyalThreeId.includes(item.idPokemon) ||
            (item.idPokemon == 1017 && item.idForm == 0) ||
            item.idPokemon == 1025
          );

        //Mythicals
        case searchValue == 'myths' ||
          searchValue == 'mythical' ||
          searchValue == 'mythicals':
          return pokeGroups.mythicalsId.includes(item.idPokemon);

        //Ultra Beasts
        case searchValue == 'ub' ||
          searchValue == 'ultra beasts' ||
          searchValue == 'ultra beast':
          return pokeGroups.ultraBeastsId.includes(item.idPokemon);

        //All Paradoxes
        case searchValue == 'paradox':
          return pokeGroups.paradoxesId.includes(item.idPokemon);
        //Past Paradoxes
        case searchValue == 'paradox past' ||
          searchValue == 'past' ||
          searchValue == 'past paradox':
          return pokeGroups.pastParadoxesId.includes(item.idPokemon);
        //Future Paradoxes
        case searchValue == 'paradox future' ||
          searchValue == 'future' ||
          searchValue == 'future paradox':
          return pokeGroups.futureParadoxesId.includes(item.idPokemon);
        //Specific Paradoxes
        case searchValue == 'donphan paradox':
          return (
            item.idPokemon == 232 ||
            item.idPokemon == 984 ||
            item.idPokemon == 990
          );
        case searchValue == 'volcarona paradox':
          return (
            item.idPokemon == 637 ||
            item.idPokemon == 988 ||
            item.idPokemon == 994
          );
        case searchValue == 'cyclizar paradox':
          return (
            item.idPokemon == 967 ||
            item.idPokemon == 1007 ||
            item.idPokemon == 1008
          );
        case searchValue == 'jigglypuff paradox':
          return item.idPokemon == 39 || item.idPokemon == 985;
        case searchValue == 'amoonguss paradox':
          return item.idPokemon == 591 || item.idPokemon == 986;
        case searchValue == 'misdreavus paradox':
          return item.idPokemon == 200 || item.idPokemon == 987;
        case searchValue == 'magneton paradox':
          return item.idPokemon == 82 || item.idPokemon == 989;
        case searchValue == 'salamence paradox':
          return item.idPokemon == 373 || item.idPokemon == 1005;
        case searchValue == 'delibird paradox':
          return item.idPokemon == 225 || item.idPokemon == 991;
        case searchValue == 'hariyama paradox':
          return item.idPokemon == 297 || item.idPokemon == 992;
        case searchValue == 'hydreigon paradox':
          return item.idPokemon == 635 || item.idPokemon == 993;
        case searchValue == 'tyranitar paradox':
          return item.idPokemon == 248 || item.idPokemon == 995;
        case searchValue == 'gardevoir paradox' ||
          searchValue == 'gallade paradox':
          return (
            item.idPokemon == 282 ||
            item.idPokemon == 475 ||
            item.idPokemon == 1006
          );
        case searchValue == 'beasts paradox' ||
          searchValue == 'legendary beasts paradox':
          return pokeGroups.legendaryBeastsId.includes(item.idPokemon);

        case searchValue == 'swords paradox' ||
          searchValue == 'swords of justice paradox':
          return pokeGroups.swordsJusticeId.includes(item.idPokemon);

        //Starters
        case searchValue == 'starter' ||
          searchValue == 'starters' ||
          searchValue == 'first partner':
          return item.isStarter;

        //Pseudos
        case searchValue == 'pseudo':
          return item.isPseudo;

        //regions
        case searchValue == 'kanto':
          return item.generation == 1;
        case searchValue == 'johto':
          return item.generation == 2;
        case searchValue == 'hoenn':
          return item.generation == 3;
        case searchValue == 'sinoh':
          return item.generation == 4;
        case searchValue == 'unova':
          return item.generation == 5;
        case searchValue == 'kalos':
          return item.generation == 6;
        case searchValue == 'alola':
          return item.generation == 7;
        case searchValue == 'galar':
          return item.generation == 8 && item.idPokemon < 899;
        case searchValue == 'hisui':
          return item.generation == 8 && item.idPokemon > 898;
        case searchValue == 'paldea':
          return item.generation == 9 && item.idPokemon < 1009;

        default:
          return (
            item.dsName.toLowerCase().includes(searchValue) ||
            item.idPokemon.toString().includes(searchValue)
          );
      }
    });
    console.log(this.PokemonList.length);
    if (this.PokemonList.length < 1) this.PokemonList = this.Pokemons;
  }
}
