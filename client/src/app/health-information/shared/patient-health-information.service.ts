import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../../core/exception.service";
import {PatientHealthData} from "./patient-health-data.model";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {C2sUiApiUrlService} from "../../core/c2s-ui-api-url.service";

@Injectable()
export class PatientHealthInformationService {
  private sectionAccordionTabActiveStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sectionAccordionTabActiveStatusEmitter: Observable<boolean> = this.sectionAccordionTabActiveStatus.asObservable();

  constructor(private apiUrlService: C2sUiApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getPatientHealthData(patientMrn: string): Observable<PatientHealthData> {
    const resourceUrl = this.apiUrlService.getIExHubXdsbBaseUrl()
      .concat("/patients/" + patientMrn + "/health-information");

    return this.http.get(resourceUrl)
      .map((resp: Response) => <PatientHealthData>(resp.json()))
      .catch(this.exceptionService.handleErrorWithErrorCode);
  }

  public setSectionAccordionTabActiveStatus(activeStatus: boolean): void {
    this.sectionAccordionTabActiveStatus.next(activeStatus);
  }

  public getSectionAccordionTabActiveStatusEmitter(): Observable<boolean> {
    return this.sectionAccordionTabActiveStatusEmitter;
  }
}
