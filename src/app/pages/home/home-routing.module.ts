import { BattleComponent } from './../../components/battle/battle.component';
import { PokemonComponent } from 'src/app/components/pokemon-component/pokemon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokedex',
    component: PokemonComponent
  },
  {
    path:'battle',
    component: BattleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
