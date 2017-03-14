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
                                        Validators.minLength(this.validationService.EMAIL_MIN_LENGHT),
                                        Validators.maxLength(this.validationService.EMAIL_MAX_LENGHT),
                                        this.validationService.emailValidator])
                       ],
          'password':  [null, Validators.compose([
                                        Validators.required,
                                        Validators.minLength(this.validationService.PASSWORD_MIN_LENGHT),
                                        Validators.maxLength(this.validationService.PAASOWRD_MAX_LENGHT),
                                        this.validationService.passwordValidator])
                        ],
    });
  }

  ngOnInit() {
  }

  login(value: any):void{
    this.authenticationService.login(this.credentials.username,this.credentials.password);
  }

  isValidForm(formgroup: FormGroup){
    return this.validationService.isValidForm(formgroup);
  }
}
