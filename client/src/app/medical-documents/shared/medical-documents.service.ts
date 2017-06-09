import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {ExceptionService} from "../../core/exception.service";
import {NotificationService} from "../../core/notification.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {ProfileService} from "../../security/shared/profile.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {UploadInput} from "ngx-uploader";
import {TokenService} from "../../security/shared/token.service";
import {DocumentToUploadMetadata} from "./document-to-upload-metadata.model";
import {UploadedDocumentTypeCode} from "../../shared/uploaded-document-type-code.model";

@Injectable()
export class MedicalDocumentsService {
  private currentUserMrn: string = this.profileService.getUserMrn();
  private phrDocumentsUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/patients/").concat(this.currentUserMrn).concat("/documents");
  private phrDocumentTypeCodesUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/documentTypeCodes");

  constructor(private http: Http,
              private tokenService: TokenService,
              private exceptionService: ExceptionService,
              private notificationService: NotificationService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private profileService: ProfileService) {
  }

  getAllDocumentTypeCodesList(): Observable<UploadedDocumentTypeCode[]> {
    return this.http.get(this.phrDocumentTypeCodesUrl)
      .map((resp: Response) => <UploadedDocumentTypeCode[]>(resp.json()))
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  getUploadedDocumentList(): Observable<UploadedDocument[]> {
    return this.http.get(this.phrDocumentsUrl)
      .map((resp: Response) => <UploadedDocument[]>(resp.json()))
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  deleteUploadedDocumentById(docId: number): Observable<void> {
    if(docId !== null){
      if(docId >= 0){
        const DELETE_DOCUMENT_URL = this.phrDocumentsUrl.concat("/" + docId);
        return this.http.delete(DELETE_DOCUMENT_URL)
          .catch(this.exceptionService.handleErrorWithErrorCode);
      }
    }
  }

  prepareDocumentUpload(documentToUploadMetadata: DocumentToUploadMetadata): UploadInput {
    const currentUserMrn: string = this.profileService.getUserMrn();
    const phrDocumentsUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/patients/").concat(currentUserMrn).concat("/documents");

    const token = this.tokenService.getAccessToken();

    let formData: {[key: string]: string | Blob };

    if(documentToUploadMetadata.description){
      formData = {
        documentName: documentToUploadMetadata.documentName,
        documentTypeCodeId: documentToUploadMetadata.documentTypeCodeId.toString(),
        description: documentToUploadMetadata.description
      };
    }else{
      formData = {
        documentName: documentToUploadMetadata.documentName,
        documentTypeCodeId: documentToUploadMetadata.documentTypeCodeId.toString()
      };
    }

    let customHeaders = {};

    if (token && token['access_token']) {
      let access_token = token['access_token'];
      let access_token_string = 'Bearer ' + access_token;
      customHeaders = {
        "Authorization": access_token_string
      };
    }else{
      // FIXME: Replace this with proper error handling.
      throw new Error("token variable check failed");
    }

    return {
      type: 'uploadAll',
      fieldName: 'documentFile',
      url: phrDocumentsUrl,
      method: 'POST',
      data: formData,
      concurrency: 1, // set sequential uploading of files with concurrency 1
      headers: customHeaders
    };
  }

  handleShowUploadedDocumentListError(err: string){
    switch(err){
      case "404":
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.MEDICAL_DOCUMENT_LIST.NO_DOCS_FOUND_ERROR");
        break;
      case "409":
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.UPLOAD_MEDICAL_DOCUMENT.UPLOAD_FORM.DOC_NAME_ALREADY_EXISTS_ERROR");
        break;
      case "412":
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.UPLOAD_MEDICAL_DOCUMENT.UPLOAD_FORM.DOC_INVALID_ERROR");
        break;
      default:
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.MEDICAL_DOCUMENT_LIST.GENERIC_ERROR");
    }
  }

  handleShowDocumentTypeCodesListError(err: string){
    switch(err){
      /* The case statement below is deliberately empty so it will fall through to the default case.
         If a different error message is to be implemented in the future for the 500 code, it can be
         easily added under the 500 case statement */
      case "500":
      default:
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.DOCUMENT_TYPE_CODES_LIST_ERROR");
    }
  }
}
