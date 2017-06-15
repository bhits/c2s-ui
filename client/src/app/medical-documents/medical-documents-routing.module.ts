import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MedicalDocumentsComponent} from "./medical-documents/medical-documents.component";

const medicalDocumentsRoutes: Routes = [
  {
    path: 'medical-documents',
    component: MedicalDocumentsComponent
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
