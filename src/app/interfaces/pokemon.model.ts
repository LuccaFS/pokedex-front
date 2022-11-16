export interface Pokemon{
  idPokemon: number,
  dsName: string,
  type1: string,
  type2: string | null,
  generation: number,
  image: any
  isStarter: Boolean;
  isPseudo: Boolean;
  isLegendary: Boolean;
}
