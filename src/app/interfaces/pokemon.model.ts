export interface Pokemon {
  idPokemon: number;
  idForm: number;
  dsName: string;
  type1: string;
  type2: string | null;
  generation: number;
  image: any;
  isStarter: Boolean;
  isPseudo: Boolean;
  isLegendary: Boolean;
}

export interface ShinyHunt {
  idTrainer: number;
  pokeName: string;
  counter: number;
}

export enum types {
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
