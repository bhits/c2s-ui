import {Component, OnInit} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {ConsentService} from "../shared/consent.service";
import {Consent} from "../shared/consent.model";


@Component({
  selector: 'c2s-consent-terms',
  templateUrl: './consent-terms.component.html',
  styleUrls: ['consent-terms.component.scss']
})
export class ConsentTermsComponent implements OnInit {

  startDate: any;
  endDate: any;
  DATE_FORMAT: string = "MM/dd/yyyy";
  private consent: Consent;
  startDateHasPast: boolean;
  endDateHasPast: boolean;
  compareDate: boolean;
  today: Date = new Date();

  constructor(private utilityService: UtilityService,
              private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    if (this.consent && this.consent.startDate && this.consent.endDate) {
      this.startDate = this.utilityService.formatDate(this.consent.startDate, this.DATE_FORMAT);
      this.endDate = this.utilityService.formatDate(this.consent.endDate, this.DATE_FORMAT);
    } else {
      let today = new Date();
      let oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      this.startDate = this.utilityService.formatDate(today, this.DATE_FORMAT);
      this.consent.startDate = this.startDate;
      this.endDate = this.utilityService.formatDate(oneYearFromNow, this.DATE_FORMAT);
      this.consent.endDate = this.endDate;
    }
  }

  onStateDateChanged() {
    this.startDateHasPast = this.utilityService.isPastDate(this.startDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if (!this.startDateHasPast && !this.compareDate) {
      this.consent.startDate = new Date(this.startDate);
      if (!this.utilityService.isPastDate(this.endDate)) {
        this.consent.endDate = new Date(this.endDate);
      }
      this.consentService.setConsent(this.consent);
    } else {
      this.consent.startDate = null;
      this.consentService.setConsent(this.consent);
    }
  }

  onEndDateChanged() {
    this.endDateHasPast = this.utilityService.isPastDate(this.endDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if (!this.endDateHasPast && !this.compareDate) {
      this.consent.endDate = new Date(this.endDate);
      if (!this.utilityService.isPastDate(this.startDate)) {
        this.consent.startDate = new Date(this.startDate);
      }
      this.consentService.setConsent(this.consent);
    } else {
      this.consent.endDate = null;
      this.consentService.setConsent(this.consent);
    }
  }
}
