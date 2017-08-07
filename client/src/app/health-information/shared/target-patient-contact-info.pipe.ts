import {Pipe, PipeTransform} from '@angular/core';
import {PatientHealthDataContactInfo} from "./patient-health-data-contact-info.model";
import {PatientHealthDataAddress} from "./patient-health-data-address.model";

type ArgType = "address" | "telecommunications";

@Pipe({
  name: 'targetPatientContactInfo'
})
export class TargetPatientContactInfoPipe implements PipeTransform {

  transform(value: PatientHealthDataContactInfo, args?: ArgType): any {
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

  private formatAddress(address: PatientHealthDataAddress) {
    return address.addressLine.concat(', ') + address.city.concat(', ') + address.state.concat(', ')
      + address.code.concat(', ') + address.country;
  }
}
