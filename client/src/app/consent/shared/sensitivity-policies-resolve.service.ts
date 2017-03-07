import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Md2Toast} from "md2";
import {SensitivityPolicy} from "./sensitivity-policy";

@Injectable()
export class SensitivityPoliciesResolveService {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {

    return this.consentService.getSensitivityPolices()
      .do((sensitivityPolicy: SensitivityPolicy[]) => {
        return sensitivityPolicy;
      });
  }
}
