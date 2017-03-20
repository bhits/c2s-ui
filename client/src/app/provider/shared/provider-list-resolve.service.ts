import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DataService} from "../../shared/data.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Injectable()
export class ProviderListResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<FlattenedSmallProvider[]> {
    return this.dataService.getProviders()
      .do((providers: FlattenedSmallProvider[]) => {
        return providers;
      });
  }
}
