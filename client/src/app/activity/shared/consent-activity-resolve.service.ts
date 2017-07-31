import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ActivityService} from "./activity.service";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";
import {PageableData} from "../../shared/pageable-data.model";
import {ConsentActivity} from "./consent-activity.model";

@Injectable()
export class ConsentActivityResolveService implements Resolve<any> {
  constructor(private activityService: ActivityService,
              private limitedProfileService: LimitedProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PageableData<ConsentActivity>> {
    return this.activityService.getConsentActivities(this.limitedProfileService.getUserMrn(), 0, 10)
      .do((consentActivities: PageableData<ConsentActivity>) => {
        return consentActivities;
      });
  }
}
