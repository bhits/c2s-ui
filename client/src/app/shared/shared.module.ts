import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Md2Module} from "md2";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {RouterModule} from "@angular/router";
import {UtilityService} from "./utility.service";
import {DataService} from "./data.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [UsPhoneNumberPipe],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    Ng2PaginationModule,
    ReactiveFormsModule,
    UsPhoneNumberPipe
  ],
  providers: [
    DataService,
    UtilityService
  ]
})

export class SharedModule {
}
