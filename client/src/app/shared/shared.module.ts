import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsPhoneNumberPipe],
  exports: [UsPhoneNumberPipe]
})
export class SharedModule {
}
