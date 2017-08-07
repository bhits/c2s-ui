import {Component, Input, OnInit} from '@angular/core';
import {PatientHealthDataCdaDocument} from "../shared/patient-health-data-cda-document.model";

@Component({
  selector: 'c2s-health-information-cda-document',
  templateUrl: './health-information-cda-document.component.html',
  styleUrls: ['./health-information-cda-document.component.scss']
})
export class HealthInformationCdaDocumentComponent implements OnInit {
  @Input()
  public patientHealthDataCdaDocument: PatientHealthDataCdaDocument;

  constructor() {
  }

  ngOnInit() {
  }
}
