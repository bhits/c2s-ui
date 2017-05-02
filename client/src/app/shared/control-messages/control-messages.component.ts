import {Component, Input, OnInit} from "@angular/core";
import {ValidationService} from "../validation.service";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'c2s-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() customMessage: string;

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
  }

  get errorMessage() {
    for (const validatorKey in this.control.errors) {
      if (this.control.hasError(validatorKey) && (this.control.dirty || this.control.touched)) {
        return this.validationService.getValidatorErrorMessage(validatorKey, this.control.errors[validatorKey], this.customMessage);
      }
    }
    return null;
  }
}
