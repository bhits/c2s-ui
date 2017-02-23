import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {ConsentModule} from "./consent/consent.module";
import {MaterialModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    ConsentModule,
    MaterialModule // TODO remove and the end of sprint
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
