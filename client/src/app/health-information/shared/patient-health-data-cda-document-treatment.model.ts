import {PatientHealthDataCdaDocumentProvider} from "./patient-health-data-cda-document-provider.model";

export class PatientHealthDataCdaDocumentTreatment {
  service: string;
  serviceStartDate: Date;
  serviceEndDate: Date;
  providers: PatientHealthDataCdaDocumentProvider[];
}
