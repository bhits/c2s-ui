import {Component, Input, OnInit} from '@angular/core';
import {PatientHealthDataCdaDocumentSection} from "../shared/patient-health-data-cda-document-section.model";

@Component({
  selector: 'c2s-health-information-cda-document-section',
  templateUrl: './health-information-cda-document-section.component.html',
  styleUrls: ['./health-information-cda-document-section.component.scss']
})
export class HealthInformationCdaDocumentSectionComponent implements OnInit {
  @Input()
  public patientCdaDocumentSection: PatientHealthDataCdaDocumentSection;

  constructor() {
  }

  ngOnInit() {
  }

}
