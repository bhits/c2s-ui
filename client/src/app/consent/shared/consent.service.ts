import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Provider} from "./Provider.model";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {SensitivityPolicy} from "./sensitivity-policy";
import {ExceptionService} from "../../core/exception.service";
import {Observable} from "rxjs";
import {ConsentCreateEdit} from "./consent-create-edit.model";

@Injectable()
export class ConsentService {
  private pcmBaseUrl: string = "/pcm/patients/";
  private pcmProvidersUrl: string = this.pcmBaseUrl + "/providers";
  private pcmPurposeOfUseUrl: string = this.pcmBaseUrl + "purposeOfUse";
  private pcmSensitivityPolicyUrl: string = this.pcmBaseUrl + "sensitivityPolicy";
  private pcmConsentUrl: string = this.pcmBaseUrl + "consents";
  private consentListUri: string = "/pcm/patients/consents/pageNumber";

  constructor(private http: Http, private exceptionService: ExceptionService) {
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

  getProviderByNPI(providers: Provider[], npi: string): Provider {
    for (let provider of providers) {
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

  getConsentById(id: string): Observable<ConsentCreateEdit> {
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
