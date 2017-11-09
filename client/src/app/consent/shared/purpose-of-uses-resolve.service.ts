import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {ConsentService} from "./consent.service";
import {SharePurpose} from "c2s-ng-shared";

@Injectable()
export class PurposeOfUsesResolveService {

  constructor(private consentService: ConsentService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getPurposeOfUses()
      .do((purposeOfUses: SharePurpose[]) => {
        return purposeOfUses;
      });
  }
}
