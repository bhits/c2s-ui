import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import { HomeCardComponent } from './home-card/home-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent, HomeCardComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
