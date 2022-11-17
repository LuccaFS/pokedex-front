import { ShinyComponent } from './../../components/shiny/shiny.component';
import { BattleComponent } from './../../components/battle/battle.component';
import { PokemonComponent } from 'src/app/components/pokemon/pokemon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path:'',
    pathMatch: 'full',
    redirectTo: 'pokedex'
  },
  {
    path: 'pokedex',
    component: PokemonComponent
  },
  {
    path:'battle',
    component: BattleComponent
  },
  {
    path:'shiny',
    component: ShinyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
