import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MedicalDocumentsService} from "../../medical-documents/shared/medical-documents.service";
import {UploadedDocument} from "c2s-ng-shared";

@Injectable()
export class PatientUploadedDocumentResolveService implements Resolve<any> {
  constructor(private medicalDocumentsService: MedicalDocumentsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UploadedDocument[]> {
    return this.medicalDocumentsService.getUploadedDocumentList()
      .do((documents: UploadedDocument[]) => {
        return documents;
      });
  }
}
