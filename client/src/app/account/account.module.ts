import {NgModule} from "@angular/core";
import {AccountRoutingModule, routedComponents} from "./account-routing.module";
import {SharedModule} from "app/shared/shared.module";
import {LayoutModule} from "app/layout/layout.module";
import {AccountService} from "app/account/shared/account.service";
import {EmailTokenService} from "./shared/email-token.service";

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    AccountRoutingModule
  ],
  declarations: [routedComponents],
  providers: [
    AccountService,
    EmailTokenService
  ]
})
export class AccountModule {
}
