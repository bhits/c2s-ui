import {Component, OnInit} from "@angular/core";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";

@Component({
  selector: 'c2s-medical-documents',
  templateUrl: './medical-documents.component.html',
  styleUrls: ['./medical-documents.component.scss']
})
export class MedicalDocumentsComponent implements OnInit {
  uploadedDocumentList: UploadedDocument[];

  constructor(private medicalDocumentsService: MedicalDocumentsService) {
    this.uploadedDocumentList = [];
  }

  ngOnInit() {
    this.getDocumentsData();
  }

  getDocumentsData() {
    this.medicalDocumentsService.getUploadedDocumentList()
      .subscribe(
        (docList: UploadedDocument[]) => {
          this.uploadedDocumentList = docList;
        },
        err => {
          this.medicalDocumentsService.handleShowUploadedDocumentListError(err);
        }
      );
  }

  onUploadedDocumentAdded(newUploadedDocument: UploadedDocument) {
    this.uploadedDocumentList.push(newUploadedDocument);
  }

}
