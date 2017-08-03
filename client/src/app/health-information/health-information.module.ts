import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {healthInformationRoutedComponents, HealthInformationRoutingModule} from './health-information-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HealthInformationRoutingModule
  ],
  declarations: [healthInformationRoutedComponents]
})
export class HealthInformationModule {
}
