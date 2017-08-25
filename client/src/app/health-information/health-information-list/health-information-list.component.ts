import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientHealthData} from "../shared/patient-health-data.model";

@Component({
  selector: 'c2s-health-information-list',
  templateUrl: './health-information-list.component.html',
  styleUrls: ['./health-information-list.component.scss']
})
export class HealthInformationListComponent implements OnInit {
  public healthInformation: PatientHealthData;
  public hasDataToDisplay: boolean = false;


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.healthInformation = this.route.snapshot.data['healthInformation'];
    this.hasDataToDisplay = this.checkIfHealthDataIsPresent(this.healthInformation);
  }

  checkIfHealthDataIsPresent(data: PatientHealthData): boolean {
    return (data != null && data.Documents != null && data.Documents.length > 0);
  }
}
