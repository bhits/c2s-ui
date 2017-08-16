import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {PatientHealthInformationService} from "./patient-health-information.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {PatientHealthData} from "./patient-health-data.model";

@Injectable()
export class HealthInformationResolveService implements Resolve<any> {
  constructor(private patientHealthInformationService: PatientHealthInformationService,
              private limitedProfileService: LimitedProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PatientHealthData> {
    return this.patientHealthInformationService.getPatientHealthData(this.limitedProfileService.getUserMrn())
      .do((patientHealthData: PatientHealthData) => {
        return patientHealthData;
      });
  }
}
