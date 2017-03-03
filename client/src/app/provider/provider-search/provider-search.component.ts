import {Component} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent {
  private searchProviderFrom: FormGroup;

  private searchResponse: ProviderSearchResponse;
  private accordionTab: boolean = true;
  private hasSearchResult: boolean = false;

  states = [
    {stateCode: '', stateValue: 'Please Select'},
    {stateCode: 'AZ', stateValue: 'ARIZONA'},
    {stateCode: 'DC', stateValue: 'DISTRICT OF COLUMBIA'},
    {stateCode: 'MD', stateValue: 'MARYLAND'},
    {stateCode: 'VA', stateValue: 'VIRGINIA'}
  ];

  genderGroup = [
    {genderCode: 'M', genderValue: 'Male'},
    {genderCode: 'F', genderValue: 'Female'}
  ];

  constructor(private formBuilder: FormBuilder,
              private providerService: ProviderService) {
    this.createForm();
  }

  createForm() {
    // search provider parent FormGroup
    this.searchProviderFrom = this.formBuilder.group({
      // state and city child FormGroup
      stateCity: this.formBuilder.group({
        state: '',
        city: ['', Validators.minLength(2)],
      }),
      zip: ['', Validators.minLength(5)],
      // individual provider child FormGroup
      individualProvider: this.formBuilder.group({
        lastName: ['', Validators.minLength(2)],
        firstName: ['', Validators.minLength(2)],
        gender: '',
        telephone: ['', Validators.minLength(10)],
      }),
      facilityName: ['', Validators.minLength(2)],
    });
  }

  resetAccordionTab() {
    this.accordionTab = true;
  }

  reset() {
    this.searchProviderFrom.reset();
  }

  searchProviders() {
    let requestParams: ProviderRequestQuery = this.setProviderRequestQuery();

    this.providerService.searchProviders(requestParams)
      .then(res => {
        this.searchResponse = res;
        this.hasSearchResult = true;
      });
    this.accordionTab = false;
  }

  private setProviderRequestQuery(): ProviderRequestQuery {

    return new ProviderRequestQuery(
      this.searchProviderFrom.get('stateCity.state').value,
      this.searchProviderFrom.get('stateCity.city').value,
      this.searchProviderFrom.get('zip').value,
      this.searchProviderFrom.get('individualProvider.lastName').value,
      this.searchProviderFrom.get('individualProvider.firstName').value,
      this.searchProviderFrom.get('individualProvider.gender').value,
      this.searchProviderFrom.get('individualProvider.telephone').value,
      this.searchProviderFrom.get('facilityName').value
    );
  }
}
