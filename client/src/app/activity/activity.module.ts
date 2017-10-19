import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {activityRoutedComponents, activityRoutedResolves, ActivityRoutingModule} from "./activity-routing.module";
import {SharedModule} from 'c2s-ng-shared';
import {ActivityService} from "./shared/activity.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  imports: [
    ActivityRoutingModule,
    CommonModule,
    SharedModule,
    Ng2PaginationModule,
    TranslateModule
  ],
  declarations: [activityRoutedComponents],
  providers: [
    activityRoutedResolves,
    ActivityService
  ]
})

export class ActivityModule {
}
