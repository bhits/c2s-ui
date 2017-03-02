import {Component, OnInit, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {ProviderProjection} from "../shared/provider-projection.model";
import {Provider} from "../shared/provider.model";
import {Observable} from "rxjs";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit, OnChanges {
  @Input() providerResult: ProviderSearchResponse;

  private providerList: Provider[];
  private selectedProviders: ProviderProjection[] = [];
  private asyncProviderResult: Observable<ProviderProjection[]>;
  private searchResponse: ProviderSearchResponse;

  private itemsPerPage: number;
  private currentPage: number = 1;
  private totalItems: number;
  private totalPages: number;
  private loading: boolean;

  constructor(private providerService: ProviderService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // only run when property "providerResult" real data kicks in
    if (changes['providerResult']) {
      this.searchResponse = this.providerResult;
      this.getPage(this.currentPage);
    }
  }

  ngOnInit() {
    this.providerService.getProviders()
      .then(res => this.providerList = res);
  }

  getPage(page: number) {
    this.loading = true;
    if (this.searchResponse != null) {
      this.asyncProviderResult = this.providerService.loadNewSearchProvidersResult(page - 1, this.searchResponse)
        .do((providerSearchResponse: ProviderSearchResponse) => {
          this.totalItems = providerSearchResponse.page.totalElements;
          this.totalPages = providerSearchResponse.page.totalPages;
          this.itemsPerPage = providerSearchResponse.page.size;
          this.currentPage = providerSearchResponse.page.number + 1;
          this.loading = false;
        })
        .map(providerSearchResponse => providerSearchResponse._embedded.providers);
    }
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
