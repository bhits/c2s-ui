
export class ConsentCreate {
  consentEnd:string;
  consentStart:string;
  doNotShareSensitivityPolicyCodes:string[];
  organizationalProvidersDisclosureIsMadeToNpi:string[];
  organizationalProvidersPermittedToDiscloseNpi:string[];
  providersDisclosureIsMadeToNpi:string[];
  providersPermittedToDiscloseNpi:string[];
  shareForPurposeOfUseCodes:['TREATMENT'];
}

