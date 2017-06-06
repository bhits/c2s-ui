import {Component, OnInit} from "@angular/core";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {UploadedDocumentTypeCode} from "../../shared/uploaded-document-type-code.model";

@Component({
  selector: 'c2s-medical-documents',
  templateUrl: './medical-documents.component.html',
  styleUrls: ['./medical-documents.component.scss']
})
export class MedicalDocumentsComponent implements OnInit {
  uploadedDocumentList: UploadedDocument[];
  documentTypeCodesList: UploadedDocumentTypeCode[];

  constructor(private medicalDocumentsService: MedicalDocumentsService) {
    this.uploadedDocumentList = [];
    this.documentTypeCodesList = [];
  }

  ngOnInit() {
    this.getDocumentTypeCodesList();
    this.getDocumentsData();
  }

  getDocumentTypeCodesList() {
    this.medicalDocumentsService.getAllDocumentTypeCodesList()
      .subscribe(
        (typeCodesList: UploadedDocumentTypeCode[]) => {
          this.documentTypeCodesList = typeCodesList;
        },
        err => {
          this.medicalDocumentsService.handleShowDocumentTypeCodesListError(err);
        }
      );
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

  onUploadedDocumentDeleted(deletedDocumentId: number) {
    this.uploadedDocumentList = this.uploadedDocumentList.filter(doc => doc.id !== deletedDocumentId);
  }

}
