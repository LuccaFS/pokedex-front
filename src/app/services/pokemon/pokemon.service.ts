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
  private maxPokemon = 1025;
  private maxPokemonForms = 1243;

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
      for (let i = 1; i <= this.maxPokemon; i++) {
        this.http
          .get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
          .subscribe((pokemonSpecies: any) => {
            for (let p = 0; p < pokemonSpecies.varieties.length; p++) {
              const element = pokemonSpecies.varieties[p];
              this.http.get(element.pokemon.url).subscribe((pokemon: any) => {
                let poke: Pokemon = {
                  idPokemon: i,
                  idForm: p,
                  dsName: this.adjustPokemonName(element.pokemon.name),
                  type1: this.adjustPokemonName(pokemon.types[0].type.name),
                  type2:
                    pokemon.types.length > 1
                      ? this.adjustPokemonName(pokemon.types[1].type.name)
                      : null,
                  generation: this.findGenaration(
                    pokemonSpecies.id,
                    element.pokemon.name
                  ),
                  image:
                    pokemon.sprites.other['official-artwork'].front_default,
                  isStarter: pokeGroups.startersId.includes(pokemon.id),
                  isPseudo: pokeGroups.pseudosId.includes(pokemon.id),
                  isLegendary: pokeGroups.allLegendariesId.includes(pokemon.id),
                };
                const valid = this.validForms(pokemonSpecies, p);
                if (valid == p) this.sortPokedex(pokedex, poke);
                if (pokedex.length >= this.maxPokemonForms - 1) {
                  resolve(pokedex);
                }
              });
            }
          });
      }
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

  private findGenaration(id: number, name: string): number {
    switch (true) {
      case (905 < id && id <= 1025) || name.includes('paldea'):
        return 9;
      case (809 < id && id <= 905) ||
        name.includes('galar') ||
        name.includes('hisui') ||
        name.includes('gmax'):
        return 8;
      case (721 < id && id <= 809) || name.includes('alola'):
        return 7;
      case (649 < id && id <= 721) ||
        name.includes('-mega') ||
        name.includes('primal'):
        return 6;
      case 493 < id && id <= 649:
        return 5;
      case 386 < id && id <= 493:
        return 4;
      case 251 < id && id <= 386:
        return 3;
      case 151 < id && id <= 251:
        return 2;
      default:
        return 1;
    }
  }

  private validForms(pokemon: any, index: number): number {
    const singleFormDisplay = [710, 711, 774, 778, 1007, 1008];
    switch (true) {
      case index == 0:
        return index;
      case singleFormDisplay.includes(pokemon.id) ||
        pokemon.varieties[index].pokemon.name.includes('totem'):
        return pokemon.varieties.length;
      case pokemon.id == 25 || pokemon.id == 133:
        return pokemon.varieties.length - 1;
      case pokemon.id == 718:
        return pokemon.varieties[index].pokemon.name.includes('power')
          ? index + 1
          : index;
      default:
        return index;
    }
  }

  private adjustPokemonName(text: string) {
    const hiffenNameDisplay = [
      'ho-oh',
      'type-null',
      'jangmo-o',
      'hakamo-o',
      'kommo-o',
    ];
    const singleNameDisplay = ['Pumpkaboo', 'Gourgeist', 'Minior'];
    const formNameDisplay = [
      'sunny',
      'rainy',
      'snowy',
      'origin',
      'ordinary',
      'resolute',
      'incarnate',
      'mega',
      'primal',
      'complete',
      '10',
      '50',
      'alola',
      'original',
      'gmax',
      'galar',
      'hisui',
      'paldea',
    ];
    let form = false;

    if (!hiffenNameDisplay.includes(text)) text = text.replace(/-/gi, ' ');
    const arr = text.split(' ');

    for (let i = 0; i < arr.length; i++) {
      if (formNameDisplay.includes(arr[i])) {
        form = true;
        arr[i] = '(' + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        if (arr[i] == '(10' || arr[i] == '(50') arr[i] += '%';
        if (i == arr.length - 1) arr[i] += ')';
      } else {
        if (i == arr.length - 1 && form) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ')';
        } else {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
      }
    }

    text = arr.join(' ');
    if (singleNameDisplay.includes(arr[0])) return arr[0];
    return text;
  }

  private sortPokedex(arr: Pokemon[], val: Pokemon) {
    arr.push(val);
    let i = arr.length - 1;
    let item = arr[i];
    while (
      (i > 0 && item.idPokemon < arr[i - 1].idPokemon) ||
      (item.idPokemon == arr[i - 1].idPokemon &&
        item.idForm < arr[i - 1].idForm)
    ) {
      arr[i] = arr[i - 1];
      i -= 1;
    }
    arr[i] = item;
    console.log(arr.length);
    return arr;
  }
}
