import {Pipe, PipeTransform} from "@angular/core";
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Pipe({
  name: 'providerName'
})
export class ProviderNamePipe implements PipeTransform {

  transform(value: FlattenedSmallProvider, args?: any): any {
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
