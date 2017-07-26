import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  activityRoutedComponents,
  activityRoutedResolves,
  ActivityRoutingModule
} from "src/app/activity/activity-routing.module";
import {SharedModule} from "src/app/shared/shared.module";
import {ActivityService} from "src/app/activity/shared/activity.service";


@NgModule({
  imports: [
    ActivityRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [activityRoutedComponents],
  providers: [
    activityRoutedResolves,
    ActivityService
  ]
})

export class ActivityModule {
}
