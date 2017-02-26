import {Component, OnInit, Input} from "@angular/core";
import {ProviderSearchResult} from "../shared/provider-search-result.model";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {
  @Input() providerResult: ProviderSearchResult[];

  constructor() {
  }

  ngOnInit() {
  }
}
