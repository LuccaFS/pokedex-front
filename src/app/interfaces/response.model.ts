export interface ResponseModel{
  responseCode: string,
  responseMessage: string
}

export interface DropdownModel{
  id: number,
  name: string
}

export interface GameModel{
  gameId: number,
  gameNames: string,
  releaseGeneration: number,
  isRemake: boolean,
  originalGeneration?: number
}

export interface ShinyMethodModel{
  shinyMethodId: number,
  shinyMethodName: string,
  shinyMethodDescription?: string,
  shinyMethodFirstGen: number,
  isGameExclusive: boolean,
  gameId?: number
}