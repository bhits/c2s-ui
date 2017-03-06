import {Component, OnInit} from "@angular/core";
import {ProviderService} from "../shared/provider.service";
import {ProviderRequestQuery} from "../shared/provider-request-query.model";
import {ProviderSearchResponse} from "../shared/provider-search-response.model";
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder,
              private providerService: ProviderService) {
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

  private setLocatingType(type: string) {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.locatingType.controls.type;
    ctrl.setValue(type);
  }

  private setProviderType(type: string) {
    // update payment method type value
    const ctrl: FormControl = (<any>this.searchProviderFrom).controls.providerType.controls.type;
    ctrl.setValue(type);
  }

  isStateCityType() {
    return this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY;
  }

  isIndividualProviderType() {
    return this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL;
  }

  showLocatingTypeRequiredError(formControlName: string) {
    if (this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY) {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.stateCity.controls[formControlName];
      return this.formControlHasError(formControl, 'required') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.zip.controls[formControlName];
      return this.formControlHasError(formControl, 'required') && (formControl.dirty || formControl.touched);
    }
  }

  showLocatingTypeLimitLengthError(formControlName: string) {
    if (this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY) {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.stateCity.controls[formControlName];
      return this.formControlHasError(formControl, 'minlength') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.zip.controls[formControlName];
      return this.formControlHasError(formControl, 'minlength') && (formControl.dirty || formControl.touched);
    }
  }

  showLocatingTypePatternError(formControlName: string) {
    if (this.searchProviderFrom.value.locatingType.type === this.LOCATING_TYPE.STATE_CITY) {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.stateCity.controls[formControlName];
      return this.formControlHasError(formControl, 'pattern') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.locatingType.controls.zip.controls[formControlName];
      return this.formControlHasError(formControl, 'pattern') && (formControl.dirty || formControl.touched);
    }
  }

  showProviderTypeRequiredError(formControlName: string) {
    if (this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.individual.controls[formControlName];
      return this.formControlHasError(formControl, 'required') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.organization.controls[formControlName];
      return this.formControlHasError(formControl, 'required') && (formControl.dirty || formControl.touched);
    }
  }

  showProviderTypeLimitLengthError(formControlName: string) {
    if (this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.individual.controls[formControlName];
      return this.formControlHasError(formControl, 'minlength') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.organization.controls[formControlName];
      return this.formControlHasError(formControl, 'minlength') && (formControl.dirty || formControl.touched);
    }
  }

  showProviderTypePatternError(formControlName: string) {
    if (this.searchProviderFrom.value.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.individual.controls[formControlName];
      return this.formControlHasError(formControl, 'pattern') && (formControl.dirty || formControl.touched);
    } else {
      const formControl = (<any>this.searchProviderFrom).controls.providerType.controls.organization.controls[formControlName];
      return this.formControlHasError(formControl, 'pattern') && (formControl.dirty || formControl.touched);
    }
  }

  private formControlHasError(formControl: AbstractControl, errorCode: string): boolean {
    if (formControl.hasError(errorCode) != null) {
      return formControl.hasError(errorCode);
    } else {
      return false;
    }
  }

  resetAccordionTab() {
    this.accordionTab = true;
  }

  clearForm() {
    this.searchProviderFrom.reset();
    this.setLocatingType(this.LOCATING_TYPE.STATE_CITY);
    this.setProviderType(this.PROVIDER_TYPE.INDIVIDUAL);
  }

  prepareSearchProviders(): ProviderRequestQuery {
    const formModel = this.searchProviderFrom.value;
    if (formModel.locatingType.type === this.LOCATING_TYPE.STATE_CITY
      && formModel.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      return {
        state: formModel.locatingType.stateCity.state,
        city: formModel.locatingType.stateCity.city,
        lastName: formModel.providerType.individual.lastName,
        firstName: formModel.providerType.individual.firstName,
        genderCode: formModel.providerType.individual.genderCode,
        phone: formModel.providerType.individual.phone
      };
    } else if (formModel.locatingType.type === this.LOCATING_TYPE.STATE_CITY
      && formModel.providerType.type === this.PROVIDER_TYPE.ORGANIZATION) {
      return {
        state: formModel.locatingType.stateCity.state,
        city: formModel.locatingType.stateCity.city,
        orgName: formModel.providerType.organization.orgName,
        phone: formModel.providerType.organization.phone
      };
    } else if (formModel.locatingType.type === this.LOCATING_TYPE.ZIP
      && formModel.providerType.type === this.PROVIDER_TYPE.INDIVIDUAL) {
      return {
        zipCode: formModel.locatingType.zip.zipCode,
        lastName: formModel.providerType.individual.lastName,
        firstName: formModel.providerType.individual.firstName,
        genderCode: formModel.providerType.individual.genderCode,
        phone: formModel.providerType.individual.phone
      };
    } else {
      return {
        zipCode: formModel.locatingType.zip.zipCode,
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
