import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ConsentTermsComponent } from './consent-terms/consent-terms.component';
import { PurposeOfUseComponent } from './purpose-of-use/purpose-of-use.component';
import { SelectProviderComponent } from './select-provider/select-provider.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import { ConsentCreateEditComponent } from './consent-create-edit/consent-create-edit.component';
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, // TODO verify while FormModule when inported at root level is not available to every other module
    ReactiveFormsModule
  ],
  declarations: [
    ConsentTermsComponent,
    PurposeOfUseComponent,
    SelectProviderComponent,
    MedicalInformationComponent,
    ConsentCreateEditComponent,

  ],
  exports: [
    ConsentCreateEditComponent,
    MaterialModule
  ]
})
export class ConsentModule { }
