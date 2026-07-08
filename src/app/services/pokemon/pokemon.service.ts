import {
  Pokemons,
  PokemonTypes,
  ShinyHunt,
} from './../../interfaces/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as pokeGroups from './pokemon-groups';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public api = environment.baseUrl + 'Pokemon/';
  private maxPokemon = 1025;
  private maxPokemonForms = 1295;

  constructor(private http: HttpClient) {}

  public getPokemons(): Promise<Pokemons[]> {
    return new Promise((resolve) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.http.get(`${this.api}GetAll`).subscribe((pokemons: any) => {
        resolve(pokemons);
      });
    });
  }

  public getPokemonByName(name: string): Promise<Pokemons> {
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

  public getPokemonById(id: string): Promise<Pokemons> {
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

  public filterPokemons(pokedex: Pokemons[], rank: string): Pokemons[] {
    if (rank == 'Pokeball') {
      pokedex = pokedex.filter((s) => s.pokemonGroupId == 1);
    } else if (rank == 'Greatball') {
      pokedex = pokedex.filter((s) => s.pokemonGroupId == null 
      || s.pokemonGroupId == 1
      || s.pokemonGroupId == 2
      || s.pokemonGroupId == 6);
    } else if (rank == 'Ultraball') {
      pokedex = pokedex.filter((s) => s.pokemonGroupId !== 4 &&
       s.pokemonGroupId !== 5);
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
    let pokedex: Pokemons[] = [];
    console.log('teste');
    return new Promise((resolve) => {
      for (let i = 1; i <= this.maxPokemon; i++) {
        this.http
          .get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
          .subscribe((pokemonSpecies: any) => {
            for (let p = 0; p < pokemonSpecies.varieties.length; p++) {
              const element = pokemonSpecies.varieties[p];
              this.http.get(element.pokemon.url).subscribe((pokemon: any) => {
                let groupId = pokeGroups.pokemonGroupsList.includes(pokemonSpecies.id);
                let formId = this.findFormGroup(
                  pokemonSpecies.id,
                  element.pokemon.name,
                  element.is_default,
                );
                let poke: Pokemons = {
                  pokemonNumber: pokemon.id,
                  pokemonName: this.adjustPokemonName(element.pokemon.name),
                  type1: this.typeFormat(pokemon.types[0].type.name),
                  type2:
                    pokemon.types.length > 1
                      ? this.typeFormat(pokemon.types[1].type.name)
                      : null,
                  generation: this.findGenaration(pokemonSpecies.id),
                  evolutionStage:
                    pokemonSpecies.evolves_from_species == null ? 1 : 2,
                  previousEvolutionNumber: null,
                  hasPokemonGroup: groupId,
                  pokemonGroupId: groupId ? this.findGroup(i) : null,
                  formGroupId: formId != 0 ? formId : null,
                  baseFormNumber: formId != 0 ? i : null,
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

  private findGenaration(id: number): number {
    switch (true) {
      case 151 < id && id <= 251:
        return 2;
      case 251 < id && id <= 386:
        return 3;
      case 386 < id && id <= 493:
        return 4;
      case 493 < id && id <= 649:
        return 5;
      case 649 < id && id <= 721:
        return 6;
      case 721 < id && id <= 809:
        return 7;
      case 809 < id && id <= 905:
        return 8;
      case 905 < id && id <= 1025:
        return 9;
      default:
        return 1;
    }
  }

  private findGroup(id: number): number {
    switch (true) {
      case pokeGroups.fossilId.includes(id):
        return 2;
      case pokeGroups.pseudosId.includes(id):
        return 3;
      case pokeGroups.legendariesId.includes(id):
        return 4;
      case pokeGroups.subLegendariesId.includes(id):
        return 4;
      case pokeGroups.mythicalsId.includes(id):
        return 5;
      case pokeGroups.babyId.includes(id):
        return 6;
      case pokeGroups.ultraBeastsId.includes(id):
        return 7;
      default:
        return 1;
    }
  }

  private validForms(pokemon: any, index: number): number {
    const singleFormDisplay = [710, 711, 744, 774, 778, 1007, 1008];
    switch (true) {
      case index == 0:
        return index;
      case singleFormDisplay.includes(pokemon.id) ||
        pokemon.varieties[index].pokemon.name.includes('totem'):
        return pokemon.varieties.length;
      case pokemon.id == 25 || pokemon.id == 133:
        return pokemon.varieties.length - 1;
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
      'tapu-koko',
      'tapu-lele',
      'tapu-bulu',
      'tapu-fini',
      'wo-chien',
      'chien-pao',
      'ting-lu',
      'chi-yu'
    ];
    const singleNameDisplay = ['Pumpkaboo', 'Gourgeist', 'Minior', 'Rockruff'];

    if (!hiffenNameDisplay.includes(text))
      text = text.replace('-', ' ').replace('-', ' ').replace('-', ' ');
    const arr = text.split(' ');

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      if (i == 1)
        arr[i] = '(' + arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ')';
    }

    text = arr.join(' ');
    if (singleNameDisplay.includes(arr[0])) return arr[0];
    return text;
  }

  private sortPokedex(arr: Pokemons[], val: Pokemons) {
    arr.push(val);
    const byParent = new Map<number | null, Pokemons[]>();

    // Group children by parentId
    for (const i of arr) {
      const group = byParent.get(i.baseFormNumber) ?? [];
      group.push(i);
      byParent.set(i.baseFormNumber, group);
    }

    // Sort each group by id
    for (const group of byParent.values()) {
      group.sort((a, b) => a.pokemonNumber - b.pokemonNumber);
    }

    const result: Pokemons[] = [];

    function visit(parentId: number | null) {
      for (const item of byParent.get(parentId) ?? []) {
        result.push(item);
        visit(item.pokemonNumber);
      }
    }

    visit(null);

    return result;
  }

  private typeFormat(type: string) {
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return PokemonTypes[type as keyof typeof PokemonTypes];
  }

  private findFormGroup(id: number, name: string, isDefault: boolean): number {
    switch (true) {
      case isDefault:
        return 0;
      case pokeGroups.futureParadoxesId.includes(id):
        return 10;
      case pokeGroups.pastParadoxesId.includes(id):
        return 9;
      case pokeGroups.convergentId.includes(id):
        return 8;
      case name.includes('-paldea'):
        return 7;
      case name.includes('-hisui'):
        return 6;
      case name.includes('-gmax'):
        return 5;
      case name.includes('-galar'):
        return 4;
      case name.includes('-alola'):
        return 3;
      case name.includes('-mega'):
        return 2;
      case name.includes('-mega'):
        return 2;
      default:
        return 1;
    }
  }

  public savePokemonApi(pokemons: Pokemons[]): Promise<any> {
    return new Promise((resolve) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      this.http
        .post(`${this.api}SaveFromApi`, pokemons, { headers })
        .subscribe((response: any) => {
          resolve(response);
        });
    });
  }
}
