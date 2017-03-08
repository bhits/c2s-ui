import { Injectable } from '@angular/core';
import {ConsentService} from "./consent.service";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Provider} from "./Provider.model";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private consentService: ConsentService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.consentService.getProviders()
              .do((providers: Provider[]) => {
                  return providers;
                });
  }
}
