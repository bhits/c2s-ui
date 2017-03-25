import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {ConsentService} from "./consent.service";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {SharePurpose} from "./share-purpose.model";

@Injectable()
export class PurposeOfUsesResolveService {

  constructor(private consentService: ConsentService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getPurposeOfUses()
                                .do((purposeOfUses: SharePurpose[]) => {
                                  return purposeOfUses;
                                });
  }
}
