import { Component, OnInit } from '@angular/core';
import { Pokemons } from '../../interfaces/pokemon.model';

import { Store } from '@ngrx/store';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';
import { CommonService } from '../../services/common/common-service';

import { PokemonTypes } from '../../interfaces/enum.model';
import { DropdownModel } from '../../interfaces/response.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  standalone: false,
})
export class PokemonComponent implements OnInit {
  title = 'pokedex';

  public Pokemons: Pokemons[] = [];
  public PokemonList: Pokemons[] = [];
  PokemonType = PokemonTypes;

  public TypeList: DropdownModel[] = [];
  public FormList: DropdownModel[] = [];
  public GroupList: DropdownModel[] = [];
  public GenerationList: DropdownModel[] = [];

  public TypeControl = new FormControl<DropdownModel[]>([]);
  public FormControl = new FormControl<DropdownModel[]>([]);
  public GroupControl = new FormControl<DropdownModel[]>([]);
  public GenerationControl = new FormControl<DropdownModel[]>([]);

  public searchText = '';
  public searchValue = '';

  constructor(
    private _storeP: Store<fromPokedex.State>,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this._storeP
      .select(fromPokedex.selectPokemonList)
      .subscribe(
        (pokeList: any) => (this.PokemonList = this.Pokemons = pokeList),
      );
    this.getDropdowns();
  }

  filterSearch(searchText: any) {
    this.searchValue = searchText.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.PokemonList = this.Pokemons
    if (this.searchText) {
      this.PokemonList = this.PokemonList.filter((item: Pokemons) => {
        switch (true) {
          //Specific Regions
          case this.searchValue == 'galar':
            return(
              item.pokemonName.toLowerCase().includes('galar') ||
              ((item.baseFormNumber ?? item.pokemonNumber) < 899 &&
              (item.generation == 8))
          );

          case this.searchValue == 'hisui':
            return(
              item.pokemonName.toLowerCase().includes('hisui') ||
              ((item.baseFormNumber ?? item.pokemonNumber) >= 899 &&
              ((item.baseFormNumber ?? item.pokemonNumber) <= 905))
          );

          case this.searchValue == 'paldea':
            return(
              item.pokemonName.toLowerCase().includes('paldea') ||
              ((item.baseFormNumber ?? item.pokemonNumber) < 1011 &&
              (item.generation == 9)) ||
              ((item.baseFormNumber ?? item.pokemonNumber) > 1019 &&
              (item.baseFormNumber ?? item.pokemonNumber) < 1025&&
              (item.generation == 9))
          );
          
          case this.searchValue == 'kitakami':
            return(
              item.pokemonNumber == 1025 ||
              ((item.baseFormNumber ?? item.pokemonNumber) >= 1011 &&
              ((item.baseFormNumber ?? item.pokemonNumber) <= 1017))
          );
          
          case this.searchValue == 'blueberry academy':
            return(
              ((item.baseFormNumber ?? item.pokemonNumber) == 1018 ||
              ((item.baseFormNumber ?? item.pokemonNumber) == 1019))
          );

          //Specific Paradoxes
          case this.searchValue == 'donphan paradox':
            return (
              item.pokemonNumber == 232 ||
              item.pokemonNumber == 984 ||
              item.pokemonNumber == 990
            );
          case this.searchValue == 'volcarona paradox':
            return (
              item.pokemonNumber == 637 ||
              item.pokemonNumber == 988 ||
              item.pokemonNumber == 994
            );
          case this.searchValue == 'cyclizar paradox':
            return (
              item.pokemonNumber == 967 ||
              item.pokemonNumber == 1007 ||
              item.pokemonNumber == 1008
            );
          case this.searchValue == 'jigglypuff paradox':
            return item.pokemonNumber == 39 || item.pokemonNumber == 985;
          case this.searchValue == 'amoonguss paradox':
            return item.pokemonNumber == 591 || item.pokemonNumber == 986;
          case this.searchValue == 'misdreavus paradox':
            return item.pokemonNumber == 200 || item.pokemonNumber == 987;
          case this.searchValue == 'magneton paradox':
            return item.pokemonNumber == 82 || item.pokemonNumber == 989;
          case this.searchValue == 'salamence paradox':
            return item.pokemonNumber == 373 || item.pokemonNumber == 1005;
          case this.searchValue == 'delibird paradox':
            return item.pokemonNumber == 225 || item.pokemonNumber == 991;
          case this.searchValue == 'hariyama paradox':
            return item.pokemonNumber == 297 || item.pokemonNumber == 992;
          case this.searchValue == 'hydreigon paradox':
            return item.pokemonNumber == 635 || item.pokemonNumber == 993;
          case this.searchValue == 'tyranitar paradox':
            return item.pokemonNumber == 248 || item.pokemonNumber == 995;
          case this.searchValue == 'gardevoir paradox' ||
            this.searchValue == 'gallade paradox':
            return (
              item.pokemonNumber == 282 ||
              item.pokemonNumber == 475 ||
              item.pokemonNumber == 1006
            );

          default:
            return item.pokemonName.toLowerCase().includes(this.searchValue) ||
              (item.baseFormNumber?.toString() ?? item.pokemonNumber.toString()).includes(this.searchValue);
        }
      });
    }
    //fall-back text search
    if(this.PokemonList.length < 1)
      this.PokemonList = this.Pokemons

    let typeFilter = this.TypeControl.value?.map(({ id }) => id) ?? [];
    if (typeFilter.length > 0)
      this.PokemonList = this.PokemonList.filter(
        (p) =>
          typeFilter.includes(p.type1) ||
          (p.type2 != null && typeFilter.includes(p.type2))
      );


    let formFilter = this.FormControl.value?.map(({ id }) => id) ?? [];
    if (formFilter.length > 0)
      this.PokemonList = this.PokemonList.filter(
        (p) =>
          p.formGroupId != null && formFilter.includes(p.formGroupId)
      );

    let groupFilter = this.GroupControl.value?.map(({ id }) => id) ?? [];
    if (groupFilter.length > 0)
      this.PokemonList = this.PokemonList.filter(
        (p) =>
          p.pokemonGroupId != null && groupFilter.includes(p.pokemonGroupId)
      );

    let genFilter = this.GenerationControl.value?.map(({ id }) => id) ?? [];
    if (genFilter.length > 0)
      this.PokemonList = this.PokemonList.filter(
        (p) =>
          genFilter.includes(p.generation)
      );
  }

  public getImage(Pokemon: Pokemons): string {
    if (Pokemon?.baseFormNumber == null && Pokemon.pokemonNumber >= 1026) {
      return `https://windswaves.pokemon.com/_images/feb_27_2026/${Pokemon?.pokemonName?.toLowerCase()}.png`;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${Pokemon?.pokemonNumber}.png`;
    }
  }

  public async getDropdowns() {
    await this.commonService.getTypesDropdown().then((types) => {
      this.TypeList = types;
    });
    await this.commonService.getFormGroupsDropdown().then((forms) => {
      this.FormList = forms;
    });
    await this.commonService.getPokemonGroupsDropdown().then((groups) => {
      this.GroupList = groups;
    });
    this.GenerationList = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
      { id: 5, name: '5' },
      { id: 6, name: '6' },
      { id: 7, name: '7' },
      { id: 8, name: '8' },
      { id: 9, name: '9' },
      { id: 10, name: '10' },
    ];
  }

  onRemoved(element: DropdownModel, elementName: string) {
    if (elementName == 'type') {
      const control = this.TypeControl.value as DropdownModel[];
      this.removeFirst(control, element);
      this.TypeControl.setValue(control); // To trigger change detection
    }
    if (elementName == 'form') {
      const control = this.FormControl.value as DropdownModel[];
      this.removeFirst(control, element);
      this.FormControl.setValue(control); // To trigger change detection
    }
    if (elementName == 'group') {
      const control = this.GroupControl.value as DropdownModel[];
      this.removeFirst(control, element);
      this.GroupControl.setValue(control); // To trigger change detection
    }
    if (elementName == 'gen') {
      const control = this.GenerationControl.value as DropdownModel[];
      this.removeFirst(control, element);
      this.GenerationControl.setValue(control); // To trigger change detection
    }
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
