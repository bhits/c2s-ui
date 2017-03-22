import { Injectable } from '@angular/core';
import { FormGroup  } from '@angular/forms';

@Injectable()
export class ValidationService {
  EMAIL_MIN_LENGHT:number = 8;
  EMAIL_MAX_LENGHT:number = 32;
  PASSWORD_MIN_LENGHT:number = 8;
  PAASOWRD_MAX_LENGHT:number = 50;
  constructor() {
  }

  isValidForm(formgroup: FormGroup){
    if(formgroup){
      return formgroup.valid ;
    }else{
      return false;
    }
  }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any):string {
    let config = {
      'required': 'This field is required.',
      'invalidEmailAddress': 'Invalid email address.',
      'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'maxlength': `Maximum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  passwordValidator(control) {
    // {8,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
