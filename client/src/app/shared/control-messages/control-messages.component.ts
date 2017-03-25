import { Component, OnInit, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidationService} from "../validation.service";

@Component({
  selector: 'c2s-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: FormControl;

  constructor(private validationService: ValidationService) { }

  ngOnInit() {
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
