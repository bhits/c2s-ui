import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {Md2Toast} from "md2";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {

    return this.consentService.getProviders()
      .then(res => {
        return  res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    this.toast.show("Error in getting Providers.", 2000);
    return Promise.reject(error.message || error);
  }
}
