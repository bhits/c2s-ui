import {Component, Input, OnInit} from '@angular/core';
import {PatientHealthDataCdaDocument} from "../shared/patient-health-data-cda-document.model";
import {PatientHealthDataTargetPatient} from "../shared/patient-health-data-target-patient.model";
import {PatientHealthDataTreatment} from "../shared/patient-health-data-treatment.model";

@Component({
  selector: 'c2s-health-information-cda-document',
  templateUrl: './health-information-cda-document.component.html',
  styleUrls: ['./health-information-cda-document.component.scss']
})
export class HealthInformationCdaDocumentComponent implements OnInit {
  @Input()
  public patientHealthDataCdaDocument: PatientHealthDataCdaDocument;
  public targetPatient: PatientHealthDataTargetPatient;
  public patientTreatment: PatientHealthDataTreatment;

  constructor() {
  }

  ngOnInit() {
    this.targetPatient = this.patientHealthDataCdaDocument.targetPatient;
    this.patientTreatment = this.patientHealthDataCdaDocument.treatment;
  }
}
