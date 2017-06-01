import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {ExceptionService} from "../../core/exception.service";
import {NotificationService} from "../../core/notification.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {ProfileService} from "../../security/shared/profile.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";

@Injectable()
export class MedicalDocumentsService {
  private currentUserMrn: string = this.profileService.getUserMrn();
  private phrDocumentsUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/patients/").concat(this.currentUserMrn).concat("/documents");

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private notificationService: NotificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private profileService: ProfileService) {
  }

  getUploadedDocumentList(): Observable<UploadedDocument[]> {
    return this.http.get(this.phrDocumentsUrl)
      .map((resp: Response) => <UploadedDocument[]>(resp.json()))
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  handleShowUploadedDocumentListError(err: any){
    if(err === "404"){
      this.notificationService.i18nShow("MEDICAL_DOCUMENTS.NO_DOCS_FOUND_ERROR");
    }
    else {
      this.notificationService.i18nShow("MEDICAL_DOCUMENTS.GENERIC_ERROR");
    }
  }
}
