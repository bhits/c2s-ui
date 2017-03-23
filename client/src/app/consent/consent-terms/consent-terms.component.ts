import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UtilityService} from "../../shared/utility.service";


@Component({
  selector: 'c2s-consent-terms',
  templateUrl: './consent-terms.component.html',
  styleUrls: ['./consent-terms.component.css']
})
export class ConsentTermsComponent implements OnInit {

  @Input() startDate: any;
  @Input() endDate: any;
  @Output() startDateChange = new EventEmitter();
  @Output() endDateChange = new EventEmitter();

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    this.startDate = this.utilityService.localDateToDateStr(this.startDate);
    this.endDate = this.utilityService.localDateToDateStr(this.endDate);
  }

  onStartDateChange(){
      let localDate  = this.utilityService.dateStrToLocalDate(this.startDate);
      console.log(localDate)
      this.startDateChange.emit(localDate);

  }

  onEndDateChange(){
      this.endDateChange.emit(this.utilityService.dateStrToLocalDate(this.endDate));
  }
}
