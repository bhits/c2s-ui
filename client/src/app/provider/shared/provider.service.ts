import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Provider} from "./provider.model";
import {ProviderRequestQuery} from "./provider-request-query.model";
import {ProviderSearchResult} from "./provider-search-result.model";

@Injectable()
export class ProviderService {
  private basePcmUrl = 'http://localhost/pcm/patients/providers';
  private basePlsUrl = 'http://localhost/pls/providers';

  constructor(private http: Http) {
  }

  getProviders(): Promise<Provider[]> {
    return this.http.get(this.basePcmUrl)
      .toPromise()
      .then(response => response.json() as Provider[])
      .catch(this.handleError);
  }

  searchProviders(requestParams: ProviderRequestQuery): Promise<ProviderSearchResult[]> {
    const SEARCH_PROVIDERS_URL = this.basePlsUrl + "/search/query";
    const SPRING_DATA_HATEOAS_PROPERTY = '_embedded';
    const KEY_NAME = 'providers';

    let params: URLSearchParams = this.requestParams(requestParams);

    return this.http.get(SEARCH_PROVIDERS_URL, {
      search: params
    }).toPromise()
      .then(response => response.json()[SPRING_DATA_HATEOAS_PROPERTY][KEY_NAME] as ProviderSearchResult[])
      .catch(this.handleError);
  }

  deleteProvider(npi: string): Promise<void> {
    const DELETE_PROVIDERS_URL = `${this.basePcmUrl}/${npi}`;
    return this.http.delete(DELETE_PROVIDERS_URL)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private requestParams(requestParams: ProviderRequestQuery): URLSearchParams {
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
    params.set('page', requestParams.page);
    params.set('projection', PROJECTION);

    return params;
  }

  private addLikePatternInQueryParameter(requestParam: string): string {
    const LIKEPATTERN = "%";
    if (requestParam != null && requestParam.length > 0) {
      return LIKEPATTERN.concat(requestParam, LIKEPATTERN);
    }
  }
}
