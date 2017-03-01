import {Component, OnInit, Input} from "@angular/core";
import {PaginationInstance} from "ng2-pagination";
import {ProviderService} from "../shared/provider.service";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {ProviderProjection} from "../shared/provider-projection.model";
import {Provider} from "../shared/provider.model";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {
  @Input() providerResult: ProviderSearchResponse;
  providerList: Provider[];
  selectedProviders: ProviderProjection[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providerService.getProviders()
      .then(res => this.providerList = res);
  }

  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  addProviders(provider: ProviderProjection) {
    this.selectedProviders.push(provider);
  }

  isInProviderList(provider: ProviderProjection): boolean {
    return this.providerService.isSearchResultInProviderList(provider, this.providerList);
  }

  isProviderSelected(provider: ProviderProjection): boolean {
    if (this.selectedProviders != null) {
      return this.selectedProviders.filter((p) => provider.npi === p.npi).length > 0;
    }
  }

  canSelectProvider(provider: ProviderProjection): boolean {
    return !this.isProviderSelected(provider) && !this.isInProviderList(provider);
  }
}
