import { Pokemon, ShinyHunt } from './../../interfaces/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public api = environment.baseUrl + "Pokemon/";

  constructor(
    private http: HttpClient
  ) {  }

  public getPokemons(pokedex: Pokemon[]): Promise<Pokemon[]>{
    pokedex = [];
    return new Promise((resolve) => {
      const headers = {
        'Content-Type': 'application/json'
      };
      this.http.get(`${this.api}GetAll`).subscribe(
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
    return new Promise((resolve) => {
      this.http.get(`${this.api}GetByName?PokeName=${name}`).subscribe(
        (pokemon: any) => {
          pokemon.type1 = pokemon.type1.trim();
          pokemon.type2!=null? pokemon.type2 = pokemon.type2.trim() : null;
          resolve(pokemon)
        }
      )
    });
  }

  public getPokemonById(id: string): Promise<Pokemon>{
    return new Promise((resolve) => {
      this.http.get(`${this.api}/GetById?PokeId=${id}`).subscribe(
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

  public saveShinyHunt(hunt: ShinyHunt): Promise<any> {
    return new Promise((resolve) => {
      const headers = {
          'Content-Type': 'application/json'
        };
      this.http.post(`${this.api}Shiny/Save`, hunt, {headers}).subscribe(
        (response: any) => {
          resolve(response)
        }
      )
    });

  }

  public getShinyHunts(idTrainer: number): Promise<ShinyHunt[]>{
    let huntList = [];
    return new Promise((resolve) => {
      this.http.get(`${this.api}/Shiny/GetTrainerHunts?idTrainer=${idTrainer}`).subscribe(
        (shinies: any) => {
          huntList = shinies;
          resolve(huntList)
        }
      )
    });
  }





  //Pokedex API
  public getPokemonsAPI(): Promise<any>{
    return new Promise((resolve) => {
      this.http.get('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0').subscribe(
        (pokemons: any) => {
          resolve(pokemons)
        }
      )
    })

  }

  public getMoveAPI(moveNumber: number):  Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(`https://pokeapi.co/api/v2/move/${moveNumber}/`).subscribe(
        (data: any) => {
          let move = {
            name: data.name.replace('-', ' '),
            type: data.type.name,
            damage: data.power,
            accuracy: data.accuracy
          }
          resolve(move)
        }
      )
    })
  }



}
