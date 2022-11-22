import { Pokemon } from './../../interfaces/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) {  }

  public getPokemonsAPI(): Promise<any>{
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      };
      this.http.get('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0').subscribe(
        (pokemons: any) => {
          resolve(pokemons)
        }
      )
    })

  }


  public getPokemons(pokedex: Pokemon[]): Promise<Pokemon[]>{
    pokedex = [];
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      };
      this.http.get("https://localhost:5001/api/Pokemon/GetAll").subscribe(
        (pokemon: any) => {
          pokemon.forEach((element: any) => {
            element.type1 = element.type1.trim();
            element.type2!=null ? element.type2 = element.type2.trim() : null;
            pokedex.push(element)
          });
          resolve(pokedex)
        }
      )
    });
  }

  public getPokemonByName(name: string): Promise<Pokemon>{
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json'
      };
      this.http.get("https://localhost:5001/api/Pokemon/GetByName?PokeName="+name).subscribe(
        (pokemon: any) => {
          pokemon.type1 = pokemon.type1.trim();
          pokemon.type2!=null? pokemon.type2 = pokemon.type2.trim() : null;
          resolve(pokemon)
        }
      )
    });
  }


  public filterPokemons(pokedex: Pokemon[], rank: string): Pokemon[]{
        if(rank == 'Pokeball'){
          pokedex = pokedex.filter((s => s.isStarter));
        }
        else if(rank == 'Greatball'){
          pokedex = pokedex.filter((s => !s.isPseudo && !s.isLegendary));
        }
        else if(rank == 'Ultraball'){
          pokedex = pokedex.filter((s => !s.isLegendary));
        }
        return pokedex;
  }


}