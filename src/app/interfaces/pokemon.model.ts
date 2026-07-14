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
