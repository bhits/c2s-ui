import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Consent} from "./consent.model";
import {ConsentService} from "./consent.service";

@Injectable()
export class DetailedConsentResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    let consentId = route.params['consentId'];
    return this.consentService.getConsent(consentId)
      .do((consent: Consent) => {
        return consent;
      });
  }
}
