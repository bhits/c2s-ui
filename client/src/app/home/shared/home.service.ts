import {Injectable} from "@angular/core";
import {Provider} from "../../provider/shared/provider.model";
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../../core/exception.service";
import {Observable} from "rxjs";

@Injectable()
export class HomeService {
  private basePcmUrl = 'http://localhost/pcm/patients/providers';

  constructor(private http: Http,
              private exceptionService: ExceptionService) {
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get(this.basePcmUrl)
      .map((resp: Response) => <Provider>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
