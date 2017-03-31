import {Pipe, PipeTransform} from "@angular/core";
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";

@Pipe({
  name: 'sensitivityCategory'
})
export class SensitivityCategoryPipe implements PipeTransform {

  transform(value: ShareSensitivityCategory, args?: any): any {
    switch (args) {
      case "display":
        return value.display;
      case "description":
        return value.description;
      case "system":
        return value.identifier.system;
      case "value":
        return value.identifier.value;
    }
  }
}
