import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {SensitivityPolicy} from "./sensitivity-policy";

@Injectable()
export class SensitivityPoliciesResolveService {

  constructor(private consentService: ConsentService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return this.consentService.getSensitivityPolices()
      .do((sensitivityPolicy: SensitivityPolicy[]) => {
        return sensitivityPolicy;
      });
  }
}
