export interface Pokemon {
  idPokemon: number;
  dsName: string;
  type1: string;
  type2: string | null;
  generation: number;
  image: any;
  isStarter: Boolean;
  isPseudo: Boolean;
  isLegendary: Boolean;
}

export interface Pokemons {
  pokemonNumber: number;
  pokemonName: string;
  type1: number;
  type2: number | null;
  generation: number;
  evolutionStage: number;
  previousEvolutionNumber: number | null;
  hasPokemonGroup: boolean ;
  pokemonGroupId: number | null;
  formGroupId: number | null;
  baseFormNumber: number | null;
}

export interface ShinyHunt {
  trainerId: number;
  pokemonNumber: number;
  pokemonName: string;
  encounterCount: number;
  phaseCount: number;
  gameId: number;
  hasShinyCharm: boolean;
  methodId: number;
  huntComplete: boolean;
}

export enum PokemonTypes {
  Normal = 1,
  Ghost = 2,
  Grass = 3,
  Fire = 4,
  Water = 5,
  Electric = 6,
  Ice = 7,
  Fighting = 8,
  Poison = 9,
  Ground = 10,
  Rock = 11,
  Flying = 12,
  Psychic = 13,
  Bug = 14,
  Dragon = 15,
  Dark = 16,
  Steel = 17,
  Fairy = 18,
}

export enum PokemonGroup {
  Starter = 1,
  Fossil,
  Pseudo,
  Legendary,
  Mythical,
  Baby,
  UltraBeast,
}

export enum FormGroup{
  Special=1,
  Megas,
  Alolan,
  Galarian,
  Gmax,
  Hisuian,
  Paldean,
  Convergent,
  AncientParadox,
  FutureParadox
}
