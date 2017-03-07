import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";
import {PurposeOfUseService} from "./purpose-of-use.service";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.css']
})
export class PurposeOfUseComponent implements OnInit {
  @Output() selectedPurposeOfUse = new EventEmitter();
  @Input() purposeOfUsesCodes:string[];
  @Input() purposeOfUSes: PurposeOfUseBase[];

  constructor(private purposeOfUseService: PurposeOfUseService ) { }

  ngOnInit() {
    this.updatePurposeOfUseStatus();
  }

  private updatePurposeOfUseStatus(){
    this.purposeOfUseService.updatePurposeOfUseStatus(this.purposeOfUsesCodes,this.purposeOfUSes);
  }

  private getSelectedPurposeOfUseCode():string[]{
    return this.purposeOfUseService.getSelectedPurposeOfUseCode(this.purposeOfUSes)
  }

  closeDialog(dialog: any){
    dialog.close();
  }

  openDialog(dialog: any){
    dialog.open();
  }

  setSelectedPurposesOfUse(dialog: any){
    dialog.close();
    this.selectedPurposeOfUse.emit(this.getSelectedPurposeOfUseCode());
  }

  selectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToChecked(this.purposeOfUSes);
  }

  deSelectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToUnChecked(this.purposeOfUSes);
  }
}
