import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { provideHttpClient} from '@angular/common/http'

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from '../../components/pokemon/pokemon.component';
import { ShinyComponent } from './../../components/shiny/shiny.component';
import { BattleComponent } from './../../components/battle/battle.component';

import { MatIconModule } from '@angular/material/icon';

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
    FormsModule,
    MatIconModule

  ],
  providers: [provideHttpClient()],
  exports: [HomeComponent]
})
export class HomeModule { }
