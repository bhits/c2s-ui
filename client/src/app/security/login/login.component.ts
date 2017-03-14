import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from "../shared/authentication.service";
import {Credentials} from "../shared/credentials.model";
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {ValidationService} from "../../shared/validation.service";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:Credentials;
  loginForm : FormGroup;

  constructor(private authenticationService:AuthenticationService, private formBuilder: FormBuilder, private validationService: ValidationService) {
    this.credentials = new Credentials();
    this.loginForm = formBuilder.group({
          'username' : [null, Validators.compose([
                                        Validators.required,
                                        Validators.minLength(5),
                                        Validators.maxLength(10)])
                       ],
          'password':  [null, Validators.compose([
                                        Validators.required,
                                        Validators.minLength(5),
                                        Validators.maxLength(10)])
                        ],
    });
  }

  ngOnInit() {
  }

  login(value: any):void{
    console.log('Reactive Form Data: ')
    console.log(value)
    this.authenticationService.login(this.credentials.username,this.credentials.password);
  }

  isValid(formgroup: FormGroup, elementName:string):boolean{
    return this.validationService.isValid(formgroup, elementName);
  }


  hasError(formgroup: FormGroup, elementName:string, validationKey:string):boolean{
    return this.validationService.hasError(formgroup, elementName, validationKey);
  }

  isTouch(formgroup: FormGroup, elementName:string):boolean{
    return this.validationService.isTouch(formgroup, elementName);
  }

  isValidForm(formgroup: FormGroup){
    return this.validationService.isValidForm(formgroup);
  }
}
