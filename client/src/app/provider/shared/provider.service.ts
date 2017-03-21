import {Http, URLSearchParams, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {ProviderRequestQuery} from "./provider-request-query.model";
import {ProviderSearchResponse} from "./provider-search-response.model";
import {Observable} from "rxjs";
import {ExceptionService} from "../../core/exception.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";
import {Identifier} from "../../shared/identifier.model";

@Injectable()
export class ProviderService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private http: Http,
              private exceptionService: ExceptionService) {
  }

  searchProviders(requestParams: ProviderRequestQuery): Observable<ProviderSearchResponse> {
    const SEARCH_PROVIDERS_URL = this.c2sUiApiUrlService.getPlsBaseUrl().concat("/search/query");

    let params: URLSearchParams = this.buildRequestParams(requestParams);

    return this.http.get(SEARCH_PROVIDERS_URL, {
      search: params
    }).map((resp: Response) => <ProviderSearchResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  loadNewSearchProvidersResult(page: number, providerResult: ProviderSearchResponse): Observable<ProviderSearchResponse> {
    if (providerResult != null) {
      let pageNumberParam: string = "&page=" + page;
      const NEW_PAGE_URL: string = providerResult._links.self.href.concat(pageNumberParam);

      return this.http.get(NEW_PAGE_URL)
        .map((resp: Response) => <ProviderSearchResponse>(resp.json()))
        .catch(this.exceptionService.handleError);
    }
  }

  deleteProvider(id: number): Observable<void> {
    const DELETE_PROVIDERS_URL = `${this.c2sUiApiUrlService.getPcmBaseUrl().concat("/providers")}/${id}`;
    return this.http.delete(DELETE_PROVIDERS_URL)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  addProviders(providers: FlattenedSmallProvider[]): Observable<void> {
    const SYSTEM = "http://hl7.org/fhir/sid/us-npi";
    if (providers != null) {
      let identifiers: Identifier[] = [];
      providers.forEach(
        provider => identifiers.push(new Identifier(SYSTEM, provider.npi))
      );
      return this.http
        .post(this.c2sUiApiUrlService.getPcmBaseUrl().concat("/providers"), JSON.stringify({identifiers: identifiers}), {headers: this.headers})
        .map(() => null)
        .catch(this.exceptionService.handleError);
    }
  }

  isSearchResultInProviderList(provider: FlattenedSmallProvider, providerList: FlattenedSmallProvider[]): boolean {
    return providerList.filter((p) => provider.npi === p.npi).length > 0;
  }

  private buildRequestParams(requestParams: ProviderRequestQuery): URLSearchParams {
    const PROJECTION: string = "FlattenSmallProvider";

    let params: URLSearchParams = new URLSearchParams();
    params.set('state', this.addLikePatternInQueryParameter(requestParams.state));
    params.set('city', this.addLikePatternInQueryParameter(requestParams.city));
    params.set('zipcode', this.addLikePatternInQueryParameter(requestParams.zipCode));
    params.set('firstname', this.addLikePatternInQueryParameter(requestParams.firstName));
    params.set('lastname', this.addLikePatternInQueryParameter(requestParams.lastName));
    params.set('gendercode', this.addLikePatternInQueryParameter(requestParams.genderCode));
    params.set('orgname', this.addLikePatternInQueryParameter(requestParams.orgName));
    params.set('phone', this.addLikePatternInQueryParameter(requestParams.phone));
    params.set('projection', PROJECTION);

    return params;
  }

  private addLikePatternInQueryParameter(requestParam: string): string {
    const LIKE_PATTERN = "%";
    if (requestParam != null && requestParam.length > 0) {
      return LIKE_PATTERN.concat(requestParam, LIKE_PATTERN);
    }
  }
}
