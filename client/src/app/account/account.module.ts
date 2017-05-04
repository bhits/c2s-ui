import {NgModule} from "@angular/core";
import {AccountRoutingModule, routedComponents} from "./account-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";
import {AccountService} from "./shared/account.service";
import {AccountVerificationService} from "./shared/account-verification.service";

import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    AccountRoutingModule,
    TranslateModule
  ],
  declarations: [routedComponents],
  providers: [
    AccountService,
    AccountVerificationService
  ]
})
export class AccountModule {
}
