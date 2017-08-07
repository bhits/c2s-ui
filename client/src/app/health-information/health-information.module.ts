import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  healthInformationRoutedComponents,
  healthInformationRoutedResolves,
  HealthInformationRoutingModule
} from './health-information-routing.module';
import {PatientHealthInformationService} from "./shared/patient-health-information.service";
import {HealthInformationDocumentComponent} from "./health-information-document/health-information-document.component";
import {SharedModule} from "../shared/shared.module";
import {HealthInformationCdaDocumentComponent} from "./health-information-cda-document/health-information-cda-document.component";
import { TargetPatientContactInfoPipe } from './shared/target-patient-contact-info.pipe';
import { PatientTreatmentProviderPipe } from './shared/patient-treatment-provider.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthInformationRoutingModule
  ],
  declarations: [
    healthInformationRoutedComponents,
    HealthInformationDocumentComponent,
    HealthInformationCdaDocumentComponent,
    TargetPatientContactInfoPipe,
    PatientTreatmentProviderPipe
  ],
  providers: [
    healthInformationRoutedResolves,
    PatientHealthInformationService]
})
export class HealthInformationModule {
}
