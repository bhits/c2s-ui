import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  healthInformationRoutedComponents,
  healthInformationRoutedResolves,
  HealthInformationRoutingModule
} from './health-information-routing.module';
import {PatientHealthInformationService} from "./shared/patient-health-information.service";
import {HealthInformationDocumentComponent} from "./health-information-document/health-information-document.component";
import {SharedModule} from 'c2s-ng-shared';
import {HealthInformationCdaDocumentComponent} from "./health-information-cda-document/health-information-cda-document.component";
import {TargetPatientContactInfoPipe} from './shared/target-patient-contact-info.pipe';
import {PatientTreatmentProviderPipe} from './shared/patient-treatment-provider.pipe';
import {HealthInformationCdaDocumentSectionComponent} from "./health-information-cda-document-section/health-information-cda-document-section.component";
import {Md2RootModule} from "md2";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthInformationRoutingModule,
    Md2RootModule,
    TranslateModule
  ],
  declarations: [
    healthInformationRoutedComponents,
    HealthInformationDocumentComponent,
    HealthInformationCdaDocumentComponent,
    HealthInformationCdaDocumentSectionComponent,
    TargetPatientContactInfoPipe,
    PatientTreatmentProviderPipe
  ],
  providers: [
    healthInformationRoutedResolves,
    PatientHealthInformationService]
})
export class HealthInformationModule {
}
