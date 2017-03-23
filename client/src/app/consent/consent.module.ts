import {MaterialModule} from "@angular/material";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {PurposeOfUseService} from "./purpose-of-use/purpose-of-use.service";
import {ConsentTermsComponent} from "./consent-terms/consent-terms.component";
import {PurposeOfUseComponent} from "./purpose-of-use/purpose-of-use.component";
import {SelectProviderComponent} from "./select-provider/select-provider.component";
import {MedicalInformationComponent} from "./medical-information/medical-information.component";
import {ConsentRoutingModule, consentRoutableComponents, consentRoutableResolves} from "./consent-routing.module";
import {ConsentService} from "./shared/consent.service";
import {ConsentProviderNamePipe} from "./shared/consent-provider-name.pipe";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {MedicalInformationService} from "./medical-information/medical-information.service";
import {Md2Module} from "md2";
import {RouterModule} from "@angular/router";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";
import {SelectProvidersComponent} from "./select-providers/select-providers.component";
import {NotificationService} from "../core/notification.service";
import {AbstractProviderNamePipe} from "./shared/abstract-provider-name.pipe";
import { SharePurposePipe } from './shared/share-purpose.pipe';
import { ShareSensitivityCategoryPipe } from './shared/share-sensitivity-category.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, // TODO: verify while FormModule when imported at root level is not available to every other module
    SharedModule,
    Md2Module,
    RouterModule,
    ConsentRoutingModule
  ],
  declarations: [
    ConsentTermsComponent,
    PurposeOfUseComponent,
    SelectProviderComponent,
    MedicalInformationComponent,
    ConsentCardComponent,
    ConsentStagePipe,
    SelectProvidersComponent,
    ConsentProviderNamePipe,
    consentRoutableComponents,
    AbstractProviderNamePipe,
    SharePurposePipe,
    ShareSensitivityCategoryPipe
  ],
  exports: [
    ConsentCreateEditComponent
  ],
  providers: [
    ConsentService,
    PurposeOfUseService,
    MedicalInformationService,
    consentRoutableResolves,
    NotificationService
  ],
})
export class ConsentModule {
}
