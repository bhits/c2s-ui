import {PatientHealthDataCdaDocumentContactInfo} from "./patient-health-data-cda-document-contact-info.model";

export class PatientHealthDataCdaDocumentProvider {
  providerName: string;
  organizationName: string;
  softwareUse: string;
  nationalProviderId: string;
  contactInfo: PatientHealthDataCdaDocumentContactInfo;
}
