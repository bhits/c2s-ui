import {Pipe, PipeTransform} from "@angular/core";
import {ConsentProvider} from "../../shared/consent-provider.model";

@Pipe({
  name: 'abstractProviderName'
})
export class AbstractProviderNamePipe implements PipeTransform {

  transform(value: ConsentProvider, args?: any): any {
    let providerName: string;
    switch (value.providerType) {
      case "PRACTITIONER":
        providerName = value.firstName + ' ' + value.lastName;
        break;
      case "ORGANIZATION":
        providerName = value.name;
        break;
    }
    return providerName;
  }
}
