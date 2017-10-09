import {Pipe, PipeTransform} from "@angular/core";
import {ConsentProvider, FHIR_US_NPI_SYSTEM} from "./consent-provider.model";

type ArgType = "npi" | "name" | "phone" | "address";

@Pipe({
  name: 'consentProvider'
})
export class ConsentProviderPipe implements PipeTransform {

  constructor() {
  }

  transform(value: ConsentProvider, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "npi":
          return value.identifiers
            .filter(id => id.system === FHIR_US_NPI_SYSTEM)
            .map(id => id.value)
            .pop();
        case "name":
          switch (value.providerType) {
            case "ORGANIZATION":
              return value.name;
            case "PRACTITIONER":
              return this.getName(value, 'firstName').concat(' ').concat(this.getName(value, 'middleName')).concat(' ').concat(this.getName(value, 'lastName'));
            default:
              throw new TypeError("Invalid providerType");
          }
        case "address":
          const address = [];
          address.push(value.address.line1 || "");
          address.push(value.address.line2 || "");
          address.push(value.address.city || "");
          address.push(value.address.state || "");
          address.push(this.formatZipCode(value.address.postalCode || ""));
          address.push(value.address.country || "");
          return address.filter(field => field !== "").join(", ");
        case "phone":
          return value.phoneNumber;
      }
    }
    return null;
  }

  private formatZipCode(zipCode: string): string {
    if (zipCode.length > 5) {
      zipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
    }
    return zipCode;
  }

  private getName(consentProvider: ConsentProvider, key: string): string {
    if (consentProvider !== null && consentProvider[key]) {
      return consentProvider[key];
    }
    return ''
  }

}
