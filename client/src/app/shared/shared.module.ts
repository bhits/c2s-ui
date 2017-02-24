import {CommonModule} from "@angular/common";
import {DialogModule} from "./dialog/dialog.module";
import {NgModule} from "@angular/core";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  declarations: [UsPhoneNumberPipe],
  exports: [UsPhoneNumberPipe]
})
export class SharedModule {
}
