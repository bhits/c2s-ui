import {PatientHealthDataProvider} from "./patient-health-data-provider.model";

export class PatientHealthDataTreatment {
  service: string;
  serviceStartDate: Date;
  serviceEndDate: Date;
  providers: PatientHealthDataProvider[];
}
