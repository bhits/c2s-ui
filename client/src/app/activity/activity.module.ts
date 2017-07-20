import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {activityRoutedComponents, ActivityRoutingModule} from "src/app/activity/activity-routing.module";
import {SharedModule} from "src/app/shared/shared.module";
import {ActivityServiceService} from "./shared/activity-service.service";


@NgModule({
  imports: [
    ActivityRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [activityRoutedComponents],
  providers: [ActivityServiceService]
})

export class ActivityModule {
}
