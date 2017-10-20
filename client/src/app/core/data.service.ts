import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "./exception.service";
import {Observable} from "rxjs";
import {ConsentList} from "../consent/shared/consent-list.model";
import {ConsentProvider} from "c2s-ng-shared";
import {LimitedProfileService} from "../security/shared/limited-profile.service";
import {C2sUiApiUrlService} from "./c2s-ui-api-url.service";

@Injectable()
export class DataService {

  constructor(private c2sUiApiUrlService: C2sUiApiUrlService,
              private http: Http,
              private exceptionService: ExceptionService,
              private limitedProfileService: LimitedProfileService) {
  }

  getProviders(): Observable<ConsentProvider[]> {
    const resourceUrl = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/").concat(this.limitedProfileService.getUserMrn()).concat("/providers");
    return this.http.get(resourceUrl)
      .map((resp: Response) => <ConsentProvider>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getConsents(page: number): Observable<ConsentList> {
    const resourceUrl = this.c2sUiApiUrlService.getPcmBaseUrl().concat("/patients/").concat(this.limitedProfileService.getUserMrn()).concat("/consents");
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <ConsentList>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
