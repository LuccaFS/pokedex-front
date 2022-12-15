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

  public hp = [200, 200];

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
      this.hp[1] -= this.typeDamage(move.type, move.damage);
      if (this.hp[1] <=0){
        alert("Left sides win")
        this.hp[0] = this.hp[1] = 200;
      }else{
        this.turn=1;
      }
    }else{
      this.turn=0;
      this.hp[0] -= move.damage;
      if (this.hp[0] <=0){
        alert("Right sides win")
        this.hp[0] = this.hp[1] = 200;
      }
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

  private typeDamage(mType:string, mDamage: number): number{
    let index = 1;
    let damage = mDamage
    if(this.turn == 1){
      index = 0;
    }

    //normal moves
    if(mType == "normal"){
      if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }

    //fire moves
    else if(mType == "fire"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage*2;
      }
    }

    //water moves
    else if(mType == "water"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage/2;
      }
    }


    //grass moves
    else if(mType == "grass"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }

    //eletric moves
    else if(mType == "electric"){
      if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Electric" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage/2;
      }
    }

    //ice moves
    else if(mType == "ice"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage*2;
      }
    }

    //fighting moves
    else if(mType == "fighting"){
      if(this.PokeBattle[index].type1 == "Normal" || this.PokeBattle[index].type2 == "Normal"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Psychic" || this.PokeBattle[index].type2 == "Psychic"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = damage/2;
      }
    }

    //poison moves
    else if(mType == "posion"){
      if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = damage*2;
      }
    }

    //ground moves
    else if(mType == "ground"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Electric" || this.PokeBattle[index].type2 == "Electric"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage*2;
      }
    }

    //flying moves
    else if(mType == "flying"){
      if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }

    //psychic moves
    else if(mType == "psychic"){
      if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Psychic" || this.PokeBattle[index].type2 == "Psychic"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }

    //bug moves
    else if(mType == "bug"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Grass" || this.PokeBattle[index].type2 == "Grass"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Psychic" || this.PokeBattle[index].type2 == "Psychic"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = damage/2;
      }
    }

    //rock moves
    else if(mType == "rock"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ground" || this.PokeBattle[index].type2 == "Ground"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Flying" || this.PokeBattle[index].type2 == "Flying"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Bug" || this.PokeBattle[index].type2 == "Bug"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }

    //ghost moves
    else if(mType == "ghost"){
      if(this.PokeBattle[index].type1 == "Normal" || this.PokeBattle[index].type2 == "Normal"){
        damage = 0;
      }
      else if(this.PokeBattle[index].type1 == "Psychic" || this.PokeBattle[index].type2 == "Psychic"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = damage/2;
      }
    }

    //dragon moves
    else if(mType == "dragon"){
      if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = 0;
      }
    }

    //dark moves
    else if(mType == "dark"){
      if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Psychic" || this.PokeBattle[index].type2 == "Psychic"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Ghost" || this.PokeBattle[index].type2 == "Ghost"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = damage/2;
      }
    }

    //steel moves
    else if(mType == "steel"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Water" || this.PokeBattle[index].type2 == "Water"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Electric" || this.PokeBattle[index].type2 == "Electric"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Ice" || this.PokeBattle[index].type2 == "Ice"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Rock" || this.PokeBattle[index].type2 == "Rock"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fairy" || this.PokeBattle[index].type2 == "Fairy"){
        damage = damage*2;
      }
    }

    //fairy moves
    else if(mType == "fairy"){
      if(this.PokeBattle[index].type1 == "Fire" || this.PokeBattle[index].type2 == "Fire"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Fighting" || this.PokeBattle[index].type2 == "Fighting"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Poison" || this.PokeBattle[index].type2 == "Poison"){
        damage = damage/2;
      }
      else if(this.PokeBattle[index].type1 == "Dragon" || this.PokeBattle[index].type2 == "Dragon"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Dark" || this.PokeBattle[index].type2 == "Dark"){
        damage = damage*2;
      }
      else if(this.PokeBattle[index].type1 == "Steel" || this.PokeBattle[index].type2 == "Steel"){
        damage = damage/2;
      }
    }



    console.log("Move Type: " + mType + " | Enemy Type1: " + this.PokeBattle[index].type1+ " | Enemy Type2: " + this.PokeBattle[index].type2 +
    " | Damage effective: " + damage)


    return damage
  }


}
