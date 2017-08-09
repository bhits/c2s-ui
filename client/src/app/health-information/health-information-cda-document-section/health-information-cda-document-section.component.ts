import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientHealthDataCdaDocumentSection} from "../shared/patient-health-data-cda-document-section.model";
import {PatientHealthInformationService} from "../shared/patient-health-information.service";

@Component({
  selector: 'c2s-health-information-cda-document-section',
  templateUrl: './health-information-cda-document-section.component.html',
  styleUrls: ['./health-information-cda-document-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthInformationCdaDocumentSectionComponent implements OnInit {
  @Input() public patientCdaDocumentSection: PatientHealthDataCdaDocumentSection;

  public sectionAccordionTabActive: boolean;

  constructor(private patientHealthInformationService: PatientHealthInformationService) {
    this.patientHealthInformationService.getSectionAccordionTabActiveStatusEmitter().subscribe(
      (activeStatus) => this.sectionAccordionTabActive = activeStatus
    );
  }

  ngOnInit() {
  }

  public updateTabActiveStatus(): void {
    this.sectionAccordionTabActive = !this.sectionAccordionTabActive;
  }
}
