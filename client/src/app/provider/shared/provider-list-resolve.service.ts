import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DataService} from "../../shared/data.service";
import {AbstractProvider} from "../../shared/abstract-provider.model";

@Injectable()
export class ProviderListResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AbstractProvider[]> {
    return this.dataService.getProviders()
      .do((providers: AbstractProvider[]) => {
        return providers;
      });
  }
}
