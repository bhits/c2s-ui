import {NgModule} from "@angular/core";
import {AccountRoutingModule, routedComponents} from "./account-routing.module";
import {SharedModule} from 'c2s-ng-shared';
import {LayoutModule} from "../layout/layout.module";
import {AccountService} from "./shared/account.service";
import {AccountVerificationService} from "./shared/account-verification.service";
import {Md2RootModule} from "md2";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    AccountRoutingModule,
    Md2RootModule,
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
