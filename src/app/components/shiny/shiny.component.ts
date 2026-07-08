import { Component, OnInit } from '@angular/core';
import { Pokemons, ShinyHunt } from '../../interfaces/pokemon.model';

import { PokedexFacade } from '../../state/pokedex/pokedex.facade';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shiny',
  templateUrl: './shiny.component.html',
  styleUrls: ['./shiny.component.css'],
  standalone: false
})
export class ShinyComponent implements OnInit {
  shinyList$?: ShinyHunt[];

  public PokemonList: Pokemons[] = [];
  public selectedName: string = 'Bulbasaur';
  public Pokemon: Pokemons | undefined;

  public counter: number = 0;
  public userName: string = '';

  constructor(private pokeFacade: PokedexFacade) {}

  async ngOnInit() {
    this.shinyList$ = await firstValueFrom(this.pokeFacade.shiny$);
    this.PokemonList = await firstValueFrom(this.pokeFacade.pokedex$);
    if (this.shinyList$) {
      this.selectedName = this.shinyList$[0].pokemonName;
      this.counter = this.shinyList$[0].encounterCount;
    }

    this.selected(this.selectedName);
  }

  public selected(event: any) {
    this.selectedName = event;
    this.Pokemon = this.PokemonList.find((pokemon) => pokemon.pokemonName == event);
  }

  public encounter() {
    this.counter += 1;
  }

  public undoCounter() {
    if (this.counter > 0) {
      this.counter -= 1;
    }
  }

  public resetCounter() {
    this.counter = 0;
  }

  public saveCounter() {
    let shiny = {
      user: this.userName,
      name: this.selectedName,
      count: this.counter,
    };
    localStorage.setItem('counter', JSON.stringify(shiny));
  }
}
