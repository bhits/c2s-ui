import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ProfileFieldsLookupService} from "../shared/profile-fields-lookup.service";
import {ProfileFieldsLookupInfo} from "../shared/profile-fields-lookup-info.model";
import {NotificationService} from "../../core/notification.service";
import {UmsFullProfileView} from "../shared/ums-full-profile-view.model";
import {UmsFullProfileUpdate} from "../shared/ums-full-profile-update.model";
import {FullProfileService} from "../shared/full-profile.service";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private userProfile: UmsFullProfileView;
  private updateUserProfile: UmsFullProfileUpdate;

  public profileFieldsLookupInfo: ProfileFieldsLookupInfo = new ProfileFieldsLookupInfo();
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;
  public emailErrorMessage: string = ValidationRules.EMAIL_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public oneEmailRequiredMessage: string = ValidationRules.ONE_EMAIL_REQUIRED_MESSAGE;
  public editProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private profileFieldsLookupService: ProfileFieldsLookupService,
              private notificationService: NotificationService,
              private fullProfileService: FullProfileService) {
  }

  ngOnInit(): void {
    this.editProfileForm = this.initEditProfileFormGroup();

    this.profileFieldsLookupService.getProfileFieldsLookupInfo()
      .subscribe(
        (data) => {
          this.profileFieldsLookupInfo = data;
        },
        err => {
          this.notificationService.i18nShow("USER_PROFILE.EDIT.FIELDS_LOOKUP_INFO_FAILED_MSG");
          console.log(err);
          this.router.navigateByUrl('/home');
        }
      );

    this.fullProfileService.getUMSFullProfile()
      .subscribe(
        (data) => {
          this.userProfile = data;
          this.initProfileUpdateModel(this.userProfile);
          this.initEditProfileFormFieldValues();
        },
        err => {
          this.notificationService.i18nShow("USER_PROFILE.EDIT.GET_PROFILE_FAILED_MSG");
          console.log(err);
          this.redirectHome();
        }
      );
  }

  updateProfile(): void {
    // TODO: Implement update profile
    this.notificationService.show("This method has not yet been implemented");
  }

  cancel(): void {
    this.redirectHome();
  }

  private redirectHome(): void {
    this.router.navigateByUrl('/home');
  }

  private initProfileUpdateModel(userProfileView: UmsFullProfileView): void {
    this.updateUserProfile = new UmsFullProfileUpdate(userProfileView);
  }

  private initEditProfileFormFieldValues(): void {
    if (this.updateUserProfile.homeAddress) {
      this.editProfileForm.setValue({
        homeEmail: this.updateUserProfile.homeEmail,
        homePhone: this.updateUserProfile.homePhone,
        homeAddress: {
          line1: this.updateUserProfile.homeAddress.line1,
          line2: this.updateUserProfile.homeAddress.line2,
          city: this.updateUserProfile.homeAddress.city,
          stateCode: this.updateUserProfile.homeAddress.stateCode,
          postalCode: this.updateUserProfile.homeAddress.postalCode,
          countryCode: this.updateUserProfile.homeAddress.countryCode
        },
        userLocale: this.updateUserProfile.userLocale
      });
    } else {
      this.editProfileForm.setValue({
        homeEmail: this.updateUserProfile.homeEmail,
        homePhone: this.updateUserProfile.homePhone,
        homeAddress: {
          line1: null,
          line2: null,
          city: null,
          stateCode: null,
          postalCode: null,
          countryCode: null
        },
        userLocale: this.updateUserProfile.userLocale
      })
    }
  }

  private initEditProfileFormGroup(): FormGroup {
    return this.formBuilder.group({
      homeEmail: [null, Validators.pattern(ValidationRules.EMAIL_PATTERN)],
      homePhone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)],
      homeAddress: this.initAddressFormGroup(),
      userLocale: [null, Validators.required]
    });
  }

  private initAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      line1: [null, Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)],
      line2: [null, Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)],
      city: [null, Validators.maxLength(ValidationRules.CITY_MAX_LENGTH)],
      stateCode: null,
      postalCode: [null, Validators.pattern(ValidationRules.ZIP_PATTERN)],
      countryCode: null
    });
  }
}
