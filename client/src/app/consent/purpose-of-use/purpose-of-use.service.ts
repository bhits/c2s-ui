import { Injectable } from '@angular/core';

import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {PurposeOfUse} from "../shared/purpose-of-use.model";
import {Identifier} from "../../shared/identifier.model";

@Injectable()
export class PurposeOfUseService {
  private VALUE = 'value';
  private CHECK = 'checked';
  private DISPLAY = 'display';
  constructor() { }

  setPurposeOfUseStatusToChecked(purposeOfUses:PurposeOfUse[]){
    purposeOfUses.forEach(p => p[this.CHECK] = true);
  }

  updatePurposeOfUseStatus(toBeUpdatedPurposeOfUse:ListOfIdentifiers, purposeOfUses:PurposeOfUse[]): PurposeOfUse[]{
    let selected :PurposeOfUse[] = [];
    this.setPurposeOfUseStatusToUnChecked(purposeOfUses);

    toBeUpdatedPurposeOfUse.identifiers.forEach(p1 =>
          {
            purposeOfUses.forEach(p2 =>{
                if(p1[this.VALUE] === p2[this.VALUE]){
                  p2[this.CHECK] = true;
                  selected.push(p2);
                }
            })
          }
    );

    return selected;
  }

  setPurposeOfUseStatusToUnChecked(purposeOfUses:PurposeOfUse[]){
    purposeOfUses.forEach(purposeOfUse => purposeOfUse[this.CHECK]=false);
  }

  getSelectedPurposeOfUse(purposeOfUses:PurposeOfUse[]): ListOfIdentifiers{
    let selected:Identifier[] =  new Array<Identifier>();
    purposeOfUses.forEach(purposeOfUse => selected.push(new Identifier(purposeOfUse['system'], purposeOfUse[this.VALUE])));
    let listOfIdentifiers: ListOfIdentifiers = new ListOfIdentifiers();
    listOfIdentifiers.identifiers = selected;

    return listOfIdentifiers;
  }

  getCheckedPurposeOfUse(purposeOfUse: PurposeOfUse[]):string[]{
    let checkedPurposeOfUse: string[] = [];
    purposeOfUse.forEach(p => {
      if(p[this.CHECK]){
        checkedPurposeOfUse.push(p[this.DISPLAY])
      }
    });

    return checkedPurposeOfUse;
  }
  updateSelectedPurposeOfUse(checkedPurposOfUse:string[], purposeOfUse: PurposeOfUse[]){
    checkedPurposOfUse.forEach(value =>
      {
        purposeOfUse.forEach(p2 =>{
          if(value === p2[this.VALUE]){
            p2[this.CHECK] = true;
          }
        })
      }
    );
  }

}
