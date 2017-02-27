import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
// import "rxjs/add/operator/mergeMap";
// import 'rxjs/add/observable/from';
import {ConsentService} from "../consent.service";
import {ConsentList} from "../shared/consent-list.model";
import {Consent} from "../shared/consent.model";
@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.css']
})
export class ConsentCardListComponent implements OnInit {
  private totalItems: number;
  private totalPages: number;
  private itemsPerPage: number;
  private currentPage: number;

  private consents: Observable<Consent[]>;

  constructor(private consentService: ConsentService) {
  }

  ngOnInit() {
    this.consents = this.consentService.getConsentList(0)
      .do(this.refreshPaginationProperties)
      .map(consentList => consentList.consentList);
  }

  private refreshPaginationProperties(consentList: ConsentList): void {
    this.totalItems = consentList.totalItems;
    this.totalPages = consentList.totalPages;
    this.itemsPerPage = consentList.itemsPerPage;
    this.currentPage = consentList.currentPage;
  }
}
