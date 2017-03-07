import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from "@angular/router";
import {ConsentService} from "./consent.service";
import {Md2Toast} from "md2";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";

@Injectable()
export class PurposeOfUsesResolveService {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getPurposeOfUses()
                                .do((purposeOfUses: PurposeOfUseBase[]) => {
                                  return purposeOfUses;
                                });
  }

  private handleError(error: any): Promise<any> {
    this.toast.show("Error in getting Purpose of uses.", 2000);
    return Promise.reject(error.message || error);
  }

}
