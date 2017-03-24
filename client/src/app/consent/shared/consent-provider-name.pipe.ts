import { Pipe, PipeTransform } from '@angular/core';
import {FlattenedSmallProvider} from "../../shared/flattened-small-provider.model";

@Pipe({
  name: 'consentProviderName'
})
export class ConsentProviderNamePipe implements PipeTransform {

  transform(provider: FlattenedSmallProvider, args?: any): any {
    let providerName: string;

    if (typeof provider !== 'undefined') {
      switch (provider.entityTypeDisplayName) {
        case "Individual":
          providerName = provider.firstName + ' ' + provider.lastName;
          break;
        case "Organization":
          providerName = provider.organizationName;
          break;
      }
      return providerName;
    }
  }
}
