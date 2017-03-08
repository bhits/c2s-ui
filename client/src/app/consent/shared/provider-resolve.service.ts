import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Provider} from "./Provider.model";
import {DataService} from "../../shared/data.service";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getProviders()
              .do((providers: Provider[]) => {
                  return providers;
                });
  }
}
