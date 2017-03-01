import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Md2Module} from "md2";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";

import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {UtiltityService} from "./utiltity.service";

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
    UsPhoneNumberPipe
  ],
  providers:[UtiltityService]
})

export class SharedModule {
}
