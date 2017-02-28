import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consentStateText'
})
export class ConsentStateTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let stateText: string = value;
    switch (value) {
      case "CONSENT_SAVED":
        stateText = "IN PROGRESS";
        break;
      case "CONSENT_SIGNED":
        stateText = "SIGNED";
        break;
      case "REVOCATION_REVOKED":
        stateText = "REVOKED";
        break
    }
    return stateText;
  }

}
