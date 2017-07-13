import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const userProfileRoutes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule],
  providers: []
})
export class UserProfileRoutingModule {
}

export const userProfileRoutedComponents = [
  UserProfileComponent
];
