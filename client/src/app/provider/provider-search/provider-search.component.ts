import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'c2s-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {
  searchProviderFrom: FormGroup;

  searchResponse: ProviderSearchResponse;
  accordionTab: boolean = true;
  hasSearchResult: boolean = false;
  private PHONE_PATTERN = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

  title:string = "Add Providers";

  public states = [
    {stateCode: 'AZ', stateValue: 'ARIZONA'},
    {stateCode: 'DC', stateValue: 'DISTRICT OF COLUMBIA'},
    {stateCode: 'MD', stateValue: 'MARYLAND'},
    {stateCode: 'VA', stateValue: 'VIRGINIA'}
  ];

  public genderGroup = [
    {genderCode: 'M', genderValue: 'Male'},
    {genderCode: 'F', genderValue: 'Female'}
  ];

  public PROVIDER_TYPE = {
    INDIVIDUAL: 'individual',
    ORGANIZATION: 'organization'
  };

  public LOCATING_TYPE = {
    STATE_CITY: 'stateCity',
    ZIP: 'zip'
  };

  public ERROR_CODE = {
    REQUIRED: 'required',
    MIN_LENGTH: 'minlength',
    PATTERN: 'pattern'
  };

  constructor(private formBuilder: FormBuilder,
              private providerService: ProviderService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    // build search form parent group
    this.searchProviderFrom = this.formBuilder.group({
      locatingType: this.initLocatingTypeFormGroup(),
      providerType: this.initProviderTypeFormGroup()
    });

    this.subscribeLocatingTypeChanges();
    this.subscribeProviderTypeChanges();
    this.setLocatingType(this.LOCATING_TYPE.STATE_CITY);
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  private initLocatingTypeFormGroup() {
    // initialize locating type form group
    return this.formBuilder.group({
      type: [''],
      stateCity: this.formBuilder.group(this.initStateCityModel()),
      zip: this.formBuilder.group(this.initZipModel())
    });
  }

  private initStateCityModel() {
    // initialize state city model
    return {
      state: ['', Validators.required],
      city: ['', [Validators.minLength(2), Validators.required]]
    };
  }

  private initZipModel() {
    // initialize zip model
    const ZIP_PATTERN = '^[0-9]{5}(?:-[0-9]{4})?$';
    return {
      zipCode: ['', [Validators.pattern(ZIP_PATTERN), Validators.required]]
    };
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
      lastName: ['', [Validators.minLength(2), Validators.required]],
      firstName: ['', Validators.minLength(2)],
      genderCode: '',
      phone: ['', Validators.pattern(this.PHONE_PATTERN)]
    };
  }

  private initProviderOrganizationModel() {
    // initialize organization model
    return {
      orgName: ['', [Validators.minLength(2), Validators.required]],
      phone: ['', Validators.pattern(this.PHONE_PATTERN)]
    };
  }

  private subscribeLocatingTypeChanges() {
    // controls
    const ltCtrl = (<any>this.searchProviderFrom).controls.locatingType;
    const stateCityCtrl = ltCtrl.controls.stateCity;
    const zipCtrl = ltCtrl.controls.zip;

    // initialize value changes stream
    const typeChanges = ltCtrl.controls.type.valueChanges;

    // subscribe to the stream
    typeChanges.subscribe(locatingType => {
      if (locatingType === this.LOCATING_TYPE.STATE_CITY) {
        Object.keys(stateCityCtrl.controls).forEach(key => {
          stateCityCtrl.controls[key].setValidators(this.initStateCityModel()[key][1]);
          stateCityCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(zipCtrl.controls).forEach(key => {
          zipCtrl.controls[key].setValue(null);
          zipCtrl.controls[key].setValidators(null);
          zipCtrl.controls[key].updateValueAndValidity();
        });
      }

      if (locatingType === this.LOCATING_TYPE.ZIP) {
        Object.keys(stateCityCtrl.controls).forEach(key => {
          stateCityCtrl.controls[key].setValue(null);
          stateCityCtrl.controls[key].setValidators(null);
          stateCityCtrl.controls[key].updateValueAndValidity();
        });

        Object.keys(zipCtrl.controls).forEach(key => {
          zipCtrl.controls[key].setValidators(this.initZipModel()[key][1]);
          zipCtrl.controls[key].updateValueAndValidity();
        });
      }
    });
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

  setLocatingType(type: string): void {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.locatingType.controls.type;
    ctrl.setValue(type);
  }

  setProviderType(type: string): void {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.providerType.controls.type;
    ctrl.setValue(type);
  }

  isStateCityType(): boolean {
    return this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY;
  }

  isIndividualProviderType(): boolean {
    return this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL;
  }

  hasErrorOnCurrentFormControl(path: string, errorCode: string): boolean {
    const formControl = this.searchProviderFrom.get(path);
    return formControl.hasError(errorCode) && (formControl.dirty || formControl.touched);
  }

  resetAccordionTab(): void {
    this.accordionTab = true;
  }

  clearForm(): void {
    this.searchProviderFrom.reset();
    this.setLocatingType(this.LOCATING_TYPE.STATE_CITY);
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  private prepareSearchProviders(): ProviderRequestQuery {
    const formModel = this.searchProviderFrom.value;
    const individualRequestParams: ProviderRequestQuery = {
      state: formModel.locatingType.stateCity.state,
      city: formModel.locatingType.stateCity.city,
      zipCode: formModel.locatingType.zip.zipCode,
      lastName: formModel.providerType.individual.lastName,
      firstName: formModel.providerType.individual.firstName,
      genderCode: formModel.providerType.individual.genderCode,
      phone: formModel.providerType.individual.phone
    };

    if (formModel.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      return individualRequestParams;
    } else {
      let organizationRequestParams: ProviderRequestQuery = {
        orgName: formModel.providerType.organization.orgName,
        phone: formModel.providerType.organization.phone
      };
      return Object.assign(individualRequestParams, organizationRequestParams);
    }
  }

  searchProviders(): void {
    let requestParams: ProviderRequestQuery = this.prepareSearchProviders();

    this.providerService.searchProviders(requestParams)
      .subscribe(res => {
        this.searchResponse = res;
        this.hasSearchResult = true;
      });
    this.accordionTab = false;
  }
}
