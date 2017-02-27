import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'c2s-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  @Input() medicalInformation:string ;
  @Output() selectMedicalInformation = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitSelection(value:string){
    this.selectMedicalInformation.emit(value);
  }

  setSelectedMedicalInformation(dialog: any){
    dialog.close();
  }

  hideMedicalInformationDialog(dialog: any){
    dialog.close();
  }

  showMedialInformationDialog(dialog: any, value:string){
    dialog.open();
    this.emitSelection(value);
  }
}
