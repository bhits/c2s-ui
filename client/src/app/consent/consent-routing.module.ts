import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ConsentCreateEditComponent} from "./consent-create-edit/consent-create-edit.component";
import {ConsentCardListComponent} from "./consent-card-list/consent-card-list.component";
import {ConsentResolveService} from "./shared/consent-resolve.service";
import {SensitivityPoliciesResolveService} from "./shared/sensitivity-policies-resolve.service";
import {PurposeOfUsesResolveService} from "./shared/purpose-of-uses-resolve.service";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {ConsentSignComponent} from "./consent-sign/consent-sign.component";
import {ConsentRevokeComponent} from "./consent-revoke/consent-revoke.component";
import {DetailedConsentResolveService} from "./shared/detailed-consent-resolve.service";
import {ConsentTermsResolveService} from "./shared/consent-terms-resolve.service";
import {ConsentRevocationTermsResolveService} from "./shared/consent-revocation-terms-resolve.service";
import {ConsentListResolveService} from "./shared/consent-list-resolve.service";
import {ProviderResolveService} from "./shared/provider-resolve.service";
import {PatientUploadedDocumentResolveService} from "./shared/patient-uploaded-document-resolve.service";
import {ConsentsComponent} from "./consents/consents.component";

const consentRoutes: Routes = [
  {
    path: 'consents',
    component: ConsentsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: ConsentCardListComponent,
        resolve: {
          consentList: ConsentListResolveService,
          patientUploadedDocuments: PatientUploadedDocumentResolveService
        }
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
        component: ConsentSignComponent,
        resolve: {
          consent: DetailedConsentResolveService,
          consentTerms: ConsentTermsResolveService
        }
      },
      {
        path: 'consent-revoke/:consentId',
        component: ConsentRevokeComponent,
        resolve: {
          consent: DetailedConsentResolveService,
          consentRevocationTerms: ConsentRevocationTermsResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(consentRoutes)],
  exports: [RouterModule]
})
export class ConsentRoutingModule {
}

export const consentRoutableComponents = [
  ConsentsComponent,
  ConsentCardListComponent,
  ConsentCreateEditComponent,
  ConsentSignComponent,
  ConsentRevokeComponent
];

export const consentRoutableResolves = [
  ConsentResolveService,
  ConsentListResolveService,
  ConsentTermsResolveService,
  ConsentRevocationTermsResolveService,
  DetailedConsentResolveService,
  PatientUploadedDocumentResolveService,
  ProviderResolveService,
  SensitivityPoliciesResolveService,
  PurposeOfUsesResolveService
];
