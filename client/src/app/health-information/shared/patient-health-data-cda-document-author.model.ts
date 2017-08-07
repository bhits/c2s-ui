import {PatientHealthDataCdaDocumentContactInfo} from "./patient-health-data-cda-document-contact-info.model";

export class PatientHealthDataCdaDocumentAuthor {
  providerName: string;
  organizationName: string;
  softwareUse: string;
  nationalProviderId: string;
  contactInfo: PatientHealthDataCdaDocumentContactInfo;
}
