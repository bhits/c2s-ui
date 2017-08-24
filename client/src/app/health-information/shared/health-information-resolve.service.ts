import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {PatientHealthInformationService} from "./patient-health-information.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {PatientHealthData} from "./patient-health-data.model";
import {NotificationService} from "../../core/notification.service";

@Injectable()
export class HealthInformationResolveService implements Resolve<any> {
  constructor(private patientHealthInformationService: PatientHealthInformationService,
              private limitedProfileService: LimitedProfileService,
              private notificationService: NotificationService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PatientHealthData> {
    return this.patientHealthInformationService.getPatientHealthData(this.limitedProfileService.getUserMrn())
      .do((patientHealthData: PatientHealthData) => {
        return patientHealthData;
      }).catch((errCode: string) => {
        console.log("Errr=" + errCode);
        switch(errCode){
          case "404":
            this.notificationService.i18nShow("HEALTH_INFORMATION.NO_HEALTH_DATA");
            break;
          default:
            this.notificationService.i18nShow("HEALTH_INFORMATION.GENERIC_ERROR_MESSAGE");
        }
        return Observable.throw(errCode);
      });
  }
}
