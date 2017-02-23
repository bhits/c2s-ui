import {Component, OnInit} from "@angular/core";
import {Provider} from "../shared/provider.model";
import {ProviderService} from "../shared/provider.service";

@Component({
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})

export class ProviderListComponent implements OnInit {
  listProviders: Provider[] = [];

  tHeads = [
    {text: '', cols: 1, color: 'lightgray'},
    {text: 'Name/Facility', cols: 3, color: 'lightgray'},
    {text: 'NPI', cols: 2, color: 'lightgray'},
    {text: 'Contact Number', cols: 2, color: 'lightgray'},
    {text: 'Address', cols: 5, color: 'lightgray'}
  ];

  constructor(private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providerService.getProviders()
      .then(providers => this.listProviders = providers);
  }
}
