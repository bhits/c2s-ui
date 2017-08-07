import {Pipe, PipeTransform} from '@angular/core';
import {PatientHealthDataProvider} from "./patient-health-data-provider.model";

type ArgType = "providerName" | "organizationName" | "softwareUse" | "nationalProviderId" | "contactInfo";

@Pipe({
  name: 'patientTreatmentProvider'
})
export class PatientTreatmentProviderPipe implements PipeTransform {

  transform(value: PatientHealthDataProvider, args?: ArgType): any {
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
