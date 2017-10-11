import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UploadedDocument} from "c2s-ng-shared";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {NotificationService} from "../../core/notification.service";

@Component({
  selector: 'c2s-medical-document-list',
  templateUrl: './medical-document-list.component.html',
  styleUrls: ['./medical-document-list.component.scss']
})
export class MedicalDocumentListComponent implements OnInit {
  @Input() uploadedDocumentList: UploadedDocument[];
  @Output() uploadedDocumentDeleted = new EventEmitter<number>();

  private selectedDocument: UploadedDocument;

  constructor(private medicalDocumentsService: MedicalDocumentsService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  openConfirmDeleteDialog(dialog: any, document: UploadedDocument) {
    dialog.open();
    this.selectedDocument = document;
  }

  confirmDeleteDocument(dialog: any) {
    dialog.close();
    if (this.selectedDocument != null) {
      this.medicalDocumentsService.deleteUploadedDocumentById(this.selectedDocument.id)
        .subscribe(
          () => {
            this.uploadedDocumentDeleted.emit(this.selectedDocument.id);
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
