import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Md2Toast} from "md2";

@Injectable()
export class SensitivityPoliciesResolveService {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getSensitivityPolices()
                              .then(res => {
                                return res;
                              })
                              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    this.toast.show("Error in getting sensitivity policies categories.", 2000);
    return Promise.reject(error.message || error);
  }

}
