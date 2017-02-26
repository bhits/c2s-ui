import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent implements OnInit {
  searchResponse: ProviderSearchResponse;

  states = [
    {stateCode: 'AZ', stateValue: 'ARIZONA'},
    {stateCode: 'DC', stateValue: 'DISTRICT OF COLUMBIA'},
    {stateCode: 'MD', stateValue: 'MARYLAND'},
    {stateCode: 'VA', stateValue: 'VIRGINIA'}
  ];

  genderGroup = [
    {genderCode: 'M', genderValue: 'Male'},
    {genderCode: 'F', genderValue: 'Female'}
  ];

  constructor(private providerService: ProviderService) {
  }

  ngOnInit() {
  }

  searchProviders(formValues) {
    const FIRST_PAGE: number = 0;
    let requestParams = new ProviderRequestQuery(
      formValues.providerState,
      formValues.providerCity,
      formValues.providerZip,
      formValues.providerFirstName,
      formValues.providerLastName,
      formValues.providerGender,
      formValues.providerFacilityName,
      formValues.providerTelephone,
    );

    this.providerService.searchProviders(requestParams, FIRST_PAGE)
      .then(res => this.searchResponse = res);
  }
}
