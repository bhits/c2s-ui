import {Component, OnInit, Input} from "@angular/core";
import {ProviderSearchResult} from "../shared/provider-search-result.model";
import {PaginationInstance} from "ng2-pagination";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {
  @Input() providerResult: ProviderSearchResult[];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor() {
  }

  ngOnInit() {
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }
}
