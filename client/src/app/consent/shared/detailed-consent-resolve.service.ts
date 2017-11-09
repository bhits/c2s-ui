import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {DetailedConsent} from "c2s-ng-shared";
import {ConsentService} from "./consent.service";

@Injectable()
export class DetailedConsentResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    let consentId = route.params['consentId'];
    return this.consentService.getConsent(consentId)
      .do((consent: DetailedConsent) => {
        return consent;
      });
  }
}
