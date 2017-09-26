import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HealthInformationComponent} from "./health-information/health-information.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {HealthInformationListComponent} from "./health-information-list/health-information-list.component";
import {HealthInformationResolveService} from "./shared/health-information-resolve.service";
import {CanActivateHealthInformationService} from "./shared/can-activate-health-information.service";

const healthInformationRoutes: Routes = [
  {
    path: 'health-information',
    component: HealthInformationComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: HealthInformationListComponent,
        canActivate:[CanActivateHealthInformationService],
        resolve: {
          healthInformation: HealthInformationResolveService,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(healthInformationRoutes)],
  exports: [RouterModule]
})

export class HealthInformationRoutingModule {
}

export const healthInformationRoutedComponents = [
  HealthInformationComponent,
  HealthInformationListComponent
];

export const healthInformationRoutedResolves = [
  HealthInformationResolveService
];
