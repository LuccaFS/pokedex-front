import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HttpClientModule} from '@angular/common/http'

import { PokemonComponent } from 'src/app/components/pokemon-component/pokemon.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
