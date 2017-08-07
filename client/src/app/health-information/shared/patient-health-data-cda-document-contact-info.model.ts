import {PatientHealthDataCdaDocumentAddress} from "./patient-health-data-cda-document-address.model";
import {PatientHealthDataCdaDocumentTelecommunication} from "./patient-health-data-cda-document-telecommunication.model";

export class PatientHealthDataCdaDocumentContactInfo {
  address: PatientHealthDataCdaDocumentAddress;
  telecommunications: PatientHealthDataCdaDocumentTelecommunication[];
}
