import {Injectable} from "@angular/core";

import {SensitivityPolicy} from "../shared/sensitivity-policy";
import {Consent, Identifier, ListOfIdentifiers} from "c2s-ng-shared";

@Injectable()
export class MedicalInformationService {
  private VALUE = 'value';
  private CHECK = 'checked';
  private DISPLAY = 'displayName';

  constructor() {
  }

  public setSensitivityPoliciesStatusToUnChecked(sensitivityCategories: SensitivityPolicy[]): void {
    sensitivityCategories.forEach(s => s[this.CHECK] = false);
  }

  public setSensitivityPoliciesStatusToChecked(sensitivityCategories: SensitivityPolicy[]): void {
    sensitivityCategories.forEach(s => s[this.CHECK] = true);
  }

  public setSelectedSensitivityPoliciesStatusToChecked(consent: Consent, sensitivityCategories: SensitivityPolicy[]): void {
    this.setSensitivityPoliciesStatusToChecked(
      this.mapConsentSensitivityCategoriesToSensitivityCategories(consent, sensitivityCategories));
  }

  public mapConsentSensitivityCategoriesToSensitivityCategories(consent: Consent, sensitivityCategories: SensitivityPolicy[]): SensitivityPolicy[] {
    let selected: SensitivityPolicy[] = [];
    this.setSensitivityPoliciesStatusToUnChecked(sensitivityCategories);
    consent.shareSensitivityCategories.identifiers.forEach(s1 => {
      sensitivityCategories.forEach(s2 => {
        if (s1[this.VALUE] === s2.code) {
          s2[this.CHECK] = true;
          selected.push(s2);
        }
      })
    });
    return selected;
  }

  public getSelectedSensitivityPolicyIdentifiers(sensitivityPolicies: SensitivityPolicy[]): ListOfIdentifiers {
    let selected: Identifier[] = [];
    let listOfIdentifiers = new ListOfIdentifiers([new Identifier(null, null)]);
    sensitivityPolicies.forEach(sensitivityPolicy => {
      if (sensitivityPolicy[this.CHECK]) {
        selected.push(new Identifier(sensitivityPolicy.system, sensitivityPolicy.code.toString()));
      }
    });
    listOfIdentifiers.identifiers = selected;
    return listOfIdentifiers;
  }

  public getSelectedSensitivityPolicies(sensitivityPolicies: SensitivityPolicy[]): string[] {
    let selected: string[] = [];
    sensitivityPolicies.forEach(sensitivityCategory => {
      if (sensitivityCategory[this.CHECK]) {
        selected.push(sensitivityCategory[this.DISPLAY])
      }
    });
    return selected;
  }

  public isCheckedAll(sensitivityPolicies: SensitivityPolicy[]): boolean {
    for (let sp of sensitivityPolicies) {
      if (!sp[this.CHECK]) {
        return false;
      }
    }
    return true;
  }

  public isCheckedOne(sensitivityCategories: SensitivityPolicy[]): boolean {
    for (let sp of sensitivityCategories) {
      if (sp[this.CHECK]) {
        return true;
      }
    }
    return false;
  }
}
