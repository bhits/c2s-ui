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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthInformationRoutingModule
  ],
  declarations: [
    healthInformationRoutedComponents,
    HealthInformationDocumentComponent
  ],
  providers: [
    healthInformationRoutedResolves,
    PatientHealthInformationService]
})
export class HealthInformationModule {
}
