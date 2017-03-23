import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Observable} from "rxjs";
import {ConsentList} from "../shared/consent-list.model";
import {Consent} from "../shared/consent.model";
import {DataService} from "../../shared/data.service";

@Component({
  selector: 'c2s-consent-card-list',
  templateUrl: './consent-card-list.component.html',
  styleUrls: ['./consent-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsentCardListComponent implements OnInit {
  private totalItems: number = 0;
  private totalPages: number = 0;
  private itemsPerPage: number = 0;
  private currentPage: number = 1;
  private loading: boolean = false;

  title: string = "Consents";

  private consents: Observable<Consent[]>;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.loading = true;
    this.consents = this.dataService.getConsents(page - 1)
      .do((consentList: ConsentList) => {
        this.totalItems = consentList.totalElements;
        this.totalPages = consentList.totalPages;
        this.itemsPerPage = consentList.size;
        this.currentPage = consentList.number + 1;
      })
      .map(consentList => consentList.content)
      .do(() => this.loading = false);
  }
}
