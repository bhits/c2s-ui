import {PatientHealthDataSection} from "./patient-health-data-section.model";
import {PatientHealthDataAuthor} from "./patient-health-data-author.model";
import {PatientHealthDataTreatment} from "./patient-health-data-treatment.model";
import {PatientHealthDataTargetPatient} from "./patient-health-data-target-patient.model";

export class PatientHealthDataCdaDocument {
  date: Date;
  type: string;
  id: string;
  title: string;
  targetPatient: PatientHealthDataTargetPatient;
  treatment: PatientHealthDataTreatment;
  authors: PatientHealthDataAuthor[];
  sections: PatientHealthDataSection[];
}
