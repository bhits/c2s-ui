import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TranslateModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
