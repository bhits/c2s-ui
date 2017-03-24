import { Injectable } from '@angular/core';

import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {PurposeOfUse} from "../shared/purpose-of-use.model";
import {Identifier} from "../../shared/identifier.model";
import {SharePurpose} from "../shared/share-purpose.model";

@Injectable()
export class PurposeOfUseService {
  private VALUE = 'value';
  private CHECK = 'checked';
  private DISPLAY = 'display';
  constructor() { }

  setPurposeOfUseStatusToChecked(purposeOfUses:SharePurpose[]){
    purposeOfUses.forEach(p => p[this.CHECK] = true);
  }

  updatePurposeOfUseStatus(toBeUpdatedPurposeOfUse:ListOfIdentifiers, purposeOfUses:SharePurpose[]): SharePurpose[]{
    let selected :SharePurpose[] = [];
    this.setPurposeOfUseStatusToUnChecked(purposeOfUses);

    toBeUpdatedPurposeOfUse.identifiers.forEach(p1 =>
          {
            purposeOfUses.forEach(p2 =>{
                if(p1[this.VALUE] === p2.identifier[this.VALUE]){
                  p2[this.CHECK] = true;
                  selected.push(p2);
                }
            })
          }
    );

    return selected;
  }

  setPurposeOfUseStatusToUnChecked(purposeOfUses:SharePurpose[]){
    purposeOfUses.forEach(purposeOfUse => purposeOfUse[this.CHECK]=false);
  }

  getSelectedPurposeOfUse(purposeOfUSes:SharePurpose[]): ListOfIdentifiers{
    let selected:Identifier[] =  [];
    purposeOfUSes.forEach(sharePurpose => {
                if(sharePurpose['checked']){
                  selected.push(new Identifier(sharePurpose.identifier.system,sharePurpose.identifier.value ));
                }
    });
    let sharePurposes = new ListOfIdentifiers();
    sharePurposes.identifiers = selected;

    return sharePurposes;
  }

  getCheckedPurposeOfUse(purposeOfUse: SharePurpose[]):string[]{
    let checkedPurposeOfUse: string[] = [];
    purposeOfUse.forEach(p => {
      if(p[this.CHECK]){
        checkedPurposeOfUse.push(p[this.DISPLAY])
      }
    });

    return checkedPurposeOfUse;
  }
  updateSelectedPurposeOfUse(checkedPurposOfUse:string[], purposeOfUse: SharePurpose[]){
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
