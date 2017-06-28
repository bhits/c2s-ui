import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ValidationRules} from "./validation-rules.model";

@Injectable()
export class ValidationService {

  constructor() {
  }

  isValidForm(formgroup: FormGroup) {
    if (formgroup) {
      return formgroup.valid;
    } else {
      return false;
    }
  }

  public getValidatorErrorMessage(validatorKey: string, validatorValue?: any, customMessage?: string): string {
    switch (validatorKey) {
      case ValidationRules.REQUIRED_KEY:
        return ValidationRules.REQUIRED_MESSAGE;
      case ValidationRules.REQUIRED_TRUE_KEY:
        return ValidationRules.REQUIRED_TRUE_MESSAGE;
      case ValidationRules.EMAIL_KEY:
        return ValidationRules.EMAIL_MESSAGE;
      case ValidationRules.MIN_LENGTH_KEY:
        return `Minimum length ${validatorValue.requiredLength}`;
      case ValidationRules.MAX_LENGTH_KEY:
        return `Maximum length ${validatorValue.requiredLength}`;
      case ValidationRules.PATTERN_KEY:
        return customMessage;
      case ValidationRules.ONE_EMAIL_REQUIRED_KEY:
        return ValidationRules.ONE_EMAIL_REQUIRED_MESSAGE;
    }
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  static oneEmailRequired(homeEmailKey: string, registrationPurposeEmailKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let homeEmail = group.controls[homeEmailKey];
      let registrationPurposeEmail = group.controls[registrationPurposeEmailKey];

      if (homeEmail.value === '') homeEmail.setValue(null);
      if (registrationPurposeEmail.value === '') registrationPurposeEmail.setValue(null);

      if ((homeEmail.touched || homeEmail.dirty )&&(registrationPurposeEmail.dirty || registrationPurposeEmail.touched)) {
        if (homeEmail.value === null && registrationPurposeEmail.value === null) {
          return {
            oneEmailRequired: true
          }
        }
      }
    }
  }

  static pastDateValidator(control):any  {
    const today = new Date();
    if (control.value < today) {
      return null;
    } else {
      return {'invalidPastDate': true};
    }
  }
}
