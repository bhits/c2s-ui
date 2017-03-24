import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";
import {SensitivityPoliciesResolveService} from "./shared/sensitivity-policies-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ConsentSignComponent} from "./consent-sign/consent-sign.component";
import {ConsentRevokeComponent} from "./consent-revoke/consent-revoke.component";
import {DetailedConsentResolveService} from "./shared/detailed-consent-resolve.service";


const consentRoutes: Routes = [
  {
    path: 'consent-list',
    component: ConsentCardListComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
  },
  {
    path: 'consent-create-edit',
    component: ConsentCreateEditComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      providers: ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses: PurposeOfUsesResolveService
    }
  },
  {
    path: 'consent-create-edit/:consentId',
    component: ConsentCreateEditComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    resolve: {
      consent: ConsentResolveService,
      providers: ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses: PurposeOfUsesResolveService
    }
  },
  {
    path: 'consent-sign/:consentId',
    component: ConsentSignComponent,
    resolve: {
      consent: DetailedConsentResolveService
    }
  },
  {
    path: 'consent-revoke/:consentId',
    component: ConsentRevokeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(consentRoutes)
  ],
  declarations: []
})
export class ConsentRoutingModule {
}


export const consentRoutableComponents = [
  ConsentCardListComponent,
  ConsentCreateEditComponent,
  ConsentSignComponent,
  ConsentRevokeComponent
];


export const consentRoutableResolves = [
  ConsentResolveService,
  DetailedConsentResolveService,
  ProviderResolveService,
  SensitivityPoliciesResolveService,
  PurposeOfUsesResolveService
];
