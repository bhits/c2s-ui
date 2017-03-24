import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {SensitivityPolicy} from "./sensitivity-policy";
import {ExceptionService} from "../../core/exception.service";
import {Observable, BehaviorSubject} from "rxjs";
import {ConsentCreateEdit} from "./consent-create-edit.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {SharePurpose} from "./share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {UtilityService} from "../../shared/utility.service";
import {Consent} from "./consent.model";
import {ConsentTerms} from "./consent-terms.model";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/purposes");
  private pcmSensitivityPolicyUrl: string = this.c2sUiApiUrlService.getVssBaseUrl().concat("/valueSetCategories");
  private pcmConsentUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/consents");

  private consentSudject: BehaviorSubject<ConsentCreateEdit> = new BehaviorSubject<ConsentCreateEdit>(null);
  public consentEmitter: Observable<ConsentCreateEdit> = this.consentSudject.asObservable();

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,) {
  }

  getConsentEmitter(): Observable<ConsentCreateEdit> {
    return this.consentEmitter;
  }

  setConsent(consentCreateEdit: ConsentCreateEdit) {
    this.consentSudject.next(consentCreateEdit);
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

  createConsent(consent: ConsentCreateEdit): Observable<void> {
    return this.http.post(this.pcmConsentUrl, this.createConsentDto(consent))
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  deleteConsent(id: number): Observable<void> {
    const DELETE_CONSENT_URL = `${this.pcmConsentUrl}/${id}`;
    return this.http.delete(DELETE_CONSENT_URL)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  getConsentById(id: string): Observable<ConsentCreateEdit> {
    return this.http.get(this.pcmConsentUrl + "/" + id)
      .map((resp: Response) => <ConsentCreateEdit>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getConsent(id: number): Observable<Consent> {
    const url = `${this.pcmConsentUrl}/${id}`;
    const jsonFormat: string = "detailedConsent";
    let params: URLSearchParams = new URLSearchParams();
    params.set('format', jsonFormat);
    return this.http.get(url, {search: params})
      .map((resp: Response) => <Consent>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  updateConsent(consent: ConsentCreateEdit): Observable<void> {
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
      .catch(this.exceptionService.handleError);
  }

  private createConsentDto(consent: ConsentCreateEdit): any {
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
}
