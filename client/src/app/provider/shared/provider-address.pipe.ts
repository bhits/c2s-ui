import {Pipe, PipeTransform} from "@angular/core";
import {Provider} from "./provider.model";

@Pipe({
  name: 'providerAddress'
})
export class ProviderAddressPipe implements PipeTransform {

  transform(value: Provider, args?: any): any {
    let providerAddress = [];
    if (value.firstLinePracticeLocationAddress ||
      value.practiceLocationAddressCityName ||
      value.practiceLocationAddressStateName ||
      value.practiceLocationAddressPostalCode) {
      providerAddress.push(value.firstLinePracticeLocationAddress,
        value.practiceLocationAddressCityName,
        value.practiceLocationAddressStateName,
        value.practiceLocationAddressPostalCode)
    }
    return providerAddress.join(", ");
  }
}
