import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'c2s-ng-shared';
import {HomeComponent} from './home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {Md2RootModule} from "md2";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    Md2RootModule,
    TranslateModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})

export class HomeModule {
}
