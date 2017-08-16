import {PatientHealthDataCdaDocumentSection} from "./patient-health-data-cda-document-section.model";
import {PatientHealthDataCdaDocumentAuthor} from "./patient-health-data-cda-document-author.model";
import {PatientHealthDataCdaDocumentTreatment} from "./patient-health-data-cda-document-treatment.model";
import {PatientHealthDataCdaDocumentTargetPatient} from "./patient-health-data-cda-document-target-patient.model";

export class PatientHealthDataCdaDocument {
  date: Date;
  type: string;
  id: string;
  title: string;
  targetPatient: PatientHealthDataCdaDocumentTargetPatient;
  treatment: PatientHealthDataCdaDocumentTreatment;
  authors: PatientHealthDataCdaDocumentAuthor[];
  sections: PatientHealthDataCdaDocumentSection[];
}
