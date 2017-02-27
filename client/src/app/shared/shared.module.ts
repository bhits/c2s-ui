import {CommonModule} from "@angular/common";
import {DialogModule} from "./dialog/dialog.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  declarations: [UsPhoneNumberPipe],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    Ng2PaginationModule,
    UsPhoneNumberPipe
  ]
})

export class SharedModule {
}
