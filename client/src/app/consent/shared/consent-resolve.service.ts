import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {ConsentService} from "./consent.service";
import {Md2Toast} from "md2";

@Injectable()
export class ConsentResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {
    let consentId = route.params['consentId'];
    return this.consentService.getConsentById(consentId)
                              .then(consent => {
                                return consent;
                              })
                              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    this.toast.show("Error in getting edit consent.", 2000);
    return Promise.reject(error.message || error);
  }

}
