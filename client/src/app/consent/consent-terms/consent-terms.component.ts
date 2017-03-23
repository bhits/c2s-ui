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

  constructor(private utilityService:UtilityService, private consentService: ConsentService) {
    this.consentService.getConsentEmitter().subscribe((consent)=>{
      if (consent) {
        this.consent = consent;
      }
    });
  }

  ngOnInit() {
    // if(this.consent){
    //   this.startDate = this.utilityService.formatDate(this.consent.startDate, this.DATE_FORMAT) ;
    //   this.endDate = this.utilityService.formatDate(this.consent.endDate, this.DATE_FORMAT) ;
    // }

    //
    // this.startDate = this.utilityService.localDateToDateStr(this.startDate);
    // this.endDate = this.utilityService.localDateToDateStr(this.endDate);
  }

  onStateDateChanged(startDate){
    this.consent.startDate = new Date(startDate);
    this.consentService.setConsent(this.consent);
  }

  onEndDateChanged(endDate){
    this.consent.endDate = new Date(endDate);
    this.consentService.setConsent(this.consent);
  }
}
