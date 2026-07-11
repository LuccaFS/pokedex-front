import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HubFacade } from '../../state/hub.facade';
import { User } from '../../interfaces/user.model';
import { PokedexFacade } from '../../state/pokedex/pokedex.facade';
import { AuthFacade } from '../../state/auth/auth.facade';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  title = 'Pokedex';
  user$ = this.authFacade.user$;
  token$ = this.authFacade.token$;

  loaded$ = this.authFacade.loaded$;
  loadedPokedex$ = this.pokeFacade.loadedPokedex$;
  loadedShiny$ = this.pokeFacade.loadedShiny$;

  user!: User | null;

  constructor(
    private authFacade: AuthFacade,
    private pokeFacade: PokedexFacade,
    private hubFacade: HubFacade,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router //private _sanitazer: DomSanitazer
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.setStyle(event.url.split('/')[2]);
    });
  }

  async ngOnInit() {
    //get token from state
    //auth token
    this.authFacade.getUser();
    if (this.loaded$) {
      console.log(this.loaded$);
      this.user$.subscribe((user) => {
        if (user) {
          this.user = user;
          this.pokeFacade.getShinyHunts(this.user);
        }
      });
    }
    this.pokeFacade.getAllPokemon(this.user);
    //get auth user name and role from state
    // this._store.select(fromAuth.selectName).subscribe((user:any) => this.userName = user);
    // this._store.select(fromAuth.selectUser).subscribe((user:any) => {
    //   if(user!== null ){ //get Pokemons
    //   this.store.dispatch(PokeActions.pokemonGetAll({pokemons: this.Pokemons, rank: user.dsRank}));
    //   this.store.dispatch(PokeActions.shinyGetHunts({ id: user.id}));
    // }});
  }

  pokedex() {
    this.router.navigate(['pokedex'], { relativeTo: this.route });
  }

  battle() {
    this.router.navigate(['battle'], { relativeTo: this.route });
  }

  shiny() {
    this.router.navigate(['shiny'], { relativeTo: this.route });
  }

  public signOut() {
    this.user = null;
    this.hubFacade.logOut();
  }

  setStyle(style:string) {
    const ne = this.elementRef.nativeElement;
    ne.style.setProperty('--sidebar-color', `var(--sidebar-color-${style})`);
  }
}
