
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";

export class ConsentCreateEdit {
  id?: string;
  startDate: Date;
  endDate: Date;
  sharePurposes: ListOfIdentifiers;
  shareSensitivityCategories: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
  fromProviders: ListOfIdentifiers;

  constructor(){
    let defaultPurposeOfUse = new ListOfIdentifiers();
    defaultPurposeOfUse.identifiers = [{"value":"TREATMENT", "system":"http://hl7.org/fhir/v3/ActReason"}];
    this.sharePurposes = defaultPurposeOfUse;

    this.shareSensitivityCategories = new ListOfIdentifiers();
    this.toProviders = new ListOfIdentifiers();
    this.fromProviders = new ListOfIdentifiers();
    this.startDate = new Date();
    this.endDate = new Date();
  }
}

