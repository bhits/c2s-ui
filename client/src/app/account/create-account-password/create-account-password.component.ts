import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountVerificationService} from "app/account/shared/account-verification.service";

@Component({
  selector: 'c2s-create-account-password',
  templateUrl: './create-account-password.component.html',
  styleUrls: ['./create-account-password.component.scss']
})
export class CreateAccountPasswordComponent implements OnInit {
  public createAccountPasswordFrom: FormGroup;
  public username: string;

  constructor(private accountVerificationService: AccountVerificationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createAccountPasswordFrom = this.formBuilder.group({
      password: ['', [Validators.minLength(2), Validators.required]],
      confirmPassword: ['', [Validators.minLength(2), Validators.required]]
    });
    this.username = this.accountVerificationService.getUsername();
  }

  public clear() {
    this.createAccountPasswordFrom.reset();
  }

  public activate() {

  }
}
