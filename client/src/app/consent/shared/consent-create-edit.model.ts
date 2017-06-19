
import {ListOfIdentifiers} from "../../shared/list-of-identifies.model";
import {Identifier} from "../../shared/identifier.model";

export class ConsentCreateEdit {
  id?: string;
  consentReferenceId: string;
  startDate: Date;
  endDate: Date;
  sharePurposes: ListOfIdentifiers;
  shareSensitivityCategories: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
  fromProviders: ListOfIdentifiers;

  constructor(){
    let defaultPurposeOfUse = new ListOfIdentifiers();
    defaultPurposeOfUse.identifiers = [new Identifier("http://hl7.org/fhir/v3/ActReason", "TREAT") ];
    this.sharePurposes = defaultPurposeOfUse;
    this.consentReferenceId = null;
    this.shareSensitivityCategories = new ListOfIdentifiers();
    this.toProviders = new ListOfIdentifiers();
    this.fromProviders = new ListOfIdentifiers();
    this.startDate = null;
    this.endDate = null;
  }
}

