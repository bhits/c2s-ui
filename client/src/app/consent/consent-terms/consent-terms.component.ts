import {Component, OnInit} from '@angular/core';
import {UtilityService} from "../../shared/utility.service";
import {ConsentService} from "../shared/consent.service";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";


@Component({
  selector: 'c2s-consent-terms',
  templateUrl: './consent-terms.component.html',
  styleUrls: ['./consent-terms.component.css']
})
export class ConsentTermsComponent implements OnInit {

  startDate: any;
  endDate: any;
  DATE_FORMAT:string = "MM/dd/yyyy"
  private consent: ConsentCreateEdit;
  hasStartDatePast: boolean;
  hasEndDatePast: boolean;
  compareDate: boolean;

  constructor(private utilityService:UtilityService, private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    if(this.consent && this.consent.startDate && this.consent.endDate){
      this.startDate = this.utilityService.formatDate(this.consent.startDate, this.DATE_FORMAT) ;
      this.endDate = this.utilityService.formatDate(this.consent.endDate, this.DATE_FORMAT) ;
    }
  }

  onStateDateChanged(startDate){
    this.hasStartDatePast = this.utilityService.isPastDate(this.startDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if(!this.hasStartDatePast && !this.compareDate ){
      this.consent.startDate = new Date(startDate);
      this.consentService.setConsent(this.consent);
    }else{
      this.consent.startDate = null;
      this.consentService.setConsent(this.consent);
    }
  }

  onEndDateChanged(endDate){
    this.hasEndDatePast = this.utilityService.isPastDate(this.endDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if(!this.hasEndDatePast && !this.compareDate){
      this.consent.endDate = new Date(endDate);
      this.consentService.setConsent(this.consent);
    }else  {
      this.consent.endDate = null;
      this.consentService.setConsent(this.consent);
    }
  }
}
