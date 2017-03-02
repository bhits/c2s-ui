import {PurposeOfUse} from "./purpose-of-use.model";

export class Consent {
  id: string;
  toDiscloseName: string[];
  isMadeToName: string[];
  doNotShareClinicalDocumentTypeCodes: string[];
  doNotShareSensitivityPolicyCodes: string[];
  shareForPurposeOfUseCodes: string[];
  doNotShareClinicalConceptCodes: string[];
  shareForPurposeOfUse: PurposeOfUse[];
  consentStage: string;
  revokeStage: string;
  consentStart: number;
  consentEnd: number;
  consentStartString: string;
  consentEndString: string;
  medicalInformationNotDisclosed: boolean;
}
