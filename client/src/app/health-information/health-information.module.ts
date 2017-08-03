import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {healthInformationRoutedComponents, HealthInformationRoutingModule} from './health-information-routing.module';
import {SharedModule} from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthInformationRoutingModule
  ],
  declarations: [healthInformationRoutedComponents]
})
export class HealthInformationModule {
}
