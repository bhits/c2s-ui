import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MedicalDocumentListComponent} from "./medical-document-list/medical-document-list.component";

const medicalDocumentsRoutes: Routes = [
  {
    path: 'medical-documents',
    component: MedicalDocumentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(medicalDocumentsRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MedicalDocumentsRoutingModule {
}

export const routedComponents = [
  MedicalDocumentListComponent
];
