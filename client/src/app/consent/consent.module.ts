import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Md2Module} from "md2";
import { MaterialModule} from "@angular/material";

import { ConsentTermsComponent } from './consent-terms/consent-terms.component';
import { PurposeOfUseComponent } from './purpose-of-use/purpose-of-use.component';
import { SelectProviderComponent } from './select-provider/select-provider.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import { ConsentCreateEditComponent } from './consent-create-edit/consent-create-edit.component';
import { ConsentService} from "./shared/consent.service";
import { SharedModule} from "../shared/shared.module";
import { PurposeOfUseService} from "./purpose-of-use/purpose-of-use.service";
import { MedicalInformationService} from "./medical-information/medical-information.service";
import { SelectProvidersComponent } from './select-providers/select-providers.component';
import { ConsentProviderNamePipe } from './shared/consent-provider-name.pipe';
import { ConsentRoutingModule} from "./consent-routing.module";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, // TODO: verify while FormModule when imported at root level is not available to every other module
    Md2Module,
    SharedModule,
    ConsentRoutingModule
  ],
  declarations: [
    ConsentTermsComponent,
    PurposeOfUseComponent,
    SelectProviderComponent,
    MedicalInformationComponent,
    ConsentCreateEditComponent,
    SelectProvidersComponent,
    ConsentProviderNamePipe,
  ],
  exports: [
    ConsentCreateEditComponent
  ],
  providers: [ConsentService, PurposeOfUseService, MedicalInformationService]
})
export class ConsentModule { }
