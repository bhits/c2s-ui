import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {PurposeOfUseService} from "./purpose-of-use/purpose-of-use.service";
import {ConsentTermsComponent} from "./consent-terms/consent-terms.component";
import {PurposeOfUseComponent} from "./purpose-of-use/purpose-of-use.component";
import {SelectProviderComponent} from "./select-provider/select-provider.component";
import {MedicalInformationComponent} from "./medical-information/medical-information.component";
import {consentRoutableComponents, consentRoutableResolves, ConsentRoutingModule} from "./consent-routing.module";
import {ConsentService} from "./shared/consent.service";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {MedicalInformationService} from "./medical-information/medical-information.service";
import {RouterModule} from "@angular/router";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";
import {SelectProvidersComponent} from "./select-providers/select-providers.component";
import {NotificationService} from "../core/notification.service";
import {SharePurposePipe} from "./shared/share-purpose.pipe";
import {SensitivityCategoryPipe} from "./shared/sensitivity-category.pipe";
import {TryPolicyService} from "./shared/try-policy.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
    consentRoutableComponents,
    SharePurposePipe,
    SensitivityCategoryPipe
  ],
  exports: [
    ConsentCreateEditComponent
  ],
  providers: [
    ConsentService,
    PurposeOfUseService,
    MedicalInformationService,
    consentRoutableResolves,
    NotificationService,
    TryPolicyService
  ],
})
export class ConsentModule {
}
