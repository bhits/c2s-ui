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
  private dateFormat:string = 'MM/dd/yyyy';

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
  }

  onStartDateChange(){
    this.startDateChange.emit(this.utilityService.formatDate(this.startDate, this.dateFormat));
  }

  onEndDateChange(){
    this.endDateChange.emit(this.utilityService.formatDate(this.endDate, this.dateFormat));
  }
}
