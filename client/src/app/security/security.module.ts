import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";

import {SecurityRoutingModule, securityRoutableComponents} from "./security-routing.module";
import {AuthenticationService} from "../security/shared/authentication.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {SharedModule} from "../shared/shared.module";
import {SessionStorageService} from "./shared/session-storage.service";
import {TokenService} from "./shared/token.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [
    securityRoutableComponents,
  ],
  providers: [
    CanActivateAuthGuardService,
    AuthenticationService,
    SessionStorageService,
    TokenService
  ]
})
export class SecurityModule { }
