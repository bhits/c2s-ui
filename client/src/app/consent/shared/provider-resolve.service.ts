import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Injectable()
export class ProviderResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getProviders()
      .do((providers: FlattenedSmallProvider[]) => {
        return providers;
      });
  }
}
