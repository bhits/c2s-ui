import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {AbstractProvider} from "../../shared/abstract-provider.model";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getProviders()
      .do((providers: AbstractProvider[]) => {
        return providers;
      });
  }
}
