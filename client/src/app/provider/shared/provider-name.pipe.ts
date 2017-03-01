import {Pipe, PipeTransform} from "@angular/core";
import {Provider} from "./provider.model";

@Pipe({
  name: 'providerName'
})
export class ProviderNamePipe implements PipeTransform {

  transform(value: Provider, args?: any): any {
    let providerName: string;
    switch (value.entityType) {
      case "Individual":
        providerName = value.firstName + ' ' + value.lastName;
        break;
      case "Organization":
        providerName = value.orgName;
        break;
    }
    return providerName;
  }
}
