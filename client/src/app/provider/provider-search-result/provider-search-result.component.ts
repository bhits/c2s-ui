import {Component, OnInit, Input} from "@angular/core";
import {ProviderProjection} from "../shared/provider-projection.model";
import {PaginationInstance} from "ng2-pagination";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {
  @Input() providerResult: ProviderProjection[];
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
