import {PatientHealthDataAddress} from "./patient-health-data-address.model";
import {PatientHealthDataTelecommunication} from "./patient-health-data-telecommunication.model";

export class PatientHealthDataContactInfo {
  address: PatientHealthDataAddress;
  telecommunications: PatientHealthDataTelecommunication[];
}
