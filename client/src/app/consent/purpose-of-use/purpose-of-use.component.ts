import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {PurposeOfUseService} from "./purpose-of-use.service";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {PurposeOfUse} from "../shared/purpose-of-use.model";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.css']
})
export class PurposeOfUseComponent implements OnInit {
  @Output() selectedPurposeOfUse = new EventEmitter();
  @Input() sharePurposes:ListOfIdentifiers;
  @Input() purposeOfUSes: PurposeOfUse[];
  checkedPurposeOfUses: string[] ;

  constructor(private purposeOfUseService: PurposeOfUseService ) { }

  ngOnInit() {
    this.purposeOfUseService.updatePurposeOfUseStatus(this.sharePurposes,this.purposeOfUSes);
    this.checkedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(this.purposeOfUSes);
  }


  private getSelectedPurposeOfUse():ListOfIdentifiers{
    return this.purposeOfUseService.getSelectedPurposeOfUse(this.purposeOfUSes)
  }

  closeDialog(dialog: any){
    this.purposeOfUseService.updateSelectedPurposeOfUse( this.checkedPurposeOfUses,this.purposeOfUSes);
    dialog.close();
  }

  openDialog(dialog: any){
    dialog.open();
  }

  setSelectedPurposesOfUse(dialog: any){
    dialog.close();
    this.checkedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(this.purposeOfUSes);
    this.selectedPurposeOfUse.emit(this.getSelectedPurposeOfUse().identifiers);
  }

  selectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToChecked(this.purposeOfUSes);
  }

  deSelectAll(){
    this.purposeOfUseService.setPurposeOfUseStatusToUnChecked(this.purposeOfUSes);
  }
}
