import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsentTermsComponent } from './consent-terms/consent-terms.component';
import { PurposeOfUseComponent } from './purpose-of-use/purpose-of-use.component';
import { SelectProviderComponent } from './select-provider/select-provider.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import { ConsentCreateEditComponent } from './consent-create-edit/consent-create-edit.component';
import {MaterialModule} from "@angular/material";
import {Md2Module} from "md2";
import {ConsentService} from "./consent.service";

@NgModule({
  imports: [
    CommonModule,
    Md2Module, // TODO verify while MD2 components not working at when module is imported at root modulel
    MaterialModule,
    FormsModule // TODO: verify while FormModule when imported at root level is not available to every other module
  ],
  declarations: [
    ConsentTermsComponent,
    PurposeOfUseComponent,
    SelectProviderComponent,
    MedicalInformationComponent,
    ConsentCreateEditComponent
  ],
  exports: [
    ConsentCreateEditComponent,
    MaterialModule
  ],
  providers: [ConsentService]
})
export class ConsentModule { }
