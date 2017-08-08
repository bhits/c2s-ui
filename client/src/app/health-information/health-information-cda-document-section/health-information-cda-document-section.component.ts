import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientHealthDataCdaDocumentSection} from "../shared/patient-health-data-cda-document-section.model";

@Component({
  selector: 'c2s-health-information-cda-document-section',
  templateUrl: './health-information-cda-document-section.component.html',
  styleUrls: ['./health-information-cda-document-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthInformationCdaDocumentSectionComponent implements OnInit {
  @Input()
  public patientCdaDocumentSection: PatientHealthDataCdaDocumentSection;
  @Input()
  public sectionAccordionTabActive: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
