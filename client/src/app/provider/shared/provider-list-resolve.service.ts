import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {DataService} from "../../core/data.service";
import {ConsentProvider} from "c2s-ng-shared";

@Injectable()
export class ProviderListResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConsentProvider[]> {
    return this.dataService.getProviders()
      .do((providers: ConsentProvider[]) => {
        return providers;
      });
  }
}
