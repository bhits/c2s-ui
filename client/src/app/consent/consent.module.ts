import {MaterialModule} from "@angular/material";
import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule} from "../shared/shared.module";
import { PurposeOfUseService} from "./purpose-of-use/purpose-of-use.service";
import { ConsentTermsComponent } from './consent-terms/consent-terms.component';
import { PurposeOfUseComponent } from './purpose-of-use/purpose-of-use.component';
import { SelectProviderComponent } from './select-provider/select-provider.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import {ConsentRoutingModule} from "./consent-routing.module";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";
import { ConsentService} from "./shared/consent.service";
import { ConsentProviderNamePipe } from './shared/consent-provider-name.pipe';
import { ConsentCreateEditComponent } from './consent-create-edit/consent-create-edit.component';
import { MedicalInformationService} from "./medical-information/medical-information.service";
import {Md2Module} from "md2";
import {RouterModule} from "@angular/router";
import {ConsentCardComponent} from "./consent-card/consent-card.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentStagePipe} from "./shared/consent-stage.pipe";
import {SelectProvidersComponent} from "./select-providers/select-providers.component";
import {SensitivityPoliciesResolveService} from "./shared/sensitivity-policies-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";

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
    ConsentCreateEditComponent,
    ConsentCardComponent,
    ConsentCardListComponent,
    ConsentStagePipe,
    SelectProvidersComponent,
    ConsentProviderNamePipe,
  ],
  exports: [
    ConsentCreateEditComponent
  ],
  providers: [
    ConsentService,
    PurposeOfUseService,
    MedicalInformationService,
    ConsentResolveService,
    ProviderResolveService,
    SensitivityPoliciesResolveService,
    PurposeOfUsesResolveService],
})
export class ConsentModule {
}
