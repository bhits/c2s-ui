import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../core/exception.service";
import {Observable} from "rxjs";
import {Provider} from "../provider/shared/provider.model";

@Injectable()
export class DataService {
  private basePcmUrl = '/pcm/patients/providers';

  constructor(private http: Http,
              private exceptionService: ExceptionService) {
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get(this.basePcmUrl)
      .map((resp: Response) => <Provider>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
