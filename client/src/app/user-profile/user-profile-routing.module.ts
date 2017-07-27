import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";

const userProfileRoutes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [CanActivateAuthGuardService]
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
