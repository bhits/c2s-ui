import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {ConsentService} from "./consent.service";
import {Consent} from "./consent.model";

@Injectable()
export class ConsentResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let consentId = route.params['consentId'];
    return this.consentService.getConsentById(consentId)
                              .do((consent: Consent) => {
                                return consent;
                              });
  }
}
