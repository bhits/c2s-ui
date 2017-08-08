import {Component, Input, OnInit} from '@angular/core';
import {PatientHealthDataCdaDocument} from "../shared/patient-health-data-cda-document.model";
import {PatientHealthDataCdaDocumentTargetPatient} from "../shared/patient-health-data-cda-document-target-patient.model";
import {PatientHealthDataCdaDocumentTreatment} from "../shared/patient-health-data-cda-document-treatment.model";

@Component({
  selector: 'c2s-health-information-cda-document',
  templateUrl: './health-information-cda-document.component.html',
  styleUrls: ['./health-information-cda-document.component.scss']
})
export class HealthInformationCdaDocumentComponent implements OnInit {
  @Input()
  public patientHealthDataCdaDocument: PatientHealthDataCdaDocument;
  public targetPatient: PatientHealthDataCdaDocumentTargetPatient;
  public patientTreatment: PatientHealthDataCdaDocumentTreatment;
  public cdaDocumentSectionAccordionTabActive: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.targetPatient = this.patientHealthDataCdaDocument.targetPatient;
    this.patientTreatment = this.patientHealthDataCdaDocument.treatment;
  }

  public expandSectionAccordionTab(): void {
    this.cdaDocumentSectionAccordionTabActive = true;
  }

  public collapseSectionAccordionTab(): void {
    this.cdaDocumentSectionAccordionTabActive = false;
  }
}
