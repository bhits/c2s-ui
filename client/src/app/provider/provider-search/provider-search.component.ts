import {Component, OnInit} from "@angular/core";

@Component({
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent implements OnInit {
  selectedState: string;

  states = [
    {stateCode: 'AZ', stateName: 'ARIZONA'},
    {stateCode: 'DC', stateName: 'DISTRICT OF COLUMBIA'},
    {stateCode: 'MD', stateName: 'MARYLAND'},
    {stateCode: 'VA', stateName: 'VIRGINIA'}
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
