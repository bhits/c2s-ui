import {Http, URLSearchParams, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Provider} from "./provider.model";
import {ProviderRequestQuery} from "./provider-request-query.model";
import {ProviderSearchResponse} from "./provider-search-response.model";
import {ProviderProjection} from "./provider-projection.model";
import {Observable} from "rxjs";
import {ExceptionService} from "../../core/exception.service";

@Injectable()
export class ProviderService {
  private basePcmUrl = '/pcm/patients/providers';
  private basePlsUrl = '/pls/providers';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private exceptionService: ExceptionService) {
  }

  searchProviders(requestParams: ProviderRequestQuery): Observable<ProviderSearchResponse> {
    const SEARCH_PROVIDERS_URL = this.basePlsUrl + "/search/query";

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

  deleteProvider(npi: string): Observable<void> {
    const DELETE_PROVIDERS_URL = `${this.basePcmUrl}/${npi}`;
    return this.http.delete(DELETE_PROVIDERS_URL)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  addProviders(providers: ProviderProjection[]): Observable<void> {
    if (providers != null) {
      let npis: string[] = [];
      providers.forEach(provider => npis.push(provider.npi));
      return this.http
        .post(this.basePcmUrl, JSON.stringify({npiList: npis}), {headers: this.headers})
        .map(() => null)
        .catch(this.exceptionService.handleError);
    }
  }

  isSearchResultInProviderList(provider: ProviderProjection, providerList: Provider[]): boolean {
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
