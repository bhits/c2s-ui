import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {Md2Module, Md2Tooltip} from "md2";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {PageTitleComponent} from "./page-title/page-title.component";
import {ValidationService} from "./validation.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {ShowHidePasswordComponent} from "./show-hide-password/show-hide-password.component";
import {FileValueAccessor} from "./file-value-accessor.directive";
import {FileValidator} from "./file-validator.directive";
import {ControlValidationErrorMessageComponent} from "./control-validation-error-message/control-validation-error-message.component";
import {ConsentProviderPipe} from "./consent-provider.pipe";

@NgModule({
  imports: [
    CommonModule,
    Md2Module,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    UsPhoneNumberPipe,
    PageTitleComponent,
    ControlValidationErrorMessageComponent,
    ShowHidePasswordComponent,
    FileValueAccessor,
    FileValidator,
    ConsentProviderPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    Ng2PaginationModule,
    ReactiveFormsModule,
    TranslateModule,
    UsPhoneNumberPipe,
    ConsentProviderPipe,
    Md2Tooltip,
    PageTitleComponent,
    ControlValidationErrorMessageComponent,
    ShowHidePasswordComponent,
    FileValueAccessor
  ],
  providers: [
    C2sUiApiUrlService,
    DatePipe,
    ValidationService,
    FileValidator
  ]
})

export class SharedModule {
}
