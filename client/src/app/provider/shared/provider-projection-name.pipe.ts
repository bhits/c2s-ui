import {Pipe, PipeTransform} from "@angular/core";
import {ProviderProjection} from "./provider-projection.model";

@Pipe({
  name: 'providerProjectionName'
})
export class ProviderProjectionNamePipe implements PipeTransform {

  transform(value: ProviderProjection, args?: any): any {
    let providerName: string;
    switch (value.entityTypeDisplayName) {
      case "Individual":
        providerName = value.firstName + ' ' + value.lastName;
        break;
      case "Organization":
        providerName = value.organizationName;
        break;
    }
    return providerName;
  }
}
