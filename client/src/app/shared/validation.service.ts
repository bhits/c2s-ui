import { Injectable } from '@angular/core';
import { FormGroup  } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor() { }

  isValid(formgroup: FormGroup, elementName:string):boolean{
    if(formgroup.controls[elementName]){
      return formgroup.controls[elementName].valid;
    }else{
      return false;
    }
  }


  hasError(formgroup: FormGroup, elementName:string, validationKey:string):boolean{
    if(formgroup.controls[elementName]){
      return formgroup.controls[elementName].hasError(validationKey);
    }else{
      return false;
    }
  }

  isTouch(formgroup: FormGroup, elementName:string):boolean{
    if(formgroup.controls[elementName]){
      return formgroup.controls[elementName].touched;
    }else{
      return false;
    }
  }

  isValidForm(formgroup: FormGroup){
    if(formgroup){
      return formgroup.valid;
    }else{
      return false;
    }
  }
}
