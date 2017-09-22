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
import {UtilityService} from "./utility.service";
import {DataService} from "./data.service";
import {PageTitleComponent} from "./page-title/page-title.component";
import {ValidationService} from "./validation.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {ConsentProviderPipe} from "./consent-provider.pipe";
import {ShowHidePasswordComponent} from "./show-hide-password/show-hide-password.component";
import {FileValueAccessor} from "./file-value-accessor.directive";
import {FileValidator} from "./file-validator.directive";
import {UserAvatarDisplayComponent} from "./user-avatar-display/user-avatar-display.component";
import {ControlValidationErrorMessageComponent} from "./control-validation-error-message/control-validation-error-message.component";

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
    ConsentProviderPipe,
    ShowHidePasswordComponent,
    FileValueAccessor,
    FileValidator,
    UserAvatarDisplayComponent
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
    FileValueAccessor,
    UserAvatarDisplayComponent
  ],
  providers: [
    C2sUiApiUrlService,
    DataService,
    UtilityService,
    DatePipe,
    ValidationService,
    FileValidator
  ]
})

export class SharedModule {
}
