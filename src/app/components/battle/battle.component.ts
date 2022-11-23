import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import * as fromPokedex from '../../state/pokedex/pokedex.reducer';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  public Pokemons: Pokemon[] = [];
  public PokeBattle: Pokemon[] = [];

  public turn: number = 0;

  public attacks: any[] = []

  constructor(
    private pokeService: PokemonService,
    private _storeP: Store<fromPokedex.State>,
  ) { }

  ngOnInit() {
    this.turn = this.getRandomInt(2);
    this._storeP.select(fromPokedex.selectPokemonList).subscribe((pokeList: any) => this.Pokemons = pokeList);
    for(let i = 0; i<2; i++){
        this.PokeBattle.push(this.Pokemons[this.getRandomInt(905)])
        this.attacks.push(this.getMoves());
    }


  }

  public makeMove(move: any){
    console.log(move.damage);
    if(this.turn==0){
      this.turn=1;
    }else{
      this.turn=0;
    }
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private getMoves(): any[]{
    let moveset: any[]= [];
    for(let i=0; i<4; i++){
      this.pokeService.getMoveAPI(this.getRandomInt(801)).then((move: any) => moveset.push(move))
    }
    return moveset;
  }


}
