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
import {SharePurpose} from "./share-purpose.model";
import {ConsentProvider} from "../../shared/consent-provider.model";
import {UtilityService} from "../../shared/utility.service";

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
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private utilityService: UtilityService,) {
  }

  getConsentEmitter():Observable<ConsentCreateEdit>{
    return this.consentEmitter;
  }

  setConsent(consentCreateEdit: ConsentCreateEdit){
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
    for(let provider of providers){
      if (provider.identifiers[0].value === npi) {
        return provider;
      }
    }
    return null;
  }

  createConsent(consent: ConsentCreateEdit) {

    return this.http.post(this.pcmConsentUrl, this.createConsentDto(consent))
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
    return this.http.put(this.pcmConsentUrl + "/" + consent.id, this.createConsentDto(consent))
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.exceptionService.handleError);
  }

  private createConsentDto(consent: ConsentCreateEdit):any{
    let temp = {};
    Object.keys(consent).forEach(function(key) {
      if(key !=='startDate' && key !=='endDate'){
        temp[key] = consent[key];
      }
    });
    temp['startDate'] = this.utilityService.dateToLocalDate(consent.startDate);
    temp['endDate'] = this.utilityService.dateToLocalDate(consent.endDate);

    return temp;
  }
}
