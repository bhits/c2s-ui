import {Component, OnInit, Input} from "@angular/core";
import {Provider} from "../shared/provider.model";

@Component({
  selector: 'c2s-provider-search-result',
  templateUrl: './provider-search-result.component.html',
  styleUrls: ['./provider-search-result.component.css']
})
export class ProviderSearchResultComponent implements OnInit {

  @Input() providerResult: Provider;

  constructor() {
  }

  ngOnInit() {
  }
}
