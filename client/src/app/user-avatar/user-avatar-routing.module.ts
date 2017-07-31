import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";

const userAvatarRoutes: Routes = [
  {
    path: 'user-avatar',
    component: UserAvatarComponent,
    canActivate: [CanActivateAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userAvatarRoutes)],
  exports: [RouterModule],
  providers: []
})
export class UserAvatarRoutingModule {
}

export const userAvatarRoutedComponents = [
  UserAvatarComponent
];
