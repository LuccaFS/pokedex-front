import { Pokemon, ShinyHunt, types } from './../../interfaces/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as pokeGroups from './pokemon-groups';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public api = environment.baseUrl + 'Pokemon/';
  private maxPokemon = 1017;

  constructor(private http: HttpClient) {}

  public getPokemons(): Promise<Pokemon[]> {
    let pokedex: Pokemon[] = [];
    return new Promise((resolve) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.http.get(`${this.api}GetAll`).subscribe((pokemon: any) => {
        pokemon.forEach((element: any) => {
          element.type1 = types[element.type1]; //.trim();
          element.type2 != null ? (element.type2 = types[element.type2]) : null; //.trim()
          pokedex.push(element);
        });
        resolve(pokedex);
      });
    });
  }

  public getPokemonByName(name: string): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.http
        .get(`${this.api}GetByName?PokeName=${name}`)
        .subscribe((pokemon: any) => {
          pokemon.type1 = pokemon.type1.trim();
          pokemon.type2 != null ? (pokemon.type2 = pokemon.type2.trim()) : null;
          resolve(pokemon);
        });
    });
  }

  public getPokemonById(id: string): Promise<Pokemon> {
    return new Promise((resolve) => {
      this.http
        .get(`${this.api}GetById?PokeId=${id}`)
        .subscribe((pokemon: any) => {
          pokemon.type1 = pokemon.type1.trim();
          pokemon.type2 != null ? (pokemon.type2 = pokemon.type2.trim()) : null;
          resolve(pokemon);
        });
    });
  }

  public filterPokemons(pokedex: Pokemon[], rank: string): Pokemon[] {
    if (rank == 'Pokeball') {
      pokedex = pokedex.filter((s) => s.isStarter);
    } else if (rank == 'Greatball') {
      pokedex = pokedex.filter((s) => !s.isPseudo && !s.isLegendary);
    } else if (rank == 'Ultraball') {
      pokedex = pokedex.filter((s) => !s.isLegendary);
    }
    return pokedex;
  }

  public saveShinyHunt(hunt: ShinyHunt): Promise<any> {
    return new Promise((resolve) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.http
        .post(`${this.api}Shiny/Save`, hunt, { headers })
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }

  public getShinyHunts(idTrainer: number): Promise<ShinyHunt[]> {
    let huntList = [];
    return new Promise((resolve) => {
      this.http
        .get(`${this.api}Shiny/GetTrainerHunts?idTrainer=${idTrainer}`)
        .subscribe((shinies: any) => {
          huntList = shinies;
          resolve(huntList);
        });
    });
  }

  //Pokedex API
  public getPokemonsAPI(): Promise<any> {
    let pokedex: Pokemon[] = [];
    return new Promise((resolve) => {
      this.http
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.maxPokemon}&offset=0`
        )
        .subscribe((pokemons: any) => {
          pokemons.results.forEach((element: any) => {
            this.http.get(element.url).subscribe((pokemon: any) => {
              let poke: Pokemon = {
                idPokemon: pokemon.id,
                dsName: this.capitalizeFirstLetter(pokemon.species.name),
                type1: this.capitalizeFirstLetter(pokemon.types[0].type.name),
                type2:
                  pokemon.types.length > 1
                    ? this.capitalizeFirstLetter(pokemon.types[1].type.name)
                    : null,
                generation: this.findGenaration(pokemon.id),
                image: pokemon.sprites.other['official-artwork'].front_default,
                isStarter: pokeGroups.startersId.includes(pokemon.id),
                isPseudo: pokeGroups.pseudosId.includes(pokemon.id),
                isLegendary: pokeGroups.allLegendariesId.includes(pokemon.id),
              };
              this.sortPokedex(pokedex, poke);
              if (pokedex.length == this.maxPokemon - 1) {
                resolve(pokedex);
              }
            });
          });
        });
    });
  }

  public getMoveAPI(moveNumber: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://pokeapi.co/api/v2/move/${moveNumber}/`)
        .subscribe((data: any) => {
          let move = {
            name: data.name.replace('-', ' '),
            type: data.type.name,
            damage: data.power,
            accuracy: data.accuracy,
          };
          resolve(move);
        });
    });
  }

  private findGenaration(id: number): number {
    switch (true) {
      case 151 < id && id <= 251:
        return 2;
      case 252 < id && id <= 386:
        return 3;
      case 387 < id && id <= 493:
        return 4;
      case 494 < id && id <= 649:
        return 5;
      case 650 < id && id <= 721:
        return 6;
      case 722 < id && id <= 809:
        return 7;
      case 810 < id && id <= 905:
        return 8;
      case 906 < id && id <= 1021:
        return 9;
      default:
        return 1;
    }
  }

  private capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private sortPokedex(arr: Pokemon[], val: Pokemon) {
    arr.push(val);
    let i = arr.length - 1;
    let item = arr[i];
    while (i > 0 && item.idPokemon < arr[i - 1].idPokemon) {
      arr[i] = arr[i - 1];
      i -= 1;
    }
    arr[i] = item;
    return arr;
  }
}
