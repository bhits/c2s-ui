import {Identifier, ListOfIdentifiers} from "c2s-ng-shared";

export class Consent {
  id?: string;
  consentReferenceId: string;
  startDate: Date;
  endDate: Date;
  sharePurposes: ListOfIdentifiers;
  shareSensitivityCategories: ListOfIdentifiers;
  toProviders: ListOfIdentifiers;
  fromProviders: ListOfIdentifiers;

  constructor() {
    this.fromProviders = new ListOfIdentifiers([new Identifier(null, null)]);
    this.toProviders = new ListOfIdentifiers([new Identifier(null, null)]);
    this.shareSensitivityCategories = new ListOfIdentifiers([new Identifier(null, null)]);
    this.sharePurposes = new ListOfIdentifiers([new Identifier(PURPOSE_OF_USE_SYSTEM, "TREAT")]);
    this.consentReferenceId = null;
    this.startDate = null;
    this.endDate = null;
  }
}

export const PURPOSE_OF_USE_SYSTEM = "http://hl7.org/fhir/v3/ActReason";
