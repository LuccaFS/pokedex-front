export interface NewUser{
  dsName: string,
  dsEmail: string,
  dsPassword: string
}

export interface Login{
  dsEmail: string,
  dsPassword: string
}

export interface User{
  id: number,
  dsName: string,
  dsRank: string
}
