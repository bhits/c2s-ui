import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Md2Module }  from 'md2';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {ConsentModule} from "./consent/consent.module";
import {SharedModule} from "./shared/shared.module";
import {MaterialModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Md2Module.forRoot(),
    CoreModule,
    ConsentModule,
    SharedModule, // TODO remove and the end of sprint
    MaterialModule // TODO remove and the end of sprint
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
