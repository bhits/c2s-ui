import { Injectable } from '@angular/core';

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {Identifier} from "../../shared/identifier.model";

@Injectable()
export class MedicalInformationService {

  constructor() { }

  sensitivityPoliciesStatusToUnChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = false;
    }
  }

  updateSensitivitiesPoliciesStatus(sensitivityPoliciesCodes:string[], sensitivityPolicies:SensitivityPolicy[]){
    if(sensitivityPoliciesCodes && sensitivityPoliciesCodes.length > 0){
      this.sensitivityPoliciesStatusToUnChecked(sensitivityPolicies);
      for(let spc of sensitivityPoliciesCodes){
        for(let sp of sensitivityPolicies){
          if(spc === sp.code.toString()){
            sp['checked'] = true;
            break;
          }
        }
      }
    }
  }

  setSenetivityPoliciesStatusToUnChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = false;
    }
  }

  setSensitivityPoliciesStatusToChecked(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      sp['checked'] = true;
    }
  }
  getSelectedSensitivityPolicyIdentifiers(sensitivityPolicies:SensitivityPolicy[]):ListOfIdentifiers{
    let selected:Identifier[] =  [];
    let listOfIdentifiers = new ListOfIdentifiers();
    sensitivityPolicies.forEach(sensitivityPolicy =>{
      if( sensitivityPolicy['checked']){
        selected.push( new Identifier(sensitivityPolicy.system, sensitivityPolicy.code.toString()));
      }
    });
    listOfIdentifiers.identifiers = selected;
    return listOfIdentifiers;
  }

  getSelectedSensitivityPolicies(sensitivityPolicies:SensitivityPolicy[]):string[]{
    let selected:string[] =  new Array();
    for(let sp of sensitivityPolicies){
      if( sp['checked']){
        selected.push(sp.displayName);
      }
    }
    return selected;
  }

  updateSelectedCategories(sensitivityPolicies:SensitivityPolicy[], checkedSensitityPolicies:string[]){
    for(let sp1 of checkedSensitityPolicies){
      for(let sp2 of sensitivityPolicies){
        if( sp1 === sp2.displayName){
          sp2["checked"] = true;
        }
      }
    }
  }

  isCheckedAll(sensitivityPolicies:SensitivityPolicy[]){
    for(let sp of sensitivityPolicies){
      if(!sp['checked']){
        return false;
      }
    }
    return true;
  }
}
