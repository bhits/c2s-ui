import {PatientHealthDataContactInfo} from "./patient-health-data-contact-info.model";

export class PatientHealthDataTargetPatient {
  dob: Date;
  gender: string;
  race: string;
  ethnicity: string;
  name: string;
  contactInfo: PatientHealthDataContactInfo;
  ids: string[];
}
