import {Pipe, PipeTransform} from "@angular/core";

/**
 * Format US Phone Number to (PPP) ###-####
 */
@Pipe({
  name: 'usPhoneNumber'
})
export class UsPhoneNumberPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let phoneNumber = value.toString().trim().replace(/^\+/, '');
    let areaCode, digitNumber;
    if (phoneNumber.length == 10 && Number(phoneNumber)) {
      areaCode = phoneNumber.slice(0, 3);
      digitNumber = phoneNumber.slice(3);
    } else {
      return value;
    }
    return (" (" + areaCode + ") " + digitNumber.slice(0, 3) + '-' + digitNumber.slice(3)).trim();
  }
}


