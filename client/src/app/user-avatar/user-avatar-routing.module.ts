import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";

const userAvatarRoutes: Routes = [
  {
    path: 'user-avatar',
    component: UserAvatarComponent
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
