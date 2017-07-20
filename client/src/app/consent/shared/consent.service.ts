import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {SensitivityPolicy} from "./sensitivity-policy";
import {ExceptionService} from "../../core/exception.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Consent} from "./consent.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {SharePurpose} from "./share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {UtilityService} from "../../shared/utility.service";
import {DetailedConsent} from "./detailed-consent.model";
import {ConsentTerms} from "./consent-terms.model";
import {ConsentRevocation} from "./consent-revocation.model";
import {BinaryFile} from "./binary-file.model";
import {NotificationService} from "../../core/notification.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {TryPolicyResponse} from "./tryPolicy-response.model";


@Injectable()
export class ConsentService {
  private currentUserMrn: string = this.limitedProfileService.getUserMrn();
  private pcmPurposeOfUseUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/purposes");
  private pcmSensitivityPolicyUrl: string = this.c2sUiApiUrlService.getVssBaseUrl().concat("/valueSetCategories");
  private pcmConsentUrl = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/").concat(this.currentUserMrn).concat("/consents");
  private pcmConsentTermUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/consentRevocationTerm");
  private phrGetDocumentListUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/patients/").concat(this.currentUserMrn).concat("/documents");
  private tryPolicyUrl = this.c2sUiApiUrlService.getTryPolicyBaseUrl().concat("/tryPolicyXHTML?");

  private consentSubject: BehaviorSubject<Consent> = new BehaviorSubject<Consent>(null);
  public consentEmitter: Observable<Consent> = this.consentSubject.asObservable();

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,
              private notificationService: NotificationService,
              private limitedProfileService: LimitedProfileService) {
  }

  getConsentEmitter(): Observable<Consent> {
    return this.consentEmitter;
  }

  setConsent(consent: Consent) {
    this.consentSubject.next(consent);
  }

  getPurposeOfUses(): Observable<SharePurpose[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getSensitivityPolices(): Observable<SensitivityPolicy[]> {
    return this.http.get(this.pcmSensitivityPolicyUrl)
      .map((resp: Response) => <PurposeOfUseBase[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getProviderByNPI(providers: ConsentProvider[], npi: string): ConsentProvider {
    for (let provider of providers) {
      if (provider.identifiers[0].value === npi) {
        return provider;
      }
    }
    return null;
  }

  getUploadedDocumentList(): Observable<UploadedDocument[]> {
    return this.http.get(this.phrGetDocumentListUrl)
      .map((resp: Response) => <UploadedDocument[]>(resp.json()))
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  getTryPolicyXHTML(documentId: number, pou: string, consentId: number) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('documentId', documentId.toString());
    params.set('consentId', consentId.toString());
    params.set('patientId', this.currentUserMrn);
    params.set('purposeOfUseCode', pou);

    let headers: Headers = new Headers();
    headers.append('Accept-Language', this.limitedProfileService.getUserLocale());

    let options = new RequestOptions({headers: headers, search: params});

    return this.http.get(this.tryPolicyUrl, options)
      .map((resp: Response) => <TryPolicyResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  createConsent(consent: Consent): Observable<void> {
    return this.http.post(this.pcmConsentUrl, this.createConsentDto(consent))
      .map(() => null)
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  deleteConsent(id: number): Observable<void> {
    const DELETE_CONSENT_URL = `${this.pcmConsentUrl}/${id}`;
    return this.http.delete(DELETE_CONSENT_URL)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  getConsentById(id: string): Observable<Consent> {
    const url = `${this.pcmConsentUrl}/${id}`;
    return this.http.get(url)
      .map((resp: Response) => <Consent>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getConsent(id: number): Observable<DetailedConsent> {
    const url = `${this.pcmConsentUrl}/${id}`;
    const jsonFormat: string = "detailedConsent";
    let params: URLSearchParams = new URLSearchParams();
    params.set('format', jsonFormat);
    return this.http.get(url, {search: params})
      .map((resp: Response) => <DetailedConsent>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getSavedConsentPdf(id: number): Observable<BinaryFile> {
    const url: string = `${this.pcmConsentUrl}/${id}`;
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(url, format);
  }

  getSignedConsentPdf(id: number): Observable<BinaryFile> {
    const url = `${this.pcmConsentUrl}/${id}/attestation`;
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(url, format);
  }

  getRevokedConsentPdf(id: number): Observable<BinaryFile> {
    const url = `${this.pcmConsentUrl}/${id}/revocation`;
    const format: string = "pdf";
    return this.getConsentAsBinaryFile(url, format);
  }

  updateConsent(consent: Consent): Observable<void> {
    return this.http.put(this.pcmConsentUrl + "/" + consent.id, this.createConsentDto(consent))
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  getConsentAttestationTerm(): Observable<ConsentTerms> {
    const url = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/consentAttestationTerm");
    return this.http.get(url)
      .map((resp: Response) => <ConsentTerms>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  attestConsent(consentId: number): Observable<void> {
    const acceptTerms: boolean = true;
    const url = `${this.pcmConsentUrl}/${consentId}/attestation`;

    return this.http.put(url, JSON.stringify({acceptTerms: acceptTerms}))
      .map(() => null)
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  private createConsentDto(consent: Consent): any {
    let temp = {};
    Object.keys(consent).forEach(function (key) {
      if (key !== 'startDate' && key !== 'endDate') {
        temp[key] = consent[key];
      }
    });
    temp['startDate'] = this.utilityService.dateToLocalDate(consent.startDate);
    temp['endDate'] = this.utilityService.dateToLocalDate(consent.endDate);

    return temp;
  }

  getConsentRevocationTerms() {
    return this.http.get(this.pcmConsentTermUrl)
      .map((resp: Response) => <SharePurpose[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  revokeConsent(consentRevocation: ConsentRevocation, consentId: string): Observable<void> {
    let revocationUrl = this.pcmConsentUrl.concat("/" + consentId).concat("/revocation");

    return this.http.put(revocationUrl, consentRevocation)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  handleDownloadSuccess(pdf: BinaryFile, consentId: number, consentOptionsDialog: any, namePrefix: string) {
    consentOptionsDialog.close();
    this.utilityService.downloadFile(pdf.content, `${namePrefix}_${consentId}.pdf`, pdf.contentType);
    this.notificationService.i18nShow('NOTIFICATION_MSG.SUCCESS_DOWNLOAD_CONSENT');
  }

  handleDownloadError(err: string) {
    this.notificationService.i18nShow('NOTIFICATION_MSG.FAILED_DOWNLOAD_CONSENT');
    console.log(err);
  }

  handleTryPolicySuccess(encodedDocument: TryPolicyResponse) {
    let decodedDocument = this.b64DecodedUnicode(encodedDocument.document);
    let viewer = window.open('', '_blank');
    viewer.document.open().write(decodedDocument);
  }

  handleShowUploadedDocumentListError(err: any) {
    if (err === "404") {
      this.notificationService.i18nShow("MEDICAL_DOCUMENTS.NO_DOCS_FOUND_ERROR");
    }
    else {
      this.notificationService.i18nShow("MEDICAL_DOCUMENTS.GENERIC_ERROR");
    }
  }

  handleCreateConsentError(err: any) {
    if(err =="409"){
      this.notificationService.i18nShow("NOTIFICATION_MSG.DUPLICATE_CONSENT");
    }
  }

  handleSignConsentError(err: any) {
    if(err =="400"){
      this.notificationService.i18nShow("NOTIFICATION_MSG.INVALID_CONSENT_SIGN_DATE");
    }
  }

  private b64DecodedUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private getConsentAsBinaryFile(url: string, format: string): Observable<BinaryFile> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('format', format);
    return this.http.get(url, {search: params})
      .map((resp: Response) => <BinaryFile>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
