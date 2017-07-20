import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivitiesComponent} from "./activities/activities.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ConsentActivityComponent} from "./consent-activity/consent-activity.component";

const activityRoutes: Routes = [
  {
    path: 'activities',
    component: ActivitiesComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: 'consent-activity',
        component: ConsentActivityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(activityRoutes)],
  exports: [RouterModule]
})

export class ActivityRoutingModule {
}

export const activityRoutedComponents = [
  ActivitiesComponent,
  ConsentActivityComponent
];
