import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {DataService} from "../../core/data.service";
import {ConsentProvider} from "c2s-ng-shared";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getProviders()
      .do((providers: ConsentProvider[]) => {
        return providers;
      });
  }
}
