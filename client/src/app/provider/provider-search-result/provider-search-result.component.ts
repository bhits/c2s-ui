import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from "../../core/utility.service";
import {FlattenedSmallProvider} from "c2s-ng-shared";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['provider-search-result.component.scss']
})
export class ProviderSearchResultComponent implements OnInit, OnChanges {
  @Input() providerResult: ProviderSearchResponse;

  private providerList: FlattenedSmallProvider[] = [];
  selectedProviders: FlattenedSmallProvider[] = [];
  asyncProviderResult: Observable<FlattenedSmallProvider[]>;
  private searchResponse: ProviderSearchResponse;

  itemsPerPage: number;
  currentPage: number = 1;
  totalItems: number;
  private totalPages: number;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private providerService: ProviderService,
              private utilityService: UtilityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // only run when property "providerResult" real data kicks in
    if (changes['providerResult']) {
      this.searchResponse = this.providerResult;
      this.getPage(this.currentPage);
    }
  }

  ngOnInit() {
    this.providerList = this.route.snapshot.data['providers'];
  }

  getPage(page: number) {
    const SEARCH_RESPONSE_KEY: string = "providers";

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
        .map(providerSearchResponse =>
          this.utilityService.convertJsonObjToStrMap(providerSearchResponse._embedded).get(SEARCH_RESPONSE_KEY));
    }
  }

  addProviders(provider: FlattenedSmallProvider) {
    this.selectedProviders.push(provider);
  }

  isInProviderList(provider: FlattenedSmallProvider): boolean {
    return this.providerService.isSearchResultInProviderList(provider, this.providerList);
  }

  isProviderSelected(provider: FlattenedSmallProvider): boolean {
    if (this.selectedProviders != null) {
      return this.selectedProviders.filter((p) => provider.id === p.id).length > 0;
    }
  }

  canSelectProvider(provider: FlattenedSmallProvider): boolean {
    return !this.isProviderSelected(provider) && !this.isInProviderList(provider);
  }
}
