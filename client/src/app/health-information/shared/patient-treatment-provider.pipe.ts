import {Pipe, PipeTransform} from '@angular/core';
import {PatientHealthDataCdaDocumentProvider} from "./patient-health-data-cda-document-provider.model";

type ArgType = "providerName" | "organizationName" | "softwareUse" | "nationalProviderId" | "contactInfo";

@Pipe({
  name: 'patientTreatmentProvider'
})
export class PatientTreatmentProviderPipe implements PipeTransform {

  transform(value: PatientHealthDataCdaDocumentProvider, args?: ArgType): any {
    if (value != null) {
      switch (args) {
        case "providerName":
          return value.providerName;
        case "organizationName":
          return value.organizationName;
        case "softwareUse":
          return value.softwareUse;
        case "nationalProviderId":
          return value.nationalProviderId;
        case "contactInfo":
          return value.contactInfo;
      }
    }
    return null;
  }
}
