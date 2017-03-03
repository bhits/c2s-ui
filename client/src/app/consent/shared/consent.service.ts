import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Provider} from "./Provider";
import {PurposeOfUse} from "./purpose-of-use";
import {Consent} from "./consent";
import {SensitivityPolicy} from "./sensitivity-policy";

@Injectable()
export class ConsentService {
  //TODO get configuration url from backend on application startup
  private pcmBaseUrl:string = "http://localhost/pcm/patients/";
  private pcmProvidersUrl:string = this.pcmBaseUrl + "/providers";
  private pcmPurposeOfUseUrl:string = this.pcmBaseUrl + "purposeOfUse";
  private pcmSensitivityPolicyUrl:string = this.pcmBaseUrl + "sensitivityPolicy";
  private pcmConsentUrl:string = this.pcmBaseUrl + "consents";


  constructor(private http: Http) { }

  getProviders(): Promise<Provider[]> {
    return this.http.get(this.pcmProvidersUrl)
                      .toPromise()
                      .then(response => response.json() as Provider[])
                      .catch(this.handleError);
  }

  getPurposeOfUses():Promise<PurposeOfUse[]>{
    return this.http.get(this.pcmPurposeOfUseUrl)
                .toPromise()
                .then(response => response.json() as PurposeOfUse[])
                .catch(this.handleError);
  }

  getSensitivityPolices():Promise<SensitivityPolicy[]>{
    return this.http.get(this.pcmSensitivityPolicyUrl)
                        .toPromise()
                        .then(response => response.json() as SensitivityPolicy[])
                        .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Error in getting data from the backend', error);
    return Promise.reject(error.message || error);
  }

  getProviderByNPI(providers:Provider[], npi:string):Provider{
    for(let provider of providers){
        if(provider.npi === npi){
          return provider;
        }
    }
    return null;
  }

  createConsent(consent: Consent){
    return this.http.post(this.pcmConsentUrl, consent)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(this.handleError);
  }

  getConsentById(id: string){
    return this.http.get(this.pcmConsentUrl + "/" +id)
      .toPromise()
      .then(response => response.json() as PurposeOfUse[])
      .catch(this.handleError);
  }

  updateConsent(consent:Consent){
    return this.http.put(this.pcmConsentUrl, consent)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(this.handleError);
  }
}
