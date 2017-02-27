import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ConsentService} from "../consent.service";
import {PurposeOfUse} from "../purpose-of-use";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.css']
})
export class PurposeOfUseComponent implements OnInit {
  @Output() selectedPurposeOfUse = new EventEmitter();
  private purposeOfUSes: PurposeOfUse[];

  constructor(private consentService: ConsentService) { }

  ngOnInit() {
    this.consentService.getPurposeOfUses()
                        .then(res => this.purposeOfUSes = res)
                        .catch(this.error);
  }

  private error(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
