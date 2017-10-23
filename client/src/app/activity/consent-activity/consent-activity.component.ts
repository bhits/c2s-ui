import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ConsentActivity} from "../shared/consent-activity.model";
import {ActivityService} from "../shared/activity.service";
import {PageableData} from "c2s-ng-shared";
import {LimitedProfileService} from "../../security/shared/limited-profile.service";

@Component({
  selector: 'c2s-consent-activity',
  templateUrl: './consent-activity.component.html',
  styleUrls: ['./consent-activity.component.scss']
})
export class ConsentActivityComponent implements OnInit {
  public totalItems: number = 0;
  public currentPage: number = 1;
  public itemsPerPage: number = 7;
  public noActivity: boolean = false;
  public loading: boolean = false;
  public asyncActivities: Observable<ConsentActivity[]>;

  constructor(private activityService: ActivityService,
              private limitedProfileService: LimitedProfileService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncActivities = this.activityService.getConsentActivities(this.limitedProfileService.getUserMrn(), page - 1, this.itemsPerPage)
      .do((consentActivities: PageableData<ConsentActivity>) => {
        this.noActivity = consentActivities.totalElements === 0;
        this.totalItems = consentActivities.totalElements;
        this.currentPage = consentActivities.number + 1;
        this.loading = false;
      })
      .map(pageableConsent => pageableConsent.content);
  }
}
