import {PatientHealthDataCdaDocumentContactInfo} from "./patient-health-data-cda-document-contact-info.model";

export class PatientHealthDataCdaDocumentTargetPatient {
  dob: Date;
  gender: string;
  race: string;
  ethnicity: string;
  name: string;
  contactInfo: PatientHealthDataCdaDocumentContactInfo;
  ids: string[];
}
