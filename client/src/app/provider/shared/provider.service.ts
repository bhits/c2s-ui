import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Provider} from "./provider.model";
import "rxjs/add/operator/toPromise";
import {ProviderRequestQuery} from "./provider-request-query.model";

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

  searchProviders(requestParams: ProviderRequestQuery): Promise<Provider[]> {
    const SEARCH_PROVIDERS_URL = this.basePlsUrl + "/search/query";

    let params: URLSearchParams = this.requestParams(requestParams);

    return this.http.get(SEARCH_PROVIDERS_URL, {
      search: params
    }).toPromise()
      .then(response => response.json() as Provider[])
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
    params.set('@state', requestParams.state);
    params.set('@city', requestParams.city);
    params.set('@zipcode', requestParams.zipcode);
    params.set('@gender', requestParams.gender);
    params.set('@phone', requestParams.phone);
    params.set('@lastname', requestParams.lastname);
    params.set('@firstname', requestParams.firstname);
    params.set('@orgname', requestParams.orgname);
    params.set('page', requestParams.page);
    params.set('projection', PROJECTION);

    return params;
  }
}
