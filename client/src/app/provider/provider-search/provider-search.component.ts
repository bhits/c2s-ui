import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {Provider} from "../shared/provider.model";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent implements OnInit {
  providers: Provider[];

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
    let requestParams = new ProviderRequestQuery(
      formValues.providerState,
      formValues.providerCity,
      formValues.providerZip,
      formValues.providerFirstName,
      formValues.providerLastName,
      formValues.providerGender,
      formValues.providerFacilityName,
      formValues.providerTelephone,
      formValues.page,
    );

    this.providerService.searchProviders(requestParams)
      .then(res => this.providers = res);
  }
}
