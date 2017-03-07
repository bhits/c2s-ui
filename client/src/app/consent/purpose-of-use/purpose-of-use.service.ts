import { Injectable } from '@angular/core';

import {PurposeOfUseBase} from "../shared/purpose-of-use-base.model";

@Injectable()
export class PurposeOfUseService {

  constructor() { }

  setPurposeOfUseStatusToChecked(purposeOfUses:PurposeOfUseBase[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = true;
    }
  }

  updatePurposeOfUseStatus(purposeOfUsesCodes:string[], purposeOfUses:PurposeOfUseBase[]){
    this.setPurposeOfUseStatusToUnChecked(purposeOfUses);
    for(let p1 of purposeOfUsesCodes){
      for(let p2 of purposeOfUses){
        if(p1 === p2.code.toString()){
          p2['checked'] = true;
          break;
        }
      }
    }
  }

  setPurposeOfUseStatusToUnChecked(purposeOfUses:PurposeOfUseBase[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = false;
    }
  }

  getSelectedPurposeOfUseCode(purposeOfUses:PurposeOfUseBase[]):string[]{
    let selected:string[] =  new Array();
    for(let purposeOfUse of purposeOfUses){
      if( purposeOfUse['checked']){
        selected.push(purposeOfUse.code.toString());
      }
    }
    return selected;
  }

  getSelectedPurposeOfUse(purposeOfUses:PurposeOfUseBase[]):PurposeOfUseBase[]{
    let selected:PurposeOfUseBase[] =  new Array();
    for(let purposeOfUse of purposeOfUses){
      if( purposeOfUse['checked']){
        selected.push(purposeOfUse);
      }
    }
    return selected;
  }

}
