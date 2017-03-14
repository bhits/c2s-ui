import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";
import {SensitivityPoliciesResolveService} from "./shared/sensitivity-policies-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";
import {ConsentSignComponent} from "./consent-sign/consent-sign.component";
import {ConsentRevokeComponent} from "./consent-revoke/consent-revoke.component";


const consentRoutes: Routes = [
  {
    path: 'consent-list',
    component: ConsentCardListComponent
  },
  {
    path: 'consent-create-edit',
    component: ConsentCreateEditComponent,
    resolve: {
      providers: ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses: PurposeOfUsesResolveService
    }
  },
  {
    path: 'consent-create-edit/:consentId',
    component: ConsentCreateEditComponent,
    resolve: {
      consent: ConsentResolveService,
      providers: ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses: PurposeOfUsesResolveService
    }
  },
  {
    path: 'consent-sign/:consentId',
    component: ConsentSignComponent
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
  ProviderResolveService,
  SensitivityPoliciesResolveService,
  PurposeOfUsesResolveService
];
