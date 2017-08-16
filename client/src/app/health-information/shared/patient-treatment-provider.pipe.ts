import {Pipe, PipeTransform} from '@angular/core';
import {PatientHealthDataCdaDocumentProvider} from "./patient-health-data-cda-document-provider.model";

type ArgType = "providerName" | "organizationName" | "softwareUse" | "nationalProviderId" | "contactInfo";

@Pipe({
  name: 'patientTreatmentProvider'
})
export class PatientTreatmentProviderPipe implements PipeTransform {

  transform(value: PatientHealthDataCdaDocumentProvider, arg?: ArgType): any {
    if (value && arg) {
      return value[arg]
    }
    return null;
  }
}
