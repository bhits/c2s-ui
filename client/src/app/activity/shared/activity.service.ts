import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from "@angular/http";
import {PageableData} from "../../shared/pageable-data.model";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {ExceptionService} from "../../core/exception.service";
import {ConsentActivity} from "./consent-activity.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ActivityService {
  constructor(private apiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getConsentActivities(patientMrn: string, page: number, size: number): Observable<PageableData<ConsentActivity>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', size.toString());

    const resourceUrl = this.apiUrlService.getPcmBaseUrl()
      .concat("/patients/" + patientMrn + "/consent-activities");

    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <PageableData<ConsentActivity>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
