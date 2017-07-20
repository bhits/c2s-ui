import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {activityRoutedComponents, ActivityRoutingModule} from "src/app/activity/activity-routing.module";


@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  declarations: [activityRoutedComponents]
})

export class ActivityModule {
}
