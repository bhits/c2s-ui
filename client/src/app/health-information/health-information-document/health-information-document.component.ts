import {Component, Input, OnInit} from '@angular/core';
import {PatientHealthDataDocument} from "../shared/patient-health-data-document.model";

@Component({
  selector: 'c2s-health-information-document',
  templateUrl: './health-information-document.component.html',
  styleUrls: ['./health-information-document.component.scss']
})
export class HealthInformationDocumentComponent implements OnInit {
  @Input() public patientHealthDataDocument: PatientHealthDataDocument;

  constructor() {
  }

  ngOnInit() {
  }
}
