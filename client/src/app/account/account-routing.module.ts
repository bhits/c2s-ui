import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountActivationErrorComponent} from "./account-activation-error/account-activation-error.component";
import {AccountComponent} from "./account/account.component";
import {AccountVerificationComponent} from "./account-verification/account-verification.component";
import {AccountActivationComponent} from "./account-activation/account-activation.component";
import {AccountActivationSuccessComponent} from "./account-activation-success/account-activation-success.component";

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
