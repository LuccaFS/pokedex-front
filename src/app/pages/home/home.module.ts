import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { provideHttpClient} from '@angular/common/http'

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from '../../components/pokemon/pokemon.component';
import { ShinyComponent } from './../../components/shiny/shiny.component';
import { BattleComponent } from './../../components/battle/battle.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [provideHttpClient()],
  exports: [HomeComponent]
})
export class HomeModule { }
