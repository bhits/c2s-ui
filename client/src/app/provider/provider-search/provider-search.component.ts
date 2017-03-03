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

  private createForm() {
    this.searchProviderFrom = this.formBuilder.group({
      state: '',
      city: ['', Validators.minLength(2)],
      zipCode: ['', Validators.minLength(5)],
      lastName: ['', Validators.minLength(2)],
      firstName: ['', Validators.minLength(2)],
      genderCode: '',
      phone: ['', Validators.minLength(10)],
      orgName: ['', Validators.minLength(2)]
    });
  }

  getFormControlValue(formControl: string) {
    return this.searchProviderFrom.get(formControl).value;
  }

  resetAccordionTab() {
    this.accordionTab = true;
  }

  reset() {
    this.searchProviderFrom.reset();
  }

  searchProviders() {
    this.providerService.searchProviders(this.setProviderRequestQuery())
      .subscribe(res => {
        this.searchResponse = res;
        this.hasSearchResult = true;
      });
    this.accordionTab = false;
  }

  private setProviderRequestQuery(): ProviderRequestQuery {
    const formModel = this.searchProviderFrom.value;
    return <ProviderRequestQuery>(formModel);
  }
}
