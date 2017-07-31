import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MedicalDocumentsComponent} from "./medical-documents/medical-documents.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";

const medicalDocumentsRoutes: Routes = [
  {
    path: 'medical-documents',
    component: MedicalDocumentsComponent,
    canActivate: [CanActivateAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(medicalDocumentsRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MedicalDocumentsRoutingModule {
}

export const medicalDocumentRoutedComponents = [
  MedicalDocumentsComponent
];
