import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "app/account/account/account.component";
import {AccountVerificationComponent} from "app/account/account-verification/account-verification.component";
import {AccountActivationSuccessComponent} from "app/account/account-activation-success/account-activation-success.component";
import {AccountActivationComponent} from "app/account/account-activation/account-activation.component";
import {AccountActivationErrorComponent} from "./account-activation-error/account-activation-error.component";

const accountRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'verification',
        component: AccountVerificationComponent
      },
      {
        path: 'activation',
        component: AccountActivationComponent
      },
      {
        path: 'activation-success',
        component: AccountActivationSuccessComponent
      },
      {
        path: 'activation-error',
        component: AccountActivationErrorComponent
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
  AccountActivationComponent,
  AccountActivationErrorComponent,
  AccountActivationSuccessComponent,
  AccountVerificationComponent
];
