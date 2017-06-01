import {Component, OnInit} from "@angular/core";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {NotificationService} from "../../core/notification.service";

@Component({
  selector: 'c2s-medical-documents',
  templateUrl: './medical-document-list.component.html',
  styleUrls: ['./medical-document-list.component.scss']
})
export class MedicalDocumentListComponent implements OnInit {
  uploadedDocumentList: UploadedDocument[];
  private selectedDocument: UploadedDocument;

  constructor(private medicalDocumentsService: MedicalDocumentsService,
              private notificationService: NotificationService) {
    this.uploadedDocumentList = [];
  }

  ngOnInit() {
    this.medicalDocumentsService.getUploadedDocumentList()
      .subscribe(
        (docList: UploadedDocument[]) => {
          this.uploadedDocumentList = docList;
        },
        err => {
          this.medicalDocumentsService.handleShowUploadedDocumentListError(err);
        }
      )
  }

  openConfirmDeleteDialog(dialog: any, document: UploadedDocument) {
    dialog.open();
    this.selectedDocument = document;
  }

  confirmDeleteDocument(dialog: any) {
    dialog.close();
    if(this.selectedDocument != null) {
      this.medicalDocumentsService.deleteUploadedDocumentById(this.selectedDocument.id)
        .subscribe(
          () => {
            this.uploadedDocumentList = this.uploadedDocumentList.filter(doc => doc !== this.selectedDocument);
            this.notificationService.i18nShow("MEDICAL_DOCUMENTS.MEDICAL_DOCUMENT_LIST.DELETE.SUCCESS_MESSAGE");
          },
          err => {
            this.notificationService.i18nShow("MEDICAL_DOCUMENTS.MEDICAL_DOCUMENT_LIST.DELETE.ERROR_MESSAGE");
            console.log(err);
          }
        )
    }
  }

}
