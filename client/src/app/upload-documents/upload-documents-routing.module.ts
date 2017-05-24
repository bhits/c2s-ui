import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UploadDocumentsComponent} from "./upload-documents/upload-documents.component";

const uploadDocumentsRoutes: Routes = [
  {
    path: 'upload-documents',
    component: UploadDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(uploadDocumentsRoutes)],
  exports: [RouterModule],
  providers: []
})
export class UploadDocumentsRoutingModule {
}

export const routedComponents = [
  UploadDocumentsComponent
];
