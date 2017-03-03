import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ConsentList} from "../shared/consent-list.model";
import {Consent} from "../shared/consent.model";
import {ConsentService} from "../shared/consent.service";
@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentCardListComponent implements OnInit {
  private totalItems: number;
  private totalPages: number;
  private itemsPerPage: number;
  private currentPage: number = 1;

  private consents: Observable<Consent[]>;

  constructor(private consentService: ConsentService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.consents = this.consentService.getConsentList(page - 1)
      .do((consentList: ConsentList) => {
        this.totalItems = consentList.totalItems;
        this.totalPages = consentList.totalPages;
        this.itemsPerPage = consentList.itemsPerPage;
        this.currentPage = consentList.currentPage + 1;
      })
      .map(consentList => consentList.consentList);
  }
}
