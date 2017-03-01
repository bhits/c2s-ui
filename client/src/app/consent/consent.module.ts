import { NgModule } from '@angular/core';
import {Md2Module} from "md2";

import { ConsentTermsComponent } from './consent-terms/consent-terms.component';
import { PurposeOfUseComponent } from './purpose-of-use/purpose-of-use.component';
import { SelectProviderComponent } from './select-provider/select-provider.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import { ConsentCreateEditComponent } from './consent-create-edit/consent-create-edit.component';
import {ConsentService} from "./consent.service";
import {SharedModule} from "../shared/shared.module";
import {PurposeOfUseService} from "./purpose-of-use/purpose-of-use.service";
import {MedicalInformationService} from "./medical-information/medical-information.service";
import { SelectProvidersComponent } from './select-providers/select-providers.component';
import { ConsentProviderNamePipe } from './shared/consent-provider-name.pipe';

@NgModule({
  imports: [
    SharedModule,
    Md2Module, // TODO verify while MD2 components not working at when module is imported at root modulel
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
