import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import * as fromAuth from '../../state/auth/auth.reducer';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {



  public Pokemons: Pokemon[]  = [];

  public PokemonList: Pokemon[] = [];

  public filterOpt: boolean = false;
  public filterS: number = 0;
  public filterP: number = 0;
  public filterL: number = 0;

  constructor(
    private store: Store,
    private _store: Store<fromAuth.State>,
    private pokemon: PokemonService
  ) { }

  async ngOnInit() {

    this.store.dispatch(AuthActions.getUserRole());

    await this.pokemon.getPokemonData('', this.Pokemons)
    this.PokemonList = this.Pokemons;

    this._store.select(fromAuth.selectRank).subscribe((user:any) => {
      if(user == 'Pokeball'){
        this.filterStarter();
      }
      else if(user == 'Greatball'){
        this.filter();
      }
      else if(user == 'Ultraball'){
        this.filterL = 1;
        this.filterLegend();
      }
      else if(user == 'Masterball'){
        this.filterOpt = true;
      }
  });

  }


  public filterStarter(){
    if(this.filterS == 0){
      this.PokemonList = this.Pokemons.filter((s => s.isStarter));
      this.filterS+=1;
    }
    else if(this.filterS == 1){
      this.PokemonList = this.Pokemons.filter((s => !s.isStarter));
      this.filterS+=1;
    }
    else{
      this.PokemonList = this.Pokemons;
      this.filterS = 0;
    }

  }

  public filterPseudo(){
    if(this.filterP == 0){
      this.PokemonList = this.Pokemons.filter((s => s.isPseudo))
      this.filterP+=1;
    }
    else if(this.filterP == 1){
      this.PokemonList = this.Pokemons.filter((s => !s.isPseudo))
      this.filterP+=1;
    }
    else{
      this.PokemonList = this.Pokemons;
      this.filterP = 0;
    }
  }

  public filterLegend(){
    if(this.filterL == 0){
      this.PokemonList = this.Pokemons.filter((s => s.isLegendary))
      this.filterL+=1;
    }
    else if(this.filterL == 1){
      this.PokemonList = this.Pokemons.filter((s => !s.isLegendary))
      this.filterL+=1;
    }
    else{
      this.PokemonList = this.Pokemons;
      this.filterL = 0;
    }
  }

  public filter(){
    this.PokemonList = this.Pokemons.filter((s => s.isPseudo && s.isLegendary))
    this.filterL+=1;
  }

}
