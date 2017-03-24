import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {SensitivityPolicy} from "./sensitivity-policy";
import {ExceptionService} from "../../core/exception.service";
import {Observable, BehaviorSubject} from "rxjs";
import {ConsentCreateEdit} from "./consent-create-edit.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Injectable()
export class ConsentService {
  private pcmPurposeOfUseUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/purposes");
  private pcmSensitivityPolicyUrl: string = this.c2sUiApiUrlService.getVssBaseUrl().concat("/valueSetCategories");
  private pcmConsentUrl: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/consents");
  private consentListUri: string = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/consents/pageNumber");


  private consentSudject: BehaviorSubject<ConsentCreateEdit> = new BehaviorSubject<ConsentCreateEdit>(null);
  public consentEmitter: Observable<ConsentCreateEdit> = this.consentSudject.asObservable();

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private c2sUiApiUrlService: C2sUiApiUrlService) {
  }

  getConsentEmitter():Observable<ConsentCreateEdit>{
    return this.consentEmitter;
  }

  setConsent(consentCreateEdit: ConsentCreateEdit){
    this.consentSudject.next(consentCreateEdit);
  }

  getPurposeOfUses(): Observable<PurposeOfUseBase[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <PurposeOfUseBase[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getSensitivityPolices(): Observable<SensitivityPolicy[]> {
    return this.http.get(this.pcmSensitivityPolicyUrl)
      .map((resp: Response) => <PurposeOfUseBase[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getProviderByNPI(providers: FlattenedSmallProvider[], npi: string): FlattenedSmallProvider {

    for(let provider of providers){
      if (provider.npi === npi) {
        return provider;
      }
    }
    return null;
  }

  createConsent(consent: ConsentCreateEdit) {
    return this.http.post(this.pcmConsentUrl, consent)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.exceptionService.handleError);
  }

  getConsentById(id: string):Observable<ConsentCreateEdit> {
    return this.http.get(this.pcmConsentUrl + "/" + id)
      .map((resp: Response) => <ConsentCreateEdit>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  updateConsent(consent: ConsentCreateEdit) {
    return this.http.put(this.pcmConsentUrl + "/" + consent.id, consent)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.exceptionService.handleError);
  }
}
