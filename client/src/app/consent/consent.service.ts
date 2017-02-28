import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {SensitivityPolicy} from "./sensitivity-policy";
import 'rxjs/add/operator/toPromise';
import {PurposeOfUse} from "./purpose-of-use";
import {Provider} from "./Provider";

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
  //purposeoOfuUse
  setPurposeOfUseStatusToChecked(purposeOfUses:PurposeOfUse[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = true;
    }
  }

  updatePurposeOfUseStatus(purposeOfUsesCodes:string[], purposeOfUses:PurposeOfUse[]){
    this.setPurposeOfUseStatusToUnChecked(purposeOfUses);
    for(let p1 of purposeOfUsesCodes){
      for(let p2 of purposeOfUses){
        if(p1 === p2.code.toString()){
          p2['checked'] = true;
          break;
        }
      }
    }
  }

  setPurposeOfUseStatusToUnChecked(purposeOfUses:PurposeOfUse[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = false;
    }
  }

  getSelectedPurposeOfUseCode(purposeOfUses:PurposeOfUse[]):string[]{
    let selected:string[] =  new Array();
    for(let purposeOfUse of purposeOfUses){
      if( purposeOfUse['checked']){
        selected.push(purposeOfUse.code.toString());
      }
    }
    return selected;
  }


  /// SC

  sensitivityPoliciesStatusToUnChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = false;
    }
  }

  updateSensitivitiesPoliciesStatus(sensitivityPoliciesCodes:string[], sensitivityPolicies:SensitivityPolicy[]){
    this.sensitivityPoliciesStatusToUnChecked(sensitivityPolicies);
    for(let spc of sensitivityPoliciesCodes){
      for(let sp of sensitivityPolicies){
        if(spc === sp.code.toString()){
          sp['checked'] = true;
          break;
        }
      }
    }
  }

  setSenetivityPoliciesStatusToUnChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = false;
    }
  }

  setSensitivityPoliciesStatusToChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = true;
    }
  }
  getSelectedSensitivityPoliciesCode(sensitivityPolicies:SensitivityPolicy[]):string[]{
    let selected:string[] =  new Array();
    for(let sp of sensitivityPolicies){
      if( sp['checked']){
        selected.push(sp.code.toString());
      }
    }
    return selected;
  }
}
