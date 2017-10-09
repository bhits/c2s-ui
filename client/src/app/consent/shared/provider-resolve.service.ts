import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {DataService} from "../../core/data.service";
import {ConsentProvider} from "../../shared/consent-provider.model";

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
