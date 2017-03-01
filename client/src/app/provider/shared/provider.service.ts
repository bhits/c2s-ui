import {Http, URLSearchParams, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Provider} from "./provider.model";
import {ProviderRequestQuery} from "./provider-request-query.model";
import {ProviderSearchResponse} from "./provider-search-response.model";
import {ProviderProjection} from "./provider-projection.model";

@Injectable()
export class ProviderService {
  private basePcmUrl = 'http://localhost/pcm/patients/providers';
  private basePlsUrl = 'http://localhost/pls/providers';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getProviders(): Promise<Provider[]> {
    return this.http.get(this.basePcmUrl)
      .toPromise()
      .then(response => response.json() as Provider[])
      .catch(this.handleError);
  }

  searchProviders(requestParams: ProviderRequestQuery, page: number): Promise<ProviderSearchResponse> {
    const SEARCH_PROVIDERS_URL = this.basePlsUrl + "/search/query";

    let params: URLSearchParams = this.requestParams(requestParams, page.toString());

    return this.http.get(SEARCH_PROVIDERS_URL, {
      search: params
    }).toPromise()
      .then(response => response.json() as ProviderSearchResponse)
      .catch(this.handleError);
  }

  deleteProvider(npi: string): Promise<void> {
    const DELETE_PROVIDERS_URL = `${this.basePcmUrl}/${npi}`;
    return this.http.delete(DELETE_PROVIDERS_URL)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  addProviders(providers: ProviderProjection[]): Promise<void> {
    if (providers != null) {
      let npis: string[] = [];
      providers.forEach(provider => npis.push(provider.npi));
      return this.http
        .post(this.basePcmUrl, JSON.stringify({npiList: npis}), {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
  }

  isSearchResultInProviderList(provider: ProviderProjection, providerList: Provider[]): boolean {
    return providerList.filter((p) => provider.npi === p.npi).length > 0;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private requestParams(requestParams: ProviderRequestQuery, page: string): URLSearchParams {
    const PROJECTION: string = "FlattenSmallProvider";

    let params: URLSearchParams = new URLSearchParams();
    params.set('state', this.addLikePatternInQueryParameter(requestParams.state));
    params.set('city', this.addLikePatternInQueryParameter(requestParams.city));
    params.set('zipcode', this.addLikePatternInQueryParameter(requestParams.zipcode));
    params.set('firstname', this.addLikePatternInQueryParameter(requestParams.firstname));
    params.set('lastname', this.addLikePatternInQueryParameter(requestParams.lastname));
    params.set('gendercode', this.addLikePatternInQueryParameter(requestParams.gendercode));
    params.set('orgname', this.addLikePatternInQueryParameter(requestParams.orgname));
    params.set('phone', this.addLikePatternInQueryParameter(requestParams.phone));
    params.set('projection', PROJECTION);
    params.set('page', page);

    return params;
  }

  private addLikePatternInQueryParameter(requestParam: string): string {
    const LIKEPATTERN = "%";
    if (requestParam != null && requestParam.length > 0) {
      return LIKEPATTERN.concat(requestParam, LIKEPATTERN);
    }
  }
}
