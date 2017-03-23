import {Pipe, PipeTransform} from "@angular/core";
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";

type ArgType = "display" | "description" | "system" | "value";

@Pipe({
  name: 'shareSensitivityCategory'
})
export class ShareSensitivityCategoryPipe implements PipeTransform {

  transform(value: ShareSensitivityCategory, args?: ArgType): any {
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
