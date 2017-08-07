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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthInformationRoutingModule
  ],
  declarations: [
    healthInformationRoutedComponents,
    HealthInformationDocumentComponent,
    HealthInformationCdaDocumentComponent
  ],
  providers: [
    healthInformationRoutedResolves,
    PatientHealthInformationService]
})
export class HealthInformationModule {
}
