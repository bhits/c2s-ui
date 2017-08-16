import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientHealthDataCdaDocument} from "../shared/patient-health-data-cda-document.model";
import {PatientHealthDataCdaDocumentTargetPatient} from "../shared/patient-health-data-cda-document-target-patient.model";
import {PatientHealthDataCdaDocumentTreatment} from "../shared/patient-health-data-cda-document-treatment.model";
import {PatientHealthInformationService} from "../shared/patient-health-information.service";

@Component({
  selector: 'c2s-health-information-cda-document',
  templateUrl: './health-information-cda-document.component.html',
  styleUrls: ['./health-information-cda-document.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthInformationCdaDocumentComponent implements OnInit {
  @Input() public patientHealthDataCdaDocument: PatientHealthDataCdaDocument;

  public targetPatient: PatientHealthDataCdaDocumentTargetPatient;
  public patientTreatment: PatientHealthDataCdaDocumentTreatment;

  constructor(private patientHealthInformationService: PatientHealthInformationService) {
  }

  ngOnInit() {
    this.targetPatient = this.patientHealthDataCdaDocument.targetPatient;
    this.patientTreatment = this.patientHealthDataCdaDocument.treatment;
  }

  public expandSectionAccordionTab(): void {
    this.patientHealthInformationService.setSectionAccordionTabActiveStatus(true);
  }

  public collapseSectionAccordionTab(): void {
    this.patientHealthInformationService.setSectionAccordionTabActiveStatus(false);
  }
}
