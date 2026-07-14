import { select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Pokemons, ShinyHunt } from '../../interfaces/pokemon.model';
import { PokemonTypes, Games, ShinyMethod } from '../../interfaces/enum.model';

import { PokedexFacade } from '../../state/pokedex/pokedex.facade';
import { BehaviorSubject, firstValueFrom, } from 'rxjs';
import { CommonService } from '../../services/common/common-service';
import { DropdownModel, GameModel, ShinyMethodModel } from '../../interfaces/response.model';
import { AuthFacade } from '../../state/auth/auth.facade';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-shiny',
  templateUrl: './shiny.component.html',
  styleUrls: ['./shiny.component.css'],
  standalone: false
})
export class ShinyComponent implements OnInit {
  shinyList?: ShinyHunt[];
  PokemonType = PokemonTypes;
  public user: User | null = null;

  public loadedDetails$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public PokemonList: Pokemons[] = [];
  public Pokemon: Pokemons | undefined;

  public GamesList: GameModel[] = [];
  public MethodsList: ShinyMethodModel[] = [];
  public MethodsListFiltered: ShinyMethodModel[] = []
  public selectedGameDetails: GameModel | undefined;
  public selectedMethodDetails: ShinyMethodModel | undefined;
  public selectedMethodDescription$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public canShinyCharm: boolean = true;
  public optMethodCheck: boolean = false;
  public optMethodText: string = '';
  public optMethodValue: boolean = false;

  public baseOdds: number = 8192;
  public totalOdds: number = this.baseOdds;
  public odds$: BehaviorSubject<number> = new BehaviorSubject<number>(this.baseOdds);

  
  public currentHunt: ShinyHunt = {
    pokemonNumber: 0,
    pokemonName: '',
    encounterCount: 0,
    phaseCount: 0,
    gameId: 0,
    hasShinyCharm: false,
    methodId: 1,
    huntComplete: false,
    trainerId: 0
  };




  constructor(private pokeFacade: PokedexFacade, private commonService: CommonService, private authFacade: AuthFacade) {}

  async ngOnInit() {
    this.PokemonList = this.pokemonListFilter(await firstValueFrom(this.pokeFacade.pokedex$));
    this.shinyList = await firstValueFrom(this.pokeFacade.shiny$);
    this.user = await firstValueFrom(this.authFacade.user$);
    if (this.shinyList && this.shinyList.length > 0) {
      this.currentHunt = this.shinyList[0];
      this.selected(this.currentHunt.pokemonNumber);
    }
    if(this.user && this.shinyList.length === 0) 
      this.currentHunt.trainerId = this.user.id;

    await this.getDetails();
  }

  public selected(event: any) {
    this.currentHunt.pokemonNumber = event;
    this.Pokemon = this.PokemonList.find((pokemon) => pokemon.pokemonNumber == event);
    this.currentHunt.pokemonName = this.Pokemon!.pokemonName
  }

  public encounter() {
    this.currentHunt.encounterCount += 1;
  }

  public undoCounter() {
    if (this.currentHunt.encounterCount > 0) {
      this.currentHunt.encounterCount -= 1;
    }
  }

  public resetCounter() {
    this.currentHunt.encounterCount = 0;
  }

  public phase() {
    this.currentHunt.phaseCount += 1;
  }

  public saveCounter() {
    localStorage.setItem('currentHunt', JSON.stringify(this.currentHunt));
  }

  public loadCounter() {
    const huntData = localStorage.getItem('currentHunt');
    if (huntData) {
      this.currentHunt = JSON.parse(huntData);
    }
  }

  public async getDetails() {
    await this.commonService.getGamesDetails().then((games) => {
      this.GamesList = games.slice(1, games.length-1);
    });
    await this.commonService.getShinyMethodsDetails().then((sm) => {
      this.MethodsList = sm;
    });

    this.getShinyMethodDetails(1);
    this.MethodsListFiltered = this.MethodsList;
    this.loadedDetails$.next(true);
  }

  public async getGameDetails(event: number) {
    this.currentHunt.gameId = event ? event : this.currentHunt.gameId;
    this.selectedGameDetails =  this.GamesList.length > 0 ? this.GamesList.filter(g => g.gameId == event)[0] : this.GamesList[1];
    await this.methodFilter(this.selectedGameDetails);
    this.mechanics();
  }
  public async getShinyMethodDetails(event: number) {
    this.currentHunt.methodId = event ? event : this.currentHunt.methodId;
    this.selectedMethodDetails =  this.MethodsList.length > 0 ? this.MethodsList.filter(m => m.shinyMethodId == event)[0] : undefined;
    this.selectedMethodDescription$.next(this.selectedMethodDetails?.shinyMethodDescription || '');
    this.mechanics();
  }

  private pokemonListFilter(pokemonList: Pokemons[]): Pokemons[] {
    return pokemonList.filter((pokemon) => 
      pokemon.formGroupId !== 2           //Exclude Mega Evolutions
      && pokemon.formGroupId !== 5        //Exclude Gigantamax
      && pokemon.pokemonGroupId !== 5);   //Exclude Mythicals
  }

  public async mechanics(){
    let gameId = this.selectedGameDetails ? this.selectedGameDetails.gameId : 0
    let methodId = this.selectedMethodDetails ? this.selectedMethodDetails.shinyMethodId : 1
    await this.optionalMethodChecks(gameId, methodId);
    this.oddsCalc(gameId, methodId);

    
  }

  private oddsCalc(gameId: number, methodId: number){
    let newOdds = 0
    if(gameId >= Games.XY.valueOf()){
      newOdds = this.baseOdds/2;
    }else{
      newOdds = this.baseOdds;
    }

    let oddModifier = 1
    switch(true){
      case(methodId == ShinyMethod.Masuda):
        if(gameId == Games.DPPt || gameId == Games.HGSS)
          oddModifier = 5;
        else if(gameId >= Games.BW)
          oddModifier = 6;
        break;

      case(methodId == ShinyMethod.PokeRadar && this.optMethodValue):
        if(gameId == Games.DPPt)
          newOdds = newOdds/41;
        else
          newOdds = 100;
        break;

      case(methodId == ShinyMethod.FriendSafari):
        oddModifier = 5;
        break;

      case(methodId == ShinyMethod.FishingChain && this.optMethodValue):
        oddModifier = 41;
        break;

      case(methodId == ShinyMethod.SOS  && this.optMethodValue):
        oddModifier = 13;
        break;

      case(methodId == ShinyMethod.CatchChain && this.optMethodValue):
        oddModifier = 12;
        break;

      case(methodId == ShinyMethod.DynamaxAdventures):
        if(this.currentHunt.hasShinyCharm)
          newOdds = 100;
        else
          newOdds = 300;
        break;

      case(methodId == ShinyMethod.MassOutbreaks):
        if(gameId == Games.PLA){
          if(this.optMethodValue)
            oddModifier = 13;
          else
            oddModifier = 26;
        }
        else if(gameId == Games.SV && this.optMethodValue)
          oddModifier = 3
        break;

      case(methodId == ShinyMethod.SparklingPower):
        oddModifier = 4;
        break;

      default:
        break;

      
    }

    if(this.currentHunt.hasShinyCharm && this.canShinyCharm &&
      methodId != ShinyMethod.DynamaxAdventures && !(methodId == ShinyMethod.PokeRadar && gameId == Games.XY))
      if(gameId == Games.PLA || gameId == Games.PLZA)
        oddModifier +=3
      else
        oddModifier += 2

    newOdds = Number((newOdds/oddModifier).toFixed(0))
    this.odds$.next(newOdds);
  }

  private async optionalMethodChecks(gameId: number, methodId: number){
    if(gameId !== 0){
      if(gameId < Games.BW){
        this.canShinyCharm = false;
        this.currentHunt.hasShinyCharm = false;
      }
      else
        this.canShinyCharm = true;
    }
      
    

    switch(true){
      case methodId == ShinyMethod.PokeRadar:
        this.optMethodCheck = true;
        this.optMethodText = 'Reached chain of 40.';
        break;

      case methodId == ShinyMethod.FishingChain:
        this.optMethodCheck = true;
        this.optMethodText = 'Reached chain of 20.';
        break;

      case methodId == ShinyMethod.SOS:
        this.optMethodCheck = true;
        this.optMethodText = 'Reached chain of 31.';
        break;

      case methodId == ShinyMethod.CatchChain:
        this.optMethodCheck = true;
        this.optMethodText = 'Reached chain of 31.';
        break;

      case methodId == ShinyMethod.MassOutbreaks && gameId==Games.PLA:
        this.optMethodCheck = true;
        this.optMethodText = 'Massive Mass Outbreak.';
        break;

      case methodId == ShinyMethod.MassOutbreaks && gameId==Games.SV:
        this.optMethodCheck = true;
        this.optMethodText = 'Defeated 60 Pokémon.';
        break;

      default:
        this.optMethodCheck = false;
        this.optMethodText = '';
        this.optMethodValue = false;
        break;
    }

    if(!this.MethodsListFiltered.some(m => m.shinyMethodId == methodId)){
      this.optMethodCheck = false;
      this.optMethodValue = false;
    }
  }

  private async methodFilter(game?: GameModel){
    if(game){
      this.MethodsListFiltered = this.MethodsList.filter(m => m.shinyMethodFirstGen <= game.releaseGeneration && (m.isGameExclusive ? m.gameId == game.gameId : true))

      if(game.gameId !== Games.DPPt && game.gameId !== Games.BDSP && game.gameId !== Games.XY)
        this.MethodsListFiltered = this.MethodsListFiltered.filter(m => m.shinyMethodId !== ShinyMethod.PokeRadar)

      if(game.gameId == Games.PLZA)
        this.MethodsListFiltered = this.MethodsListFiltered.filter(m => m.shinyMethodId !== ShinyMethod.MassOutbreaks)

      if(game.gameId === Games.SM || game.gameId === Games.USUM)
        this.MethodsListFiltered = this.MethodsListFiltered.concat(this.MethodsList.filter(m => m.shinyMethodId === ShinyMethod.SOS))

      if(game.gameId === Games.XY || game.gameId === Games.ORAS)
        this.MethodsListFiltered = this.MethodsListFiltered.concat(this.MethodsList.filter(m => m.shinyMethodId === ShinyMethod.FishingChain))
    }

  }

}
