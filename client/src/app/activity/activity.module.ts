import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {activityRoutedComponents, ActivityRoutingModule} from "src/app/activity/activity-routing.module";
import {SharedModule} from "src/app/shared/shared.module";


@NgModule({
  imports: [
    ActivityRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [activityRoutedComponents]
})

export class ActivityModule {
}
