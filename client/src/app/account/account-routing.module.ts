import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "app/account/account/account.component";
import {AccountVerificationComponent} from "app/account/account-verification/account-verification.component";

const accountRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'verification',
        component: AccountVerificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule {
}

export const routedComponents = [
  AccountComponent,
  AccountVerificationComponent
];
