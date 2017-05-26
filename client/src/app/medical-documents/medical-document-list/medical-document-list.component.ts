import {Component, OnInit} from "@angular/core";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";

@Component({
  selector: 'c2s-medical-documents',
  templateUrl: './medical-document-list.component.html',
  styleUrls: ['./medical-document-list.component.scss']
})
export class MedicalDocumentListComponent implements OnInit {
  public uploadedDocumentList: UploadedDocument[];

  constructor(private medicalDocumentsService: MedicalDocumentsService) { }

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

}
