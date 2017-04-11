import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'c2s-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {
  public accountVerificationFrom: FormGroup;
  public FORMAT: string = "MM/DD/YYYY";

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.accountVerificationFrom = this.formBuilder.group({
      birthDate: ['', Validators.required],
      verificationCode: ['', [Validators.minLength(2), Validators.required]]
    });
  }

  public clear() {
    this.accountVerificationFrom.reset();
  }

  public verify(){

  }
}
