import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {ExceptionService} from "../../core/exception.service";
import {PatientHealthData} from "./patient-health-data.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PatientHealthInformationService {

  constructor(private apiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getPatientHealthData(patientMrn: string): Observable<PatientHealthData> {
    const resourceUrl = this.apiUrlService.getIExHubXdsbBaseUrl()
      .concat("/patients/" + patientMrn + "/health-information");

    return this.http.get(resourceUrl)
      .map((resp: Response) => <PatientHealthData>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
