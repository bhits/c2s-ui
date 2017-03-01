import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SensitivityPolicy} from "./sensitivity-policy";
import 'rxjs/add/operator/toPromise';
import {Provider} from "./Provider";
import {PurposeOfUse} from "./purpose-of-use";

@Injectable()
export class ConsentService {
  //TODO get configuration url from backend on application startup
  private pcmBaseUrl:string = "http://localhost/pcm/patients/";
  private pcmProvidersUrl:string = this.pcmBaseUrl + "/providers";
  private pcmPurposeOfUseUrl:string = this.pcmBaseUrl + "purposeOfUse";
  private pcmSensitivityPolicyUrl:string = this.pcmBaseUrl + "sensitivityPolicy";


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


}
