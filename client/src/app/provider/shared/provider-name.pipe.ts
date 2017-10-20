import {Pipe, PipeTransform} from "@angular/core";
import {FlattenedSmallProvider} from "c2s-ng-shared";
// ArgType not use on this pipe
type ArgType = "Individual" | "Organization";

@Pipe({
  name: 'providerName'
})
export class ProviderNamePipe implements PipeTransform {

  transform(value: FlattenedSmallProvider, args?: ArgType): any {
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
