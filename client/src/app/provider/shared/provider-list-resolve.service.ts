import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {DataService} from "../../core/data.service";
import {ConsentProvider, FHIR_US_NPI_SYSTEM} from "../../shared/consent-provider.model";

@Injectable()
export class ProviderListResolveService implements Resolve<any> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConsentProvider[]> {
    return this.dataService.getProviders()
      .do((providers: ConsentProvider[]) => {
        return providers;
      })
      .map((providers: ConsentProvider[]) => {
        providers.forEach(provider => provider.npi = provider.identifiers.filter(id => id.system === FHIR_US_NPI_SYSTEM).map(id => id.value).pop());
        providers.sort((p1, p2) => p1.npi.localeCompare(p2.npi));
        return providers;
      });
  }
}
