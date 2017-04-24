import {Component, OnInit} from '@angular/core';
import {UtilityService} from "../../shared/utility.service";
import {ConsentService} from "../shared/consent.service";
import {ConsentCreateEdit} from "../shared/consent-create-edit.model";
import {TranslateService} from "@ngx-translate/core";


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
  startDateHasPast: boolean;
  endDateHasPast: boolean;
  compareDate: boolean;
  today:Date = new Date();

  constructor(private utilityService:UtilityService,
              private consentService: ConsentService,
              private translate: TranslateService) {
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

  onStateDateChanged(){
    this.startDateHasPast = this.utilityService.isPastDate(this.startDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if(!this.startDateHasPast && !this.compareDate ){
      this.consent.startDate = new Date(this.startDate);
      if(!this.utilityService.isPastDate(this.endDate)){
        this.consent.endDate = new Date(this.endDate);
      }
      this.consentService.setConsent(this.consent);
    }else{
      this.consent.startDate = null;
      this.consentService.setConsent(this.consent);
    }
  }

  onEndDateChanged(){
    this.endDateHasPast = this.utilityService.isPastDate(this.endDate);
    this.compareDate = this.utilityService.isStarteAfterEndDate(this.startDate, this.endDate);

    if(!this.endDateHasPast && !this.compareDate){
      this.consent.endDate = new Date(this.endDate);
      if(!this.utilityService.isPastDate(this.startDate)){
        this.consent.startDate = new Date(this.startDate);
      }
      this.consentService.setConsent(this.consent);
    }else  {
      this.consent.endDate = null;
      this.consentService.setConsent(this.consent);
    }
  }
}
