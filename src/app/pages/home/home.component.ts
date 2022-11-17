import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import * as fromAuth from '../../state/auth/auth.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Pokedex';


  public userName = '';

  constructor(
    private store: Store,
    private _store: Store<fromAuth.State>,
    private route: ActivatedRoute,
    private router: Router
    //private _sanitazer: DomSanitazer
  ){ }

  async ngOnInit(){
    //get token from state
    //auth token
    this.store.dispatch(AuthActions.getUserName());
    //get auth user name from state
    this._store.select(fromAuth.selectUser).subscribe((user:any) => this.userName = user);

  }

  pokedex(){
    this.router.navigate(['pokedex'], {relativeTo:this.route});
  }

  battle(){
    this.router.navigate(['battle'], {relativeTo:this.route});
  }

  shiny(){
    this.router.navigate(['shiny'], {relativeTo:this.route});
  }


  public signOut(){
    this.store.dispatch(AuthActions.logOut());
  }


}
