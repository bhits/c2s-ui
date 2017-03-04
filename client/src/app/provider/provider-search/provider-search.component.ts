import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent implements OnInit {
  private searchProviderFrom: FormGroup;
  private PHONE_PATTERN = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

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

  public PROVIDER_TYPE = {
    INDIVIDUAL: 'individual',
    ORGANIZATION: 'organization'
  };

  constructor(private formBuilder: FormBuilder,
              private providerService: ProviderService) {
  }

  ngOnInit(): void {
    const ZIP_PATTERN = '^[0-9]{5}(?:-[0-9]{4})?$';
    this.searchProviderFrom = this.formBuilder.group({
      state: '',
      city: ['', Validators.minLength(2)],
      zipCode: ['', Validators.pattern(ZIP_PATTERN)],
      providerType: this.initProviderTypeFormGroup()
    });

    this.subscribeProviderTypeChanges();

    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  private initProviderTypeFormGroup() {
    // initialize provider type form group
    return this.formBuilder.group({
      type: [''],
      individual: this.formBuilder.group(this.initProviderIndividualModel()),
      organization: this.formBuilder.group(this.initProviderOrganizationModel()),
    });
  }

  private initProviderIndividualModel() {
    // initialize individual model
    return {
      lastName: ['', Validators.minLength(2)],
      firstName: ['', Validators.minLength(2)],
      genderCode: '',
      phone: ['', Validators.pattern(this.PHONE_PATTERN)]
    };
  }

  private initProviderOrganizationModel() {
    // initialize organization model
    return {
      orgName: ['', Validators.minLength(2)],
      phone: ['', Validators.pattern(this.PHONE_PATTERN)]
    };
  }

  private subscribeProviderTypeChanges() {
// controls
    const ptCtrl = (<any>this.searchProviderFrom).controls.providerType;
    const individualCtrl = ptCtrl.controls.individual;
    const organizationCtrl = ptCtrl.controls.organization;

    // initialize value changes stream
    const typeChanges = ptCtrl.controls.type.valueChanges;

    // subscribe to the stream
    typeChanges.subscribe(providerType => {
      if (providerType === this.PROVIDER_TYPE.INDIVIDUAL) {
        Object.keys(individualCtrl.controls).forEach(key => {
          individualCtrl.controls[key].setValidators(this.initProviderIndividualModel()[key][1]);
          individualCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(organizationCtrl.controls).forEach(key => {
          organizationCtrl.controls[key].setValue(null);
          organizationCtrl.controls[key].setValidators(null);
          organizationCtrl.controls[key].updateValueAndValidity();
        });
      }

      if (providerType === this.PROVIDER_TYPE.ORGANIZATION) {
        Object.keys(individualCtrl.controls).forEach(key => {
          individualCtrl.controls[key].setValue(null);
          individualCtrl.controls[key].setValidators(null);
          individualCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(organizationCtrl.controls).forEach(key => {
          organizationCtrl.controls[key].setValidators(this.initProviderOrganizationModel()[key][1]);
          organizationCtrl.controls[key].updateValueAndValidity();
        });
      }
    });
  }

  private setProviderType(type: string) {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.providerType.controls.type;
    ctrl.setValue(type);
  }

  isIndividualProviderType() {
    return this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL;
  }

  showErrorMessage(formControlName: string) {
    const formControl = this.searchProviderFrom.get(formControlName);
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  showProviderTypeErrorMessage(formControlName: string) {
    if (this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.individual.controls[formControlName];
      return formControl.invalid && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.organization.controls[formControlName];
      return formControl.invalid && (formControl.dirty || formControl.touched);
    }
  }

  resetAccordionTab() {
    this.accordionTab = true;
  }

  clearForm() {
    this.searchProviderFrom.reset();
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  prepareSearchProviders(): ProviderRequestQuery {
    const formModel = this.searchProviderFrom.value;
    if (formModel.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      return {
        state: formModel.state,
        city: formModel.city,
        zipCode: formModel.zipCode,
        lastName: formModel.providerType.individual.lastName,
        firstName: formModel.providerType.individual.firstName,
        genderCode: formModel.providerType.individual.genderCode,
        phone: formModel.providerType.individual.phone
      };
    } else {
      return {
        state: formModel.state,
        city: formModel.city,
        zipCode: formModel.zipCode,
        orgName: formModel.providerType.organization.orgName,
        phone: formModel.providerType.organization.phone
      };
    }
  }

  searchProviders() {
    let requestParams: ProviderRequestQuery = this.prepareSearchProviders();

    this.providerService.searchProviders(requestParams)
      .subscribe(res => {
        this.searchResponse = res;
        this.hasSearchResult = true;
      });
    this.accordionTab = false;
  }
}
