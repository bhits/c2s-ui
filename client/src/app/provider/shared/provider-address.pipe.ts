import {Pipe, PipeTransform} from "@angular/core";
import {Provider} from "./provider.model";
import {UtilityService} from "../../shared/utility.service";

@Pipe({
  name: 'providerAddress'
})
export class ProviderAddressPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: Provider, args?: any): any {
    let providerAddress = [];
    let zipCode = this.utilityService.formatZipCode(value.practiceLocationAddressPostalCode);
    if (value.firstLinePracticeLocationAddress ||
      value.practiceLocationAddressCityName ||
      value.practiceLocationAddressStateName ||
      zipCode) {
      providerAddress.push(value.firstLinePracticeLocationAddress,
        value.practiceLocationAddressCityName,
        value.practiceLocationAddressStateName,
        zipCode)
    }
    return providerAddress.join(", ");
  }
}
