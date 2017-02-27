import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onStartDateChange(){
    this.startDateChange.emit(this.startDate);
  }

  onEndDateChange(){
    this.endDateChange.emit(this.endDate);
  }

}
