import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Provider} from "./provider.model";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProviderService {
  private baseProvidersUrl = 'http://localhost/pcm/patients/providers';

  constructor(private http: Http) {
  }

  getProviders(): Promise<Provider[]> {
    return this.http.get(this.baseProvidersUrl)
      .toPromise()
      .then(response => response.json() as Provider[])
      .catch(this.handleError);
  }

  deleteProvider(npi: string): Promise<void> {
    const deleteProvidersUrl = `${this.baseProvidersUrl}/${npi}`;
    return this.http.delete(deleteProvidersUrl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
