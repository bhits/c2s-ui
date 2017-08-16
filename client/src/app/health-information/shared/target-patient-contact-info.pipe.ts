import {Pipe, PipeTransform} from '@angular/core';
import {PatientHealthDataCdaDocumentContactInfo} from "./patient-health-data-cda-document-contact-info.model";
import {PatientHealthDataCdaDocumentAddress} from "./patient-health-data-cda-document-address.model";

type ArgType = "address" | "telecommunications";

@Pipe({
  name: 'targetPatientContactInfo'
})
export class TargetPatientContactInfoPipe implements PipeTransform {

  transform(value: PatientHealthDataCdaDocumentContactInfo, args?: ArgType): any {
    if (value != null) {
      switch (args) {
        case "address":
          return this.formatAddress(value.address);
        case "telecommunications":
          return value.telecommunications
            .map(t => t.value)
            .pop();
      }
    }
    return null;
  }

  private formatAddress(address: PatientHealthDataCdaDocumentAddress) {
    return address.addressLine.concat(', ') + address.city.concat(', ') + address.state.concat(', ')
      + address.code.concat(', ') + address.country;
  }
}
