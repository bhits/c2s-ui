import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";

import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";
import {SensitivityPoliciesResolveService} from "./shared/sensitivity-policies-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";


const consentRoutes: Routes = [
  { path: 'consent-list',
    component: ConsentCardListComponent
  },
  { path: 'consent-create-edit',
    component: ConsentCreateEditComponent,
    resolve: {
      providers:ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses:PurposeOfUsesResolveService
    }
  },
  {
    path: 'consent-create-edit/:consentId',
    component: ConsentCreateEditComponent,
    resolve: {
      consent: ConsentResolveService,
      providers: ProviderResolveService,
      sensitivityPolicies: SensitivityPoliciesResolveService,
      purposeOfUses:PurposeOfUsesResolveService
    }
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
