import { ShinyComponent } from './../../components/shiny/shiny.component';
import { BattleComponent } from './../../components/battle/battle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HttpClientModule} from '@angular/common/http'

import { PokemonComponent } from 'src/app/components/pokemon/pokemon.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonComponent,
    BattleComponent,
    ShinyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
