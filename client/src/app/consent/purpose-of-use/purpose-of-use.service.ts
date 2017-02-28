import { Injectable } from '@angular/core';
import {PurposeOfUse} from "../purpose-of-use";

@Injectable()
export class PurposeOfUseService {

  constructor() { }

  setPurposeOfUseStatusToChecked(purposeOfUses:PurposeOfUse[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = true;
    }
  }

  updatePurposeOfUseStatus(purposeOfUsesCodes:string[], purposeOfUses:PurposeOfUse[]){
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

  setPurposeOfUseStatusToUnChecked(purposeOfUses:PurposeOfUse[]){
    for(let purposeOfUSe of purposeOfUses){
      purposeOfUSe['checked'] = false;
    }
  }

  getSelectedPurposeOfUseCode(purposeOfUses:PurposeOfUse[]):string[]{
    let selected:string[] =  new Array();
    for(let purposeOfUse of purposeOfUses){
      if( purposeOfUse['checked']){
        selected.push(purposeOfUse.code.toString());
      }
    }
    return selected;
  }

}
