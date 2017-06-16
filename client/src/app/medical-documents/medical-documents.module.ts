import {NgModule} from "@angular/core";
import {NgUploaderModule} from "ngx-uploader";
import {MedicalDocumentsRoutingModule, medicalDocumentRoutedComponents} from "./medical-documents-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";
import {MedicalDocumentListComponent} from "./medical-document-list/medical-document-list.component";
import {MedicalDocumentUploadComponent} from "./medical-document-upload/medical-document-upload.component";
import {MedicalDocumentsService} from "./shared/medical-documents.service";

@NgModule({
  imports: [
    NgUploaderModule,
    SharedModule,
    LayoutModule,
    MedicalDocumentsRoutingModule,
    TranslateModule
  ],
  declarations: [
    MedicalDocumentListComponent,
    MedicalDocumentUploadComponent,
    medicalDocumentRoutedComponents
  ],
  providers: [
    MedicalDocumentsService
  ]
})
export class MedicalDocumentsModule {
}
