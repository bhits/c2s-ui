import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../core/exception.service";
import {Observable} from "rxjs";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";
import {FlattenedSmallProvider} from "./flattened-small-provider.model";

@Injectable()
export class DataService {

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private http: Http,
              private exceptionService: ExceptionService) {
  }

  getProviders(): Observable<FlattenedSmallProvider[]> {
    const url = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/providers");
    return this.http.get(url)
      .map((resp: Response) => <FlattenedSmallProvider>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
