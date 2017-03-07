import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {Md2Toast} from "md2";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Provider} from "./Provider.model";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService,private toast: Md2Toast) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getProviders()
                              .do((providers: Provider[]) => {
                                  return providers;
                                });
  }
}
