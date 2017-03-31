import {Component, OnInit} from "@angular/core";

import {AuthenticationService} from "../shared/authentication.service";
import {Credentials} from "../shared/credentials.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../shared/validation.service";
import {TokenService} from "../shared/token.service";

@Component({
  selector: 'c2s-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  loginForm: FormGroup;
  showLoginBackendError: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private validationService: ValidationService,
              private tokenService: TokenService,) {
    this.credentials = new Credentials();
    this.loginForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  login(value: any): void {
    this.authenticationService.login(value.username, value.password)
      .toPromise()
      .then(response => {
        this.showLoginBackendError = false;
        this.authenticationService.onLoginSuccess(response);
        this.authenticationService.getUserProfile()
          .subscribe(
            (uaaProfile) => {
              let profile = this.tokenService.createProfileObject(uaaProfile);
              this.tokenService.storeUserProfile(profile);
              this.authenticationService.onGetUserProfileSuccess(profile)
            }
            ,
            (error) => {
              this.tokenService.deleteAccessToken()
              this.showLoginBackendError = true;
              console.log(error)
            }
          );
      }).catch(error => {
      console.log(error);
      this.showLoginBackendError = true;
    })
  }

  isValidForm(formgroup: FormGroup) {
    return this.validationService.isValidForm(formgroup);
  }
}
