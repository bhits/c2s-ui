import {PatientHealthDataContactInfo} from "./patient-health-data-contact-info.model";

export class PatientHealthDataAuthor {
  providerName: string;
  organizationName: string;
  softwareUse: string;
  nationalProviderId: string;
  contactInfo: PatientHealthDataContactInfo;
}
