import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  @Input() medicalinformation:string ;

  constructor() { }

  ngOnInit() {
  }

}
