import {Pipe, PipeTransform} from "@angular/core";
import {ProviderSearchResult} from "./provider-search-result.model";

@Pipe({
  name: 'providerName'
})
export class ProviderNamePipe implements PipeTransform {

  transform(value: ProviderSearchResult, args?: any): any {
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
