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
  public noHealthData: boolean = true;


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.healthInformation = this.route.snapshot.data['healthInformation'];
    this.noHealthData = (this.healthInformation != null && this.healthInformation.Documents != null && this.healthInformation.Documents.length > 0)? false : true;
  }
}
