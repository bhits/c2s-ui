import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ConsentList} from "./shared/consent-list.model";
import {ExceptionService} from "../core/exception.service";

@Injectable()
export class ConsentService {
  private consentListUri: string = "http://localhost/pcm/patients/consents/pageNumber";

  constructor(private http: Http,
              private exceptionService: ExceptionService) {
  }

  getConsentList(page: number): Observable<ConsentList> {
    const pageUri: string = `${this.consentListUri}/${page || 0}`;
    return this.http.get(pageUri)
      .map((resp: Response) => <ConsentList>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
