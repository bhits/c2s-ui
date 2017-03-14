import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";

import {GlobalEventManagerService} from "./shared/global-event-manager.service";
import {SecurityRoutingModule, securityRoutableComponents} from "./security-routing.module";
import {AuthenticationService} from "../security/shared/authentication.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {SharedModule} from "../shared/shared.module";

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
    GlobalEventManagerService
  ]
})
export class SecurityModule { }
